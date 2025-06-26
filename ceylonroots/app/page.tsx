// app/page.tsx
import { Button } from "./components/ui/button";
import { MapPin, Users, Palmtree, Compass, Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FeaturedPackages from "./components/FeaturedPackages";
import Testimonials from "./components/Testimonials";
import BlogPreview from "./components/BlogPreview";
import HeroSection from "./components/HeroSection"; 

export default function HomePage() {
  const destinations = [
    { name: "Colombo", image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Kandy", image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Sigiriya", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Galle", image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ];

  const features = [
    {
      icon: <Compass className="h-10 w-10 text-ceylon-tea" />,
      title: "Personalized Itineraries",
      description: "Custom travel plans designed around your interests, timeline, and budget."
    },
    {
      icon: <Users className="h-10 w-10 text-ceylon-tea" />,
      title: "Expert Local Guides",
      description: "Knowledgeable guides who bring Sri Lanka's culture and history to life."
    },
    {
      icon: <Palmtree className="h-10 w-10 text-ceylon-tea" />,
      title: "Authentic Experiences",
      description: "Connect with local communities and traditions beyond typical tourist spots."
    },
    {
      icon: <Camera className="h-10 w-10 text-ceylon-tea" />,
      title: "Photographic Journeys",
      description: "Discover perfect photo opportunities at the island's most scenic locations."
    }
  ];

  return (
    <>
      <HeroSection />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="ceylon-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className=" text-3xl md:text-4xl font-bold mb-6">
                Discover Sri Lanka With <span className="text-ceylon-tea">Local Experts</span>
              </h2>
              <p className="text-gray-600 mb-8">
                CeylonRoots creates immersive travel experiences that connect you with the authentic heart of Sri Lanka.
                Our local expertise and personalized approach ensure your journey is filled with meaningful discoveries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <div className="mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="ceylon-button-primary" asChild>
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg relative aspect-video">
                  <Image
                    src="/images/home/whychoose1.jpg"
                    alt="Sri Lanka Scenery"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg relative aspect-square">
                  <Image
                    src="/images/home/whychoose2.jpg"
                    alt="Sri Lanka Culture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-lg overflow-hidden shadow-lg relative aspect-square">
                  <Image
                    src="/images/home/whychoose3.jpg"
                    alt="Sri Lanka Wildlife"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg relative aspect-video">
                  <Image
                    src="/images/home/whychoose4.jpg"
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

      <FeaturedPackages />

      {/* Popular Destinations Section */}
      <section className="py-16 bg-white">
        <div className="ceylon-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600">
              Explore the diverse landscapes and cultural treasures of Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <div key={index} className="ceylon-card group relative overflow-hidden h-72">
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
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                  </div>
                  <Link
                    href={`/destinations/${destination.name.toLowerCase()}`}
                    className="text-sm text-white underline decoration-2 underline-offset-4 decoration-ceylon-spice hover:decoration-white transition-colors"
                  >
                    Explore Destination
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white" asChild>
              <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-ceylon-tea/10">
        <div className="ceylon-container">
          <div className="relative">
            <div className="relative bg-white rounded-xl p-8 md:p-12 shadow-xl text-center max-w-4xl mx-auto overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Sri Lanka?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Start planning your dream journey today. Our travel experts are ready to craft
                the perfect itinerary tailored to your interests and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="ceylon-button-primary" asChild>
                  <Link href="/customize">Plan Your Custom Trip</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white" asChild>
                  <Link href="/packages">Explore Travel Packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <BlogPreview />


    </>
  );
}