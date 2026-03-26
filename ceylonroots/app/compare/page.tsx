"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  GitCompare,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useCompare } from "../contexts/CompareContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { Button } from "../components/ui/button";

const RADAR_COLORS = ["#2D6A4F", "#B5451B", "#8B5E3C"];

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { format } = useCurrency();
  const router = useRouter();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <GitCompare className="h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">
          No packages to compare
        </h1>
        <p className="text-gray-500 mb-6">
          Select up to 3 packages from the packages page to compare them
          side-by-side.
        </p>
        <Button
          asChild
          className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white"
        >
          <Link href="/packages">Browse Packages</Link>
        </Button>
      </div>
    );
  }

  // Normalize values to 0–5 scale for radar chart
  const maxPrice = Math.max(...compareList.map((p) => p.price));
  const maxDuration = Math.max(...compareList.map((p) => p.duration));
  const maxReviews = Math.max(...compareList.map((p) => p.reviewCount));

  const radarData = [
    {
      subject: "Rating",
      ...Object.fromEntries(
        compareList.map((p) => [p.title, parseFloat(p.rating.toFixed(1))])
      ),
      fullMark: 5,
    },
    {
      subject: "Value",
      ...Object.fromEntries(
        compareList.map((p) => [
          p.title,
          parseFloat((5 - (p.price / maxPrice) * 4).toFixed(1)),
        ])
      ),
      fullMark: 5,
    },
    {
      subject: "Duration",
      ...Object.fromEntries(
        compareList.map((p) => [
          p.title,
          parseFloat(((p.duration / maxDuration) * 5).toFixed(1)),
        ])
      ),
      fullMark: 5,
    },
    {
      subject: "Reviews",
      ...Object.fromEntries(
        compareList.map((p) => [
          p.title,
          parseFloat(
            (maxReviews > 0 ? (p.reviewCount / maxReviews) * 5 : 0).toFixed(1)
          ),
        ])
      ),
      fullMark: 5,
    },
    {
      subject: "Highlights",
      ...Object.fromEntries(
        compareList.map((p) => [
          p.title,
          Math.min(p.highlights?.length ?? p.themes?.length ?? 0, 5),
        ])
      ),
      fullMark: 5,
    },
  ];

  const rows: {
    label: string;
    render: (pkg: (typeof compareList)[0]) => React.ReactNode;
  }[] = [
    {
      label: "Price",
      render: (pkg) => (
        <span className="text-lg font-bold text-ceylon-tea">
          {format(pkg.price)}
        </span>
      ),
    },
    {
      label: "Duration",
      render: (pkg) => (
        <span className="flex items-center gap-1 justify-center">
          <Calendar className="h-4 w-4 text-ceylon-spice" />
          {pkg.duration} days
        </span>
      ),
    },
    {
      label: "Rating",
      render: (pkg) => (
        <span className="flex items-center gap-1 justify-center">
          <Star className="h-4 w-4 fill-ceylon-gold text-ceylon-gold" />
          {pkg.rating.toFixed(1)} ({pkg.reviewCount} reviews)
        </span>
      ),
    },
    {
      label: "Regions",
      render: (pkg) => (
        <span className="flex flex-col items-center gap-1">
          {(pkg.regions ?? []).map((r) => (
            <span
              key={r}
              className="inline-flex items-center gap-1 text-sm text-gray-600"
            >
              <MapPin className="h-3 w-3 text-ceylon-spice flex-shrink-0" />
              {r}
            </span>
          ))}
        </span>
      ),
    },
    {
      label: "Themes",
      render: (pkg) => (
        <div className="flex flex-wrap justify-center gap-1">
          {(pkg.themes ?? []).slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-ceylon-tea/10 text-ceylon-tea text-xs rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Highlights",
      render: (pkg) => (
        <ul className="text-sm text-gray-600 text-left space-y-1 max-w-[180px]">
          {(pkg.highlights ?? []).slice(0, 4).map((h, i) => (
            <li key={i} className="flex items-start gap-1">
              <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
              {h}
            </li>
          ))}
          {!pkg.highlights?.length && (
            <li className="text-gray-400 italic text-xs">Not listed</li>
          )}
        </ul>
      ),
    },
    {
      label: "Includes",
      render: (pkg) => (
        <ul className="text-sm text-gray-600 text-left space-y-1 max-w-[180px]">
          {(pkg.priceIncludes ?? pkg.includes ?? [])
            .slice(0, 4)
            .map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          {!(pkg.priceIncludes ?? pkg.includes)?.length && (
            <li className="text-gray-400 italic text-xs">Not listed</li>
          )}
        </ul>
      ),
    },
    {
      label: "Excludes",
      render: (pkg) => (
        <ul className="text-sm text-gray-600 text-left space-y-1 max-w-[180px]">
          {(pkg.priceExcludes ?? pkg.excludes ?? [])
            .slice(0, 4)
            .map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <XCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          {!(pkg.priceExcludes ?? pkg.excludes)?.length && (
            <li className="text-gray-400 italic text-xs">Not listed</li>
          )}
        </ul>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-ceylon-stone text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/packages"
            className="inline-flex items-center text-white/70 hover:text-white mb-4 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Packages
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <GitCompare className="h-7 w-7 text-ceylon-sand" />
              <h1 className="text-3xl font-bold">Package Comparison</h1>
            </div>
            <button
              onClick={clearCompare}
              className="text-sm text-white/60 hover:text-white underline transition-colors"
            >
              Clear all
            </button>
          </div>
          <p className="text-white/70 mt-1 text-sm">
            Comparing {compareList.length} package
            {compareList.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Side-by-side comparison table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-500 bg-gray-50 w-36 sticky left-0">
                    Feature
                  </th>
                  {compareList.map((pkg, i) => (
                    <th
                      key={pkg.id}
                      className="py-4 px-6 text-center"
                      style={{ minWidth: "220px" }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: RADAR_COLORS[i] }}
                        />
                        <span className="font-bold text-gray-800 leading-tight">
                          {pkg.title}
                        </span>
                        <button
                          onClick={() => removeFromCompare(String(pkg.id))}
                          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={`border-b border-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-600 bg-inherit sticky left-0">
                      {row.label}
                    </td>
                    {compareList.map((pkg) => (
                      <td
                        key={pkg.id}
                        className="py-4 px-6 text-center align-top"
                      >
                        {row.render(pkg)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Radar Chart */}
        {compareList.length >= 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Visual Comparison
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Scores are normalized relative to the packages being compared.
            </p>
            <ResponsiveContainer width="100%" height={380}>
              <RadarChart data={radarData}>
                <PolarGrid strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 13, fill: "#555" }}
                />
                <Tooltip formatter={(value: number) => value.toFixed(1)} />
                {compareList.map((pkg, i) => (
                  <Radar
                    key={pkg.id}
                    name={pkg.title}
                    dataKey={pkg.title}
                    stroke={RADAR_COLORS[i]}
                    fill={RADAR_COLORS[i]}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                ))}
                <Legend
                  wrapperStyle={{ fontSize: "13px", paddingTop: "16px" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Action buttons per package */}
        <div
          className={`grid gap-4 ${compareList.length === 1 ? "grid-cols-1 max-w-sm mx-auto" : compareList.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
        >
          {compareList.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2"
            >
              <p className="font-semibold text-gray-800 text-sm line-clamp-2">
                {pkg.title}
              </p>
              <p className="text-ceylon-tea font-bold">{format(pkg.price)}</p>
              <div className="flex gap-2 mt-1">
                <Button
                  className="flex-1 bg-ceylon-tea hover:bg-ceylon-tea/90 text-white text-xs h-8"
                  onClick={() => router.push("/checkout")}
                >
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white text-xs h-8"
                  onClick={() => router.push("/packages")}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
