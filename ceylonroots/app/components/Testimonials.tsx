'use client';

import { Card, CardContent } from "../components/ui/card";
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    image: string;
    rating: number;
    testimonial: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Emma Thompson",
        location: "United Kingdom",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        testimonial: "Our trip to Sri Lanka with CeylonRoots was nothing short of magical. From the ancient ruins to the stunning beaches, every detail was perfectly arranged."
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "Singapore",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        testimonial: "The customized itinerary CeylonRoots created for us perfectly balanced culture, wildlife, and relaxation. Our guide was knowledgeable and friendly throughout."
    },
    {
        id: 3,
        name: "Sarah Johnson",
        location: "Australia",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4,
        testimonial: "We appreciated how flexible CeylonRoots was with our schedule changes. The tea country was breathtaking and our accommodation selections were excellent."
    }
];

const Testimonials = () => {
    return (
        <section
            className="py-16 hero-pattern"
            aria-label="Customer testimonials"
        >
            <div className="ceylon-container">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What Our Travelers Say
                    </h2>
                    <p className="text-gray-600">
                        Authentic experiences from travelers who explored Sri Lanka with us
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="ceylon-card">
                            <CardContent className="pt-6">
                                {/* Rating */}
                                <div className="flex mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < testimonial.rating ? "text-ceylon-gold fill-ceylon-gold" : "text-gray-300"}`}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-gray-600 mb-6 italic" aria-label="Testimonial quote">
                                    &ldquo;{testimonial.testimonial}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center">
                                    <Image
                                        src={testimonial.image}
                                        alt={`Portrait of ${testimonial.name}`}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                        <h4 className="font-medium" aria-label="Customer name">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500" aria-label="Customer location">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/testimonials"
                        className="text-ceylon-tea hover:text-ceylon-tea/80 font-medium inline-flex items-center"
                        aria-label="Read more testimonials"
                    >
                        Read More Testimonials
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;