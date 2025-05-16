import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Calendar, MapPin, DollarSign, Star, Sparkles } from 'lucide-react';
import { TravelPackage } from '../../types/travel';

interface PackageCardProps {
    travelPackage: TravelPackage;
    onView: () => void;
    onCustomize: () => void;
    onBookNow: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
    travelPackage,
    onView,
    onBookNow
}) => {
    return (
        <Card className="ceylon-card group overflow-hidden h-full flex flex-col">
            <div className="aspect-[4/3] overflow-hidden relative">
                <img
                    src={travelPackage.image}
                    alt={travelPackage.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2 py-1 bg-ceylon-gold/80 text-white rounded-md text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-white" />
                    {travelPackage.rating.toFixed(1)}
                </div>
            </div>

            <CardHeader className="pb-2">
                <h3 className="text-xl font-bold">{travelPackage.title}</h3>
            </CardHeader>

            <CardContent className="pb-4 flex-grow">
                <p className="text-gray-600 mb-4 line-clamp-3">{travelPackage.description}</p>

                <div className="grid grid-cols-2 gap-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1 text-ceylon-spice" />
                        {travelPackage.duration} Days
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <DollarSign className="h-4 w-4 mr-1 text-ceylon-spice" />
                        From ${travelPackage.price}
                    </div>
                </div>

                <div className="flex items-start mb-3">
                    <MapPin className="h-4 w-4 text-ceylon-spice mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-500 ml-1 line-clamp-1">
                        {travelPackage.regions.join(", ")}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {travelPackage.themes.slice(0, 3).map((theme) => (
                        <span
                            key={theme}
                            className="inline-flex items-center px-2 py-1 bg-ceylon-tea/10 text-ceylon-tea text-xs rounded-full"
                        >
                            <Sparkles className="h-3 w-3 mr-1" />
                            {theme}
                        </span>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-2">
                <Button
                    variant="outline"
                    className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white w-full"
                    onClick={onView}
                >
                    View Details
                </Button>
                <Button
                    className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white w-full"
                    onClick={onBookNow}
                >
                    Book Now
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PackageCard;