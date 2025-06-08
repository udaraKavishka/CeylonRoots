'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Plus, Edit, Trash2, MapPin, Calendar, Bed, UtensilsCrossed, Package } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface Activity {
    name: string;
}

interface ItineraryDay {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    title: string;
    dayNumber: number;
    mainTown: string;
    description: string;
    accommodation: string[];
    meals: string[];
    activities: Activity[];
}

interface Itinerary {
    id: string;
    title: string;
    description: string;
    packageId: string;
    duration: number;
    days: ItineraryDay[];
}

interface DayFormData {
    id?: number;
    title: string;
    mainTown: string;
    description: string;
    accommodation: string;
    meals: string;
    activities: string;
}

interface TravelPackage {
    id: string;
    title: string;
    durationDays: number;
}

const ItineraryManager = () => {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [packages, setPackages] = useState<TravelPackage[]>([]);
    const [selectedPackageId, setSelectedPackageId] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItinerary, setEditingItinerary] = useState<Itinerary | null>(null);
    const [isDayFormOpen, setIsDayFormOpen] = useState(false);
    const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [formData, setFormData] = useState<Itinerary>({
        id: '',
        title: '',
        description: '',
        packageId: '',
        duration: 1,
        days: []
    });

    const [dayFormData, setDayFormData] = useState<DayFormData>({
        title: '',
        mainTown: '',
        description: '',
        accommodation: '',
        meals: '',
        activities: ''
    });

    // Fetch all packages on component mount
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_BASE_URL}/packages`);
                if (!response.ok) throw new Error('Failed to fetch packages');

                const data = await response.json();
                const packagesArray = Array.isArray(data)
                    ? data
                    : data.data || data.packages || [];

                setPackages(packagesArray.map((pkg: TravelPackage) => ({
                    id: pkg.id.toString(),
                    title: pkg.title,
                    durationDays: pkg.durationDays
                })));
            } catch {
                toast({
                    title: "Error",
                    description: "Failed to fetch packages. Please try again later.",
                    variant: "destructive"
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackages();
    }, [API_BASE_URL, toast]);

    useEffect(() => {
        if (!selectedPackageId) return;

        const fetchItineraries = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_BASE_URL}/travel-packages/${selectedPackageId}/itinerary`);
                if (!response.ok) throw new Error('Failed to fetch itinerary days');

                const days = await response.json();

                const itinerary: Itinerary = {
                    id: selectedPackageId,
                    title: packages.find(p => p.id === selectedPackageId)?.title || 'Itinerary',
                    description: `Itinerary for ${packages.find(p => p.id === selectedPackageId)?.title}`,
                    packageId: selectedPackageId,
                    duration: packages.find(p => p.id === selectedPackageId)?.durationDays || 1,
                    days: days.map((day: ItineraryDay) => ({
                        id: day.id,
                        title: day.title,
                        dayNumber: day.dayNumber,
                        mainTown: day.mainTown,
                        description: day.description,
                        accommodation: day.accommodation || [],
                        meals: day.meals || [],
                        activities: day.activities || []
                    }))
                };

                setItineraries([itinerary]);
            } catch {
                toast({
                    title: "Error",
                    description: "Failed to fetch itinerary details",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchItineraries();
    }, [selectedPackageId, API_BASE_URL, toast, packages]);

    const resetForm = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            packageId: selectedPackageId,
            duration: packages.find(p => p.id === selectedPackageId)?.durationDays || 1,
            days: []
        });
        setEditingItinerary(null);
    };

    const resetDayForm = () => {
        setDayFormData({
            title: '',
            mainTown: '',
            description: '',
            accommodation: '',
            meals: '',
            activities: ''
        });
        setEditingDayIndex(null);
    };

    const createItineraryDay = async (day: Omit<ItineraryDay, 'id'>) => {
        const response = await fetch(`${API_BASE_URL}/travel-packages/${selectedPackageId}/itinerary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(day)
        });
        if (!response.ok) throw new Error('Failed to create itinerary day');
        return await response.json();
    };

    const updateItineraryDay = async (day: ItineraryDay) => {
        if (!day.id) throw new Error('Day ID is required for update');

        const response = await fetch(`${API_BASE_URL}/travel-packages/${selectedPackageId}/itinerary/${day.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(day)
        });
        if (!response.ok) throw new Error('Failed to update itinerary day');
        return await response.json();
    };

    const deleteItineraryDay = async (dayId: number) => {
        const response = await fetch(`${API_BASE_URL}/travel-packages/${selectedPackageId}/itinerary/${dayId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete itinerary day');
    };

    // Add/Edit Day (inline, not saved to DB until main form submit)
    const handleDayFormSubmit = () => {
        const activitiesArray = dayFormData.activities
            ? dayFormData.activities.split(',').map(a => ({ name: a.trim() })).filter(a => a.name)
            : [];

        const accommodationArray = dayFormData.accommodation
            ? dayFormData.accommodation.split(',').map(a => a.trim()).filter(a => a)
            : [];

        const mealsArray = dayFormData.meals
            ? dayFormData.meals.split(',').map(m => m.trim()).filter(m => m)
            : [];

        const dayNumber = editingDayIndex !== null
            ? formData.days[editingDayIndex].dayNumber
            : formData.days.length + 1;

        const updatedDay: ItineraryDay = {
            id: dayFormData.id,
            title: dayFormData.title,
            mainTown: dayFormData.mainTown,
            description: dayFormData.description,
            accommodation: accommodationArray,
            meals: mealsArray,
            activities: activitiesArray,
            dayNumber
        };

        let updatedDays;
        if (editingDayIndex !== null) {
            updatedDays = [...formData.days];
            updatedDays[editingDayIndex] = updatedDay;
        } else {
            updatedDays = [...formData.days, updatedDay];
        }

        setFormData(prev => ({ ...prev, days: updatedDays }));
        resetDayForm();
        setIsDayFormOpen(false);

        toast({
            title: editingDayIndex !== null ? "Day Updated" : "Day Added",
            description: editingDayIndex !== null
                ? "Day has been successfully updated."
                : "New day has been added to the itinerary.",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Process day changes
            const currentItinerary = itineraries.find(i => i.packageId === selectedPackageId);
            const originalDays = currentItinerary?.days || [];

            // Delete removed days
            for (const day of originalDays) {
                if (day.id && !formData.days.some(d => d.id === day.id)) {
                    await deleteItineraryDay(day.id);
                }
            }

            // Create/update days
            const updatedDays: ItineraryDay[] = [];
            for (const day of formData.days) {
                if (day.id) {
                    const updatedDay = await updateItineraryDay(day);
                    updatedDays.push(updatedDay);
                } else {
                    // Remove id field for new days
                    const { id, ...newDay } = day;
                    const createdDay = await createItineraryDay(newDay);
                    updatedDays.push(createdDay);
                }
            }

            // Update state
            const newItinerary: Itinerary = {
                ...formData,
                id: selectedPackageId,
                packageId: selectedPackageId,
                days: updatedDays
            };

            setItineraries([newItinerary]);
            toast({ title: "Itinerary Saved", description: "Itinerary saved successfully" });

            resetForm();
            setIsDialogOpen(false);
        } catch (error: unknown) {
            const errorMessage =
                error && typeof error === "object" && "message" in error
                    ? (error as { message?: string }).message
                    : "An error occurred";
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // const handleDelete = async () => {
    //     if (!selectedPackageId) return;

    //     try {
    //         setIsLoading(true);
    //         // Delete all days for the package
    //         const days = formData.days.filter(day => day.id);
    //         for (const day of days) {
    //             if (day.id) {
    //                 await deleteItineraryDay(day.id);
    //             }
    //         }

    //         // Update state
    //         setItineraries(prev => prev.filter(item => item.packageId !== selectedPackageId));
    //         setSelectedPackageId('');
    //         toast({
    //             title: "Itinerary Deleted",
    //             description: "The itinerary has been successfully deleted.",
    //         });
    //     } catch (error) {
    //         toast({
    //             title: "Error",
    //             description: error && typeof error === "object" && "message" in error
    //                 ? (error as { message?: string }).message
    //                 : "An error occurred",
    //             variant: "destructive",
    //         });
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const editDay = (dayIndex: number) => {
        const day = formData.days[dayIndex];
        setDayFormData({
            id: day.id,
            title: day.title,
            mainTown: day.mainTown,
            description: day.description,
            accommodation: (day.accommodation || []).join(', '),
            meals: (day.meals || []).join(', '),
            activities: (day.activities || []).map(a => a.name).join(', ')
        });
        setEditingDayIndex(dayIndex);
        setIsDayFormOpen(true);
    };

    const removeDay = (dayIndex: number) => {
        const updatedDays = formData.days.filter((_, index) => index !== dayIndex);
        setFormData(prev => ({ ...prev, days: updatedDays }));
        toast({
            title: "Day Removed",
            description: "The day has been removed from the itinerary.",
        });
    };

    return (
        <div className="space-y-6">
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p>Loading...</p>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Itinerary Management</h2>
                    <p className="text-gray-600">Manage travel itineraries and daily schedules</p>
                </div>
            </div>

            {/* Package Selection */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 opacity-100">
                            <Label htmlFor="package-select">Select a Travel Package</Label>
                            <Select
                                value={selectedPackageId}
                                onValueChange={(value) => {
                                    setSelectedPackageId(value);
                                    const pkg = packages.find(p => p.id === value);
                                    if (pkg) {
                                        setFormData(prev => ({
                                            ...prev,
                                            packageId: value,
                                            duration: pkg.durationDays
                                        }));
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a package..." />
                                </SelectTrigger>
                                <SelectContent className="opacity-75">
                                    {packages.map(pkg => (
                                        <SelectItem key={pkg.id} value={pkg.id}>
                                            <div className="flex items-center gap-2">
                                                <Package className="h-4 w-4" />
                                                {pkg.title} ({pkg.durationDays} days)
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedPackageId && (
                            <div className="flex items-end gap-2">
                                <Button
                                    onClick={() => {
                                        const itinerary = itineraries.find(i => i.packageId === selectedPackageId);
                                        if (itinerary) {
                                            setEditingItinerary(itinerary);
                                            setFormData(itinerary);
                                        } else {
                                            resetForm();
                                        }
                                        setIsDialogOpen(true);
                                    }}
                                    className="bg-ceylon-tea hover:bg-ceylon-tea/90"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    {itineraries.some(i => i.packageId === selectedPackageId)
                                        ? "Edit Itinerary"
                                        : "Create Itinerary"}
                                </Button>


                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Itinerary Display */}
            {selectedPackageId ? (
                itineraries.filter(i => i.packageId === selectedPackageId).map((itinerary) => (
                    <Card key={itinerary.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{itinerary.title}</CardTitle>
                                    <CardDescription>{itinerary.description}</CardDescription>
                                    <div className="flex items-center gap-4 mt-2">
                                        <Badge variant="secondary">{itinerary.duration} Days</Badge>
                                        <Badge variant="outline">Package: {itinerary.packageId}</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Days Schedule:</p>
                                {itinerary.days.map((day: ItineraryDay, index: number) => (
                                    <div key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200">
                                        <span className="font-medium">Day {day.dayNumber}:</span> {day.title} - {day.mainTown}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No package selected</h3>
                        <p className="text-gray-500 text-center mb-4">
                            Please select a travel package to view or create an itinerary
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Create/Edit Itinerary Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItinerary ? 'Edit Itinerary' : 'Create Itinerary'}
                        </DialogTitle>
                        <DialogDescription>
                            Manage daily schedules for {packages.find(p => p.id === selectedPackageId)?.title}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Package className="h-5 w-5 text-ceylon-tea" />
                                <span className="font-medium">
                                    {packages.find(p => p.id === selectedPackageId)?.title}
                                </span>
                                <Badge className="ml-auto">{formData.duration} Days</Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                                Package ID: {selectedPackageId}
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Itinerary Days</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        resetDayForm();
                                        setIsDayFormOpen(true);
                                        setEditingDayIndex(null);
                                    }}
                                    className="border-ceylon-tea text-ceylon-tea"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Day
                                </Button>
                            </div>

                            {/* Days List */}
                            {formData.days.map((day, index) => (
                                <Card key={index} className="mb-3">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-medium">Day {day.dayNumber}: {day.title}</h4>
                                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {day.mainTown}
                                                </div>
                                                <p className="text-sm text-gray-700 mt-2">{day.description}</p>
                                                {(day.accommodation || []).length > 0 && (
                                                    <div className="flex items-center text-sm mt-2">
                                                        <Bed className="h-3 w-3 mr-1 text-ceylon-spice" />
                                                        {(day.accommodation || []).join(', ')}
                                                    </div>
                                                )}
                                                {(day.meals || []).length > 0 && (
                                                    <div className="flex items-center text-sm mt-1">
                                                        <UtensilsCrossed className="h-3 w-3 mr-1 text-ceylon-spice" />
                                                        {(day.meals || []).join(', ')}
                                                    </div>
                                                )}
                                                {(day.activities || []).length > 0 && (
                                                    <div className="text-sm mt-1">
                                                        <span className="font-medium">Activities:</span> {(day.activities || []).map(a => a.name).join(', ')}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => editDay(index)}
                                                    className="text-ceylon-tea hover:bg-ceylon-tea/10"
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeDay(index)}
                                                    className="text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Inline Add/Edit Day Form */}
                            {isDayFormOpen && (
                                <Card className="mb-4">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            {editingDayIndex !== null ? 'Edit Day' : 'Add New Day'}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Use div, not form, to avoid nesting */}
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Label htmlFor="dayTitle">Day Title</Label>
                                                    <Input
                                                        id="dayTitle"
                                                        value={dayFormData.title}
                                                        onChange={(e) => setDayFormData(prev => ({ ...prev, title: e.target.value }))}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="dayLocation">Location</Label>
                                                    <Input
                                                        id="dayLocation"
                                                        value={dayFormData.mainTown}
                                                        onChange={(e) => setDayFormData(prev => ({ ...prev, mainTown: e.target.value }))}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <Label htmlFor="dayDescription">Description</Label>
                                                <Textarea
                                                    id="dayDescription"
                                                    value={dayFormData.description}
                                                    onChange={(e) => setDayFormData(prev => ({ ...prev, description: e.target.value }))}
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Label htmlFor="dayAccommodation">Accommodation (comma separated)</Label>
                                                    <Input
                                                        id="dayAccommodation"
                                                        value={dayFormData.accommodation}
                                                        onChange={(e) => setDayFormData(prev => ({ ...prev, accommodation: e.target.value }))}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="dayMeals">Meals (comma separated)</Label>
                                                    <Input
                                                        id="dayMeals"
                                                        value={dayFormData.meals}
                                                        onChange={(e) => setDayFormData(prev => ({ ...prev, meals: e.target.value }))}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <Label htmlFor="dayActivities">Activities (comma separated)</Label>
                                                <Textarea
                                                    id="dayActivities"
                                                    value={dayFormData.activities}
                                                    onChange={(e) => setDayFormData(prev => ({ ...prev, activities: e.target.value }))}
                                                    rows={2}
                                                    placeholder="Sightseeing, Dinner, Museum visit"
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        handleDayFormSubmit();
                                                    }}
                                                >
                                                    {editingDayIndex !== null ? 'Update' : 'Add'} Day
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsDayFormOpen(false);
                                                        resetDayForm();
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="bg-ceylon-tea hover:bg-ceylon-tea/90"
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : editingItinerary ? 'Update' : 'Save'} Itinerary
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ItineraryManager;