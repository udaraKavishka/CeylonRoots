"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  MapPin,
  Calendar,
  Clock,
  Landmark,
  Utensils,
  Package,
  ArrowUpRight,
  Star,
  X,
} from "lucide-react";
import { DestinationDetails } from "../../types/travel";
import api from "../../service/api";

interface MiniPackage {
  id: number | string;
  title: string;
  price: number | null;
  durationDays: number | null;
  rating: number | null;
  imageUrl?: string | null;
}

interface DestinationDetailModalProps {
  destination: DestinationDetails | null;
  onClose: () => void;
}

type TabKey = "overview" | "packages";

const ATTRACTION_COLORS = [
  "bg-[#2E8B57]/10 text-[#2E8B57] border-[#2E8B57]/20",
  "bg-[#1A5276]/10 text-[#1A5276] border-[#1A5276]/20",
  "bg-[#CD5C5C]/10 text-[#CD5C5C] border-[#CD5C5C]/20",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-teal-100 text-teal-700 border-teal-200",
];

export default function DestinationDetailModal({
  destination,
  onClose,
}: DestinationDetailModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [packages, setPackages] = useState<MiniPackage[]>([]);
  const [pkgLoading, setPkgLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    if (destination) {
      setImgSrc(destination.image || "/images/placeholder.jpg");
      setActiveTab("overview");
      setPackages([]);
    }
  }, [destination]);

  useEffect(() => {
    if (!destination || activeTab !== "packages") return;
    setPkgLoading(true);
    api.get<MiniPackage[]>(`/packages?destination=${encodeURIComponent(destination.name)}`)
      .then((data) => setPackages(Array.isArray(data) ? data : []))
      .catch(() => setPackages([]))
      .finally(() => setPkgLoading(false));
  }, [destination, activeTab]);

  if (!destination) return null;

  return (
    <Dialog
      open={!!destination}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        {/* Full-bleed hero image */}
        <div className="relative w-full h-64 sm:h-72 flex-shrink-0">
          <Image
            src={imgSrc}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
            onError={() => setImgSrc("/images/placeholder.jpg")}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Destination name + region on hero */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white leading-tight drop-shadow">
                {destination.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-1.5 mt-1.5">
              <MapPin className="h-4 w-4 text-[#E8DACC]" />
              <span className="text-sm text-[#E8DACC] font-medium">
                {destination.region}, Sri Lanka
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex">
            {(["overview", "packages"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-[#2E8B57] text-[#2E8B57]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "packages" ? "Travel Packages" : "Overview"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-6 space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Description */}
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Visit info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#E8DACC]/30 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#CD5C5C]" />
                    Best Time to Visit
                  </h4>
                  <p className="text-sm text-gray-600">
                    {destination.bestTimeToVisit || "Year-round"}
                  </p>
                </div>
                <div className="bg-[#E8DACC]/30 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#CD5C5C]" />
                    Recommended Duration
                  </h4>
                  <p className="text-sm text-gray-600">
                    {destination.recommendedDuration || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Attractions */}
              {destination.attractions &&
                destination.attractions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-[#2E8B57]" />
                      Attractions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {destination.attractions.map((attraction, index) => (
                        <span
                          key={index}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium border ${ATTRACTION_COLORS[index % ATTRACTION_COLORS.length]}`}
                        >
                          {attraction}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Cultural tips */}
              {destination.culturalTips && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-[#2E8B57]" />
                    Cultural Tips
                  </h3>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {destination.culturalTips}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setActiveTab("packages")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2E8B57] hover:bg-[#2E8B57]/90 text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <Package className="h-4 w-4" />
                  View Packages for {destination.name}
                </button>
              </div>
            </>
          )}

          {activeTab === "packages" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#2E8B57]" />
                  Available Packages
                </h3>
                <button
                  onClick={() => {
                    router.push("/packages");
                    onClose();
                  }}
                  className="text-xs text-[#2E8B57] font-medium hover:underline flex items-center gap-1"
                >
                  See all packages <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>

              {pkgLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2E8B57]"></div>
                </div>
              ) : packages.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-medium">
                    No packages found for {destination.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    Check our full packages catalog for more options
                  </p>
                  <button
                    onClick={() => {
                      router.push("/packages");
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 text-sm text-[#2E8B57] font-medium border border-[#2E8B57] rounded-lg px-4 py-2 hover:bg-[#2E8B57] hover:text-white transition-colors"
                  >
                    Browse All Packages <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden relative bg-gray-100">
                        {pkg.imageUrl ? (
                          <Image
                            src={pkg.imageUrl}
                            alt={pkg.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2E8B57]/20 to-[#1A5276]/20">
                            <Package className="h-6 w-6 text-[#2E8B57]/50" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                          {pkg.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                          {pkg.durationDays && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {pkg.durationDays} days
                            </span>
                          )}
                          {pkg.rating && (
                            <span className="flex items-center gap-1 text-yellow-600">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {pkg.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        {pkg.price && (
                          <p className="text-sm font-bold text-[#2E8B57] mt-1">
                            From ${pkg.price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* CTA at bottom */}
                  <button
                    onClick={() => {
                      router.push("/packages");
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white font-semibold text-sm transition-colors mt-4"
                  >
                    View All Packages <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
