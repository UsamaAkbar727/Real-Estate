"use client";

import SafeLink from "@/components/ui/safe-link";


import { Bed, Bath, Maximize, MapPin, Heart, Star, ArrowUpRight } from "lucide-react";
import type { Property } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

const tagStyles: Record<string, string> = {
  Signature: "bg-[var(--royal)] text-white",
  New: "bg-[var(--emerald-brand)] text-white",
  "Hot Deal": "bg-[var(--gold)] text-[var(--ink)]",
  Exclusive: "bg-[var(--ink)] text-[var(--gold-light)]",
  Waterfront: "bg-[var(--royal-light)] text-white",
  Investment: "bg-[var(--emerald-deep)] text-white",
  Lifestyle: "bg-[var(--royal)] text-white",
  Family: "bg-[var(--emerald-brand)] text-white",
  Value: "bg-[var(--gold)] text-[var(--ink)]",
  Commercial: "bg-[var(--ink)] text-[var(--gold-light)]",
};

export default function PropertyCard({
  property,
  size = "md",
  index = 0,
}: {
  property: Property;
  size?: "sm" | "md" | "lg";
  index?: number;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(property.id);
  const isPlot = property.category === "Plot";
  const isCommercial = property.category === "Commercial";

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <SafeLink
      href={`/properties/${property.slug}`}
      className="group relative rounded-[1.75rem] overflow-hidden shadow-luxe hover:shadow-luxe-lg lift bg-white block"
    >
      <div className={cn("relative overflow-hidden", size === "lg" ? "h-72" : size === "sm" ? "h-48" : "h-56")}>
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          {property.tag && (
            <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", tagStyles[property.tag] ?? "bg-[var(--royal)] text-white")}>
              {property.tag}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full glass text-[10px] font-semibold text-[var(--ink)]">
            For {property.type}
          </span>
        </div>
        <button
          onClick={handleHeartClick}
          className={cn(
            "absolute top-4 right-4 h-9 w-9 rounded-full glass flex items-center justify-center transition-all z-20",
            isFav ? "bg-[var(--gold)] text-[var(--ink)] scale-110" : "text-white hover:bg-[var(--gold)] hover:text-[var(--ink)]"
          )}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-3.5 w-3.5", isFav && "fill-current")} />
        </button>
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
            ))}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-1.5">
          <MapPin className="h-3.5 w-3.5 text-[var(--royal)]" /> {property.location}
        </div>
        <h3 className="font-display text-lg font-bold text-[var(--ink)] leading-tight group-hover:text-[var(--royal)] transition-colors">
          {property.title}
        </h3>
        {!isPlot && !isCommercial ? (
          <div className="flex items-center gap-4 text-xs text-[var(--ink)]/65 mt-3">
            <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5 text-[var(--royal)]" /> {property.beds}</span>
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-[var(--royal)]" /> {property.baths}</span>
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-[var(--royal)]" /> {property.area}</span>
          </div>
        ) : isCommercial ? (
          <div className="flex items-center gap-4 text-xs text-[var(--ink)]/65 mt-3">
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-[var(--royal)]" /> {property.baths}</span>
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-[var(--royal)]" /> {property.area}</span>
            <span className="px-2 py-0.5 rounded-md bg-[var(--royal)]/8 text-[var(--royal)] font-semibold">{property.category}</span>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-xs text-[var(--ink)]/65 mt-3">
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-[var(--royal)]" /> {property.area}</span>
            <span className="px-2 py-0.5 rounded-md bg-[var(--royal)]/8 text-[var(--royal)] font-semibold">{property.category}</span>
          </div>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="text-lg font-bold text-gradient-royal">{property.price}</div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[var(--royal)] group-hover:gap-2 transition-all">
            Details <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </SafeLink>
  );
}
