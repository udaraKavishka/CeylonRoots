'use client';

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Save, Star } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";
import Image from 'next/image';

const TestimonialsManager = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<number | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        rating: '5',
        comment: '',
        image: '',
        packageName: '',
        travelDate: ''
    });

    // Mock testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "New York, USA",
            rating: 5,
            comment: "Absolutely incredible experience! The cultural immersion package exceeded all my expectations. The local guides were knowledgeable and friendly.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            packageName: "Cultural Immersion Tour",
            travelDate: "March 2024"
        },
        {
            id: 2,
            name: "Michael Chen",
            location: "Singapore",
            rating: 5,
            comment: "The adventure package was perfectly organized. Every detail was taken care of, and the scenery was breathtaking.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            packageName: "Adventure Explorer",
            travelDate: "February 2024"
        },
        {
            id: 3,
            name: "Emma Williams",
            location: "London, UK",
            rating: 5,
            comment: "Family trip was amazing! Kids loved every moment, and we created memories that will last a lifetime.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            packageName: "Family Adventure",
            travelDate: "April 2024"
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Testimonial saved",
            description: "Testimonial has been saved successfully.",
        });
        setIsCreating(false);
        setEditingTestimonial(null);
        setFormData({
            name: '',
            location: '',
            rating: '5',
            comment: '',
            image: '',
            packageName: '',
            travelDate: ''
        });
    };

    const handleEdit = (testimonialId: number) => {
        const testimonial = testimonials.find(t => t.id === testimonialId);
        if (testimonial) {
            setFormData({
                name: testimonial.name,
                location: testimonial.location,
                rating: testimonial.rating.toString(),
                comment: testimonial.comment,
                image: testimonial.image,
                packageName: testimonial.packageName,
                travelDate: testimonial.travelDate
            });
            setEditingTestimonial(testimonialId);
        }
    };

    const handleDelete = (testimonialId: number) => {
        toast({
            title: "Testimonial deleted",
            description: "Testimonial has been deleted successfully.",
            variant: "destructive"
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Testimonials</h2>
                <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Testimonial
                </Button>
            </div>

            {(isCreating || editingTestimonial) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}</CardTitle>
                        <CardDescription>Fill in the details for the testimonial</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Customer Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Sarah Johnson"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        placeholder="New York, USA"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Select
                                        value={formData.rating}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select rating" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5 Stars</SelectItem>
                                            <SelectItem value="4">4 Stars</SelectItem>
                                            <SelectItem value="3">3 Stars</SelectItem>
                                            <SelectItem value="2">2 Stars</SelectItem>
                                            <SelectItem value="1">1 Star</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="packageName">Package Name</Label>
                                    <Input
                                        id="packageName"
                                        value={formData.packageName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, packageName: e.target.value }))}
                                        placeholder="Cultural Immersion Tour"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="image">Profile Image URL</Label>
                                    <Input
                                        id="image"
                                        value={formData.image}
                                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                        placeholder="https://images.unsplash.com/..."
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="travelDate">Travel Date</Label>
                                    <Input
                                        id="travelDate"
                                        value={formData.travelDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, travelDate: e.target.value }))}
                                        placeholder="March 2024"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="comment">Comment</Label>
                                <Textarea
                                    id="comment"
                                    value={formData.comment}
                                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                                    placeholder="Share your experience with CeylonRoots..."
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Testimonial
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditingTestimonial(null);
                                        setFormData({
                                            name: '',
                                            location: '',
                                            rating: '5',
                                            comment: '',
                                            image: '',
                                            packageName: '',
                                            travelDate: ''
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
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4 flex-1">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                            <Badge variant="outline">{testimonial.location}</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex">{renderStars(testimonial.rating)}</div>
                                            <Badge variant="secondary">{testimonial.packageName}</Badge>
                                            <Badge variant="outline">{testimonial.travelDate}</Badge>
                                        </div>
                                        <p className="text-gray-600">{testimonial.comment}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(testimonial.id)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(testimonial.id)}
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

export default TestimonialsManager;