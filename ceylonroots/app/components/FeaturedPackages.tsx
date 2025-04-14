"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Calendar,
    DollarSign,
} from "lucide-react";

const featuredPackages = [
    {
        id: 1,
        title: "Cultural Triangle Explorer",
        description:
            "Discover the ancient cities of Anuradhapura, Polonnaruwa, and the rock fortress of Sigiriya",
        image:
            "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        duration: "7 Days",
        price: "$899",
        rating: 4.8,
        locations: ["Colombo", "Anuradhapura", "Sigiriya", "Polonnaruwa", "Kandy"],
    },
    {
        id: 2,
        title: "Coastal Paradise",
        description:
            "Relax on pristine beaches and explore vibrant coastal towns along Sri Lanka's southern coast",
        image:
            "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        duration: "9 Days",
        price: "$1099",
        rating: 4.9,
        locations: ["Colombo", "Bentota", "Galle", "Mirissa", "Tangalle"],
    },
    {
        id: 3,
        title: "Tea Country & Wildlife",
        description:
            "Journey through misty tea plantations and encounter wildlife in Sri Lanka's national parks",
        image:
            "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        duration: "8 Days",
        price: "$999",
        rating: 4.7,
        locations: ["Colombo", "Nuwara Eliya", "Ella", "Yala", "Galle"],
    },
    {
        id: 4,
        title: "Complete Sri Lanka",
        description:
            "Experience the best of Sri Lanka with this comprehensive tour of the island's highlights",
        image:
            "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        duration: "14 Days",
        price: "$1799",
        rating: 4.9,
        locations: [
            "Colombo",
            "Anuradhapura",
            "Kandy",
            "Nuwara Eliya",
            "Ella",
            "Yala",
            "Galle",
        ],
    },
];

const FeaturedPackages = () => {
    const [startIndex, setStartIndex] = useState(0);
    const displayCount = 3;

    const nextSlide = () => {
        if (startIndex + displayCount < featuredPackages.length) {
            setStartIndex(startIndex + 1);
        } else {
            setStartIndex(0);
        }
    };

    const prevSlide = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        } else {
            setStartIndex(featuredPackages.length - displayCount); 
        }
    };

    return (
        <section className="py-16 bg-gray-50" aria-label="Featured Travel Packages">
            <div className="ceylon-container">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured Travel Packages
                    </h2>
                    <p className="text-gray-600">
                        Carefully crafted itineraries to showcase the very best of Sri
                        Lanka, from ancient wonders to pristine beaches
                    </p>
                </div>

                <div className="relative">
                    {/* Carousel Navigation */}
                    <div className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-10">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-white shadow-md text-ceylon-tea hover:bg-ceylon-tea hover:text-white transition-colors"
                            aria-label="Previous packages"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -right-5 transform -translate-y-1/2 z-10">
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-white shadow-md text-ceylon-tea hover:bg-ceylon-tea hover:text-white transition-colors"
                            aria-label="Next packages"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Package Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
                        {featuredPackages
                            .slice(startIndex, startIndex + displayCount)
                            .map((pkg) => (
                                <Card key={pkg.id} className="ceylon-card group">
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <Image
                                            src={pkg.image}
                                            alt={`${pkg.title} tour package`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-xl" aria-label={pkg.title}>
                                                {pkg.title}
                                            </CardTitle>
                                            <div
                                                className="px-2 py-1 bg-ceylon-gold/20 text-ceylon-gold rounded text-sm font-medium"
                                                aria-label={`Rating: ${pkg.rating} stars`}
                                            >
                                                {pkg.rating} ★
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-4">
                                        <p
                                            className="text-gray-600 mb-4 line-clamp-2"
                                            aria-label="Package description"
                                        >
                                            {pkg.description}
                                        </p>
                                        <div className="flex flex-wrap gap-y-2">
                                            <div className="flex items-center text-sm text-gray-500 mr-4">
                                                <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                                                <span>{pkg.duration}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <DollarSign
                                                    className="h-4 w-4 mr-1"
                                                    aria-hidden="true"
                                                />
                                                <span>From {pkg.price}</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-start">
                                            <MapPin
                                                className="h-4 w-4 text-ceylon-spice mt-1 flex-shrink-0"
                                                aria-hidden="true"
                                            />
                                            <p className="text-sm text-gray-500 ml-1 line-clamp-1">
                                                {pkg.locations.slice(0, 3).join(", ")}
                                                {pkg.locations.length > 3 && "..."}
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            asChild
                                            className="w-full bg-ceylon-tea hover:bg-ceylon-tea/90 text-white"
                                            aria-label={`View details for ${pkg.title}`}
                                        >
                                            <Link href={`/packages/${pkg.id}`}>View Details</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Button
                        asChild
                        variant="outline"
                        className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white"
                        aria-label="View all travel packages"
                    >
                        <Link href="/packages">View All Packages</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPackages;
