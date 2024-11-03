"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MapView from "@/components/map/MapView";
import LocationList from "@/components/locations/LocationList";
import LocationForm from "@/components/locations/LocationForm";
import Modal from "@/components/shared/Modal";
import { getLocations, isAuthenticated } from "@/services/api";

export default function Home() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  // Authentication kontrolü
  useEffect(() => {
    if (!isAuthenticated()) {
      setError("Please login to view locations");
      setLocations([]);
      setIsLoading(false);
      return;
    }
  }, []);

  const fetchLocations = useCallback(async () => {
    if (!isAuthenticated()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await getLocations();
      setLocations(data.data || []);
    } catch (err) {
      setError(err.message || "Lokasyonlar yüklenirken bir hata oluştu.");
      console.error("Error fetching locations:", err);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleAddLocation = async (newLocation) => {
    try {
      await fetchLocations();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || "Lokasyon eklenirken bir hata oluştu.");
      console.error("Error adding location:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddClick={() => setIsModalOpen(true)} />
      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        <Sidebar>
          <LocationList
            locations={locations}
            onLocationSelect={setSelectedLocation}
            isLoading={isLoading}
            error={error}
            onRetry={fetchLocations}
          />
        </Sidebar>
        <div className="flex-1 p-4">
          <MapView
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni Lokasyon Ekle"
      >
        <LocationForm
          onSubmit={handleAddLocation}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
