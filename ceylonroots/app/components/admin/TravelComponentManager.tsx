'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Plus, Edit, Trash2, MapPin, DollarSign, Clock, Bed, Activity, Car, Star } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import {
    TravelComponent,
    ComponentType,
    AccommodationComponent,
    ActivityComponent,
    DestinationComponent,
    TransportComponent,
    TransportMode,
    ActivityDifficulty
} from '../../types/travel';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const TravelComponentManager = () => {
    const [components, setComponents] = useState<TravelComponent[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingComponent, setEditingComponent] = useState<TravelComponent | null>(null);
    const [activeTab, setActiveTab] = useState<ComponentType>('accommodations');
    const [isLoading, setIsLoading] = useState<Record<ComponentType, boolean>>({
        accommodations: false,
        destination: false,
        activities: false,
        transport: false
    });
    const { toast } = useToast();

    type TravelComponentFormData = {
        type: ComponentType;
        name: string;
        description: string;
        location: string;
        image: string;
        price: number;
        coordinates: { lat: number; lng: number };
        duration: number;
        tags: string[];
        // Accommodation specific
        amenities: string[];
        rating: number;
        // Activity specific
        difficulty: ActivityDifficulty;
        // Destination specific
        attractions: string[];
        // Transport specific
        mode: TransportMode;
        departureLocation: string;
        arrivalLocation: string;
        departureCoordinates: { lat: number; lng: number };
        arrivalCoordinates: { lat: number; lng: number };
    };

    const [formData, setFormData] = useState<TravelComponentFormData>({
        type: 'accommodations',
        name: '',
        description: '',
        location: '',
        image: '',
        price: 0,
        coordinates: { lat: 0, lng: 0 },
        duration: 0,
        tags: [],
        amenities: [],
        rating: 0,
        difficulty: 'EASY',
        attractions: [],
        mode: 'CAR',
        departureLocation: '',
        arrivalLocation: '',
        departureCoordinates: { lat: 0, lng: 0 },
        arrivalCoordinates: { lat: 0, lng: 0 }
    });

    // Fetch components by type
    const fetchComponentsByType = useCallback(async (type: ComponentType) => {
        setIsLoading(prev => ({ ...prev, [type]: true }));
        try {
            const response = await fetch(`${API_BASE_URL}/${type}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            const items = Array.isArray(data) ? data : data.data || data[type] || [];
            // Normalize type for filtering
            const normalizedItems = items.map((item: TravelComponent) => ({
                ...item,
                type // force type to match tab
            }));
            setComponents(prev => [
                ...prev.filter(c => c.type !== type),
                ...normalizedItems
            ]);
        } catch (error: unknown) {
            let message = "Unknown error";
            if (error instanceof Error) {
                message = error.message;
            }
            toast({
                title: "Error",
                description: `Failed to fetch ${type}s: ${message}`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(prev => ({ ...prev, [type]: false }));
        }
    }, [toast]);

    // Fetch components when tab changes
    useEffect(() => {
        fetchComponentsByType(activeTab);
    }, [activeTab, fetchComponentsByType]);

    const resetForm = () => {
        setFormData({
            type: activeTab,
            name: '',
            description: '',
            location: '',
            image: '',
            price: 0,
            coordinates: { lat: 0, lng: 0 },
            duration: 0,
            tags: [],
            amenities: [],
            rating: 0,
            difficulty: 'EASY',
            attractions: [],
            mode: 'CAR',
            departureLocation: '',
            arrivalLocation: '',
            departureCoordinates: { lat: 0, lng: 0 },
            arrivalCoordinates: { lat: 0, lng: 0 }
        });
        setEditingComponent(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDialogOpen(false);

        try {
            let url = `${API_BASE_URL}/${formData.type}`;
            let method = 'POST';
            let successMessage = 'Component created successfully';

            if (editingComponent) {
                url += `/${editingComponent.id}`;
                method = 'PUT';
                successMessage = 'Component updated successfully';
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            toast({
                title: "Success",
                description: successMessage,
            });

            fetchComponentsByType(formData.type);
        } catch (error) {
            toast({
                title: "Error",
                description: `Operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
                variant: "destructive",
            });
        }
    };

    const handleEdit = (component: TravelComponent) => {
        setEditingComponent(component);
        setFormData({
            ...component,
            coordinates: component.coordinates || { lat: 0, lng: 0 },
            amenities: (component as AccommodationComponent).amenities || [],
            rating: (component as AccommodationComponent).rating || 0,
            difficulty: (component as ActivityComponent).difficulty || 'EASY',
            attractions: (component as DestinationComponent).attractions || [],
            mode: (component as TransportComponent).mode || 'CAR',
            departureLocation: (component as TransportComponent).departureLocation || '',
            arrivalLocation: (component as TransportComponent).arrivalLocation || '',
            departureCoordinates: (component as TransportComponent).departureCoordinates || { lat: 0, lng: 0 },
            arrivalCoordinates: (component as TransportComponent).arrivalCoordinates || { lat: 0, lng: 0 }
        });
        setActiveTab(component.type);
        setIsDialogOpen(true);
    };
    const handleDelete = async (id: string, type: ComponentType) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${type}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Delete failed');

            toast({
                title: "Deleted",
                description: "Component deleted successfully",
            });

            fetchComponentsByType(type);
        } catch (error) {
            toast({
                title: "Error",
                description: `Delete failed: ${error instanceof Error ? error.message : "Unknown error"}`,
                variant: "destructive",
            });
        }
    };

    const getComponentsByType = (type: ComponentType) => {
        return components.filter(component => component.type === type);
    };

    const getIconForType = (type: ComponentType) => {
        switch (type) {
            case 'accommodations': return Bed;
            case 'destination': return MapPin;
            case 'activities': return Activity;
            case 'transport': return Car;
            default: return MapPin;
        }
    };

    const ComponentCard = ({ component }: { component: TravelComponent }) => {
        const Icon = getIconForType(component.type);

        return (
            <Card className="relative overflow-hidden">
                {component.type === 'accommodations' && (
                    <div className="absolute top-4 right-4 bg-ceylon-teal/90 text-white px-2 py-1 rounded-md flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">
                            {(component as AccommodationComponent).rating.toFixed(1)}
                        </span>
                    </div>
                )}

                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-ceylon-teal/10 rounded-lg">
                                <Icon className="h-5 w-5 text-ceylon-teal" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">{component.name}</CardTitle>
                                <CardDescription>{component.location}</CardDescription>
                                <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1 text-ceylon-spice" />
                                        <span className="text-sm font-medium">${component.price}</span>
                                    </div>
                                    {component.duration > 0 && (
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1 text-ceylon-spice" />
                                            <span className="text-sm">{component.duration}h</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(component)}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(component.id, component.type)}
                                className="text-red-600 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{component.description}</p>

                    {/* Amenities for Accommodation */}
                    {component.type === 'accommodations' && (
                        <div className="mb-3">
                            <h4 className="text-sm font-medium mb-1">Amenities:</h4>
                            <div className="flex flex-wrap gap-1">
                                {(component as AccommodationComponent).amenities.map((amenity, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {amenity}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Attractions for Destination */}
                    {component.type === 'destination' && (
                        <div className="mb-3">
                            <h4 className="text-sm font-medium mb-1">Attractions:</h4>
                            <ul className="list-disc pl-5 text-sm">
                                {(component as DestinationComponent).attractions.map((attraction, index) => (
                                    <li key={index}>{attraction}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Difficulty for Activity */}
                    {component.type === 'activities' && (
                        <div className="mb-3">
                            <h4 className="text-sm font-medium mb-1">Difficulty:</h4>
                            <Badge variant={
                                (component as ActivityComponent).difficulty === 'EASY'
                                    ? 'secondary'
                                    : (component as ActivityComponent).difficulty === 'MODERATE'
                                        ? 'default'
                                        : 'destructive'
                            }>
                                {(component as ActivityComponent).difficulty}
                            </Badge>
                        </div>
                    )}

                    {/* Transport Details */}
                    {component.type === 'transport' && (
                        <div className="mb-3">
                            <h4 className="text-sm font-medium mb-1">Route:</h4>
                            <div className="flex items-center text-sm">
                                <span className="font-medium">{(component as TransportComponent).departureLocation}</span>
                                <span className="mx-2">→</span>
                                <span className="font-medium">{(component as TransportComponent).arrivalLocation}</span>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                                Mode: {(component as TransportComponent).mode}
                            </div>
                        </div>
                    )}

                    {component.tags && component.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {component.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Travel Components</h2>
                    <p className="text-gray-600">Manage accommodations, destinations, activities, and transport</p>
                </div>

                <Button
                    onClick={() => {
                        resetForm();
                        setIsDialogOpen(true);
                    }}

                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Component
                </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingComponent ? 'Edit Component' : 'Add New Component'}</DialogTitle>
                        <DialogDescription>
                            Create or edit a travel component
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="type">Component Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData(prev => ({
                                        ...prev,
                                        type: value as ComponentType
                                    }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="accommodations">Accommodation</SelectItem>
                                        <SelectItem value="destination">Destination</SelectItem>
                                        <SelectItem value="activities">Activity</SelectItem>
                                        <SelectItem value="transport">Transport</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name ?? ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    value={formData.location ?? ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="price">Price ($) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price ?? ''}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        price: parseFloat(e.target.value) || 0
                                    }))}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                value={formData.image}
                                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="lat">Latitude</Label>
                                <Input
                                    id="lat"
                                    type="number"
                                    step="any"
                                    value={formData.coordinates.lat ?? ''}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        coordinates: {
                                            ...prev.coordinates,
                                            lat: parseFloat(e.target.value)
                                        }
                                    }))}
                                />
                            </div>
                            <div>
                                <Label htmlFor="lng">Longitude</Label>
                                <Input
                                    id="lng"
                                    type="number"
                                    step="any"
                                    value={formData.coordinates.lng ?? ''}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        coordinates: {
                                            ...prev.coordinates,
                                            lng: parseFloat(e.target.value)
                                        }
                                    }))}
                                />
                            </div>
                            {(formData.type === 'activities' || formData.type === 'accommodations') && (
                                <div>
                                    <Label htmlFor="duration">Duration (hours)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        min="0"
                                        value={formData.duration || 0}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            duration: parseInt(e.target.value) || 0
                                        }))}
                                    />
                                </div>
                            )}
                        </div>

                        {/* TYPE-SPECIFIC FIELDS */}
                        {formData.type === 'accommodations' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="rating">Rating (1-5)</Label>
                                        <Input
                                            id="rating"
                                            type="number"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            value={formData.rating}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                rating: parseFloat(e.target.value) || 0
                                            }))}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="amenities">Amenities (comma separated)</Label>
                                    <Input
                                        id="amenities"
                                        value={(formData.amenities ?? []).join(', ')}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            amenities: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                                        }))}
                                        placeholder="WiFi, Pool, Breakfast"
                                    />
                                </div>
                            </>
                        )}

                        {formData.type === 'activities' && (
                            <div>
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <Select
                                    value={formData.difficulty}
                                    onValueChange={(value) => setFormData(prev => ({
                                        ...prev,
                                        difficulty: value as ActivityDifficulty
                                    }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="EASY">Easy</SelectItem>
                                        <SelectItem value="MODERATE">Moderate</SelectItem>
                                        <SelectItem value="CHALLENGING">Challenging</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {formData.type === 'destination' && (
                            <div>
                                <Label htmlFor="attractions">Attractions (comma separated)</Label>
                                <Textarea
                                    id="attractions"
                                    value={formData.attractions.join(', ')}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        attractions: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                                    }))}
                                    placeholder="Museum, Park, Beach"
                                    rows={2}
                                />
                            </div>
                        )}

                        {formData.type === 'transport' && (
                            <>
                                <div>
                                    <Label htmlFor="mode">Transport Mode</Label>
                                    <Select
                                        value={formData.mode}
                                        onValueChange={(value) => setFormData(prev => ({
                                            ...prev,
                                            mode: value as TransportMode
                                        }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CAR">Car</SelectItem>
                                            <SelectItem value="TRAIN">Train</SelectItem>
                                            <SelectItem value="BUS">Bus</SelectItem>
                                            <SelectItem value="PLANE">Plane</SelectItem>
                                            <SelectItem value="BOAT">Boat</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="departureLocation">Departure Location</Label>
                                        <Input
                                            id="departureLocation"
                                            value={formData.departureLocation}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                departureLocation: e.target.value
                                            }))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="arrivalLocation">Arrival Location</Label>
                                        <Input
                                            id="arrivalLocation"
                                            value={formData.arrivalLocation}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                arrivalLocation: e.target.value
                                            }))}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Departure Coordinates</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                placeholder="Latitude"
                                                type="number"
                                                step="any"
                                                value={formData.departureCoordinates.lat ?? ''}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    departureCoordinates: {
                                                        ...prev.departureCoordinates,
                                                        lat: e.target.value === '' ? 0 : parseFloat(e.target.value)
                                                    }
                                                }))}
                                            />
                                            <Input
                                                placeholder="Longitude"
                                                type="number"
                                                step="any"
                                                value={formData.departureCoordinates.lng ?? ''}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    departureCoordinates: {
                                                        ...prev.departureCoordinates,
                                                        lng: e.target.value === '' ? 0 : parseFloat(e.target.value)
                                                    }
                                                }))}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Arrival Coordinates</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                placeholder="Latitude"
                                                type="number"
                                                step="any"
                                                value={formData.arrivalCoordinates.lat || 0}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    arrivalCoordinates: {
                                                        ...prev.arrivalCoordinates,
                                                        lat: parseFloat(e.target.value)
                                                    }
                                                }))}
                                            />
                                            <Input
                                                placeholder="Longitude"
                                                type="number"
                                                step="any"
                                                value={formData.arrivalCoordinates.lng || 0}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    arrivalCoordinates: {
                                                        ...prev.arrivalCoordinates,
                                                        lng: parseFloat(e.target.value)
                                                    }
                                                }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                                id="tags"
                                value={(formData.tags ?? []).join(', ')}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                                }))}
                                placeholder="luxury, beach, adventure"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit">
                                {editingComponent ? 'Update' : 'Create'} Component
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ComponentType)}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="accommodations" className="flex items-center gap-2">
                        <Bed className="h-4 w-4" />
                        Accommodation
                    </TabsTrigger>
                    <TabsTrigger value="destination" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Destinations
                    </TabsTrigger>
                    <TabsTrigger value="activities" className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Activities
                    </TabsTrigger>
                    <TabsTrigger value="transport" className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Transport
                    </TabsTrigger>
                </TabsList>

                {(['accommodations', 'destination', 'activities', 'transport'] as ComponentType[]).map((type) => {
                    const Icon = getIconForType(type);
                    const tabComponents = getComponentsByType(type);
                    const isLoadingTab = isLoading[type];

                    return (
                        <TabsContent key={type} value={type} className="mt-6">
                            <div className="grid gap-6">
                                {isLoadingTab ? (
                                    <Card>
                                        <CardContent className="flex flex-col items-center justify-center py-12">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ceylon-teal"></div>
                                            <p className="mt-4 text-gray-600">Loading {type}s...</p>
                                        </CardContent>
                                    </Card>
                                ) : tabComponents.length === 0 ? (
                                    <Card>
                                        <CardContent className="flex flex-col items-center justify-center py-12">
                                            <Icon className="h-12 w-12 text-gray-400 mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                No {type}s yet
                                            </h3>
                                            <p className="text-gray-500 text-center mb-4">
                                                Start by creating your first {type}
                                            </p>
                                            <Button
                                                onClick={() => {
                                                    resetForm();
                                                    setIsDialogOpen(true);
                                                }}

                                            >
                                                Create {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {tabComponents.map((component) => (
                                            <ComponentCard key={component.id} component={component} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default TravelComponentManager;