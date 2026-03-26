"use client";

import React, { useState } from "react";
import { DestinationDetails } from "../../types/travel";
import Image from "next/image";
import { Package } from "lucide-react";

interface DestinationCardProps {
  destination: DestinationDetails;
  packageCount?: number;
  onClick?: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  packageCount,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(
    destination.image || "/images/placeholder.jpg"
  );

  return (
    <div
      className="flex flex-col bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-border cursor-pointer hover:-translate-y-1 group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      aria-label={`View details for ${destination.name}`}
    >
      {/* Image Section */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden">
        <Image
          src={imgSrc}
          alt={destination.name || "Destination image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgSrc("/images/placeholder.jpg")}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <span className="absolute top-4 left-4 bg-[#2E8B57] text-white px-3 py-1 rounded-full text-xs font-semibold shadow z-10">
          {destination.region || "Unknown Region"}
        </span>

        {/* Package count badge */}
        {packageCount !== undefined && (
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A5276] px-2.5 py-1 rounded-full text-xs font-semibold shadow flex items-center gap-1 z-10">
            <Package className="h-3 w-3" />
            {packageCount} {packageCount === 1 ? "package" : "packages"}
          </span>
        )}

        {/* Click hint */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
            Explore Destination
          </span>
        </div>
      </div>

      {/* Content Section - simplified */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-[#2E8B57] transition-colors">
          {destination.name || "Unnamed Destination"}
        </h3>

        {destination.description ? (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {destination.description}
          </p>
        ) : (
          <p className="text-muted-foreground/60 italic text-sm mb-3">
            No description available
          </p>
        )}

        {/* Package count CTA */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">{destination.region}</span>
          {packageCount !== undefined && packageCount > 0 && (
            <span className="text-xs font-semibold text-[#2E8B57] flex items-center gap-1">
              <Package className="h-3 w-3" />
              {packageCount} {packageCount === 1 ? "package" : "packages"}{" "}
              available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
