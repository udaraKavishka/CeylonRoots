import React, { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { getComponentsByType, allTravelComponents } from '../../data/travelComponents';
import { TravelComponent } from '../../types/travel';
import { Bed, Map, Activity, Car } from 'lucide-react';

interface ComponentSelectorProps {
    onAddComponent: (component: TravelComponent) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ onAddComponent }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filterComponents = (components: TravelComponent[]) => {
        return components.filter(component =>
            component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (component.tags && component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
        );
    };

    // Render a component card
    const ComponentCard = ({ component }: { component: TravelComponent }) => (
        <div className="border rounded-md overflow-hidden transition-all hover:shadow-md group mb-4">
            <div className="relative w-full h-48">
                <Image
                    src={component.image}
                    alt={component.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold">
                    ${component.price}
                </div>
            </div>
            <div className="p-3">
                <h3 className="font-semibold text-base line-clamp-1">{component.name}</h3>
                <p className="text-gray-500 text-sm mb-2 line-clamp-1">{component.location}</p>
                <p className="text-gray-600 text-xs line-clamp-2 mb-3">{component.description}</p>
                <button
                    onClick={() => onAddComponent(component)}
                    className="w-full text-center py-1.5 bg-ceylon-tea/10 text-ceylon-tea text-sm font-medium rounded hover:bg-ceylon-tea hover:text-white transition-colors"
                >
                    Add to Itinerary
                </button>
            </div>
        </div>
    );

    // Get icon based on component type
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'accommodation':
                return <Bed className="h-4 w-4" />;
            case 'destination':
                return <Map className="h-4 w-4" />;
            case 'activity':
                return <Activity className="h-4 w-4" />;
            case 'transport':
                return <Car className="h-4 w-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="ceylon-card p-4">
            <h2 className="text-lg font-bold mb-4">Travel Components</h2>

            {/* Search box */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search components..."
                    className="pl-9 pr-4"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Component tabs */}
            <Tabs defaultValue="all">
                <TabsList className="w-full grid grid-cols-5 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="accommodation" className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" /> Stay
                    </TabsTrigger>
                    <TabsTrigger value="destination" className="flex items-center gap-1">
                        <Map className="h-3.5 w-3.5" /> Visit
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex items-center gap-1">
                        <Activity className="h-3.5 w-3.5" /> Do
                    </TabsTrigger>
                    <TabsTrigger value="transport" className="flex items-center gap-1">
                        <Car className="h-3.5 w-3.5" /> Move
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="h-[500px] overflow-y-auto pr-2">
                    {filterComponents(allTravelComponents).map(component => (
                        <ComponentCard key={component.id} component={component} />
                    ))}
                </TabsContent>

                <TabsContent value="accommodation" className="h-[500px] overflow-y-auto pr-2">
                    {filterComponents(getComponentsByType('accommodation')).map(component => (
                        <ComponentCard key={component.id} component={component} />
                    ))}
                </TabsContent>

                <TabsContent value="destination" className="h-[500px] overflow-y-auto pr-2">
                    {filterComponents(getComponentsByType('destination')).map(component => (
                        <ComponentCard key={component.id} component={component} />
                    ))}
                </TabsContent>

                <TabsContent value="activity" className="h-[500px] overflow-y-auto pr-2">
                    {filterComponents(getComponentsByType('activity')).map(component => (
                        <ComponentCard key={component.id} component={component} />
                    ))}
                </TabsContent>

                <TabsContent value="transport" className="h-[500px] overflow-y-auto pr-2">
                    {filterComponents(getComponentsByType('transport')).map(component => (
                        <ComponentCard key={component.id} component={component} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ComponentSelector;