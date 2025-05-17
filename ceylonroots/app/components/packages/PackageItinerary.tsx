import React from 'react';
import { ItineraryDay } from '../../types/travel';
import { MapPin, Coffee, Bed, UtensilsCrossed } from 'lucide-react';

interface PackageItineraryProps {
    itinerary: ItineraryDay[];
}

const PackageItinerary: React.FC<PackageItineraryProps> = ({ itinerary }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Day-by-Day Itinerary</h3>

            <div className="space-y-6">
                {itinerary.map((day, index) => (
                    <div key={index} className="border-l-2 border-ceylon-tea pl-4 pb-6 relative">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-ceylon-tea text-white flex items-center justify-center text-xs">
                            {index + 1}
                        </div>

                        <div className="mb-2">
                            <h4 className="text-lg font-medium">Day {index + 1}: {day.title}</h4>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                {day.location}
                            </div>
                        </div>

                        <p className="text-gray-700 mb-4">{day.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            {day.accommodation && (
                                <div className="flex items-center bg-gray-50 p-3 rounded-md">
                                    <Bed className="h-4 w-4 mr-2 text-ceylon-spice" />
                                    <div>
                                        <p className="text-xs text-gray-500">Accommodation</p>
                                        <p className="text-sm font-medium">{day.accommodation}</p>
                                    </div>
                                </div>
                            )}

                            {day.meals && (
                                <div className="flex items-center bg-gray-50 p-3 rounded-md">
                                    <UtensilsCrossed className="h-4 w-4 mr-2 text-ceylon-spice" />
                                    <div>
                                        <p className="text-xs text-gray-500">Meals</p>
                                        <p className="text-sm font-medium">{day.meals}</p>
                                    </div>
                                </div>
                            )}

                            {day.activities && day.activities.length > 0 && (
                                <div className="flex items-center bg-gray-50 p-3 rounded-md">
                                    <Coffee className="h-4 w-4 mr-2 text-ceylon-spice" />
                                    <div>
                                        <p className="text-xs text-gray-500">Activities</p>
                                        <p className="text-sm font-medium">{day.activities.length} Planned</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {day.activities && day.activities.length > 0 && (
                            <div>
                                <p className="text-sm font-medium mb-2">Today&apos;s Activities:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {day.activities.map((activity, idx) => (
                                        <li key={idx} className="text-sm text-gray-700">{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageItinerary;