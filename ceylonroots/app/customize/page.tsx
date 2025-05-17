'use client';

import { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TravelPackageHeader from '../components/customize/TravelPackageHeader';
import ComponentSelector from '../components/customize/ComponentSelector';
import ItineraryTimeline from '../components/customize/ItineraryTimeline';
import TravelMap from '../components/customize/TravelMap';
import CostEstimator from '../components/customize/CostEstimator';
import SubmitPanel from '../components/customize/SubmitPanel';
import { TravelComponent } from '../types/travel';

const CustomizePage = () => {
    const { toast } = useToast();
    const [selectedComponents, setSelectedComponents] = useState<TravelComponent[]>([]);
    const [totalCost, setTotalCost] = useState(0);
    const [duration, setDuration] = useState(1);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const newTotalCost = selectedComponents.reduce((sum, item) => sum + item.price, 0);
        setTotalCost(newTotalCost);

        const accommodations = selectedComponents.filter(item => item.type === 'accommodation').length;
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
        });
    };

    const handleRemoveComponent = (componentId: string) => {
        setSelectedComponents(prev => prev.filter(item => item.id !== componentId));
    };

    const handleSaveItinerary = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('savedItinerary', JSON.stringify(selectedComponents));
        }
        toast({
            title: "Itinerary saved",
            description: "Your custom travel package has been saved successfully.",
        });
    };

    const handleSubmitQuotation = () => {
        toast({
            title: "Quotation requested",
            description: "Our team will review your custom package and contact you soon.",
            variant: "default",
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <TravelPackageHeader duration={duration} totalCost={totalCost} />

                <div className="ceylon-container py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <ComponentSelector onAddComponent={handleAddComponent} />
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="ceylon-card p-4">
                                    <h2 className="text-lg font-bold mb-4">Your Custom Itinerary</h2>
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
                                        <div className="text-center py-10 text-gray-500">
                                            <p>Your itinerary is empty. Add components from the selector on the left.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="ceylon-card p-4">
                                    <h2 className="text-lg font-bold mb-4">Travel Route Preview</h2>
                                    <TravelMap selectedComponents={selectedComponents} />
                                </div>

                                <CostEstimator components={selectedComponents} totalCost={totalCost} />

                                <SubmitPanel
                                    onSave={handleSaveItinerary}
                                    onSubmit={handleSubmitQuotation}
                                    isEmpty={selectedComponents.length === 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CustomizePage;