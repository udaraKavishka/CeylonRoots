"use client";

import { Button } from "./components/ui/button";
import {
  MapPin,
  Users,
  Palmtree,
  Compass,
  Camera,
  Star,
  Globe,
  Award,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FeaturedPackages from "./components/FeaturedPackages";
import Testimonials from "./components/Testimonials";
import BlogPreview from "./components/BlogPreview";
import HeroSection from "./components/HeroSection";
import { useEffect, useState, useRef } from "react";
import { TravelPackage, DestinationDetails, BlogPost } from "./types/travel";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Animated counter hook
function useCountUp(
  end: number,
  duration: number = 2000,
  started: boolean = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);

  return count;
}

// Individual stat item with count-up
function StatItem({
  value,
  suffix,
  label,
  icon,
  started,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  started: boolean;
  delay?: number;
}) {
  const count = useCountUp(value, 2000, started);
  const delayClass =
    delay === 0
      ? "animate-slide-up"
      : delay === 1
        ? "animate-slide-up-delay-1"
        : delay === 2
          ? "animate-slide-up-delay-2"
          : delay === 3
            ? "animate-slide-up-delay-3"
            : "animate-slide-up-delay-4";

  return (
    <div
      className={`stat-card bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 ${delayClass}`}
    >
      <div className="flex justify-center mb-3">
        <div className="h-12 w-12 rounded-full bg-ceylon-tea/10 flex items-center justify-center animate-pulse-glow">
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold text-ceylon-tea mb-1">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const [featuredPackages, setFeaturedPackages] = useState<TravelPackage[]>([]);
  const [popularDestinations, setPopularDestinations] = useState<
    DestinationDetails[]
  >([]);
  const [latestBlogPosts, setLatestBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [packagesRes, destinationsRes, blogRes] = await Promise.all([
          fetch(`${API_BASE_URL}/packages`),
          fetch(`${API_BASE_URL}/destinationdetail`),
          fetch(`${API_BASE_URL}/blogpost`),
        ]);

        if (!packagesRes.ok) throw new Error("Failed to fetch travel packages");
        const packagesData: TravelPackage[] = await packagesRes.json();

        if (!destinationsRes.ok)
          throw new Error("Failed to fetch destinations");
        const destinationsData: DestinationDetails[] =
          await destinationsRes.json();

        if (!blogRes.ok) throw new Error("Failed to fetch blog posts");
        const blogData: BlogPost[] = await blogRes.json();

        setFeaturedPackages(packagesData);
        setPopularDestinations(destinationsData);
        setLatestBlogPosts(blogData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Intersection observer for stats count-up trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 10000,
      suffix: "+",
      label: "Happy Travelers",
      icon: <Users className="h-6 w-6 text-ceylon-tea" />,
    },
    {
      value: 49,
      suffix: "/5",
      label: "Average Rating",
      icon: <Star className="h-6 w-6 text-ceylon-gold" />,
    },
    {
      value: 50,
      suffix: "+",
      label: "Countries Served",
      icon: <Globe className="h-6 w-6 text-ceylon-ocean" />,
    },
    {
      value: 500,
      suffix: "+",
      label: "Tours Completed",
      icon: <Award className="h-6 w-6 text-ceylon-spice" />,
    },
  ];

  const whyChooseFeatures = [
    {
      icon: <Compass className="h-8 w-8 text-ceylon-tea" />,
      title: "Personalized Itineraries",
      description:
        "Custom travel plans designed around your interests, timeline, and budget for a truly unique experience.",
      color: "from-ceylon-tea/10 to-ceylon-tea/5",
      borderColor: "border-ceylon-tea/20",
    },
    {
      icon: <Users className="h-8 w-8 text-ceylon-ocean" />,
      title: "Expert Local Guides",
      description:
        "Knowledgeable guides who bring Sri Lanka's rich culture and fascinating history to life.",
      color: "from-ceylon-ocean/10 to-ceylon-ocean/5",
      borderColor: "border-ceylon-ocean/20",
    },
    {
      icon: <Palmtree className="h-8 w-8 text-ceylon-spice" />,
      title: "Authentic Experiences",
      description:
        "Connect with local communities and cherished traditions far beyond the typical tourist trail.",
      color: "from-ceylon-spice/10 to-ceylon-spice/5",
      borderColor: "border-ceylon-spice/20",
    },
    {
      icon: <Shield className="h-8 w-8 text-ceylon-gold" />,
      title: "Safe & Reliable Travel",
      description:
        "Trusted by thousands of travelers with 24/7 support and fully vetted accommodations.",
      color: "from-ceylon-gold/10 to-ceylon-gold/5",
      borderColor: "border-ceylon-gold/20",
    },
  ];

  const features = [
    {
      icon: <Compass className="h-10 w-10 text-ceylon-tea" />,
      title: "Personalized Itineraries",
      description:
        "Custom travel plans designed around your interests, timeline, and budget.",
    },
    {
      icon: <Users className="h-10 w-10 text-ceylon-tea" />,
      title: "Expert Local Guides",
      description:
        "Knowledgeable guides who bring Sri Lanka's culture and history to life.",
    },
    {
      icon: <Palmtree className="h-10 w-10 text-ceylon-tea" />,
      title: "Authentic Experiences",
      description:
        "Connect with local communities and traditions beyond typical tourist spots.",
    },
    {
      icon: <Camera className="h-10 w-10 text-ceylon-tea" />,
      title: "Photographic Journeys",
      description:
        "Discover perfect photo opportunities at the island's most scenic locations.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ceylon-tea mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading amazing <br />
            Sri Lanka experiences...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            className="ceylon-button-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />

      {/* Animated Statistics Section */}
      <section
        ref={statsRef}
        className="py-16 bg-gradient-to-br from-gray-50 to-ceylon-sand/30"
        aria-label="CeylonRoots statistics"
      >
        <div className="ceylon-container">
          <div className="text-center mb-10 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Trusted by Travelers{" "}
              <span className="animate-shimmer">Worldwide</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Numbers that reflect our commitment to delivering unforgettable
              Sri Lanka journeys.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                started={statsStarted}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CeylonRoots Section */}
      <section className="py-16 bg-white" aria-label="Why choose CeylonRoots">
        <div className="ceylon-container">
          <div className="text-center mb-12 animate-slide-up">
            <span className="inline-block text-sm font-semibold text-ceylon-tea bg-ceylon-tea/10 px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Why CeylonRoots
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Best Way to Explore{" "}
              <span className="text-ceylon-tea">Sri Lanka</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We go beyond the ordinary to craft journeys that connect you to
              the real Sri Lanka — its landscapes, people, and timeless culture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseFeatures.map((feature, index) => {
              const delayClass =
                index === 0
                  ? "animate-slide-up"
                  : index === 1
                    ? "animate-slide-up-delay-1"
                    : index === 2
                      ? "animate-slide-up-delay-2"
                      : "animate-slide-up-delay-3";
              return (
                <div
                  key={index}
                  className={`feature-card rounded-2xl p-6 border bg-gradient-to-br ${feature.color} ${feature.borderColor} ${delayClass}`}
                >
                  <div className="mb-4">
                    <div
                      className="h-14 w-14 rounded-xl bg-white shadow-sm flex items-center justify-center animate-float"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 animate-slide-up-delay-4">
            <Button className="ceylon-button-primary" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="ceylon-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className=" text-3xl md:text-4xl font-bold mb-6">
                Discover Sri Lanka With{" "}
                <span className="text-ceylon-tea">Local Experts</span>
              </h2>
              <p className="text-gray-600 mb-8">
                CeylonRoots creates immersive travel experiences that connect
                you with the authentic heart of Sri Lanka. Our local expertise
                and personalized approach ensure your journey is filled with
                meaningful discoveries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <div className="mb-3">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg relative aspect-video">
                  <Image
                    src="https://ceylonrootsbucket.s3.eu-north-1.amazonaws.com/upload/whychoose1.jpg"
                    alt="Sri Lanka Scenery"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg relative aspect-square">
                  <Image
                    src="https://ceylonrootsbucket.s3.eu-north-1.amazonaws.com/upload/whychoose2.jpg"
                    alt="Sri Lanka Culture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-lg overflow-hidden shadow-lg relative aspect-square">
                  <Image
                    src="https://ceylonrootsbucket.s3.eu-north-1.amazonaws.com/upload/whychoose3.jpg"
                    alt="Sri Lanka Wildlife"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg relative aspect-video">
                  <Image
                    src="https://ceylonrootsbucket.s3.eu-north-1.amazonaws.com/upload/whychoose4.jpg"
                    alt="Sri Lanka Temples"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedPackages packages={featuredPackages} />

      <section className="py-16 bg-white">
        <div className="ceylon-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600">
              Explore the diverse landscapes and cultural treasures of Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <div
                key={destination.id}
                className="ceylon-card group relative overflow-hidden h-72"
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-ceylon-sand mr-1" />
                    <h3 className="text-xl font-bold text-white">
                      {destination.name}
                    </h3>
                  </div>
                  <Link
                    href={"/destination"}
                    className="text-sm text-white underline decoration-2 underline-offset-4 decoration-ceylon-spice hover:decoration-white transition-colors"
                  >
                    Explore Destination
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white"
              asChild
            >
              <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-ceylon-tea/10">
        <div className="ceylon-container">
          <div className="relative">
            <div className="relative bg-white rounded-xl p-8 md:p-12 shadow-xl text-center max-w-4xl mx-auto overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Sri Lanka?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Start planning your dream journey today. Our travel experts are
                ready to craft the perfect itinerary tailored to your interests
                and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="ceylon-button-primary" asChild>
                  <Link href="/customize">Plan Your Custom Trip</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white"
                  asChild
                >
                  <Link href="/packages">Explore Travel Packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <BlogPreview posts={latestBlogPosts} />
    </>
  );
}
