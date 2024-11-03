export default function LocationList({
  locations,
  onLocationSelect,
  isLoading,
  error,
}) {
  return (
    <div className="h-full flex flex-col bg-sidebar-bg">
      <div className="p-4 border-b border-border sticky top-0 bg-sidebar-bg z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search locations..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-border bg-background input-focus"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Error State */}
        {error && (
          <div className="text-center p-4 bg-red-50 rounded-lg text-red-600">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm underline"
            >
              Yeniden dene
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-background rounded-xl p-4 space-y-3 animate-pulse"
              >
                <div className="h-4 bg-background-secondary rounded w-3/4" />
                <div className="h-4 bg-background-secondary rounded w-1/2" />
              </div>
            ))}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && locations.length === 0 && (
          <div className="text-center text-foreground-secondary py-8">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-border"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <p className="text-lg font-medium">No locations yet</p>
            <p className="mt-1">Start by adding your first location!</p>
          </div>
        )}

        {/* Location List */}
        {!isLoading &&
          !error &&
          locations.length > 0 &&
          locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => onLocationSelect(location)}
            />
          ))}
      </div>
    </div>
  );
}
