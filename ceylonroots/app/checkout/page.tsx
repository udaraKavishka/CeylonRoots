"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useToast } from "../components/ui/use-toast";
import BookingSummary from "../components/checkout/BookingSummary";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { TravelPackage } from "../types/travel";
import api, { ApiError } from "../service/api";

const Checkout = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [bookingPackage, setBookingPackage] = useState<TravelPackage | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleInvalidBooking = () => {
      toast({
        title: "No booking information found",
        description: "Please select a package to book",
        variant: "destructive",
      });
      router.push("/packages");
    };

    // Client-side check for localStorage
    const storedPackage =
      typeof window !== "undefined"
        ? localStorage.getItem("bookingPackage")
        : null;

    if (storedPackage) {
      try {
        setBookingPackage(JSON.parse(storedPackage));
      } catch (error) {
        console.error("Error parsing booking package:", error);
        handleInvalidBooking();
      }
    } else {
      handleInvalidBooking();
    }
  }, [router, toast]);

  const handleSubmitBooking = async (formData: Record<string, unknown>) => {
    setIsProcessing(true);

    try {
      const price =
        typeof bookingPackage?.price === "object"
          ? Number(bookingPackage.price)
          : Number(bookingPackage?.price ?? 0);
      const totalAmount = price * Number(formData.travelerCount);

      const bookingData = await api.post<{ id: number }>("/bookings", {
        packageId: bookingPackage?.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        travelerCount: formData.travelerCount,
        totalAmount,
        paymentMethod: formData.paymentMethod,
        specialRequests: formData.specialRequests,
      });

      if (typeof window !== "undefined") {
        localStorage.removeItem("bookingPackage");
        localStorage.setItem("lastBooking", JSON.stringify(bookingData));
      }

      router.push(`/payment?bookingId=${bookingData.id}`);
    } catch (err) {
      toast({
        title: err instanceof ApiError ? "Booking failed" : "An error occurred",
        description:
          err instanceof ApiError ? err.message : "Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (!bookingPackage) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Loading booking information...
            </h1>
            <Button onClick={() => router.push("/packages")}>
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
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Complete Your Booking
          </h1>

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
              <BookingSummary travelPackage={bookingPackage} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
