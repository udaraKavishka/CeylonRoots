"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Calendar,
  MapPin,
  Star,
  Sparkles,
  Heart,
  GitCompare,
} from "lucide-react";
import { TravelPackage } from "../../types/travel";
import { useCurrency } from "../../contexts/CurrencyContext";
import { useCompare } from "../../contexts/CompareContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PackageCardProps {
  travelPackage: TravelPackage;
  onView: () => void;
  onBookNow: () => void;
  onCustomize: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  travelPackage,
  onView,
  onBookNow,
  onCustomize,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginHint, setShowLoginHint] = useState(false);
  const { format } = useCurrency();
  const { addToCompare, removeFromCompare, isInCompare, canAdd } = useCompare();
  const { data: session } = useSession();
  const router = useRouter();
  const inCompare = isInCompare(String(travelPackage.id));
  const regions = travelPackage.regions || [];
  const themes = travelPackage.themes || [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const wishlist: string[] = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      setIsWishlisted(wishlist.includes(String(travelPackage.id)));
    }
  }, [travelPackage.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === "undefined") return;

    if (!session?.user) {
      setShowLoginHint(true);
      setTimeout(() => setShowLoginHint(false), 3000);
      return;
    }

    const wishlist: string[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    const id = String(travelPackage.id);
    const updated = isWishlisted
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id];
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="ceylon-card group overflow-hidden h-full flex flex-col">
        <motion.div
          className="relative w-full h-56 sm:h-64"
          style={{ overflow: "hidden" }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={
              travelPackage.imageUrl ??
              travelPackage.image ??
              "/images/placeholder.jpg"
            }
            alt={travelPackage.title}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <div className="absolute top-3 right-3 px-2 py-1 bg-ceylon-gold/80 text-white rounded-md text-sm font-medium flex items-center">
            <Star className="h-4 w-4 mr-1 fill-white" />
            {travelPackage.rating.toFixed(1)}
          </div>
          {/* Wishlist button */}
          <div className="absolute top-3 left-3">
            <motion.button
              onClick={toggleWishlist}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </motion.button>
            {showLoginHint && (
              <div className="absolute left-10 top-0 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 w-44 shadow-lg">
                <p className="mb-1">Log in to save itineraries</p>
                <button
                  onClick={() => router.push("/login")}
                  className="text-ceylon-tea underline font-semibold"
                >
                  Sign in →
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold">{travelPackage.title}</h3>
        </CardHeader>

        <CardContent className="pb-4 flex-grow">
          <p className="text-gray-600 mb-4 line-clamp-3">
            {travelPackage.description}
          </p>

          <div className="grid grid-cols-2 gap-y-2 mb-3">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1 text-ceylon-spice" />
              {travelPackage.duration} Days
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 mr-1 text-ceylon-spice fill-ceylon-spice" />
              From {format(travelPackage.price)}
            </div>
          </div>

          <div className="flex items-start mb-3">
            <MapPin className="h-4 w-4 text-ceylon-spice mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-500 ml-1 line-clamp-1">
              {regions.join(", ")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {themes.slice(0, 3).map((theme) => (
              <span
                key={theme}
                className="inline-flex items-center px-2 py-1 bg-ceylon-tea/10 text-ceylon-tea text-xs rounded-full"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {theme}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white w-full"
            onClick={onView}
          >
            View Details
          </Button>
          <motion.div whileTap={{ scale: 0.95 }} className="w-full">
            <Button
              className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white w-full"
              onClick={onBookNow}
            >
              Book Now
            </Button>
          </motion.div>
          <Button
            variant="ghost"
            className="col-span-2 mt-2 text-ceylon-tea hover:bg-ceylon-tea/10 w-full"
            onClick={onCustomize}
          >
            Customize Package
          </Button>
          <Button
            variant="ghost"
            disabled={!inCompare && !canAdd}
            className={`col-span-2 w-full text-sm flex items-center gap-1.5 transition-colors ${
              inCompare
                ? "bg-ceylon-stone/10 text-ceylon-stone hover:bg-ceylon-stone/20"
                : !canAdd
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() =>
              inCompare
                ? removeFromCompare(String(travelPackage.id))
                : addToCompare(travelPackage)
            }
          >
            <GitCompare className="h-3.5 w-3.5" />
            {inCompare
              ? "Remove from Compare"
              : !canAdd
                ? "Max 3 packages"
                : "Add to Compare"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PackageCard;
