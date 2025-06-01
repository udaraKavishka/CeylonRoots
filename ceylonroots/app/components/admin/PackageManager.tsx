'use client';

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
// import { Separator } from "../../components/ui/separator";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";
import { travelPackages } from '../../data/travelPackages';

const PackageManager = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingPackage, setEditingPackage] = useState<string | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        duration: '',
        price: '',
        regions: '',
        themes: '',
        highlights: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Package saved",
            description: "Travel package has been saved successfully.",
        });
        setIsCreating(false);
        setEditingPackage(null);
        setFormData({
            title: '',
            description: '',
            image: '',
            duration: '',
            price: '',
            regions: '',
            themes: '',
            highlights: ''
        });
    };

    const handleEdit = (packageId: string) => {
        const pkg = travelPackages.find(p => p.id === packageId);
        if (pkg) {
            setFormData({
                title: pkg.title,
                description: pkg.description,
                image: pkg.image,
                duration: pkg.duration.toString(),
                price: pkg.price.toString(),
                regions: pkg.regions.join(', '),
                themes: pkg.themes.join(', '),
                highlights: pkg.highlights.join(', ')
            });
            setEditingPackage(packageId);
        }
    };

    const handleDelete = (packageId: string) => {
        toast({
            title: "Package deleted",
            description: "Travel package has been deleted successfully.",
            variant: "destructive"
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Travel Packages</h2>
                <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Package
                </Button>
            </div>

            {(isCreating || editingPackage) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingPackage ? 'Edit Package' : 'Create New Package'}</CardTitle>
                        <CardDescription>Fill in the details for the travel package</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="title">Package Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Cultural Triangle Explorer"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        value={formData.image}
                                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                        placeholder="https://images.unsplash.com/..."
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
                                    placeholder="Discover the ancient cities of Anuradhapura, Polonnaruwa, and the rock fortress of Sigiriya..."
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="duration">Duration (days)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={formData.duration}
                                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                        placeholder="7"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="price">Price (USD)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                        placeholder="899"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="regions">Regions (comma-separated)</Label>
                                <Input
                                    id="regions"
                                    value={formData.regions}
                                    onChange={(e) => setFormData(prev => ({ ...prev, regions: e.target.value }))}
                                    placeholder="Cultural Triangle, Central Province"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="themes">Themes (comma-separated)</Label>
                                <Input
                                    id="themes"
                                    value={formData.themes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, themes: e.target.value }))}
                                    placeholder="Culture, History, UNESCO Sites"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="highlights">Highlights (comma-separated)</Label>
                                <Textarea
                                    id="highlights"
                                    value={formData.highlights}
                                    onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
                                    placeholder="Climb the ancient rock fortress of Sigiriya, Explore the sacred city of Anuradhapura"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Package
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditingPackage(null);
                                        setFormData({
                                            title: '',
                                            description: '',
                                            image: '',
                                            duration: '',
                                            price: '',
                                            regions: '',
                                            themes: '',
                                            highlights: ''
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
                {travelPackages.map((pkg) => (
                    <Card key={pkg.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">{pkg.title}</h3>
                                    <p className="text-gray-600 mb-3">{pkg.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge variant="secondary">{pkg.duration} days</Badge>
                                        <Badge variant="secondary">${pkg.price}</Badge>
                                        <Badge variant="outline">Rating: {pkg.rating}</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {pkg.themes.map((theme, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {theme}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(pkg.id)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(pkg.id)}
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

export default PackageManager;