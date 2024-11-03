"use client";
import { useState } from "react";
import { searchLocation, addLocation } from "@/services/api";
import ImageUploader from "../shared/ImageUploader";

export default function LocationForm({ onSubmit, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const [formData, setFormData] = useState({
    address: "",
    notes: "",
    date: "",
    status: "planned",
    images: [],
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await searchLocation(formData.address);
      setSearchResults(result);
    } catch (err) {
      setError("Lokasyon araması sırasında bir hata oluştu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchResults) {
      setError("Lütfen önce bir lokasyon arayın");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const locationData = {
        ...searchResults,
        notes: formData.notes,
        date: formData.date,
        status: formData.status,
        images: formData.images,
      };

      const result = await addLocation(locationData);
      onSubmit?.(result);
      onClose?.();
    } catch (err) {
      setError("Lokasyon eklenirken bir hata oluştu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground-secondary mb-1">
          Lokasyon Ara
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background input-focus"
            placeholder="Örn: Empire State Building, New York"
            required
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {loading ? "Aranıyor..." : "Ara"}
          </button>
        </div>
      </div>

      {searchResults && (
        <div className="p-4 bg-background-secondary rounded-lg">
          <h4 className="font-medium text-foreground">Bulunan Lokasyon:</h4>
          <p className="text-foreground-secondary mt-1">
            {searchResults.formatted_address}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-foreground-secondary mb-1"
        >
          Notlar & Deneyimler
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background input-focus min-h-[120px]"
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-foreground-secondary mb-1"
        >
          Tarih
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background input-focus"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground-secondary mb-1">
          Durum
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="visited"
              checked={formData.status === "visited"}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="mr-2"
            />
            Ziyaret Edildi
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="planned"
              checked={formData.status === "planned"}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="mr-2"
            />
            Planlanıyor
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground-secondary mb-1">
          Fotoğraflar
        </label>
        <ImageUploader
          onImageUpload={(files) => {
            setFormData({
              ...formData,
              images: [...formData.images, ...Array.from(files)],
            });
          }}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg border border-border hover:bg-background-secondary transition-colors"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading || !searchResults}
          className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
}
