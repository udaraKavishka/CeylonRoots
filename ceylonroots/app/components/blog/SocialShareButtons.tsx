"use client";

import { useState } from "react";
import { Link2, Share2, MessageCircle, Check } from "lucide-react";

type Props = {
  title: string;
  url: string;
};

export default function SocialShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select and copy via execCommand for older browsers
    }
  };

  const handleTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-ceylon-sand/30">
      <span className="text-sm font-medium text-ceylon-stone mr-1">
        Share this article:
      </span>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-ceylon-sand/50 text-ceylon-stone hover:border-ceylon-tea hover:text-ceylon-tea transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-ceylon-tea" />
            <span className="text-ceylon-tea">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" />
            Copy link
          </>
        )}
      </button>

      <button
        onClick={handleTwitter}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-ceylon-sand/50 text-ceylon-stone hover:border-ceylon-ocean hover:text-ceylon-ocean transition-colors"
        aria-label="Share on X / Twitter"
      >
        <Share2 className="h-4 w-4" />
        Share on X
      </button>

      <button
        onClick={handleWhatsApp}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-ceylon-sand/50 text-ceylon-stone hover:border-ceylon-tea hover:text-ceylon-tea transition-colors"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </button>
    </div>
  );
}
