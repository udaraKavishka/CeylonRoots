"use client";

import { useState } from "react";
import { Star, Send, X, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import api from "../../service/api";

interface ReviewFormProps {
  packageId: string | number;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const TRAVEL_TYPES = ["Solo", "Couple", "Family", "Group"];

function StarPicker({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 w-20">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(n)}
          >
            <Star
              className={`h-5 w-5 transition-colors ${n <= (hovered || value) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Format "YYYY-MM" to "Month YYYY" for storage
function formatMonthDisplay(value: string): string {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ReviewForm({
  packageId,
  onClose,
  onSubmitSuccess,
}: ReviewFormProps) {
  const [form, setForm] = useState({
    authorName: "",
    authorEmail: "",
    comment: "",
    travelType: "",
    tripDateRaw: "", // "YYYY-MM" from input[type=month]
    rating: 0,
    guideRating: 0,
    valueRating: 0,
    itineraryRating: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rating) {
      setError("Please select an overall rating.");
      return;
    }
    if (!form.authorName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!form.authorEmail.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!form.comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    setSubmitting(true);
    setError("");

    const payload = {
      packageId,
      authorName: form.authorName,
      authorEmail: form.authorEmail,
      comment: form.comment,
      travelType: form.travelType || null,
      tripDate: form.tripDateRaw ? formatMonthDisplay(form.tripDateRaw) : null,
      rating: form.rating,
      guideRating: form.guideRating || null,
      valueRating: form.valueRating || null,
      itineraryRating: form.itineraryRating || null,
    };

    try {
      await api.post("/reviews", payload);
      onSubmitSuccess();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-lg">Write a Review</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <StarPicker
            label="Overall *"
            value={form.rating}
            onChange={(v) => setForm((f) => ({ ...f, rating: v }))}
          />
          <div className="border-t border-gray-200 pt-3 space-y-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              Rate specific aspects
            </p>
            <StarPicker
              label="Guide"
              value={form.guideRating}
              onChange={(v) => setForm((f) => ({ ...f, guideRating: v }))}
            />
            <StarPicker
              label="Value"
              value={form.valueRating}
              onChange={(v) => setForm((f) => ({ ...f, valueRating: v }))}
            />
            <StarPicker
              label="Itinerary"
              value={form.itineraryRating}
              onChange={(v) => setForm((f) => ({ ...f, itineraryRating: v }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Your name *"
            value={form.authorName}
            onChange={(e) =>
              setForm((f) => ({ ...f, authorName: e.target.value }))
            }
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30"
          />
          <input
            type="email"
            placeholder="Email (private) *"
            value={form.authorEmail}
            onChange={(e) =>
              setForm((f) => ({ ...f, authorEmail: e.target.value }))
            }
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.travelType}
            onChange={(e) =>
              setForm((f) => ({ ...f, travelType: e.target.value }))
            }
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30"
          >
            <option value="">Travel type</option>
            {TRAVEL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="month"
              value={form.tripDateRaw}
              onChange={(e) =>
                setForm((f) => ({ ...f, tripDateRaw: e.target.value }))
              }
              max={new Date().toISOString().slice(0, 7)}
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30"
              placeholder="When did you travel?"
            />
          </div>
        </div>

        <textarea
          rows={4}
          placeholder="Share your experience... *"
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30 resize-none"
        />

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-ceylon-tea hover:bg-ceylon-tea/90 text-white flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
}
