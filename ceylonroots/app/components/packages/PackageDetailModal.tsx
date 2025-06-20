'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { TravelPackage } from '../../types/travel';
import { MapPin, Calendar, DollarSign, Star, CheckCircle2 } from 'lucide-react';
import PackageGallery from './PackageGallery';
import PackagePriceBreakdown from './PackagePriceBreakdown';
import PackageItinerary from './PackageItinerary';
import Image from 'next/image';
import { packageImages, packageGalleries } from '../../data/packageImageMap';

interface PackageDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    travelPackage: TravelPackage;
    onCustomize: () => void;
    onBookNow: () => void;
}

const PackageDetailModal = ({
    isOpen,
    onClose,
    travelPackage,
    onCustomize,
    onBookNow
}: PackageDetailModalProps) => {
    const [activeTab, setActiveTab] = useState('overview');
    const router = useRouter();

    // Get local images
    const mainImage = packageImages[travelPackage.id] || "/placeholder.jpg";
    const galleryImages = packageGalleries[travelPackage.id] || [];

    const handleBookNow = () => {
        onClose();
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedPackage', JSON.stringify(travelPackage));
        }
        router.push('/checkout');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{travelPackage.title}</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                        <TabsTrigger value="gallery">Gallery</TabsTrigger>
                        <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="aspect-video overflow-hidden rounded-lg relative">
                            <Image
                                src={mainImage}
                                alt={travelPackage.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 80vw"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 mr-2 text-ceylon-spice" />
                                <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="font-semibold">{travelPackage.duration} Days</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <DollarSign className="h-5 w-5 mr-2 text-ceylon-spice" />
                                <div>
                                    <p className="text-sm text-gray-500">Starting from</p>
                                    <p className="font-semibold">${travelPackage.price} per person</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Star className="h-5 w-5 mr-2 text-ceylon-spice" />
                                <div>
                                    <p className="text-sm text-gray-500">Rating</p>
                                    <p className="font-semibold">{travelPackage.rating.toFixed(1)} / 5 ({travelPackage.reviewCount} reviews)</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Tour Description</h3>
                            <p className="text-gray-700 mb-4">{travelPackage.description}</p>

                            <div className="flex items-start mb-4">
                                <MapPin className="h-5 w-5 mr-2 text-ceylon-spice flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Destinations</p>
                                    <p className="font-medium">{travelPackage.regions.join(", ")}</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">Tour Highlights</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                {travelPackage.themes.map((highlight, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle2 className="h-5 w-5 mr-2 text-ceylon-tea flex-shrink-0 mt-0.5" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TabsContent>

                    <TabsContent value="itinerary">
                        <PackageItinerary packageId={travelPackage.id} />
                    </TabsContent>

                    <TabsContent value="gallery">
                        <PackageGallery images={galleryImages} />
                    </TabsContent>

                    <TabsContent value="pricing">
                        <PackagePriceBreakdown
                            basePrice={travelPackage.price}
                            priceIncludes={travelPackage.includes}
                            priceExcludes={travelPackage.excludes}
                        />
                    </TabsContent>
                </Tabs>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button
                        onClick={onCustomize}
                        variant="outline"
                        className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white flex-1"
                    >
                        Customize This Package
                    </Button>
                    <Button
                        onClick={handleBookNow}
                        className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white flex-1"
                    >
                        Book Now
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PackageDetailModal;