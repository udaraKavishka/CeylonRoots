'use client';

import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from "../components/ui/card";
import { Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Emma Thompson",
        location: "United Kingdom",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        testimonial: "Our trip to Sri Lanka with CeylonRoots was nothing short of magical. From the ancient ruins to the stunning beaches, every detail was perfectly arranged. Our guide Raj was knowledgeable, friendly, and went above and beyond to make our experience special. The accommodations were excellent, and the food was amazing. We particularly loved our cooking class in a local village.",
        tourType: "Cultural Tour",
        date: "March 2025"
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "Singapore",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        testimonial: "The customized itinerary CeylonRoots created for us perfectly balanced culture, wildlife, and relaxation. Our guide was knowledgeable and friendly throughout. The safari at Yala National Park was a highlight – we saw elephants, leopards, and countless birds. The beachfront villa in Mirissa was stunning, and the team arranged a private dinner on the beach for our anniversary.",
        tourType: "Wildlife & Beach",
        date: "January 2025"
    },
    {
        id: 3,
        name: "Sarah Johnson",
        location: "Australia",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4,
        testimonial: "We appreciated how flexible CeylonRoots was with our schedule changes. The tea country was breathtaking and our accommodation selections were excellent. Our only suggestion would be to allow more time for the train journey from Kandy to Ella as it was a highlight of our trip. The views were spectacular, and we wished we had more time to enjoy it.",
        tourType: "Tea Country Explorer",
        date: "February 2025"
    },
    {
        id: 4,
        name: "David Rodriguez",
        location: "Spain",
        image: "https://randomuser.me/api/portraits/men/74.jpg",
        rating: 5,
        testimonial: "This was our third trip with CeylonRoots and they continue to impress. The surfing lessons arranged for us in Arugam Bay were perfect for our skill level, and the beachfront cabana was exactly as pictured. We particularly enjoyed the authentic local restaurants our guide recommended - the seafood curry in Trincomalee was unforgettable!",
        tourType: "Beach Adventure",
        date: "April 2025"
    },
    {
        id: 5,
        name: "Amit Patel",
        location: "India",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 5,
        testimonial: "As someone with Sri Lankan heritage, I was looking for an authentic experience to connect with my roots. CeylonRoots exceeded my expectations. Our guide arranged meetings with local artisans and visits to villages off the tourist path. The Ayurvedic retreat they booked for us was transformative, and the cooking class with a local family was a highlight.",
        tourType: "Heritage Tour",
        date: "December 2024"
    },
    {
        id: 6,
        name: "Julia Schmidt",
        location: "Germany",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 4,
        testimonial: "Our family of five had a wonderful two weeks exploring Sri Lanka with CeylonRoots. The itinerary was well-paced for our children (ages 8, 10, and 14), with plenty of activities to keep them engaged. The wildlife spotting was a hit - we saw elephants, monkeys, and even a leopard! The only improvement would be more family-friendly food options in some locations.",
        tourType: "Family Adventure",
        date: "November 2024"
    }
];

const Testimonials = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-ceylon-ocean text-white py-16">
                    <div className="ceylon-container">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Traveler Stories</h1>
                        <p className="text-lg max-w-3xl">
                            Authentic experiences shared by guests who have explored Sri Lanka with CeylonRoots.
                            Discover why our personalized approach to travel creates unforgettable memories.
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
                                        <p className="text-gray-600 mb-6 italic">{testimonial.testimonial}</p>

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
                                                <p className="text-sm text-gray-500">{testimonial.location}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Testimonials;