"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { TravelPackage } from "../../types/travel";
import {
  MapPin,
  Calendar,
  DollarSign,
  Star,
  CheckCircle2,
  Share2,
  Facebook,
  Twitter,
  Link2,
} from "lucide-react";
import PackageGallery from "./PackageGallery";
import PackagePriceBreakdown from "./PackagePriceBreakdown";
import PackageItinerary from "./PackageItinerary";
import Image from "next/image";
import { packageGalleries } from "../../data/packageImageMap";
import ReviewCard from "../reviews/ReviewCard";
import ReviewSummary from "../reviews/ReviewSummary";
import ReviewForm from "../reviews/ReviewForm";
import PackageCalendar from "./PackageCalendar";
import dynamic from "next/dynamic";
const PackageRouteMap = dynamic(() => import("./PackageRouteMap"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />,
});

interface PackageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelPackage: TravelPackage;
  onCustomize: () => void;
  onBookNow?: () => void;
}

const PackageDetailModal = ({
  isOpen,
  onClose,
  travelPackage,
  onCustomize,
  onBookNow,
}: PackageDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [reviews, setReviews] = useState<
    {
      id: number;
      authorName: string;
      rating: number;
      guideRating?: number | null;
      valueRating?: number | null;
      itineraryRating?: number | null;
      comment: string;
      travelType?: string | null;
      tripDate?: string | null;
      verified: boolean;
      helpful: number;
      createdAt: string;
    }[]
  >([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (activeTab === "reviews" && travelPackage.id) {
      setReviewsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?packageId=${travelPackage.id}`
      )
        .then((r) => r.json())
        .then((data) => setReviews(Array.isArray(data) ? data : []))
        .catch(() => setReviews([]))
        .finally(() => setReviewsLoading(false));
    }
  }, [activeTab, travelPackage.id]);

  const mainImage =
    travelPackage.imageUrl ?? travelPackage.image ?? "/images/placeholder.jpg";
  const galleryImages = packageGalleries[travelPackage.id] || [];

  const packageUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/packages?package=${travelPackage.id}`
      : "";

  const handleBookNow = () => {
    onClose();
    if (typeof window !== "undefined") {
      localStorage.setItem("bookingPackage", JSON.stringify(travelPackage));
    }
    router.push("/checkout");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(packageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{travelPackage.title}</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-lg relative">
              <Image
                src={mainImage}
                alt={travelPackage.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/images/placeholder.jpg";
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-ceylon-spice" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{travelPackage.duration} Days</p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-ceylon-spice" />
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="font-semibold">
                    ${travelPackage.price} per person
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-ceylon-spice" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold">
                    {travelPackage.rating.toFixed(1)} / 5 (
                    {travelPackage.reviewCount} reviews)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Tour Description</h3>
              <p className="text-foreground mb-4">
                {travelPackage.description}
              </p>

              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 mr-2 text-ceylon-spice flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Destinations</p>
                  <p className="font-medium">
                    {travelPackage.regions.join(", ")}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">Tour Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {travelPackage.themes.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-ceylon-tea flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">
                Available Departures
              </h3>
              <PackageCalendar
                packageId={Number(travelPackage.id)}
                basePrice={Number(travelPackage.price)}
              />
            </div>
          </TabsContent>

          <TabsContent value="itinerary">
            <PackageItinerary packageId={travelPackage.id} />
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Travel Route</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your journey through{" "}
                {travelPackage.regions?.join(", ") || "Sri Lanka"}
              </p>
              <PackageRouteMap destinations={travelPackage.regions || []} />
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <PackageGallery images={galleryImages} />
          </TabsContent>

          <TabsContent value="pricing">
            <PackagePriceBreakdown
              basePrice={travelPackage.price}
              priceIncludes={travelPackage.includes ?? []}
              priceExcludes={travelPackage.excludes ?? []}
            />
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ceylon-tea" />
                </div>
              ) : (
                <>
                  {reviews.length > 0 && (
                    <ReviewSummary
                      stats={{
                        average:
                          reviews.reduce((s, r) => s + r.rating, 0) /
                          reviews.length,
                        count: reviews.length,
                        guideAvg: reviews.filter((r) => r.guideRating).length
                          ? reviews
                              .filter((r) => r.guideRating)
                              .reduce((s, r) => s + (r.guideRating ?? 0), 0) /
                            reviews.filter((r) => r.guideRating).length
                          : undefined,
                        valueAvg: reviews.filter((r) => r.valueRating).length
                          ? reviews
                              .filter((r) => r.valueRating)
                              .reduce((s, r) => s + (r.valueRating ?? 0), 0) /
                            reviews.filter((r) => r.valueRating).length
                          : undefined,
                        itineraryAvg: reviews.filter((r) => r.itineraryRating)
                          .length
                          ? reviews
                              .filter((r) => r.itineraryRating)
                              .reduce(
                                (s, r) => s + (r.itineraryRating ?? 0),
                                0
                              ) /
                            reviews.filter((r) => r.itineraryRating).length
                          : undefined,
                        distribution: [1, 2, 3, 4, 5].reduce(
                          (acc, s) => ({
                            ...acc,
                            [s]: reviews.filter(
                              (r) => Math.round(r.rating) === s
                            ).length,
                          }),
                          {}
                        ),
                      }}
                    />
                  )}

                  {!showReviewForm ? (
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="w-full py-2.5 rounded-lg border-2 border-dashed border-ceylon-tea/40 text-ceylon-tea text-sm hover:bg-ceylon-tea/5 transition-colors"
                    >
                      + Write a Review
                    </button>
                  ) : (
                    <ReviewForm
                      packageId={travelPackage.id}
                      onClose={() => setShowReviewForm(false)}
                      onSubmitSuccess={() => {
                        setShowReviewForm(false);
                        // Re-fetch reviews
                        fetch(
                          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?packageId=${travelPackage.id}`
                        )
                          .then((r) => r.json())
                          .then((data) =>
                            setReviews(Array.isArray(data) ? data : [])
                          );
                      }}
                    />
                  )}

                  {reviews.length === 0 && !showReviewForm && (
                    <p className="text-center text-gray-500 text-sm py-4">
                      No reviews yet. Be the first to review this package!
                    </p>
                  )}

                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={onCustomize}
            variant="outline"
            className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white flex-1"
          >
            Customize This Package
          </Button>
          <Button
            onClick={onBookNow ?? handleBookNow}
            className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white flex-1"
          >
            Book Now
          </Button>
        </div>

        {/* Share section */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Share2 className="h-4 w-4" /> Share:
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(packageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 border border-blue-200 px-2 py-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              <Facebook className="h-3.5 w-3.5" /> Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(travelPackage.title + " - Sri Lanka Tour")}&url=${encodeURIComponent(packageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1 border border-sky-200 px-2 py-1 rounded-full hover:bg-sky-50 transition-colors"
            >
              <Twitter className="h-3.5 w-3.5" /> Twitter
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(travelPackage.title + " - " + packageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1 border border-green-200 px-2 py-1 rounded-full hover:bg-green-50 transition-colors"
            >
              WhatsApp
            </a>
            <button
              onClick={handleCopyLink}
              className="text-sm text-gray-600 hover:text-gray-700 flex items-center gap-1 border border-gray-200 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Link2 className="h-3.5 w-3.5" />{" "}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetailModal;
