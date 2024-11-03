const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_KEY = "travel_notebook_token";

// Token yönetimi
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const isAuthenticated = () => !!getToken();

async function fetchApi(endpoint, options = {}) {
  try {
    const token = getToken();

    // Headers'ı düzenle
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Token varsa ekle
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    // Debug için request'i logla
    console.log("Request to:", `${API_URL}${endpoint}`);
    console.log("Request config:", config);

    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Debug için response'u logla
    console.log("Response status:", response.status);

    // Response text'i al
    const responseText = await response.text();
    console.log("Response text:", responseText);

    // JSON parse et
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.reload();
        throw new Error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
      }
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function login(credentials) {
  const result = await fetchApi("/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (result.token) {
    setToken(result.token);
  }
  return result;
}

export async function register(userData) {
  return await fetchApi("/api/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function logout() {
  removeToken();
}

export async function getLocations() {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  return await fetchApi("/api/locations", {
    method: "GET",
  });
}

/**
 * Lokasyon aramak için API isteği yapar
 * @param {string} address - Aranacak adres
 * @returns {Promise<Location>} Lokasyon bilgileri
 */
export async function searchLocation(address) {
  const result = await fetchApi("/api/locations", {
    method: "POST",
    body: JSON.stringify({ address }),
  });
  return result.data;
}

/**
 * Yeni lokasyon ekler
 * @param {Location} location - Eklenecek lokasyon bilgileri
 * @returns {Promise<Location>} Eklenen lokasyon
 */
export async function addLocation(location) {
  const result = await fetchApi("/api/locations", {
    method: "POST",
    body: JSON.stringify(location),
  });
  return result.data;
}

/**
 * Lokasyon bilgilerini günceller
 * @param {number} id - Güncellenecek lokasyon ID'si
 * @param {Location} location - Güncellenecek bilgiler
 * @returns {Promise<Location>} Güncellenen lokasyon
 */
export async function updateLocation(id, location) {
  const result = await fetchApi(`/api/locations/${id}`, {
    method: "PUT",
    body: JSON.stringify(location),
  });
  return result.data;
}

/**
 * Lokasyon siler
 * @param {number} id - Silinecek lokasyon ID'si
 * @returns {Promise<void>}
 */
export async function deleteLocation(id) {
  await fetchApi(`/api/locations/${id}`, {
    method: "DELETE",
  });
}
