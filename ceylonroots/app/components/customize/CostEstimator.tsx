import React from 'react';
import { TravelComponent } from '../../types/travel';
import { DollarSign } from 'lucide-react';

interface CostEstimatorProps {
    components: TravelComponent[];
    totalCost: number;
}

const CostEstimator: React.FC<CostEstimatorProps> = ({ components, totalCost }) => {
    // Group components by type for the breakdown
    const accommodationCost = components
        .filter(c => c.type === 'accommodation')
        .reduce((sum, c) => sum + c.price, 0);

    const destinationCost = components
        .filter(c => c.type === 'destination')
        .reduce((sum, c) => sum + c.price, 0);

    const activityCost = components
        .filter(c => c.type === 'activity')
        .reduce((sum, c) => sum + c.price, 0);

    const transportCost = components
        .filter(c => c.type === 'transport')
        .reduce((sum, c) => sum + c.price, 0);

    return (
        <div className="ceylon-card p-4">
            <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-ceylon-tea" />
                <h2 className="text-lg font-bold">Cost Breakdown</h2>
            </div>

            {components.length > 0 ? (
                <>
                    <div className="space-y-3 mb-4">
                        {accommodationCost > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Accommodations</span>
                                <span className="font-medium">${accommodationCost.toFixed(2)}</span>
                            </div>
                        )}

                        {destinationCost > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Destinations & Attractions</span>
                                <span className="font-medium">${destinationCost.toFixed(2)}</span>
                            </div>
                        )}

                        {activityCost > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Activities & Experiences</span>
                                <span className="font-medium">${activityCost.toFixed(2)}</span>
                            </div>
                        )}

                        {transportCost > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Transportation</span>
                                <span className="font-medium">${transportCost.toFixed(2)}</span>
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-3">
                        <div className="flex justify-between font-bold">
                            <span>Total Estimated Cost</span>
                            <span className="text-ceylon-tea">${totalCost.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            * Final pricing may vary based on seasonal rates, availability, and additional services.
                        </p>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 py-4 text-center">
                    Add components to your itinerary to see the cost breakdown.
                </p>
            )}
        </div>
    );
};

export default CostEstimator;