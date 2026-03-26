/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Building2,
  Leaf,
  Lock,
  ChevronRight,
  CheckCircle,
  Users,
  Calendar,
  Shield,
  AlertCircle,
} from "lucide-react";

interface BookingData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  travelerCount: number;
  totalAmount: number;
  status: string;
  paymentMethod: string | null;
  package: {
    id: number;
    title: string;
    imageUrl: string | null;
    durationDays: number | null;
    price: string | null;
  };
}

type PaymentTab = "card" | "bank";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId");

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<PaymentTab>("card");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!bookingId) {
      const stored = localStorage.getItem("lastBooking");
      if (stored) {
        try {
          setBooking(JSON.parse(stored));
        } catch {
          /* */
        }
      }
      setLoading(false);
      return;
    }
    fetch(`/api/bookings/${bookingId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setBooking(d))
      .catch(() => {
        const stored = localStorage.getItem("lastBooking");
        if (stored)
          try {
            setBooking(JSON.parse(stored));
          } catch {
            /* */
          }
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  const formatCard = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handlePay = async () => {
    setError("");
    if (tab === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        setError("Enter a valid card number.");
        return;
      }
      if (!cardName.trim()) {
        setError("Enter the cardholder name.");
        return;
      }
      if (expiry.length < 5) {
        setError("Enter a valid expiry date.");
        return;
      }
      if (cvv.length < 3) {
        setError("Enter a valid CVV.");
        return;
      }
    }

    setProcessing(true);
    try {
      const id = bookingId || booking?.id;
      if (id) {
        await fetch(`/api/bookings/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "confirmed",
            paymentMethod: tab === "card" ? "Credit Card" : "Bank Transfer",
          }),
        });
      }
      // Update localStorage backup
      if (booking) {
        localStorage.setItem(
          "lastBooking",
          JSON.stringify({
            ...booking,
            status: "confirmed",
            paymentMethod: tab === "card" ? "Credit Card" : "Bank Transfer",
          })
        );
      }
      router.push(`/booking-confirmation?id=${id || ""}`);
    } catch {
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-ceylon-tea border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const amount = booking?.totalAmount ?? 0;
  const shortId = booking?.id?.slice(-8).toUpperCase() ?? "—";

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0f7f4 0%, #fafaf8 50%, #eef3f8 100%)",
      }}
    >
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-ceylon-tea" />
            <span className="font-bold text-lg">
              Ceylon<span className="text-ceylon-spice">Roots</span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Lock className="h-3.5 w-3.5 text-ceylon-tea" />
            <span>Secured with SSL encryption</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <span>Booking Details</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ceylon-tea font-medium">Payment</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Confirmation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── LEFT: PAYMENT FORM ── */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Color bar */}
              <div
                className="h-1"
                style={{
                  background:
                    "linear-gradient(90deg, #2E8B57, #1A5276, #D4AF37)",
                }}
              />
              <div className="p-6 md:p-8">
                <h2
                  className="text-xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Complete Your Payment
                </h2>

                {/* Payment method tabs */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setTab("card")}
                    className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                      tab === "card"
                        ? "border-ceylon-tea bg-ceylon-tea/5 text-ceylon-tea"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Credit / Debit Card
                  </button>
                  <button
                    onClick={() => setTab("bank")}
                    className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                      tab === "bank"
                        ? "border-ceylon-tea bg-ceylon-tea/5 text-ceylon-tea"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    Bank Transfer
                  </button>
                </div>

                {/* Card form */}
                {tab === "card" && (
                  <div className="space-y-4">
                    {/* Card number with card type icons */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(formatCard(e.target.value))
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-tea/20 focus:border-ceylon-tea transition font-mono"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                          <div className="w-8 h-5 rounded bg-blue-600 flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">
                              VISA
                            </span>
                          </div>
                          <div className="w-8 h-5 rounded bg-red-500 flex items-center justify-center">
                            <span className="text-white text-[7px] font-bold">
                              MC
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name as on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-tea/20 focus:border-ceylon-tea transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) =>
                            setExpiry(formatExpiry(e.target.value))
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-tea/20 focus:border-ceylon-tea transition font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                          CVV
                        </label>
                        <input
                          type="password"
                          inputMode="numeric"
                          placeholder="•••"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) =>
                            setCvv(
                              e.target.value.replace(/\D/g, "").slice(0, 4)
                            )
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-tea/20 focus:border-ceylon-tea transition font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank transfer instructions */}
                {tab === "bank" && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
                    <h4 className="font-semibold text-blue-800 text-sm">
                      Bank Transfer Instructions
                    </h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div className="flex justify-between">
                        <span className="text-blue-500">Bank:</span>
                        <span className="font-medium">
                          Commercial Bank of Ceylon
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-500">Account Name:</span>
                        <span className="font-medium">CeylonRoots Pvt Ltd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-500">Account No:</span>
                        <span className="font-medium font-mono">
                          8001234567
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-500">Reference:</span>
                        <span className="font-medium font-mono">{shortId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-500">Amount:</span>
                        <span className="font-bold">
                          ${amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-blue-500 pt-1">
                      After transfer, click &quot;Confirm Payment&quot; below.
                      Our team will verify within 24 hours.
                    </p>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-4">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Pay button */}
                <button
                  onClick={handlePay}
                  disabled={processing}
                  className="mt-6 w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #2E8B57 0%, #1A5276 100%)",
                  }}
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      {tab === "bank"
                        ? "Confirm Payment"
                        : `Pay $${amount.toLocaleString()}`}
                    </>
                  )}
                </button>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  {[
                    {
                      icon: <Shield className="h-3.5 w-3.5" />,
                      label: "256-bit SSL",
                    },
                    {
                      icon: <Lock className="h-3.5 w-3.5" />,
                      label: "PCI Compliant",
                    },
                    {
                      icon: <CheckCircle className="h-3.5 w-3.5" />,
                      label: "Secure Checkout",
                    },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1 text-xs text-gray-400"
                    >
                      {icon}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Package card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div
                className="h-1"
                style={{
                  background: "linear-gradient(90deg, #D4AF37, #2E8B57)",
                }}
              />
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Order Summary
                </h3>

                {booking?.package.imageUrl && (
                  <div
                    className="relative rounded-xl overflow-hidden mb-4"
                    style={{ height: "140px" }}
                  >
                    <img
                      src={booking.package.imageUrl}
                      alt={booking.package.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                      <p className="text-white font-semibold text-sm leading-tight">
                        {booking?.package.title}
                      </p>
                    </div>
                  </div>
                )}

                {!booking?.package.imageUrl && booking && (
                  <p className="font-semibold text-gray-900 mb-3">
                    {booking.package.title}
                  </p>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4 text-ceylon-tea flex-shrink-0" />
                    <span>
                      {booking?.travelerCount ?? "—"}{" "}
                      {booking?.travelerCount === 1 ? "traveler" : "travelers"}
                    </span>
                  </div>
                  {booking?.package.durationDays && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-ceylon-tea flex-shrink-0" />
                      <span>{booking.package.durationDays} days</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>${amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Taxes & fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-ceylon-tea">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking reference */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                Booking Reference
              </p>
              <p className="font-mono font-bold text-gray-800 text-lg">
                #{shortId}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {booking?.firstName} {booking?.lastName}
              </p>
              <p className="text-xs text-gray-400">{booking?.email}</p>
            </div>

            {/* Free cancellation note */}
            <div className="flex items-start gap-2.5 text-sm text-gray-600 bg-green-50 border border-green-100 rounded-xl p-4">
              <CheckCircle className="h-4 w-4 text-ceylon-tea flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-ceylon-tea text-xs uppercase tracking-wide mb-0.5">
                  Free Cancellation
                </p>
                <p className="text-xs text-gray-500">
                  Cancel up to 30 days before departure for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-ceylon-tea border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
