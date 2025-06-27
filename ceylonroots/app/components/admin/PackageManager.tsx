'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";
import Image from 'next/image';

type ItineraryActivity = { name: string };
type ItineraryDay = {
    id: number;
    dayNumber: number;
    title: string;
    mainTown: string;
    description: string;
    accommodation: string | null;
    meals: string[];
    activities: ItineraryActivity[];
};

type TravelPackage = {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    description: string;
    imageUrl: string;
    durationDays: number;
    price: number;
    rating: number;
    reviewCount: number;
    itineraryDays: ItineraryDay[];
    highlights: string[];
    gallery: string[];
    includes: string[];
    excludes: string[];
    destinations: string[];
};

const initialFormState = {
    title: '',
    description: '',
    imageUrl: '',
    durationDays: '',
    price: '',
    rating: '',
    reviewCount: '',
    highlights: '',
    gallery: '',
    includes: '',
    excludes: '',
    destinations: '',
};

const PackageManager = () => {
    const [packages, setPackages] = useState<TravelPackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPackage, setEditingPackage] = useState<number | null>(null);
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialFormState);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchPackages = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/packages`);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            const data = await response.json();
            let packagesArray: TravelPackage[] = [];
            if (Array.isArray(data)) {
                packagesArray = data;
            } else if (data && Array.isArray(data.data)) {
                packagesArray = data.data;
            } else if (data && Array.isArray(data.packages)) {
                packagesArray = data.packages;
            } else if (data && data.id) {
                packagesArray = [data];
            }
            setPackages(Array.isArray(packagesArray) ? packagesArray : []);
        } catch {
            toast({
                title: "Error",
                description: "Failed to fetch packages. Please try again later.",
                variant: "destructive"
            });
            setPackages([]);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL, toast]);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    const createPackage = async (packageData: Partial<TravelPackage>) => {
        const response = await fetch(`${API_BASE_URL}/packages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(packageData)
        });
        if (!response.ok) throw new Error(`Failed to create package: ${response.status}`);
        return response.json();
    };

    const updatePackage = async (id: number, packageData: Partial<TravelPackage>) => {
        const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(packageData)
        });
        if (!response.ok) throw new Error(`Failed to update package: ${response.status}`);
        return response.json();
    };

    const deletePackage = async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/packages/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Failed to delete package: ${response.status}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const packageData = {
                ...formData,
                durationDays: Number(formData.durationDays),
                price: Number(formData.price),
                rating: Number(formData.rating),
                reviewCount: Number(formData.reviewCount),
                highlights: formData.highlights.split(',').map(s => s.trim()).filter(Boolean),
                gallery: formData.gallery.split(',').map(s => s.trim()).filter(Boolean),
                includes: formData.includes.split(',').map(s => s.trim()).filter(Boolean),
                excludes: formData.excludes.split(',').map(s => s.trim()).filter(Boolean),
                destinations: formData.destinations.split(',').map(s => s.trim()).filter(Boolean),
            };

            if (editingPackage) {
                const updatedPackage = await updatePackage(editingPackage, packageData);
                setPackages(prev =>
                    prev.map(p => p.id === editingPackage ? updatedPackage : p)
                );
                toast({ title: "Package updated", description: "Travel package updated successfully." });
            } else {
                const newPackage = await createPackage(packageData);
                setPackages(prev => [...prev, newPackage]);
                toast({ title: "Package saved", description: "Travel package saved successfully." });
            }

            resetForm();
        } catch {
            toast({
                title: "Error",
                description: "Failed to save package. Please check your input and try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (packageId: number) => {
        const pkg = packages.find(p => p.id === packageId);
        if (pkg) {
            setFormData({
                title: pkg.title,
                description: pkg.description,
                imageUrl: pkg.imageUrl,
                durationDays: pkg.durationDays.toString(),
                price: pkg.price.toString(),
                rating: pkg.rating?.toString() || '',
                reviewCount: pkg.reviewCount?.toString() || '',
                highlights: (pkg.highlights || []).join(', '),
                gallery: (pkg.gallery || []).join(', '),
                includes: (pkg.includes || []).join(', '),
                excludes: (pkg.excludes || []).join(', '),
                destinations: (pkg.destinations || []).join(', '),
            });
            setEditingPackage(packageId);
            setIsCreating(false);
        }
    };

    const handleDelete = async (packageId: number) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await deletePackage(packageId);
                setPackages(prev => prev.filter(p => p.id !== packageId));
                toast({
                    title: "Package deleted",
                    description: "Travel package was successfully deleted.",
                });
            } catch {
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

    const renderPackages = () => {
        if (!Array.isArray(packages)) return null;
        if (packages.length === 0) {
            return (
                <Card>
                    <CardContent className="py-12 text-center">
                        <h3 className="text-lg font-medium mb-2">No travel packages found</h3>
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
                    <Card key={pkg.id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">

                                {pkg.imageUrl && (
                                    <div className="md:w-1/3 relative h-48 md:h-auto">
                                        <Image
                                            src={pkg.imageUrl}
                                            alt={pkg.title}
                                            fill
                                            className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                                        />
                                    </div>
                                )}
                                {/* Content Section */}
                                <div className="flex-1 p-6">
                                    {editingPackage === pkg.id ? (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="title">Package Title</Label>
                                                    <Input
                                                        id="title"
                                                        value={formData.title}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                                        required
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="imageUrl">Image URL</Label>
                                                    <Input
                                                        id="imageUrl"
                                                        value={formData.imageUrl}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
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
                                                    rows={3}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="durationDays">Duration (days)</Label>
                                                    <Input
                                                        id="durationDays"
                                                        type="number"
                                                        value={formData.durationDays}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, durationDays: e.target.value }))}
                                                        min="1"
                                                        required
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="price">Price (Rs)</Label>
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                                        min="0"
                                                        required
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="rating">Rating</Label>
                                                    <Input
                                                        id="rating"
                                                        type="number"
                                                        step="0.1"
                                                        value={formData.rating}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                                                        min="0"
                                                        max="5"
                                                        required
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="reviewCount">Review Count</Label>
                                                    <Input
                                                        id="reviewCount"
                                                        type="number"
                                                        value={formData.reviewCount}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, reviewCount: e.target.value }))}
                                                        min="0"
                                                        required
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="destinations">Destinations (comma-separated)</Label>
                                                <Input
                                                    id="destinations"
                                                    value={formData.destinations}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, destinations: e.target.value }))}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="highlights">Highlights (comma-separated)</Label>
                                                <Input
                                                    id="highlights"
                                                    value={formData.highlights}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="gallery">Gallery Image URLs (comma-separated)</Label>
                                                <Input
                                                    id="gallery"
                                                    value={formData.gallery}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, gallery: e.target.value }))}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="includes">Includes (comma-separated)</Label>
                                                <Input
                                                    id="includes"
                                                    value={formData.includes}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, includes: e.target.value }))}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="excludes">Excludes (comma-separated)</Label>
                                                <Input
                                                    id="excludes"
                                                    value={formData.excludes}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, excludes: e.target.value }))}
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
                                    ) : (
                                        <>
                                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                                {/* Package Details */}
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <h3 className="text-lg font-semibold">{pkg.title}</h3>
                                                        <Badge variant="secondary">{pkg.durationDays} days</Badge>
                                                        <Badge variant="secondary">${pkg.price}</Badge>
                                                    </div>
                                                    <p className="text-gray-600 mb-3">{pkg.description}</p>
                                                    <div className="flex flex-wrap gap-1 mb-3">
                                                        <span className="font-medium mr-2">Destinations:</span>
                                                        {(pkg.destinations || []).map((dest, i) => (
                                                            <Badge key={i} variant="outline" className="text-xs">{dest}</Badge>
                                                        ))}
                                                    </div>
                                                    <div className="mb-3">
                                                        <span className="font-medium">Highlights:</span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {(pkg.highlights || []).map((hl, i) => (
                                                                <Badge key={i} variant="secondary" className="text-xs">{hl}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        <div>
                                                            <span className="font-medium">Includes:</span>
                                                            <ul className="list-disc ml-5 mt-1 text-sm">
                                                                {(pkg.includes || []).map((inc, i) => (
                                                                    <li key={i} className="text-green-600">{inc}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Excludes:</span>
                                                            <ul className="list-disc ml-5 mt-1 text-sm">
                                                                {(pkg.excludes || []).map((exc, i) => (
                                                                    <li key={i} className="text-red-600">{exc}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Action Buttons */}
                                                <div className="flex flex-row md:flex-col gap-2 justify-end">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(pkg.id)}
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Edit className="h-4 w-4" /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(pkg.id)}
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Trash2 className="h-4 w-4" /> Delete
                                                    </Button>
                                                </div>
                                            </div>
                                            {/* Itinerary Section */}
                                            {(pkg.itineraryDays || []).length > 0 && (
                                                <div className="mt-4 pt-4 border-t">
                                                    <h4 className="font-semibold mb-2">Itinerary:</h4>
                                                    <div className="space-y-3">
                                                        {pkg.itineraryDays.map(day => (
                                                            <div key={day.id} className="bg-gray-50 p-3 rounded-lg">
                                                                <div className="font-medium">Day {day.dayNumber}: {day.title}</div>
                                                                <p className="text-sm text-gray-600 mt-1">{day.description}</p>
                                                                {(day.activities || []).length > 0 && (
                                                                    <div className="mt-2">
                                                                        <span className="text-sm font-medium">Activities:</span>
                                                                        <ul className="list-disc ml-5 mt-1">
                                                                            {day.activities.map((act, i) => (
                                                                                <li key={i} className="text-sm">{act.name}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
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
                    onClick={() => { setIsCreating(true); setEditingPackage(null); setFormData(initialFormState); }}
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                >
                    <Plus className="h-4 w-4" />
                    Add Package
                </Button>
            </div>

            {/* Only show the create form globally */}
            {isCreating && editingPackage === null && (
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Package</CardTitle>
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
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="imageUrl">Image URL</Label>
                                    <Input
                                        id="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
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
                                    rows={3}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="durationDays">Duration (days)</Label>
                                    <Input
                                        id="durationDays"
                                        type="number"
                                        value={formData.durationDays}
                                        onChange={(e) => setFormData(prev => ({ ...prev, durationDays: e.target.value }))}
                                        min="1"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="price">Price (Rs)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                        min="0"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Input
                                        id="rating"
                                        type="number"
                                        step="0.1"
                                        value={formData.rating}
                                        onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                                        min="0"
                                        max="5"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="reviewCount">Review Count</Label>
                                    <Input
                                        id="reviewCount"
                                        type="number"
                                        value={formData.reviewCount}
                                        onChange={(e) => setFormData(prev => ({ ...prev, reviewCount: e.target.value }))}
                                        min="0"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="destinations">Destinations (comma-separated)</Label>
                                <Input
                                    id="destinations"
                                    value={formData.destinations}
                                    onChange={(e) => setFormData(prev => ({ ...prev, destinations: e.target.value }))}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label htmlFor="highlights">Highlights (comma-separated)</Label>
                                <Input
                                    id="highlights"
                                    value={formData.highlights}
                                    onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label htmlFor="gallery">Gallery Image URLs (comma-separated)</Label>
                                <Input
                                    id="gallery"
                                    value={formData.gallery}
                                    onChange={(e) => setFormData(prev => ({ ...prev, gallery: e.target.value }))}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label htmlFor="includes">Includes (comma-separated)</Label>
                                <Input
                                    id="includes"
                                    value={formData.includes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, includes: e.target.value }))}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Label htmlFor="excludes">Excludes (comma-separated)</Label>
                                <Input
                                    id="excludes"
                                    value={formData.excludes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, excludes: e.target.value }))}
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