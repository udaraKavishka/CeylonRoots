'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Plus, Edit, Trash2, MapPin, DollarSign, Clock, Bed, Activity, Car } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import { TravelComponent, ComponentType } from '../../types/travel';

const TravelComponentManager = () => {
    const [components, setComponents] = useState<TravelComponent[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingComponent, setEditingComponent] = useState<TravelComponent | null>(null);
    const [activeTab, setActiveTab] = useState<ComponentType>('accommodation');
    const { toast } = useToast();

    const [formData, setFormData] = useState<Partial<TravelComponent>>({
        type: 'accommodation',
        name: '',
        description: '',
        location: '',
        image: '',
        price: 0,
        coordinates: { lat: 0, lng: 0 },
        duration: 0,
        tags: []
    });

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
            tags: []
        });
        setEditingComponent(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingComponent) {
            setComponents(prev => prev.map(item =>
                item.id === editingComponent.id ? { ...formData, id: editingComponent.id } as TravelComponent : item
            ));
            toast({
                title: "Component Updated",
                description: "The travel component has been successfully updated.",
            });
        } else {
            const newComponent: TravelComponent = {
                ...formData,
                id: Date.now().toString(),
            } as TravelComponent;
            setComponents(prev => [...prev, newComponent]);
            toast({
                title: "Component Created",
                description: "New travel component has been successfully created.",
            });
        }

        resetForm();
        setIsDialogOpen(false);
    };

    const handleEdit = (component: TravelComponent) => {
        setEditingComponent(component);
        setFormData(component);
        setActiveTab(component.type);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setComponents(prev => prev.filter(item => item.id !== id));
        toast({
            title: "Component Deleted",
            description: "The travel component has been successfully deleted.",
        });
    };

    const getComponentsByType = (type: ComponentType) => {
        return components.filter(component => component.type === type);
    };

    const getIconForType = (type: ComponentType) => {
        switch (type) {
            case 'accommodation': return Bed;
            case 'destination': return MapPin;
            case 'activity': return Activity;
            case 'transport': return Car;
            default: return MapPin;
        }
    };

    const ComponentCard = ({ component }: { component: TravelComponent }) => {
        const Icon = getIconForType(component.type);

        return (
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-ceylon-tea/10 rounded-lg">
                                <Icon className="h-5 w-5 text-ceylon-tea" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">{component.name}</CardTitle>
                                <CardDescription>{component.location}</CardDescription>
                                <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1 text-ceylon-spice" />
                                        <span className="text-sm font-medium">${component.price}</span>
                                    </div>
                                    {component.duration && (
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
                                onClick={() => handleDelete(component.id)}
                                className="text-red-600 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{component.description}</p>
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm} className="bg-ceylon-tea hover:bg-ceylon-tea/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Component
                        </Button>
                    </DialogTrigger>
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
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as ComponentType }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="accommodation">Accommodation</SelectItem>
                                            <SelectItem value="destination">Destination</SelectItem>
                                            <SelectItem value="activity">Activity</SelectItem>
                                            <SelectItem value="transport">Transport</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
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
                                        value={formData.coordinates?.lat || 0}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            coordinates: {
                                                ...prev.coordinates!,
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
                                        value={formData.coordinates?.lng || 0}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            coordinates: {
                                                ...prev.coordinates!,
                                                lng: parseFloat(e.target.value)
                                            }
                                        }))}
                                    />
                                </div>
                                {(formData.type === 'activity' || formData.type === 'accommodation') && (
                                    <div>
                                        <Label htmlFor="duration">Duration (hours)</Label>
                                        <Input
                                            id="duration"
                                            type="number"
                                            min="0"
                                            value={formData.duration || 0}
                                            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="tags">Tags (comma separated)</Label>
                                <Input
                                    id="tags"
                                    value={formData.tags?.join(', ') || ''}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                                    }))}
                                    placeholder="luxury, beach, adventure"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="bg-ceylon-tea hover:bg-ceylon-tea/90">
                                    {editingComponent ? 'Update' : 'Create'} Component
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ComponentType)}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="accommodation" className="flex items-center gap-2">
                        <Bed className="h-4 w-4" />
                        Accommodation
                    </TabsTrigger>
                    <TabsTrigger value="destination" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Destinations
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Activities
                    </TabsTrigger>
                    <TabsTrigger value="transport" className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Transport
                    </TabsTrigger>
                </TabsList>

                {(['accommodation', 'destination', 'activity', 'transport'] as ComponentType[]).map((type) => {
                    const Icon = getIconForType(type);
                    return (
                        <TabsContent key={type} value={type} className="mt-6">
                            <div className="grid gap-6">
                                {getComponentsByType(type).length === 0 ? (
                                    <Card>
                                        <CardContent className="flex flex-col items-center justify-center py-12">
                                            <Icon className="h-12 w-12 text-gray-400 mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                No {type}s yet
                                            </h3>
                                            <p className="text-gray-500 text-center mb-4">
                                                Start by creating your first {type}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {getComponentsByType(type).map((component) => (
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