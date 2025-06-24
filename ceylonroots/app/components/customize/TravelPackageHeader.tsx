import React from 'react';

interface TravelPackageHeaderProps {
    duration: number;
    totalCost: number;
}

const TravelPackageHeader: React.FC<TravelPackageHeaderProps> = ({ duration, totalCost }) => {
    return (
        <div className="relative bg-gradient-to-r from-ceylon-tea/95 to-ceylon-tea-dark/95 pt-24 pb-12 md:pt-28 md:pb-16">
            <div className="ceylon-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Craft Your Dream Vacation
                        </h1>
                        <p className="text-lg text-ceylon-sand-light max-w-2xl">
                            Select and arrange components to build your perfect travel itinerary
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[140px] border border-ceylon-sand/30">
                            <p className="text-xs uppercase tracking-wider text-ceylon-sand-light mb-1">Duration</p>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold text-black">{duration}</span>
                                <span className="text-ceylon-sand-light ml-1">{duration === 1 ? 'Day' : 'Days'}</span>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[140px] border border-ceylon-sand/30">
                            <p className="text-xs uppercase tracking-wider text-ceylon-sand-light mb-1">Estimated Cost</p>
                            <p className="text-2xl font-bold text-black">${totalCost.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-ceylon-sand/20">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-ceylon-sand-light text-sm">
                            <div className="w-3 h-3 rounded-full bg-ceylon-sand mr-2"></div>
                            <span>Drag components to reorder your itinerary</span>
                        </div>
                        <div className="flex items-center text-ceylon-sand-light text-sm">
                            <div className="w-3 h-3 rounded-full bg-ceylon-sand mr-2"></div>
                            <span>Save your itinerary anytime</span>
                        </div>
                        <div className="flex items-center text-ceylon-sand-light text-sm">
                            <div className="w-3 h-3 rounded-full bg-ceylon-sand mr-2"></div>
                            <span>Request a custom quotation</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default TravelPackageHeader;