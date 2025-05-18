import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel";
import { Camera } from 'lucide-react';

interface PackageGalleryProps {
    images: string[];
}

const PackageGallery: React.FC<PackageGalleryProps> = ({ images }) => {
    if (!images || images.length === 0) {
        return (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
                <Camera className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">No gallery images available</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Photo Gallery</h3>

            <Carousel className="w-full">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <div className="overflow-hidden rounded-md aspect-square">
                                    <img
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-4">
                {images.slice(0, 8).map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-md aspect-square">
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageGallery;
