'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DestinationCard from "../components/destinations/DestinationCard";
import { Button } from "../components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { DestinationDetails } from "../types/travel";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const regions = ["All Regions", "Cultural Triangle", "Hill Country", "Southern Coast", "Northern Province", "Eastern Coast"];

const Destinations = () => {
    const [activeRegion, setActiveRegion] = useState<string>("All Regions");
    const [destinations, setDestinations] = useState<DestinationDetails[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<DestinationDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/destinationdetail`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch destinations: ${response.status}`);
                }

                const data = await response.json();
                setDestinations(data);
                setError(null);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to load destinations');
                }
                setDestinations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);


    useEffect(() => {
        if (activeRegion === "All Regions") {
            setFilteredDestinations(destinations);
        } else {
            setFilteredDestinations(
                destinations.filter(dest => dest.region === activeRegion)
            );
        }
    }, [activeRegion, destinations]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ceylon-teal mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading destinations...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
                        <h3 className="text-xl font-semibold text-red-700 mb-2">Loading Error</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-ceylon-teal hover:bg-ceylon-teal-dark text-white"
                        >
                            Retry Loading
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-ceylon-teal/20 to-ceylon-teal/10 py-16 mt-10">
                    <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Discover Sri Lanka&apos;s{" "}
                            <span className="text-ceylon-teal">Treasures</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-8">
                            Explore the pearl of the Indian Ocean - from ancient ruins to
                            pristine beaches, misty mountains to wildlife encounters.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-6">
                            {regions.map((region) => (
                                <Button
                                    key={region}
                                    variant={
                                        activeRegion === region
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setActiveRegion(region)}
                                    className={
                                        activeRegion === region
                                            ? "bg-ceylon-teal hover:bg-ceylon-teal/90"
                                            : "border-ceylon-teal text-ceylon-teal hover:bg-ceylon-teal hover:text-white"
                                    }
                                >
                                    {region}
                                </Button>
                            ))}
                        </div>

                        <Button
                            onClick={() => router.push("/packages")}
                            className="bg-ceylon-teal hover:bg-ceylon-teal-dark text-white"
                        >
                            View Travel Packages
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Region Highlights Section */}
                {activeRegion !== "All Regions" && (
                    <div className="py-12 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-4 text-ceylon-teal">
                                    {activeRegion} Highlights
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {filteredDestinations.slice(0, 3).map((destination) => (
                                        <div key={destination.id} className="flex items-start space-x-4">
                                            <Image
                                                src={destination.image}
                                                alt={destination.name}
                                                width={80}
                                                height={80}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />

                                            <div>
                                                <h3 className="font-semibold">{destination.name}</h3>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {destination.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Destinations List */}
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-2xl font-bold mb-8">
                            {activeRegion === "All Regions"
                                ? "All Destinations"
                                : `Destinations in ${activeRegion}`}
                        </h2>

                        {filteredDestinations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredDestinations.map((destination) => (
                                    <DestinationCard
                                        key={destination.id}
                                        destination={destination}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No destinations found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Try selecting a different region
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Destinations;