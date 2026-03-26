"use client";

import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { useCompare } from "../../contexts/CompareContext";
import { Button } from "../ui/button";

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-ceylon-stone text-white shadow-2xl border-t-2 border-ceylon-tea">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-ceylon-sand">
              Comparing ({compareList.length}/3):
            </span>
            {compareList.map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1 text-sm"
              >
                <span className="max-w-[120px] truncate">{pkg.title}</span>
                <button
                  onClick={() => removeFromCompare(String(pkg.id))}
                  className="ml-1 hover:text-red-300 transition-colors"
                  aria-label={`Remove ${pkg.title} from comparison`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {compareList.length < 3 && (
              <span className="text-sm text-white/50 italic">
                + add {3 - compareList.length} more
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-sm text-white/60 hover:text-white transition-colors underline"
            >
              Clear all
            </button>
            <Button
              asChild
              className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white"
              size="sm"
            >
              <Link href="/compare" className="flex items-center gap-1">
                Compare Now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
