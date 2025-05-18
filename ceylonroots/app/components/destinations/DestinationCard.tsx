'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { MapPin, Calendar, Camera, Star, Package } from 'lucide-react';
import { DestinationDetails } from '../../types/travel';
import DestinationModal from './DestinationModal';
import Image from 'next/image';

interface DestinationCardProps {
    destination: DestinationDetails;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <Card className="destination-card group overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden relative">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-white mr-1" />
                            <span className="text-white text-sm">{destination.region}</span>
                        </div>
                    </div>
                </div>

                <CardContent className="p-5 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{destination.description}</p>

                    <div className="space-y-3">
                        <div className="flex items-start">
                            <Star className="h-4 w-4 text-ceylon-spice mt-1 flex-shrink-0" />
                            <div className="ml-2">
                                <p className="text-sm font-medium">Top Attraction</p>
                                <p className="text-sm text-gray-500">{destination.topAttraction}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Calendar className="h-4 w-4 text-ceylon-spice mt-1 flex-shrink-0" />
                            <div className="ml-2">
                                <p className="text-sm font-medium">Best Time to Visit</p>
                                <p className="text-sm text-gray-500">{destination.bestTimeToVisit}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="border-t p-4 pt-3 flex justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Camera className="mr-1 h-4 w-4" />
                        Details
                    </Button>

                    <Button
                        size="sm"
                        className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white"
                        onClick={() => router.push('/packages')}
                    >
                        <Package className="mr-1 h-4 w-4" />
                        Related Packages
                    </Button>
                </CardFooter>
            </Card>

            <DestinationModal
                destination={destination}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default DestinationCard;