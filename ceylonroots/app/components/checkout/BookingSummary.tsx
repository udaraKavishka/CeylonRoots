import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Calendar, MapPin } from 'lucide-react';
import { TravelPackage } from '../../types/travel';

interface BookingSummaryProps {
    travelPackage: TravelPackage;
    isProcessing?: boolean; 
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ travelPackage, isProcessing }) => {
    const taxAmount = travelPackage.price * 0.1;
    // Calculate total
    const totalAmount = travelPackage.price + taxAmount;

    return (
        <Card className="sticky top-4">
            <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={travelPackage.image}
                        alt={travelPackage.title}
                        className="h-full w-full object-cover"
                        width={64}
                        height={64}
                    />
                    <div>
                        <h3 className="font-medium">{travelPackage.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {travelPackage.regions.join(', ')}
                        </div>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {travelPackage.duration} Days
                </div>

                <Separator />

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Base Price</span>
                        <span>${travelPackage.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Tax (10%)</span>
                        <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-sm text-gray-500">
                        By proceeding with this booking, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingSummary;