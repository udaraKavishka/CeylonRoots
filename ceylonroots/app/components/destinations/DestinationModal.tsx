'use client';

import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../../components/ui/dialog";
import { Button } from '../../components/ui/button';
import {
    Calendar,
    MapPin,
    Clock,
    Landmark,
    Utensils,
    Info,
    Camera,
    Package
} from 'lucide-react';
import { DestinationDetails } from '../../types/travel';
import { getRelatedPackages } from '../../data/destination';
import Image from 'next/image';

interface DestinationModalProps {
    destination: DestinationDetails;
    isOpen: boolean;
    onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({
    destination,
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const relatedPackages = getRelatedPackages(destination.id);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{destination.name}</DialogTitle>
                    <DialogDescription className="flex items-center text-ceylon-spice">
                        <MapPin className="h-4 w-4 mr-1" />
                        {destination.region}, Sri Lanka
                    </DialogDescription>
                </DialogHeader>

                {/* Main Image */}
                <div className="w-full rounded-md overflow-hidden mb-6 relative aspect-video">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 80vw"
                    />
                </div>

                {/* Description */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <Info className="h-5 w-5 mr-2 text-ceylon-tea" />
                            About
                        </h3>
                        <p className="text-gray-700">{destination.description}</p>
                    </div>

                    {/* Attractions */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <Landmark className="h-5 w-5 mr-2 text-ceylon-tea" />
                            Top Attractions
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {destination.attractions.map((attraction, index) => (
                                <li key={index}>{attraction}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Visit Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2 flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-ceylon-spice" />
                                Best Time to Visit
                            </h4>
                            <p className="text-gray-700">{destination.bestTimeToVisit}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2 flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-ceylon-spice" />
                                Recommended Duration
                            </h4>
                            <p className="text-gray-700">{destination.recommendedDuration}</p>
                        </div>
                    </div>

                    {/* Cultural Tips */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <Utensils className="h-5 w-5 mr-2 text-ceylon-tea" />
                            Cultural Tips
                        </h3>
                        <p className="text-gray-700">{destination.culturalTips}</p>
                    </div>

                    {/* Photo Gallery */}
                    {destination.gallery && destination.gallery.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <Camera className="h-5 w-5 mr-2 text-ceylon-tea" />
                                Photo Gallery
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {destination.gallery.map((photo, index) => (
                                    <div key={index} className="rounded-md overflow-hidden aspect-square relative">
                                        <Image
                                            src={photo}
                                            alt={`${destination.name} photo ${index + 1}`}
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-300"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Packages */}
                    {relatedPackages && relatedPackages.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <Package className="h-5 w-5 mr-2 text-ceylon-tea" />
                                Related Travel Packages
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {relatedPackages.slice(0, 2).map((pkg) => (
                                    <div key={pkg.id} className="border rounded-md p-3 flex">
                                        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden mr-3 relative">
                                            <Image
                                                src={pkg.imageUrl}
                                                alt={pkg.title}
                                                fill
                                                className="object-cover"
                                                sizes="100px"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">{pkg.title}</h4>
                                            <p className="text-sm text-gray-500">${pkg.price} • {pkg.duration} days</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="sm:order-first"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            router.push('/packages');
                            onClose();
                        }}
                        className="bg-ceylon-tea hover:bg-ceylon-tea/90"
                    >
                        View Related Packages
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DestinationModal;