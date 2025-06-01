'use client';

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";
import { allDestinations } from '../../data/destination';

const DestinationManager = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingDestination, setEditingDestination] = useState<string | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        region: '',
        image: '',
        topAttraction: '',
        bestTimeToVisit: '',
        recommendedDuration: '',
        culturalTips: '',
        attractions: '',
        lat: '',
        lng: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Destination saved",
            description: "Destination has been saved successfully.",
        });
        setIsCreating(false);
        setEditingDestination(null);
        setFormData({
            name: '',
            description: '',
            region: '',
            image: '',
            topAttraction: '',
            bestTimeToVisit: '',
            recommendedDuration: '',
            culturalTips: '',
            attractions: '',
            lat: '',
            lng: ''
        });
    };

    const handleEdit = (destId: string) => {
        const dest = allDestinations.find(d => d.id === destId);
        if (dest) {
            setFormData({
                name: dest.name,
                description: dest.description,
                region: dest.region,
                image: dest.image,
                topAttraction: dest.topAttraction,
                bestTimeToVisit: dest.bestTimeToVisit,
                recommendedDuration: dest.recommendedDuration,
                culturalTips: dest.culturalTips,
                attractions: dest.attractions.join(', '),
                lat: dest.coordinates.lat.toString(),
                lng: dest.coordinates.lng.toString()
            });
            setEditingDestination(destId);
        }
    };

    const handleDelete = (destId: string) => {
        toast({
            title: "Destination deleted",
            description: "Destination has been deleted successfully.",
            variant: "destructive"
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold">Destinations</h2>
                <Button
                    onClick={() => {
                        setIsCreating(true);
                        setEditingDestination(null);
                        setFormData({
                            name: '',
                            description: '',
                            region: '',
                            image: '',
                            topAttraction: '',
                            bestTimeToVisit: '',
                            recommendedDuration: '',
                            culturalTips: '',
                            attractions: '',
                            lat: '',
                            lng: ''
                        });
                    }}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Destination
                </Button>
            </div>

            {(isCreating || editingDestination !== null) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingDestination !== null ? 'Edit Destination' : 'Create New Destination'}</CardTitle>
                        <CardDescription>Fill in the details for the destination</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Destination Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Sigiriya"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="region">Region *</Label>
                                    <Input
                                        id="region"
                                        value={formData.region}
                                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                        placeholder="Cultural Triangle"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="image">Image URL *</Label>
                                <Input
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Sigiriya, also known as the Lion Rock, is an ancient rock fortress..."
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="topAttraction">Top Attraction *</Label>
                                    <Input
                                        id="topAttraction"
                                        value={formData.topAttraction}
                                        onChange={(e) => setFormData({ ...formData, topAttraction: e.target.value })}
                                        placeholder="The Lion Rock fortress and ancient palace ruins"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="bestTimeToVisit">Best Time to Visit *</Label>
                                    <Input
                                        id="bestTimeToVisit"
                                        value={formData.bestTimeToVisit}
                                        onChange={(e) => setFormData({ ...formData, bestTimeToVisit: e.target.value })}
                                        placeholder="January to March (dry season)"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="recommendedDuration">Recommended Duration *</Label>
                                <Input
                                    id="recommendedDuration"
                                    value={formData.recommendedDuration}
                                    onChange={(e) => setFormData({ ...formData, recommendedDuration: e.target.value })}
                                    placeholder="1-2 days"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="attractions">Attractions (comma-separated) *</Label>
                                <Textarea
                                    id="attractions"
                                    value={formData.attractions}
                                    onChange={(e) => setFormData({ ...formData, attractions: e.target.value })}
                                    placeholder="Sigiriya Rock Fortress, Water Gardens, Mirror Wall"
                                    rows={2}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="culturalTips">Cultural Tips *</Label>
                                <Textarea
                                    id="culturalTips"
                                    value={formData.culturalTips}
                                    onChange={(e) => setFormData({ ...formData, culturalTips: e.target.value })}
                                    placeholder="Dress modestly when visiting religious sites. Remove shoes before entering temples..."
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="lat">Latitude *</Label>
                                    <Input
                                        id="lat"
                                        type="number"
                                        step="any"
                                        value={formData.lat}
                                        onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                                        placeholder="7.9570"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lng">Longitude *</Label>
                                    <Input
                                        id="lng"
                                        type="number"
                                        step="any"
                                        value={formData.lng}
                                        onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                                        placeholder="80.7603"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button type="submit" className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Destination
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditingDestination(null);
                                        setFormData({
                                            name: '',
                                            description: '',
                                            region: '',
                                            image: '',
                                            topAttraction: '',
                                            bestTimeToVisit: '',
                                            recommendedDuration: '',
                                            culturalTips: '',
                                            attractions: '',
                                            lat: '',
                                            lng: ''
                                        });
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {allDestinations.map((dest) => (
                    <Card key={dest.id} className="overflow-hidden">
                        <CardContent className="p-4 md:p-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold mb-2 truncate">{dest.name}</h3>
                                    <p className="text-gray-600 mb-3 line-clamp-2">{dest.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge variant="secondary">{dest.region}</Badge>
                                        <Badge variant="outline">{dest.bestTimeToVisit}</Badge>
                                        <Badge variant="outline">{dest.recommendedDuration}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">
                                        <span className="font-medium">Top Attraction:</span> {dest.topAttraction}
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-2 md:mt-0">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(dest.id)}
                                        className="flex-shrink-0"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(dest.id)}
                                        className="flex-shrink-0"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DestinationManager;