'use client';

import { useState, useEffect } from "react";
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
import { TravelPackage } from "../types/travel";

interface FeaturedPackagesProps {
    packages: TravelPackage[];
}

const FeaturedPackages = ({ packages }: FeaturedPackagesProps) => {
    const [startIndex, setStartIndex] = useState(0);
    const [displayCount, setDisplayCount] = useState(3);

    // Responsive display count
    useEffect(() => {
        const updateDisplayCount = () => {
            if (window.innerWidth < 768) {
                setDisplayCount(1);
            } else if (window.innerWidth < 1024) {
                setDisplayCount(2);
            } else {
                setDisplayCount(3);
            }
        };

        updateDisplayCount();
        window.addEventListener('resize', updateDisplayCount);
        return () => window.removeEventListener('resize', updateDisplayCount);
    }, []);

    // Reset startIndex when packages change
    useEffect(() => {
        setStartIndex(0);
    }, [packages]);

    const nextSlide = () => {
        if (packages.length <= displayCount) return;

        if (startIndex + displayCount < packages.length) {
            setStartIndex(startIndex + 1);
        } else {
            setStartIndex(0);
        }
    };

    const prevSlide = () => {
        if (packages.length <= displayCount) return;

        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        } else {
            setStartIndex(packages.length - displayCount);
        }
    };

    // Safeguard against undefined packages
    if (!packages || packages.length === 0) {
        return (
            <section className="py-16 bg-gray-50" aria-label="Featured Travel Packages">
                <div className="ceylon-container">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Featured Travel Packages
                        </h2>
                        <p className="text-gray-600">
                            Carefully crafted itineraries to showcase the very best of Sri Lanka
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-gray-500">No featured packages available at the moment</p>
                    </div>
                </div>
            </section>
        );
    }

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
                    {/* Carousel Navigation - only show if there are more packages than display count */}
                    {packages.length > displayCount && (
                        <>
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
                        </>
                    )}

                    {/* Package Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
                        {packages
                            .slice(startIndex, startIndex + displayCount)
                            .map((pkg) => {
                                const regions = pkg.regions || [];

                                return (
                                    <Card key={pkg.id} className="ceylon-card group">
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                            <Image
                                                src={pkg.imageUrl}
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
                                                    <span>{pkg.duration} days</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <DollarSign
                                                        className="h-4 w-4 mr-1"
                                                        aria-hidden="true"
                                                    />
                                                    <span>${pkg.price}</span>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex items-start">
                                                <MapPin
                                                    className="h-4 w-4 text-ceylon-spice mt-1 flex-shrink-0"
                                                    aria-hidden="true"
                                                />
                                                <p className="text-sm text-gray-500 ml-1 line-clamp-1">
                                                    {regions.slice(0, 3).join(", ")}
                                                    {regions.length > 3 && "..."}
                                                </p>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                asChild
                                                className="w-full bg-ceylon-tea hover:bg-ceylon-tea/90 text-white"
                                                aria-label={`View details for ${pkg.title}`}
                                            >
                                                <Link href={"/packages/"}>View Details</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
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