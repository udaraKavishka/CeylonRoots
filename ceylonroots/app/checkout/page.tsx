'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../components/ui/use-toast';
import BookingSummary from '../components/checkout/BookingSummary';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { TravelPackage } from '..//types/travel';

const Checkout = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [bookingPackage, setBookingPackage] = useState<TravelPackage | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const storedPackage = localStorage.getItem('bookingPackage');
        if (storedPackage) {
            setBookingPackage(JSON.parse(storedPackage));
        } else {
            toast({
                title: "No booking information found",
                description: "Please select a package to book",
                variant: "destructive",
            });
            router.push('/packages');
        }
    }, [router, toast]);

    useEffect(() => {
        if (bookingPackage) {
            localStorage.setItem('bookingPackage', JSON.stringify(bookingPackage));
        }
    }, [bookingPackage]);

    const handleSubmitBooking = async (formData: any) => {
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            toast({
                title: "Booking successful!",
                description: "Your booking has been confirmed. Check your email for details.",
            });
            localStorage.removeItem('bookingPackage');
            router.push('/');
        }, 2000);
    };

    if (!bookingPackage) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Loading booking information...</h1>
                        <Button onClick={() => router.push('/packages')}>
                            View Available Packages
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-8">
                <div className="ceylon-container">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Complete Your Booking</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Traveler Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CheckoutForm
                                        onSubmit={handleSubmitBooking}
                                        isProcessing={isProcessing}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-1">
                            <BookingSummary
                                travelPackage={bookingPackage}
                                isProcessing={isProcessing}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;