import React, { useState } from 'react';
import { DestinationDetails } from '../../types/travel';
// import { Button } from '../ui/button';
// import Link from 'next/link';
import Image from 'next/image';

interface DestinationCardProps {
    destination: DestinationDetails;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {

    const [imgSrc, setImgSrc] = useState(destination.image || '/images/placeholder.jpg');

    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            {/* Image Section */}
            <div className="relative w-full h-56 sm:h-64">
                <Image
                    src={imgSrc}
                    alt={destination.name || 'Destination image'}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={() => setImgSrc('/images/placeholder.jpg')}
                />
                <span className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {destination.region || 'Unknown Region'}
                </span>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {destination.name || 'Unnamed Destination'}
                </h3>

                {destination.description ? (
                    <p className="text-gray-600 mb-3 line-clamp-3">
                        {destination.description}
                    </p>
                ) : (
                    <p className="text-gray-400 italic mb-3">No description available</p>
                )}

                <div className="mb-3">
                    <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Top Attraction:</span>{' '}
                        <span>{destination.topAttraction || 'Not specified'}</span>
                    </div>

                    {destination.attractions?.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                            {destination.attractions.slice(0, 3).map((attraction, index) => (
                                <span
                                    key={index}
                                    className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full text-xs"
                                >
                                    {attraction}
                                </span>
                            ))}
                            {destination.attractions.length > 3 && (
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                    +{destination.attractions.length - 3} more
                                </span>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-400 italic text-sm mt-1">No attractions listed</p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                    <div>
                        <span className="font-semibold">Best Time:</span>{' '}
                        <span>{destination.bestTimeToVisit || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Duration:</span>{' '}
                        <span>{destination.recommendedDuration || 'Not specified'}</span>
                    </div>
                    <div className="sm:col-span-2">
                        <span className="font-semibold">Cultural Tips:</span>{' '}
                        <span>{destination.culturalTips || 'None provided'}</span>
                    </div>
                </div>

                <div className="mt-auto pt-2">
                    {/* <Link href={`/destinationdetail/${destination.id}`} passHref>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow">
                            View Destination Details
                        </Button>
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;