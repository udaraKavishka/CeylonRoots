'use client';

import { useState, useEffect } from 'react';
import {  useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DestinationMap from '../components/destinations/DestinationMap';
import DestinationCard from '../components/destinations/DestinationCard';
import { Button } from '../components/ui/button';
import { ArrowUpRight, MapPin } from 'lucide-react';
// import { destinations } from '../data/travelComponents';
import { allDestinations } from '../data/destination';
import { DestinationDetails } from '../types/travel';

const Destinations = () => {
    const [activeRegion, setActiveRegion] = useState<string | null>(null);
    const [filteredDestinations, setFilteredDestinations] = useState<DestinationDetails[]>(allDestinations);
    const router = useRouter();
    // const params = useParams();

    useEffect(() => {
        if (activeRegion && activeRegion !== 'all') {
            setFilteredDestinations(allDestinations.filter(dest => dest.region === activeRegion));
        } else {
            setFilteredDestinations(allDestinations);
        }
    }, [activeRegion]);

    const regions = ['all', ...Array.from(new Set(allDestinations.map(dest => dest.region)))];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-ceylon-tea/20 to-ceylon-spice/10 py-16">
                    <div className="ceylon-container">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Discover Sri Lanka&apos;s <span className="text-ceylon-spice">Treasures</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-8">
                            Explore the pearl of the Indian Ocean - from ancient ruins to pristine beaches, misty mountains to wildlife encounters.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {regions.map((region) => (
                                <Button
                                    key={region}
                                    variant={activeRegion === region || (region === 'all' && !activeRegion) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setActiveRegion(region)}
                                    className={activeRegion === region || (region === 'all' && !activeRegion) ? "bg-ceylon-tea hover:bg-ceylon-tea/90" : ""}
                                >
                                    {region === 'all' ? 'All Regions' : region}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Interactive Map Section */}
                <div className="py-12 bg-gray-50">
                    <div className="ceylon-container">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold flex items-center">
                                <MapPin className="mr-2 h-5 w-5 text-ceylon-spice" />
                                Interactive Map
                            </h2>
                            <Button variant="outline" size="sm" onClick={() => router.push('/packages')}>
                                View Travel Packages
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <DestinationMap destinations={allDestinations} />
                        </div>
                    </div>
                </div>

                {/* Destinations List */}
                <div className="py-16">
                    <div className="ceylon-container">
                        <h2 className="text-2xl font-bold mb-8">
                            {activeRegion && activeRegion !== 'all'
                                ? `Destinations in ${activeRegion}`
                                : 'Popular Destinations'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDestinations.map((destination) => (
                                <DestinationCard
                                    key={destination.id}
                                    destination={destination}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Destinations;