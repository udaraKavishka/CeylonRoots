"use client";

import { Star } from "lucide-react";

interface ReviewStats {
  average: number;
  count: number;
  guideAvg?: number;
  valueAvg?: number;
  itineraryAvg?: number;
  distribution: Record<number, number>; // star → count
}

function BarRow({
  label,
  value,
  max = 5,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-gray-600 w-20">{label}</span>
      <div className="flex-grow bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 bg-ceylon-gold rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-gray-700 font-medium w-8 text-right">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function ReviewSummary({ stats }: { stats: ReviewStats }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 flex flex-col sm:flex-row gap-6">
      {/* Overall score */}
      <div className="text-center flex-shrink-0">
        <div className="text-5xl font-bold text-gray-800">
          {stats.average.toFixed(1)}
        </div>
        <div className="flex justify-center gap-0.5 my-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={`h-4 w-4 ${n <= Math.round(stats.average) ? "fill-ceylon-gold text-ceylon-gold" : "text-gray-200"}`}
            />
          ))}
        </div>
        <div className="text-xs text-gray-500">
          {stats.count} review{stats.count !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Breakdown */}
      <div className="flex-grow space-y-1.5">
        {stats.guideAvg !== undefined && (
          <BarRow label="Guide" value={stats.guideAvg} />
        )}
        {stats.valueAvg !== undefined && (
          <BarRow label="Value" value={stats.valueAvg} />
        )}
        {stats.itineraryAvg !== undefined && (
          <BarRow label="Itinerary" value={stats.itineraryAvg} />
        )}
        {/* Star distribution */}
        <div className="pt-1 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star] ?? 0;
            const pct =
              stats.count > 0 ? Math.round((count / stats.count) * 100) : 0;
            return (
              <div
                key={star}
                className="flex items-center gap-2 text-xs text-gray-500"
              >
                <span className="w-4 text-right">{star}</span>
                <Star className="h-3 w-3 fill-ceylon-gold text-ceylon-gold" />
                <div className="flex-grow bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 bg-ceylon-gold rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
