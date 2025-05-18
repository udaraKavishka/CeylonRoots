import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';

interface TravelPackageHeaderProps {
    duration: number;
    totalCost: number;
}

const TravelPackageHeader: React.FC<TravelPackageHeaderProps> = ({ duration, totalCost }) => {
    return (
        <div className="bg-ceylon-tea/10 py-12">
            <div className="ceylon-container">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Create Your <span className="text-ceylon-tea">Dream Journey</span>
                </h1>
                <p className="text-gray-600 mb-6 max-w-2xl">
                    Design your perfect Sri Lankan adventure by selecting and arranging accommodations,
                    destinations, activities, and transportation according to your preferences.
                </p>

                <div className="flex flex-wrap gap-6 mt-4">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
                        <Calendar className="h-5 w-5 text-ceylon-tea" />
                        <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-semibold">{duration} {duration === 1 ? 'Day' : 'Days'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
                        <DollarSign className="h-5 w-5 text-ceylon-tea" />
                        <div>
                            <p className="text-sm text-gray-500">Estimated Cost</p>
                            <p className="font-semibold">${totalCost.toFixed(2)} USD</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelPackageHeader;
