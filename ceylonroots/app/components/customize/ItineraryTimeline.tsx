import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TravelComponent, ComponentType } from '../../types/travel';
import { GripVertical, X } from 'lucide-react';

interface ItineraryItemProps {
    component: TravelComponent;
    onRemove: (id: string) => void;
}

const getTypeLabel = (type: ComponentType) => {
    switch (type) {
        case 'accommodations': return 'Accommodation';
        case 'destination': return 'Destination';
        case 'activities': return 'Activity';
        case 'transport': return 'Transport';
        default: return type;
    }
};

const ItineraryItem: React.FC<ItineraryItemProps> = ({ component, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 p-3 bg-ceylon-sand/5 rounded-lg mb-3 border border-ceylon-sand/20"
        >
            <button {...attributes} {...listeners} className="cursor-move p-1 text-ceylon-stone/50 hover:text-ceylon-stone">
                <GripVertical className="h-5 w-5" />
            </button>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-ceylon-stone">{component.name}</h3>
                    <span className="bg-ceylon-sand/20 text-ceylon-stone text-xs px-2 py-1 rounded-full">
                        {getTypeLabel(component.type)}
                    </span>
                </div>
                <p className="text-sm text-gray-600 flex items-center">
                    <span className="truncate">{component.location}</span>
                </p>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-bold text-ceylon-tea">${component.price}</span>
                <button
                    onClick={() => onRemove(component.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

interface ItineraryTimelineProps {
    components: TravelComponent[];
    onRemoveComponent: (id: string) => void;
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ components, onRemoveComponent }) => {
    return (
        <div className="space-y-3">
            {components.map((component) => (
                <ItineraryItem
                    key={component.id}
                    component={component}
                    onRemove={onRemoveComponent}
                />
            ))}
        </div>
    );
};

export default ItineraryTimeline;