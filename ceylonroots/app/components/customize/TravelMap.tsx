import React from 'react';
import { TravelComponent } from '../../types/travel';
import { MapPin } from 'lucide-react';

interface TravelMapProps {
    selectedComponents: TravelComponent[];
}

const TravelMap: React.FC<TravelMapProps> = ({ selectedComponents }) => {
//Real Map integration has to be done

    return (
        <div className="w-full relative bg-ceylon-sand/20 rounded-md overflow-hidden h-[300px] border border-ceylon-sand/30">
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <MapPin className="h-8 w-8 text-ceylon-tea" />
                <p className="text-gray-500 text-sm">
                    {selectedComponents.length > 0
                        ? `Your journey includes ${selectedComponents.length} locations in Sri Lanka`
                        : 'Add destinations to see your travel route'}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    Map preview would display locations and routes between:
                </p>
                {selectedComponents.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2 max-w-md mt-2">
                        {selectedComponents.map((component, index) => (
                            <span key={component.id} className="inline-flex items-center px-2 py-1 rounded-full bg-white text-xs">
                                {component.location}
                                {index < selectedComponents.length - 1 && (
                                    <span className="mx-1">→</span>
                                )}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-gray-400">No locations selected yet</p>
                )}
            </div>
        </div>
    );
};

export default TravelMap;