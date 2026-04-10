"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import PackageCard from "../components/packages/PackageCard";
import PackageDetailModal from "../components/packages/PackageDetailModal";
import { TravelPackage } from "../types/travel";
import { useRouter } from "next/navigation";
import api from "../service/api";

export default function WishlistPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const wishlistIds: string[] = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        if (wishlistIds.length === 0) {
          setPackages([]);
          setLoading(false);
          return;
        }

        const allPackages = await api.get<TravelPackage[]>("/packages");

        const wishlisted = allPackages.filter((pkg) =>
          wishlistIds.includes(String(pkg.id))
        );
        setPackages(wishlisted);
      } catch (err) {
        console.error("Error loading wishlist:", err);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    loadWishlist();
  }, []);

  const handleOpenModal = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handleBookNow = () => {
    router.push("/checkout");
  };

  const handleCustomize = (pkg: TravelPackage) => {
    localStorage.setItem("basePackage", JSON.stringify(pkg));
    router.push("/customize");
  };

  const clearWishlist = () => {
    localStorage.setItem("wishlist", "[]");
    setPackages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/packages"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Packages
          </Link>
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-white fill-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              My Wishlist
            </h1>
          </div>
          <p className="text-white/80 mt-2">
            {loading
              ? "Loading..."
              : `${packages.length} saved ${packages.length === 1 ? "package" : "packages"}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <Heart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Click the heart icon on any package to save it here for later.
            </p>
            <Button
              asChild
              className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white"
            >
              <Link href="/packages">Browse Packages</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{packages.length} saved packages</p>
              <button
                onClick={clearWishlist}
                className="text-sm text-red-400 hover:text-red-600 underline transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  travelPackage={pkg}
                  onView={() => handleOpenModal(pkg)}
                  onBookNow={handleBookNow}
                  onCustomize={() => handleCustomize(pkg)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedPackage && (
        <PackageDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          travelPackage={selectedPackage}
          onCustomize={() => handleCustomize(selectedPackage)}
          onBookNow={handleBookNow}
        />
      )}
    </div>
  );
}
