'use client';

import { useEffect, useRef, useState } from 'react';
import { DestinationDetails } from '../../types/travel';
import { Loader, MapPin } from 'lucide-react';
import Image from 'next/image';

interface DestinationMapProps {
    destinations: DestinationDetails[];
}

const DestinationMap: React.FC<DestinationMapProps> = ({ destinations }) => {
    const [isLoading, setIsLoading] = useState(true);
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <Loader className="h-8 w-8 text-ceylon-tea animate-spin mb-2" />
                        <p className="text-sm text-gray-500">Loading map...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="absolute inset-0">
                        <div className="relative w-full h-full">
                            <Image
                                src="https://images.unsplash.com/photo-1672243773618-03dfdbde0388?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                                alt="Map of Sri Lanka"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 80vw"
                            />

                            {/* Destination markers */}
                            <div className="absolute inset-0 pointer-events-none">
                                {destinations.map((destination, index) => (
                                    <div
                                        key={destination.id}
                                        className="absolute flex flex-col items-center"
                                        style={{
                                            left: `${10 + (index * 10)}%`,
                                            top: `${20 + (index * 8)}%`,
                                        }}
                                    >
                                        <div className="p-1 bg-white rounded-full shadow-md">
                                            <div className="p-1 bg-ceylon-tea rounded-full animate-pulse">
                                                <MapPin className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <div className="mt-1 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-medium">
                                            {destination.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
                        <p className="text-xs text-gray-500">
                            Note: This is a placeholder for the interactive map.
                            In a production app, you would integrate with Mapbox or Google Maps.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default DestinationMap;