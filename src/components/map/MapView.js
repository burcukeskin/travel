export default function MapView({
  locations,
  selectedLocation,
  onLocationSelect,
}) {
  return (
    <div className="h-full rounded-lg overflow-hidden border border-gray-200">
      {/* Google Maps komponenti buraya eklenecek */}
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Map will be displayed here</p>
      </div>
    </div>
  );
}
