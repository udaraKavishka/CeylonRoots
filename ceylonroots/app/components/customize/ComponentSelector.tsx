import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { TravelComponent, ComponentType, AccommodationComponent, TransportComponent, DestinationComponent, ActivityComponent } from '../../types/travel';
import { Bed, Map, Activity, Car, Star } from 'lucide-react';

interface ComponentSelectorProps {
    onAddComponent: (component: TravelComponent) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ onAddComponent }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [components, setComponents] = useState<TravelComponent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const endpoints: Record<ComponentType, string> = {
                    accommodations: `${API_BASE_URL}/accommodations`,
                    destination: `${API_BASE_URL}/destination`,
                    activities: `${API_BASE_URL}/activities`,
                    transport: `${API_BASE_URL}/transport`
                };

                const responses = await Promise.allSettled(
                    Object.values(endpoints).map(url => fetch(url).then(res => res.json()))
                );

                const allComponents: TravelComponent[] = [];
                responses.forEach((response, index) => {
                    if (response.status === 'fulfilled') {
                        const type = Object.keys(endpoints)[index] as ComponentType;
                        const typedComponents = response.value.map((item: TravelComponent) => ({
                            ...item,
                            type
                        }));
                        allComponents.push(...typedComponents);
                    }
                });

                setComponents(allComponents);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchComponents();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filterComponents = (components: TravelComponent[]) => {
        const term = searchTerm.toLowerCase();
        return components.filter(component => {
            return (
                component.name?.toLowerCase()?.includes(term) ||
                component.location?.toLowerCase()?.includes(term) ||
                component.description?.toLowerCase()?.includes(term) ||
                component.tags?.some(tag => tag?.toLowerCase()?.includes(term))
            );
        });
    };

    const getTypeIcon = (type: ComponentType) => {
        switch (type) {
            case 'accommodations':
                return <Bed className="h-4 w-4" />;
            case 'destination':
                return <Map className="h-4 w-4" />;
            case 'activities':
                return <Activity className="h-4 w-4" />;
            case 'transport':
                return <Car className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const getTypeLabel = (type: ComponentType) => {
        switch (type) {
            case 'accommodations': return 'Accommodation';
            case 'destination': return 'Destination';
            case 'activities': return 'Activity';
            case 'transport': return 'Transport';
            default: return type;
        }
    };

    const ComponentCard = ({ component }: { component: TravelComponent }) => (
        <div className="border border-ceylon-sand/30 rounded-lg overflow-hidden transition-all hover:shadow-md group mb-4">
            <div className="relative w-full h-48">
                <Image
                    src={component.image || '/placeholder.jpg'}
                    alt={component.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute top-3 right-3 bg-ceylon-tea text-white rounded-full px-3 py-1 text-xs font-bold">
                    ${component.price}
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-base text-ceylon-stone line-clamp-1">{component.name}</h3>
                    <span className="bg-ceylon-sand/20 text-ceylon-stone text-xs px-2 py-1 rounded-full flex items-center">
                        {getTypeIcon(component.type)}
                        <span className="ml-1">{getTypeLabel(component.type)}</span>
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                    <Map className="h-4 w-4 mr-1.5 text-ceylon-tea" />
                    <span className="line-clamp-1">{component.location}</span>
                </p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{component.description}</p>

                {component.type === 'accommodations' && (
                    <div className="flex items-center mb-3">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < (component as AccommodationComponent).rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{(component as AccommodationComponent).rating.toFixed(1)}</span>
                    </div>
                )}

                {component.type === 'activities' && (
                    <div className="mb-3">
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-ceylon-sand/20 text-ceylon-stone">
                            Difficulty: {(component as ActivityComponent).difficulty}
                        </span>
                    </div>
                )}

                {component.type === 'transport' && (
                    <div className="mb-3">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Car className="h-4 w-4 mr-1.5 text-ceylon-tea" />
                            <span>Mode: {(component as TransportComponent).mode}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            <span>From: {(component as TransportComponent).departureLocation}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            <span>To: {(component as TransportComponent).arrivalLocation}</span>
                        </div>
                    </div>
                )}

                {component.type === 'destination' && (
                    <div className="mb-3">
                        <p className="text-xs font-medium mb-1">Attractions:</p>
                        <div className="flex flex-wrap gap-1">
                            {(component as DestinationComponent).attractions.slice(0, 3).map((attraction, index) => (
                                <span key={index} className="bg-ceylon-sand/20 text-ceylon-stone text-xs px-2 py-0.5 rounded-full">
                                    {attraction}
                                </span>
                            ))}
                            {(component as DestinationComponent).attractions.length > 3 && (
                                <span className="bg-ceylon-sand/20 text-ceylon-stone text-xs px-2 py-0.5 rounded-full">
                                    +{(component as DestinationComponent).attractions.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <button
                    onClick={() => onAddComponent(component)}
                    className="w-full text-center py-2.5 bg-ceylon-tea/10 text-ceylon-tea text-sm font-bold rounded-lg hover:bg-ceylon-tea hover:text-white transition-colors flex items-center justify-center"
                >
                    Add to Itinerary
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-ceylon-sand/30">
            <h2 className="text-xl font-bold text-ceylon-stone mb-5">Travel Components</h2>

            <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search components..."
                    className="pl-9 pr-4 py-5 rounded-lg border-ceylon-sand/50"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <Tabs defaultValue="all">
                <TabsList className="w-full grid grid-cols-5 mb-5 bg-ceylon-sand/10 p-1 rounded-lg">
                    <TabsTrigger value="all" className="py-2 rounded-md">All</TabsTrigger>
                    <TabsTrigger value="accommodations" className="flex items-center gap-1 py-2 rounded-md">
                        <Bed className="h-4 w-4" /> Stay
                    </TabsTrigger>
                    <TabsTrigger value="destination" className="flex items-center gap-1 py-2 rounded-md">
                        <Map className="h-4 w-4" /> Visit
                    </TabsTrigger>
                    <TabsTrigger value="activities" className="flex items-center gap-1 py-2 rounded-md">
                        <Activity className="h-4 w-4" /> Do
                    </TabsTrigger>
                    <TabsTrigger value="transport" className="flex items-center gap-1 py-2 rounded-md">
                        <Car className="h-4 w-4" /> Move
                    </TabsTrigger>
                </TabsList>

                {isLoading ? (
                    <div className="h-[500px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ceylon-tea"></div>
                    </div>
                ) : error ? (
                    <div className="h-[500px] flex flex-col items-center justify-center bg-ceylon-sand/5 rounded-xl p-6 text-center">
                        <div className="bg-red-100 rounded-full p-3 mb-4">
                            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                                !
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-ceylon-stone mb-2">Error Loading Components</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-ceylon-tea text-white rounded-lg hover:bg-ceylon-tea/90"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        <TabsContent value="all" className="h-[500px] overflow-y-auto pr-2">
                            {filterComponents(components).map(component => (
                                <ComponentCard key={component.id} component={component} />
                            ))}
                            {filterComponents(components).length === 0 && (
                                <div className="text-center py-10 text-gray-500 bg-ceylon-sand/5 rounded-lg">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                                    <p>No components found matching your search</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="accommodations" className="h-[500px] overflow-y-auto pr-2">
                            {filterComponents(components.filter(c => c.type === 'accommodations')).map(component => (
                                <ComponentCard key={component.id} component={component} />
                            ))}
                            {filterComponents(components.filter(c => c.type === 'accommodations')).length === 0 && (
                                <div className="text-center py-10 text-gray-500 bg-ceylon-sand/5 rounded-lg">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                                    <p>No accommodations found</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="destination" className="h-[500px] overflow-y-auto pr-2">
                            {filterComponents(components.filter(c => c.type === 'destination')).map(component => (
                                <ComponentCard key={component.id} component={component} />
                            ))}
                            {filterComponents(components.filter(c => c.type === 'destination')).length === 0 && (
                                <div className="text-center py-10 text-gray-500 bg-ceylon-sand/5 rounded-lg">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                                    <p>No destinations found</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="activities" className="h-[500px] overflow-y-auto pr-2">
                            {filterComponents(components.filter(c => c.type === 'activities')).map(component => (
                                <ComponentCard key={component.id} component={component} />
                            ))}
                            {filterComponents(components.filter(c => c.type === 'activities')).length === 0 && (
                                <div className="text-center py-10 text-gray-500 bg-ceylon-sand/5 rounded-lg">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                                    <p>No activities found</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="transport" className="h-[500px] overflow-y-auto pr-2">
                            {filterComponents(components.filter(c => c.type === 'transport')).map(component => (
                                <ComponentCard key={component.id} component={component} />
                            ))}
                            {filterComponents(components.filter(c => c.type === 'transport')).length === 0 && (
                                <div className="text-center py-10 text-gray-500 bg-ceylon-sand/5 rounded-lg">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                                    <p>No transport options found</p>
                                </div>
                            )}
                        </TabsContent>
                    </>
                )}
            </Tabs>
        </div>
    );
};

export default ComponentSelector;