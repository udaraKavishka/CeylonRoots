"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Discover Sri Lanka with Ceylon Roots"
    >
      {/* Hero Background Image with priority loading */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
          alt="Scenic view of Sri Lankan landscape"
          fill
          priority
          className="object-cover animate-slow-zoom"
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="ceylon-container">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Experience the Magic of{" "}
              <span className="text-ceylon-sand">Sri Lanka</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Explore pristine beaches, ancient temples, lush tea plantations,
              and vibrant wildlife with our carefully crafted travel
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="ceylon-button-primary text-base group"
                asChild
              >
                <Link href="/packages" className="flex items-center">
                  Explore Packages
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base"
                asChild
              >
                <Link href="/customize">Customize Your Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with semantic button */}
      <button
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce focus:outline-none"
        aria-label="Scroll down to continue"
        onClick={() =>
          window.scrollBy({ top: window.innerHeight - 100, behavior: "smooth" })
        }
      >
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
        <span className="text-white mt-2 text-sm">Scroll Down</span>
      </button>
    </section>
  );
};

export default HeroSection;
