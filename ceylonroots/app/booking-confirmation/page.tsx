'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Calendar, Users, CreditCard, MapPin, Leaf, ArrowRight, Download } from 'lucide-react';

interface BookingDetails {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    travelerCount: number;
    totalAmount: number;
    status: string;
    paymentMethod: string | null;
    specialRequests: string | null;
    createdAt: string;
    package: {
        id: number;
        title: string;
        imageUrl: string | null;
        durationDays: number | null;
        price: string | null;
    };
}

function BookingConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const bookingId = searchParams.get('id');
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!bookingId) {
            // Try to get from localStorage (set just before redirect)
            const stored = localStorage.getItem('lastBooking');
            if (stored) {
                try {
                    setBooking(JSON.parse(stored));
                    setLoading(false);
                    return;
                } catch {
                    /* fall through */
                }
            }
            router.push('/packages');
            return;
        }

        fetch(`/api/bookings/${bookingId}`)
            .then(r => {
                if (!r.ok) throw new Error('Not found');
                return r.json();
            })
            .then(data => {
                setBooking(data);
                setLoading(false);
            })
            .catch(() => {
                // Try localStorage fallback
                const stored = localStorage.getItem('lastBooking');
                if (stored) {
                    try {
                        setBooking(JSON.parse(stored));
                        setLoading(false);
                        return;
                    } catch {
                        /* fall through */
                    }
                }
                setNotFound(true);
                setLoading(false);
            });
    }, [bookingId, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-ceylon-tea border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading your booking...</p>
                </div>
            </div>
        );
    }

    if (notFound || !booking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md px-4">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-700 mb-2">Booking not found</h1>
                    <p className="text-gray-500 mb-6">We couldn&apos;t find this booking. It may have been completed as a guest.</p>
                    <Link
                        href="/packages"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
                        style={{ background: 'linear-gradient(135deg, #2E8B57 0%, #1A5276 100%)' }}
                    >
                        Browse Packages <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        });

    const shortId = booking.id.slice(-8).toUpperCase();

    return (
        <div className="min-h-screen bg-gradient-to-br from-ceylon-tea/5 via-white to-ceylon-ocean/5 py-16 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Brand */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <Leaf className="h-6 w-6 text-ceylon-tea" />
                        <span className="text-xl font-bold">Ceylon<span className="text-ceylon-spice">Roots</span></span>
                    </Link>
                </div>

                {/* Success card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    {/* Top green band */}
                    <div className="h-2" style={{ background: 'linear-gradient(90deg, #2E8B57, #1A5276, #D4AF37)' }} />

                    {/* Header */}
                    <div className="px-8 pt-10 pb-8 text-center border-b border-gray-100">
                        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                            <CheckCircle className="h-10 w-10 text-ceylon-tea" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Booking Confirmed!
                        </h1>
                        <p className="text-gray-500 text-sm mb-4">
                            Thank you, <span className="font-semibold text-gray-700">{booking.firstName}</span>!
                            Your adventure is being arranged.
                        </p>
                        <div className="inline-flex items-center gap-2 bg-ceylon-tea/8 text-ceylon-tea px-4 py-2 rounded-full text-sm font-mono font-semibold">
                            Booking #{shortId}
                        </div>
                    </div>

                    {/* Package banner */}
                    {booking.package.imageUrl && (
                        <div className="relative h-48 w-full">
                            <img
                                src={booking.package.imageUrl}
                                alt={booking.package.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <div>
                                    <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Your package</p>
                                    <h2 className="text-white text-xl font-bold">{booking.package.title}</h2>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details grid */}
                    <div className="px-8 py-6 space-y-4">
                        <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Booking Summary</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 text-ceylon-tea mb-1">
                                    <Users className="h-4 w-4" />
                                    <span className="text-xs font-medium uppercase tracking-wide">Travelers</span>
                                </div>
                                <p className="font-bold text-gray-900 text-lg">{booking.travelerCount}</p>
                                <p className="text-xs text-gray-500">{booking.travelerCount === 1 ? 'person' : 'people'}</p>
                            </div>

                            {booking.package.durationDays && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-ceylon-ocean mb-1">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-xs font-medium uppercase tracking-wide">Duration</span>
                                    </div>
                                    <p className="font-bold text-gray-900 text-lg">{booking.package.durationDays}</p>
                                    <p className="text-xs text-gray-500">days</p>
                                </div>
                            )}

                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 text-ceylon-spice mb-1">
                                    <CreditCard className="h-4 w-4" />
                                    <span className="text-xs font-medium uppercase tracking-wide">Total Amount</span>
                                </div>
                                <p className="font-bold text-gray-900 text-lg">
                                    ${booking.totalAmount.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">{booking.paymentMethod ?? 'Pending payment'}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 text-ceylon-gold mb-1">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-xs font-medium uppercase tracking-wide">Booked On</span>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm leading-tight mt-1">
                                    {formatDate(booking.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Contact details */}
                        <div className="border border-gray-100 rounded-xl p-4 space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contact Details</h4>
                            <div className="flex flex-col gap-1 text-sm text-gray-700">
                                <span><span className="text-gray-400">Name: </span>{booking.firstName} {booking.lastName}</span>
                                <span><span className="text-gray-400">Email: </span>{booking.email}</span>
                                <span><span className="text-gray-400">Phone: </span>{booking.phone}</span>
                            </div>
                        </div>

                        {booking.specialRequests && (
                            <div className="border border-amber-100 bg-amber-50 rounded-xl p-4">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">Special Requests</h4>
                                <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                            </div>
                        )}
                    </div>

                    {/* What's next */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                        <h3 className="font-semibold text-gray-700 mb-4">What happens next?</h3>
                        <ol className="space-y-3">
                            {[
                                'A confirmation email has been sent to ' + booking.email,
                                'Our team will review your booking within 24 hours',
                                'You\'ll receive a detailed itinerary and payment instructions',
                                'Get ready for an unforgettable Sri Lanka adventure!',
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                    <span className="w-5 h-5 rounded-full bg-ceylon-tea text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                                        {i + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Actions */}
                    <div className="px-8 py-6 flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/profile"
                            className="flex-1 text-center py-3 rounded-xl font-semibold text-sm text-white transition-all shadow-md hover:shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #2E8B57 0%, #1A5276 100%)' }}
                        >
                            View My Bookings
                        </Link>
                        <Link
                            href="/packages"
                            className="flex-1 text-center py-3 rounded-xl font-semibold text-sm text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-all"
                        >
                            Browse More Packages
                        </Link>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Questions? Email us at{' '}
                    <a href="mailto:bookings@ceylonroots.com" className="text-ceylon-tea hover:underline">
                        bookings@ceylonroots.com
                    </a>
                </p>
            </div>
        </div>
    );
}

export default function BookingConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-ceylon-tea border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <BookingConfirmationContent />
        </Suspense>
    );
}
