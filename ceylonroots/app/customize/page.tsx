'use client';

import { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Navbar from '../components/Navbar';
import TravelPackageHeader from '../components/customize/TravelPackageHeader';
import ComponentSelector from '../components/customize/ComponentSelector';
import ItineraryTimeline from '../components/customize/ItineraryTimeline';
import CostEstimator from '../components/customize/CostEstimator';
import SubmitPanel from '../components/customize/SubmitPanel';
import EmailRequestModal from '../components/customize/EmailRequestModal';
import { TravelComponent } from '../types/travel';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CustomizePage = () => {
    const { toast } = useToast();
    const [selectedComponents, setSelectedComponents] = useState<TravelComponent[]>([]);
    const [totalCost, setTotalCost] = useState(0);
    const [duration, setDuration] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);

    interface SavedItinerary {
        id: string;
        components: TravelComponent[];
        duration: number;
        totalCost: number;
    }
    const [savedItinerary, setSavedItinerary] = useState<SavedItinerary | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const newTotalCost = selectedComponents.reduce((sum, item) => sum + item.price, 0);
        setTotalCost(newTotalCost);

        const accommodations = selectedComponents.filter(item => item.type === "accommodations").length;
        setDuration(accommodations > 0 ? accommodations : 1);
    }, [selectedComponents]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSelectedComponents((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleAddComponent = (component: TravelComponent) => {
        setSelectedComponents(prev => [...prev, component]);
        toast({
            title: "Added to itinerary",
            description: `${component.name} has been added to your travel plan.`,
            className: "bg-ceylon-tea text-white border-ceylon-tea-dark"
        });
    };

    const handleRemoveComponent = (componentId: string) => {
        setSelectedComponents(prev => prev.filter(item => item.id !== componentId));
    };

    const handleSaveItinerary = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(`${API_BASE_URL}/itineraries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    components: selectedComponents,
                    duration,
                    totalCost
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save itinerary');
            }

            const data = await response.json();
            setSavedItinerary(data);

            toast({
                title: "Itinerary saved",
                description: "Your custom travel package has been saved successfully.",
                className: "bg-ceylon-tea text-white border-ceylon-tea-dark"
            });

            return data;
        } catch {
            toast({
                title: "Save failed",
                description: "Could not save your itinerary. Please try again.",
                variant: "destructive"
            });
            return null;
        } finally {
            setIsSaving(false);
        }
    };

    const handleRequestQuotation = () => {
        setShowEmailModal(true);
    };

    const handleSubmitQuotation = async (email: string) => {
        setIsSubmitting(true);
        try {
            // First save the itinerary if not already saved
            let itineraryData = savedItinerary;
            if (!itineraryData) {
                itineraryData = await handleSaveItinerary();
            }

            if (!itineraryData) return;

            // Then submit quotation request
            const response = await fetch(`${API_BASE_URL}/quotations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itineraryId: itineraryData.id,
                    totalCost,
                    duration,
                    email
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit quotation');
            }

            setShowEmailModal(false);
            toast({
                title: "Quotation Requested!",
                description: "Our team will review your custom package and send a quote to your email soon.",
                className: "bg-ceylon-tea text-white border-ceylon-tea-dark"
            });
        } catch {
            toast({
                title: "Submission failed",
                description: "Could not submit your quotation request. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-ceylon-sand/10 to-ceylon-tea/5">
            <Navbar />

            <main className="flex-grow">
                <TravelPackageHeader duration={duration} totalCost={totalCost} />

                <div className="ceylon-container py-8 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg p-5 border border-ceylon-tea/20">
                                <ComponentSelector onAddComponent={handleAddComponent} />
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="bg-white rounded-xl shadow-lg p-5 border border-ceylon-tea/20">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-ceylon-tea text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                            <span className="font-bold">1</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-ceylon-stone">Your Custom Itinerary</h2>
                                    </div>
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <SortableContext
                                            items={selectedComponents.map(item => item.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            <ItineraryTimeline
                                                components={selectedComponents}
                                                onRemoveComponent={handleRemoveComponent}
                                            />
                                        </SortableContext>
                                    </DndContext>

                                    {selectedComponents.length === 0 && (
                                        <div className="text-center py-10 text-gray-600 bg-ceylon-sand/10 rounded-lg border border-dashed border-ceylon-tea/30">
                                            <div className="bg-ceylon-sand/20  border-dashed border-ceylon-tea/30 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ceylon-tea" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-600">Your itinerary is empty</p>
                                            <p className="text-sm mt-1">Add components from the selector to build your travel plan</p>
                                        </div>
                                    )}
                                </div>

                                <CostEstimator components={selectedComponents} totalCost={totalCost} />

                                <div className="bg-white rounded-xl shadow-lg p-5 border border-ceylon-tea/20">
                                    <SubmitPanel
                                        onSave={handleSaveItinerary}
                                        onRequestQuotation={handleRequestQuotation}
                                        isEmpty={selectedComponents.length === 0}
                                        isSaving={isSaving}
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <EmailRequestModal
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                onSubmit={handleSubmitQuotation}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default CustomizePage;