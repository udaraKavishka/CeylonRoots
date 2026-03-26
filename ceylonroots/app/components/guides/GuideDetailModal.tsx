"use client";

import {
  X,
  Star,
  Clock,
  Languages,
  Award,
  MessageCircle,
  UserCircle2,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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

interface GuideDetailModalProps {
  guide: Guide | null;
  onClose: () => void;
}

const EXPERTISE_COLORS: Record<string, string> = {
  Wildlife: "bg-green-100 text-green-700 border-green-200",
  Cultural: "bg-orange-100 text-orange-700 border-orange-200",
  Photography: "bg-purple-100 text-purple-700 border-purple-200",
  Adventure: "bg-red-100 text-red-700 border-red-200",
  History: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Beach: "bg-blue-100 text-blue-700 border-blue-200",
  Hiking: "bg-teal-100 text-teal-700 border-teal-200",
  Birdwatching: "bg-lime-100 text-lime-700 border-lime-200",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function GuideDetailModal({
  guide,
  onClose,
}: GuideDetailModalProps) {
  if (!guide) return null;

  const whatsappUrl = `https://wa.me/+94112345678?text=Hi%20${encodeURIComponent(guide.name)}%2C%20I%20found%20your%20profile%20on%20CeylonRoots%20and%20I%27d%20love%20to%20book%20a%20tour%20with%20you!`;

  return (
    <Dialog
      open={!!guide}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Hero section */}
        <div className="relative bg-gradient-to-br from-[#1A5276] to-[#2E8B57] h-52 flex items-end">
          {guide.photo ? (
            <img
              src={guide.photo}
              alt={guide.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          ) : null}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {guide.featured && (
            <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
              <Award className="h-3 w-3" />
              Featured Guide
            </span>
          )}

          {/* Avatar + name overlay */}
          <div className="relative z-10 flex items-end gap-4 p-6 w-full">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur border-2 border-white/40 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
              {guide.photo ? (
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-white select-none">
                  {getInitials(guide.name)}
                </span>
              )}
            </div>
            <div className="text-white pb-1">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white leading-tight">
                  {guide.name}
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={guide.rating} />
                <span className="text-sm font-semibold text-white/90">
                  {guide.rating.toFixed(1)}
                </span>
                <span className="text-white/70 text-sm">
                  ({guide.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#E8DACC]/40 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-[#2E8B57]">
                {guide.experience}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Years Exp.</p>
            </div>
            <div className="bg-[#E8DACC]/40 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-[#1A5276]">
                {guide.rating.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Rating</p>
            </div>
            <div className="bg-[#E8DACC]/40 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-[#CD5C5C]">
                {guide.reviewCount}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Reviews</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <UserCircle2 className="h-4 w-4 text-[#2E8B57]" />
              About
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{guide.bio}</p>
          </div>

          {/* Specializations */}
          {guide.expertise.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#2E8B57]" />
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {guide.expertise.map((e) => (
                  <span
                    key={e}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium border ${EXPERTISE_COLORS[e] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {guide.languages.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                <Languages className="h-4 w-4 text-[#2E8B57]" />
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {guide.languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-xs px-3 py-1.5 bg-[#1A5276]/10 text-[#1A5276] rounded-full font-medium border border-[#1A5276]/20"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Response time */}
          {guide.responseTime && (
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-3">
              <Clock className="h-4 w-4 text-[#2E8B57] flex-shrink-0" />
              <span>
                Typically responds within{" "}
                <span className="font-medium text-gray-700">
                  {guide.responseTime}
                </span>
              </span>
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#2E8B57] hover:bg-[#2E8B57]/90 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <MessageCircle className="h-5 w-5" />
              Contact {guide.name.split(" ")[0]} on WhatsApp
            </a>
            <p className="text-center text-xs text-gray-400 mt-2">
              Opens WhatsApp with a pre-filled message
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
