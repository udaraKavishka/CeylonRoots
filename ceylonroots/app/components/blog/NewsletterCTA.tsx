"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-r from-ceylon-tea/90 to-ceylon-ocean/90 p-8 text-white text-center shadow-lg">
      <h3 className="font-serif text-2xl font-bold mb-2">
        Plan Your Sri Lanka Journey
      </h3>
      <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
        Get personalised itineraries, hidden gem tips, and local insights
        delivered to your inbox.
      </p>

      {submitted ? (
        <p className="text-ceylon-gold font-semibold text-sm py-2">
          Thank you! We&apos;ll be in touch soon.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto mb-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-2.5 rounded-xl text-ceylon-stone text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-gold/50 bg-white"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-ceylon-gold text-white font-semibold rounded-xl text-sm hover:bg-ceylon-gold/90 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      )}

      <Link
        href="/packages"
        className="text-ceylon-gold text-sm font-medium hover:underline"
      >
        Or explore our tour packages →
      </Link>
    </div>
  );
}
