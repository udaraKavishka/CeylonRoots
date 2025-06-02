'use client';

import { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";

type TravelPackage = {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    price: number;
    regions: string[];
    themes: string[];
    highlights: string[];
    rating?: number;
};

const PackageManager = () => {
    const [packages, setPackages] = useState<TravelPackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPackage, setEditingPackage] = useState<string | null>(null);
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialFormState = {
        title: '',
        description: '',
        image: '',
        duration: '',
        price: '',
        regions: '',
        themes: '',
        highlights: ''
    };
    const [formData, setFormData] = useState(initialFormState);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/packages`);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Safely extract packages array from response
            let packagesArray: TravelPackage[] = [];

            if (Array.isArray(data)) {
                packagesArray = data;
            } else if (data && Array.isArray(data.data)) {
                packagesArray = data.data;
            } else if (data && Array.isArray(data.packages)) {
                packagesArray = data.packages;
            }

            setPackages(packagesArray);
        } catch (error) {
            console.error("Fetch error:", error);
            toast({
                title: "Error",
                description: "Failed to fetch packages. Please try again later.",
                variant: "destructive"
            });
            setPackages([]); // Ensure we always have an array
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const createPackage = async (packageData: any) => {
        const response = await fetch(`${API_BASE_URL}/packages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(packageData)
        });
        if (!response.ok) {
            throw new Error(`Failed to create package: ${response.status}`);
        }
        return response.json();
    };

    const deletePackage = async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete package: ${response.status}`);
        }
    };

    const updatePackage = async (id: string, packageData: any) => {
        const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(packageData)
        });
        if (!response.ok) {
            throw new Error(`Failed to update package: ${response.status}`);
        }
        return response.json();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const packageData = {
                ...formData,
                duration: Number(formData.duration),
                price: Number(formData.price),
                regions: formData.regions.split(',').map(s => s.trim()),
                themes: formData.themes.split(',').map(s => s.trim()),
                highlights: formData.highlights.split(',').map(s => s.trim())
            };

            if (editingPackage) {
                const updatedPackage = await updatePackage(editingPackage, packageData);
                setPackages(packages.map(p => p.id === editingPackage ? updatedPackage : p));
                toast({ title: "Package updated", description: "Travel package updated successfully." });
            } else {
                const newPackage = await createPackage(packageData);
                setPackages(prev => [...prev, newPackage]);
                toast({ title: "Package saved", description: "Travel package saved successfully." });
            }

            resetForm();
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Error",
                description: "Failed to save package. Please check your input and try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (packageId: string) => {
        const pkg = packages.find(p => p.id === packageId);
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
            setIsCreating(true);
        }
    };

    const handleDelete = async (packageId: string) => {
        if (window.confirm("Are you sure you want to delete this package? This action cannot be undone.")) {
            try {
                await deletePackage(packageId);
                setPackages(prev => prev.filter(p => p.id !== packageId));
                toast({
                    title: "Package deleted",
                    description: "Travel package was successfully deleted.",
                });
            } catch (error) {
                console.error("Delete error:", error);
                toast({
                    title: "Error",
                    description: "Failed to delete package. Please try again.",
                    variant: "destructive"
                });
            }
        }
    };

    const resetForm = () => {
        setIsCreating(false);
        setEditingPackage(null);
        setFormData(initialFormState);
    };

    // Safely render packages
    const renderPackages = () => {
        if (!Array.isArray(packages)) {
            console.error("Packages is not an array:", packages);
            return (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-red-500">Data format error. Failed to load packages.</p>
                        <Button
                            className="mt-4"
                            onClick={fetchPackages}
                        >
                            Retry Loading Packages
                        </Button>
                    </CardContent>
                </Card>
            );
        }

        if (packages.length === 0) {
            return (
                <Card>
                    <CardContent className="py-12 text-center">
                        <div className="mb-4 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">No travel packages found</h3>
                        <p className="text-gray-500 mb-4">Get started by creating your first travel package</p>
                        <Button onClick={() => setIsCreating(true)}>
                            Create New Package
                        </Button>
                    </CardContent>
                </Card>
            );
        }

        return (
            <div className="grid gap-4">
                {packages.map((pkg) => (
                    <Card key={pkg.id}>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">{pkg.title}</h3>
                                    <p className="text-gray-600 mb-3 line-clamp-2">{pkg.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge variant="secondary">{pkg.duration} days</Badge>
                                        <Badge variant="secondary">${pkg.price.toLocaleString()}</Badge>
                                        {pkg.rating && <Badge variant="outline">Rating: {pkg.rating}/5</Badge>}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {Array.isArray(pkg.regions) && pkg.regions.map((region, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {region}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {Array.isArray(pkg.themes) && pkg.themes.map((theme, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {theme}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(pkg.id)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
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
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Travel Packages</h2>
                <Button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                >
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
                                        disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                                    disabled={isSubmitting}
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
                                        min="1"
                                        required
                                        disabled={isSubmitting}
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
                                        min="0"
                                        required
                                        disabled={isSubmitting}
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
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="flex items-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    <Save className="h-4 w-4" />
                                    {isSubmitting ? "Processing..." : "Save Package"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                        <p className="text-gray-600">Loading packages...</p>
                    </div>
                </div>
            ) : (
                renderPackages()
            )}
        </div>
    );
};

export default PackageManager;