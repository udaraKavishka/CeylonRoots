'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Plus, Edit, Trash2, MapPin, Calendar, Bed, UtensilsCrossed } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import { ItineraryDay } from '../../types/travel';

interface Itinerary {
    id: string;
    title: string;
    description: string;
    packageId: string;
    duration: number;
    days: ItineraryDay[];
}

interface DayFormData {
    title: string;
    location: string;
    description: string;
    accommodation?: string;
    meals?: string;
    activities: string;
}

const ItineraryManager = () => {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItinerary, setEditingItinerary] = useState<Itinerary | null>(null);
    const [isAddingDay, setIsAddingDay] = useState(false);
    const { toast } = useToast();

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
        location: '',
        description: '',
        accommodation: '',
        meals: '',
        activities: ''
    });

    const resetForm = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            packageId: '',
            duration: 1,
            days: []
        });
        setEditingItinerary(null);
    };

    const resetDayForm = () => {
        setDayFormData({
            title: '',
            location: '',
            description: '',
            accommodation: '',
            meals: '',
            activities: ''
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItinerary) {
            setItineraries(itineraries.map(item =>
                item.id === editingItinerary.id ? { ...formData, id: editingItinerary.id } : item
            ));
            toast({
                title: "Itinerary Updated",
                description: "The itinerary has been successfully updated.",
            });
        } else {
            const newItinerary = {
                ...formData,
                id: Date.now().toString(),
            };
            setItineraries([...itineraries, newItinerary]);
            toast({
                title: "Itinerary Created",
                description: "New itinerary has been successfully created.",
            });
        }

        resetForm();
        setIsDialogOpen(false);
    };

    const handleAddDay = (e: React.FormEvent) => {
        e.preventDefault();

        const activitiesArray = dayFormData.activities
            ? dayFormData.activities.split(',').map(a => a.trim()).filter(a => a)
            : [];

        const updatedDay: ItineraryDay = {
            ...dayFormData,
            activities: activitiesArray
        };

        const updatedDays = [...formData.days, updatedDay];
        setFormData(prev => ({ ...prev, days: updatedDays }));

        resetDayForm();
        setIsAddingDay(false);

        toast({
            title: "Day Added",
            description: "New day has been added to the itinerary.",
        });
    };

    const handleEdit = (itinerary: Itinerary) => {
        setEditingItinerary(itinerary);
        setFormData(itinerary);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setItineraries(prev => prev.filter(item => item.id !== id));
        toast({
            title: "Itinerary Deleted",
            description: "The itinerary has been successfully deleted.",
        });
    };

    const removeDay = (dayIndex: number) => {
        const updatedDays = formData.days.filter((_, index) => index !== dayIndex);
        setFormData(prev => ({ ...prev, days: updatedDays }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Itinerary Management</h2>
                    <p className="text-gray-600">Manage travel itineraries and daily schedules</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm} className="bg-ceylon-tea hover:bg-ceylon-tea/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Itinerary
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingItinerary ? 'Edit Itinerary' : 'Add New Itinerary'}</DialogTitle>
                            <DialogDescription>
                                Create or edit an itinerary with daily schedules
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="packageId">Package ID</Label>
                                    <Input
                                        id="packageId"
                                        value={formData.packageId}
                                        onChange={(e) => setFormData(prev => ({ ...prev, packageId: e.target.value }))}
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
                                <Label htmlFor="duration">Duration (Days)</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    min="1"
                                    value={formData.duration}
                                    onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                                    required
                                />
                            </div>

                            <Separator />

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Itinerary Days</h3>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsAddingDay(true)}
                                        className="border-ceylon-tea text-ceylon-tea"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Day
                                    </Button>
                                </div>

                                {formData.days.map((day, index) => (
                                    <Card key={index} className="mb-3">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-medium">Day {index + 1}: {day.title}</h4>
                                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                                        <MapPin className="h-3 w-3 mr-1" />
                                                        {day.location}
                                                    </div>
                                                    <p className="text-sm text-gray-700 mt-2">{day.description}</p>
                                                    {day.accommodation && (
                                                        <div className="flex items-center text-sm mt-2">
                                                            <Bed className="h-3 w-3 mr-1 text-ceylon-spice" />
                                                            {day.accommodation}
                                                        </div>
                                                    )}
                                                    {day.meals && (
                                                        <div className="flex items-center text-sm mt-1">
                                                            <UtensilsCrossed className="h-3 w-3 mr-1 text-ceylon-spice" />
                                                            {day.meals}
                                                        </div>
                                                    )}
                                                    {day.activities && day.activities.length > 0 && (
                                                        <div className="text-sm mt-1">
                                                            <span className="font-medium">Activities:</span> {day.activities.join(', ')}
                                                        </div>
                                                    )}
                                                </div>
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
                                        </CardContent>
                                    </Card>
                                ))}

                                {isAddingDay && (
                                    <Card className="mb-4">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Add New Day</CardTitle>
                                        </CardHeader>
                                        <CardContent>
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
                                                        value={dayFormData.location}
                                                        onChange={(e) => setDayFormData(prev => ({ ...prev, location: e.target.value }))}
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
                                                    <Label htmlFor="dayAccommodation">Accommodation</Label>
                                                    <Input
                                                        id="dayAccommodation"
                                                        value={dayFormData.accommodation}
                                                        onChange={(e) => setDayFormData(prev => ({ ...prev, accommodation: e.target.value }))}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="dayMeals">Meals</Label>
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
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <Button type="button" onClick={handleAddDay}>Add Day</Button>
                                                <Button type="button" variant="outline" onClick={() => setIsAddingDay(false)}>Cancel</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="bg-ceylon-tea hover:bg-ceylon-tea/90">
                                    {editingItinerary ? 'Update' : 'Create'} Itinerary
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6">
                {itineraries.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No itineraries yet</h3>
                            <p className="text-gray-500 text-center mb-4">
                                Start by creating your first travel itinerary
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    itineraries.map((itinerary) => (
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
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(itinerary)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(itinerary.id)}
                                            className="text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Days Schedule:</p>
                                    {itinerary.days.map((day: ItineraryDay, index: number) => (
                                        <div key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200">
                                            <span className="font-medium">Day {index + 1}:</span> {day.title} - {day.location}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ItineraryManager;