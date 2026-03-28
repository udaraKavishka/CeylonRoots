"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
// import Footer from '../components/Footer';
import { Card, CardContent } from "../components/ui/card";
import { Star } from "lucide-react";
import { testimonials } from "../data/testimonials";

const Testimonials = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-ceylon-ocean text-white py-16">
          <div className="ceylon-container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Traveler Stories
            </h1>
            <p className="text-lg max-w-3xl">
              Authentic experiences shared by guests who have explored Sri Lanka
              with CeylonRoots. Discover why our personalized approach to travel
              creates unforgettable memories.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 hero-pattern">
          <div className="ceylon-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="ceylon-card">
                  <CardContent className="pt-6">
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-ceylon-gold fill-ceylon-gold" : "text-gray-300"}`}
                        />
                      ))}
                    </div>

                    {/* Tour Type & Date */}
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{testimonial.tourType}</span>
                      <span>{testimonial.date}</span>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-600 mb-6 italic">
                      {testimonial.testimonial}
                    </p>

                    {/* Author */}
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        quality={75}
                        loading="lazy"
                        sizes="(max-width: 768px) 50px, 48px"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Testimonials;
