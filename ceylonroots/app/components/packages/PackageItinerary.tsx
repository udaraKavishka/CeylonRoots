import React, { useState, useEffect } from 'react';
import { ItineraryDay, TravelComponent } from '../../types/travel';
import { MapPin, Bed, UtensilsCrossed, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { Button } from '../ui/button';

interface PackageItineraryProps {
    packageId: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const PackageItinerary: React.FC<PackageItineraryProps> = ({ packageId }) => {
    const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/travel-packages/${packageId}/itinerary`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch itinerary: ${response.status}`);
                }

                const data = await response.json();
                setItinerary(data);
                setError(null);

                // Expand first day by default
                if (data.length > 0) {
                    setExpandedDays({ [data[0].dayNumber]: true });
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to load itinerary');
                }
                setItinerary([]);
            } finally {
                setLoading(false);
            }
        };

        if (packageId) {
            fetchItinerary();
        }
    }, [packageId]);

    const toggleDay = (dayNumber: number) => {
        setExpandedDays(prev => ({
            ...prev,
            [dayNumber]: !prev[dayNumber]
        }));
    };

    // Helper function to extract name from activity/component
    const getComponentName = (component: string | { name: string } | TravelComponent): string => {
        if (typeof component === 'string') return component;
        if ('name' in component) return component.name;
        return JSON.stringify(component); // Fallback
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader className="animate-spin h-8 w-8 text-ceylon-tea" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 bg-red-50 rounded-lg">
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                    onClick={() => window.location.reload()}
                    className="bg-ceylon-tea hover:bg-ceylon-tea-dark text-white"
                >
                    Retry Loading
                </Button>
            </div>
        );
    }

    if (!itinerary || itinerary.length === 0) {
        return (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No itinerary details available</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Day-by-Day Itinerary</h3>

            <div className="space-y-6">
                {itinerary.map((day) => (
                    <div key={day.id} className="border-l-2 border-ceylon-tea pl-4 pb-4 relative">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-ceylon-tea text-white flex items-center justify-center text-xs">
                            {day.dayNumber}
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-medium">Day {day.dayNumber}: {day.title}</h4>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {day.mainTown}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleDay(day.dayNumber)}
                                className="ml-2"
                            >
                                {expandedDays[day.dayNumber] ? <ChevronUp /> : <ChevronDown />}
                            </Button>
                        </div>

                        {expandedDays[day.dayNumber] && (
                            <div className="space-y-4 mt-2">
                                <p className="text-gray-700">{day.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                    {day.accommodation && day.accommodation.length > 0 && (
                                        <div className="flex items-center bg-gray-50 p-3 rounded-md">
                                            <Bed className="h-4 w-4 mr-2 text-ceylon-spice" />
                                            <div>
                                                <p className="text-xs text-gray-500">Accommodation</p>
                                                <p className="text-sm font-medium">
                                                    {day.accommodation.map(getComponentName).join(", ")}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {day.meals && day.meals.length > 0 && (
                                        <div className="flex items-center bg-gray-50 p-3 rounded-md">
                                            <UtensilsCrossed className="h-4 w-4 mr-2 text-ceylon-spice" />
                                            <div>
                                                <p className="text-xs text-gray-500">Meals</p>
                                                <p className="text-sm font-medium">
                                                    {day.meals.map(getComponentName).join(", ")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {day.activities && day.activities.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium mb-2">Activities:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {day.activities.map((activity, idx) => (
                                                <li key={idx} className="text-sm text-gray-700">
                                                    {getComponentName(activity)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageItinerary;