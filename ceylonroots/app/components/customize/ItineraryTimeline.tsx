import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TravelComponent } from '../../types/travel';
import { Bed, Map, Activity, Car, GripVertical, X } from 'lucide-react';

interface ItineraryTimelineProps {
    components: TravelComponent[];
    onRemoveComponent: (id: string) => void;
}

// Sortable item component
const SortableItem = ({ component, onRemove }: { component: TravelComponent, onRemove: () => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // Get icon based on component type
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'accommodation':
                return <Bed className="h-5 w-5 text-ceylon-tea" />;
            case 'destination':
                return <Map className="h-5 w-5 text-ceylon-ocean" />;
            case 'activity':
                return <Activity className="h-5 w-5 text-ceylon-spice" />;
            case 'transport':
                return <Car className="h-5 w-5 text-ceylon-gold" />;
            default:
                return null;
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center bg-white p-3 mb-2 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
            {/* Drag handle */}
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing mr-3 text-gray-400 hover:text-gray-600"
            >
                <GripVertical className="h-5 w-5" />
            </div>

            {/* Component icon */}
            <div className="mr-3">
                {getTypeIcon(component.type)}
            </div>

            {/* Component details */}
            <div className="flex-grow">
                <h3 className="font-medium text-gray-900">{component.name}</h3>
                <p className="text-sm text-gray-500">{component.location}</p>
            </div>

            {/* Price */}
            <div className="px-3 mr-3">
                <span className="font-medium">${component.price}</span>
            </div>

            {/* Remove button */}
            <button
                onClick={onRemove}
                className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                aria-label="Remove item"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    );
};

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ components, onRemoveComponent }) => {
    return (
        <div className="space-y-1">
            {components.map((component) => (
                <SortableItem
                    key={component.id}
                    component={component}
                    onRemove={() => onRemoveComponent(component.id)}
                />
            ))}
        </div>
    );
};

export default ItineraryTimeline;