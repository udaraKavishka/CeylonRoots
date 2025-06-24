import React from 'react';
import { TravelComponent } from '../../types/travel';

interface TravelMapProps {
    selectedComponents: TravelComponent[];
}

const TravelMap: React.FC<TravelMapProps> = ({ selectedComponents }) => {
    return (
        <div className="h-96 bg-ceylon-sand/20 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                <p>Map Preview</p>
                <p className="text-sm text-gray-500 mt-2">
                    {selectedComponents.length} locations will be displayed on the map.
                </p>
            </div>
        </div>
    );
};

export default TravelMap;