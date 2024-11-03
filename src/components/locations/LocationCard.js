import Image from "next/image";

export default function LocationCard({ location, onClick }) {
  return (
    <div
      className="bg-background rounded-xl shadow-custom hover:shadow-custom-hover transition-all cursor-pointer location-card-hover"
      onClick={onClick}
    >
      {location.image && (
        <div className="relative h-48 w-full">
          <Image
            src={location.image}
            alt={location.name}
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground">
          {location.name}
        </h3>
        <p className="text-foreground-secondary text-sm mt-1 line-clamp-2">
          {location.notes}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-foreground-secondary">
            {location.date}
          </span>
          {location.status === "planned" ? (
            <span className="px-2 py-1 rounded-full bg-accent-2/10 text-accent-2 text-xs font-medium">
              Planned
            </span>
          ) : (
            <span className="px-2 py-1 rounded-full bg-accent-1/10 text-accent-1 text-xs font-medium">
              Visited
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
