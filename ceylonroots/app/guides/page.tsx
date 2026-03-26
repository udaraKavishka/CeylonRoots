"use client";

import { useState, useEffect } from "react";
import { Users, Search } from "lucide-react";
import GuideCard from "../components/guides/GuideCard";
import GuideDetailModal from "../components/guides/GuideDetailModal";

interface Guide {
  id: number;
  name: string;
  photo?: string | null;
  bio: string;
  expertise: string[];
  languages: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  responseTime?: string | null;
  featured: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ALL_EXPERTISE = [
  "Wildlife",
  "Cultural",
  "Photography",
  "Adventure",
  "History",
  "Beach",
  "Hiking",
  "Birdwatching",
];

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(
    null
  );
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/guides`)
      .then((res) => res.json())
      .then((data) => setGuides(data))
      .catch(() => setGuides([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = guides.filter((g) => {
    const matchSearch =
      !search ||
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase())) ||
      g.languages.some((l) => l.toLowerCase().includes(search.toLowerCase()));
    const matchExpertise =
      !selectedExpertise || g.expertise.includes(selectedExpertise);
    return matchSearch && matchExpertise;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-ceylon-stone to-ceylon-tea text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Users className="h-8 w-8 text-ceylon-sand" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Meet Your Local Guides
            </h1>
          </div>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
            Our handpicked specialists know Sri Lanka intimately — from its
            hidden temples to secret wildlife trails. Every guide is vetted,
            passionate, and local.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedExpertise(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!selectedExpertise ? "bg-ceylon-tea text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              All
            </button>
            {ALL_EXPERTISE.map((e) => (
              <button
                key={e}
                onClick={() =>
                  setSelectedExpertise(selectedExpertise === e ? null : e)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedExpertise === e ? "bg-ceylon-tea text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-ceylon-tea"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <Users className="h-14 w-14 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              No guides found
            </h2>
            <p className="text-gray-400 text-sm">
              Try a different search or filter.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {filtered.length} guide{filtered.length !== 1 ? "s" : ""}{" "}
              available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((guide) => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  onClick={() => setSelectedGuide(guide)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Guide detail modal */}
      <GuideDetailModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
      />
    </div>
  );
}
