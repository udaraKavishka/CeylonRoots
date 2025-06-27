import React from 'react';
import { TravelComponent, ComponentType } from '../../types/travel';

const getTypeLabel = (type: ComponentType) => {
    switch (type) {
        case 'accommodations': return 'Accommodation';
        case 'destination': return 'Destination';
        case 'activities': return 'Activity';
        case 'transport': return 'Transport';
        default: return type;
    }
};

interface CostEstimatorProps {
    components: TravelComponent[];
    totalCost: number;
}

const CostEstimator: React.FC<CostEstimatorProps> = ({ components, totalCost }) => {
    const typeGroups = components.reduce((groups, item) => {
        const group = groups[item.type] || [];
        group.push(item);
        groups[item.type] = group;
        return groups;
    }, {} as Record<ComponentType, TravelComponent[]>);

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-ceylon-sand/30">
            <h2 className="text-xl font-bold text-ceylon-stone mb-4 flex items-center">
                <span className="bg-ceylon-tea text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                Cost Breakdown
            </h2>

            <div className="space-y-4">
                {Object.entries(typeGroups).map(([type, items]) => (
                    <div key={type} className="border-b border-ceylon-sand/20 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-semibold text-ceylon-stone mb-2">
                            {getTypeLabel(type as ComponentType)} ({items.length})
                        </h3>
                        <div className="space-y-2">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.name}</span>
                                    <span className="font-medium">Rs{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-ceylon-sand/30 flex justify-between items-center">
                <span className="text-lg font-bold text-ceylon-stone">Total</span>
                <span className="text-2xl font-bold text-ceylon-tea">Rs{totalCost}</span>
            </div>
        </div>
    );
};

export default CostEstimator;