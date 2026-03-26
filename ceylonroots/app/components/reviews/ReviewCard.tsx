"use client";

import { Star, CheckCircle, ThumbsUp } from "lucide-react";

interface Review {
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
}

function StarRow({
  label,
  value,
}: {
  label: string;
  value: number | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-500 w-20">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`h-3 w-3 ${n <= Math.round(value) ? "fill-ceylon-gold text-ceylon-gold" : "text-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ceylon-tea flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {getInitials(review.authorName)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 text-sm">
                {review.authorName}
              </span>
              {review.verified && (
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <CheckCircle className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              {review.travelType && <span>{review.travelType}</span>}
              {review.travelType && review.tripDate && <span>·</span>}
              {review.tripDate && <span>{review.tripDate}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={`h-4 w-4 ${n <= Math.round(review.rating) ? "fill-ceylon-gold text-ceylon-gold" : "text-gray-200"}`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {review.comment}
      </p>

      {/* Sub-ratings */}
      {(review.guideRating || review.valueRating || review.itineraryRating) && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3 pt-2 border-t border-gray-50">
          <StarRow label="Guide" value={review.guideRating} />
          <StarRow label="Value" value={review.valueRating} />
          <StarRow label="Itinerary" value={review.itineraryRating} />
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button className="flex items-center gap-1 hover:text-ceylon-tea transition-colors">
          <ThumbsUp className="h-3 w-3" /> Helpful ({review.helpful})
        </button>
      </div>
    </div>
  );
}
