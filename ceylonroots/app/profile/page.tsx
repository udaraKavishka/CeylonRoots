"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  User,
  Calendar,
  Package,
  LogOut,
  Clock,
  Heart,
  Edit2,
  Trash2,
  ShieldCheck,
  Star,
  Save,
  X,
} from "lucide-react";
import { TravelPackage } from "../types/travel";
import { useCurrency } from "../contexts/CurrencyContext";
import { getAdminDashboardUrl } from "../lib/admin-url";

interface Booking {
  id: string;
  packageId: number;
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

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { format } = useCurrency();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  // Wishlist state
  const [wishlistPackages, setWishlistPackages] = useState<TravelPackage[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);

  // Edit profile state
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  // Delete account confirmation
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/bookings?userId=${session.user.id}`)
        .then((r) => r.json())
        .then((data) => {
          setBookings(Array.isArray(data) ? data : []);
        })
        .catch(() => {})
        .finally(() => setBookingsLoading(false));
    }
  }, [session?.user?.id]);

  const loadWishlist = async () => {
    if (wishlistLoaded) return;
    setWishlistLoading(true);
    try {
      const ids: string[] = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      if (ids.length === 0) {
        setWishlistPackages([]);
        return;
      }
      const res = await fetch(`${API_BASE_URL}/packages`);
      if (!res.ok) throw new Error("Failed");
      const all: TravelPackage[] = await res.json();
      setWishlistPackages(all.filter((p) => ids.includes(String(p.id))));
    } catch {
      setWishlistPackages([]);
    } finally {
      setWishlistLoading(false);
      setWishlistLoaded(true);
    }
  };

  const removeFromWishlist = (pkgId: string) => {
    const ids: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const updated = ids.filter((i) => i !== pkgId);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlistPackages((prev) => prev.filter((p) => p.id !== pkgId));
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) return;
    setEditSaving(true);
    try {
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });
    } catch {
      /* silently fail */
    } finally {
      setEditSaving(false);
      setEditing(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await fetch("/api/user/profile", { method: "DELETE" });
    } catch {
      /* silently fail */
    }
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-ceylon-tea border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const upcoming = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  );
  const past = bookings.filter((b) => b.status === "completed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  const user = session!.user!;
  const displayName = user.name ?? user.email ?? "Traveler";
  const initials = displayName
    .split(" ")
    .map((p: string) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const isAdmin =
    (user as { role?: string }).role === "admin" ||
    user.email === "admin@ceylonroots.com";

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {booking.package.imageUrl && (
          <div className="sm:w-36 h-28 sm:h-auto flex-shrink-0">
            <img
              src={booking.package.imageUrl}
              alt={booking.package.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-gray-800">
                {booking.package.title}
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                #{booking.id.slice(-8).toUpperCase()}
              </p>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full border font-medium capitalize shrink-0 ${statusColors[booking.status] ?? "bg-gray-100 text-gray-700"}`}
            >
              {booking.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
            {booking.package.durationDays && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-ceylon-tea" />
                {booking.package.durationDays} days
              </span>
            )}
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-ceylon-ocean" />
              {booking.travelerCount} traveler
              {booking.travelerCount !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-ceylon-spice" />
              {new Date(booking.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-ceylon-tea">
              ${booking.totalAmount.toLocaleString()}
            </span>
            <Link href={`/booking-confirmation?id=${booking.id}`}>
              <Button variant="outline" size="sm" className="text-xs h-7">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyBookings = ({ label }: { label: string }) => (
    <div className="text-center py-12 text-gray-400">
      <Package className="h-10 w-10 mx-auto mb-3 opacity-30" />
      <p className="text-sm">No {label} bookings</p>
      <Link href="/packages">
        <Button variant="outline" size="sm" className="mt-4 text-xs">
          Browse Packages
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="ceylon-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ─── Sidebar ─── */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="pt-6 pb-5 px-5">
                <div className="flex flex-col items-center text-center mb-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3 shadow-md overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #2E8B57, #1A5276)",
                    }}
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {displayName}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                  {isAdmin && (
                    <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-ceylon-spice/10 text-ceylon-spice font-medium">
                      <ShieldCheck className="h-3 w-3" /> Admin
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs mb-5">
                  <div className="bg-gray-50 rounded-lg py-2">
                    <div className="font-bold text-xl text-ceylon-tea">
                      {bookings.length}
                    </div>
                    <div className="text-gray-400">Bookings</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg py-2">
                    <div className="font-bold text-xl text-ceylon-ocean">
                      {upcoming.length}
                    </div>
                    <div className="text-gray-400">Upcoming</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {isAdmin && (
                    <Link href={getAdminDashboardUrl()}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start gap-2"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" /> Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-3.5 w-3.5" /> Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-3 px-5">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Quick Links
                </p>
                <div className="space-y-1">
                  {[
                    {
                      href: "/packages",
                      label: "Browse Packages",
                      icon: <Package className="h-3.5 w-3.5" />,
                    },
                    {
                      href: "/wishlist",
                      label: "My Wishlist",
                      icon: <Heart className="h-3.5 w-3.5" />,
                    },
                    {
                      href: "/guides",
                      label: "Find a Guide",
                      icon: <User className="h-3.5 w-3.5" />,
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-ceylon-tea py-1.5 transition-colors"
                    >
                      {link.icon} {link.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── Main content ─── */}
          <div className="lg:col-span-3">
            <Tabs
              defaultValue="bookings"
              onValueChange={(v) => {
                if (v === "wishlist") loadWishlist();
              }}
            >
              <TabsList className="grid grid-cols-3 mb-5 bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                <TabsTrigger
                  value="bookings"
                  className="rounded-lg text-sm data-[state=active]:bg-ceylon-tea/10 data-[state=active]:text-ceylon-tea"
                >
                  <Package className="h-3.5 w-3.5 mr-1.5" /> Bookings
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="rounded-lg text-sm data-[state=active]:bg-ceylon-tea/10 data-[state=active]:text-ceylon-tea"
                >
                  <Heart className="h-3.5 w-3.5 mr-1.5" /> Wishlist
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="rounded-lg text-sm data-[state=active]:bg-ceylon-tea/10 data-[state=active]:text-ceylon-tea"
                >
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Settings
                </TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <Card>
                  <CardContent className="pt-5">
                    {bookingsLoading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-ceylon-tea border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      <Tabs defaultValue="all">
                        <TabsList className="grid grid-cols-4 mb-4 text-xs">
                          <TabsTrigger value="all">
                            All ({bookings.length})
                          </TabsTrigger>
                          <TabsTrigger value="upcoming">
                            Upcoming ({upcoming.length})
                          </TabsTrigger>
                          <TabsTrigger value="past">
                            Past ({past.length})
                          </TabsTrigger>
                          <TabsTrigger value="cancelled">
                            Cancelled ({cancelled.length})
                          </TabsTrigger>
                        </TabsList>
                        {[
                          { key: "all", list: bookings, label: "current" },
                          {
                            key: "upcoming",
                            list: upcoming,
                            label: "upcoming",
                          },
                          { key: "past", list: past, label: "past" },
                          {
                            key: "cancelled",
                            list: cancelled,
                            label: "cancelled",
                          },
                        ].map(({ key, list, label }) => (
                          <TabsContent key={key} value={key}>
                            {list.length === 0 ? (
                              <EmptyBookings label={label} />
                            ) : (
                              <div className="space-y-3">
                                {list.map((b) => (
                                  <BookingCard key={b.id} booking={b} />
                                ))}
                              </div>
                            )}
                          </TabsContent>
                        ))}
                      </Tabs>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card>
                  <CardContent className="pt-5">
                    {wishlistLoading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-ceylon-tea border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : wishlistPackages.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm mb-2">
                          Your wishlist is empty
                        </p>
                        <p className="text-gray-400 text-xs mb-5">
                          Click the heart icon on any package to save it here.
                        </p>
                        <Link href="/packages">
                          <Button
                            size="sm"
                            className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white"
                          >
                            Browse Packages
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {wishlistPackages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={
                                  pkg.imageUrl ??
                                  pkg.image ??
                                  "/placeholder.jpg"
                                }
                                alt={pkg.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 text-sm truncate">
                                {pkg.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />{" "}
                                  {(
                                    pkg as {
                                      duration?: number;
                                      durationDays?: number;
                                    }
                                  ).duration ||
                                    (
                                      pkg as {
                                        duration?: number;
                                        durationDays?: number;
                                      }
                                    ).durationDays}{" "}
                                  days
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                  {pkg.rating?.toFixed(1)}
                                </span>
                              </div>
                              <p className="font-semibold text-ceylon-tea text-sm mt-1">
                                {format(
                                  typeof pkg.price === "object"
                                    ? Number(pkg.price)
                                    : pkg.price
                                )}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Link href="/packages">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-7"
                                >
                                  View
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-7 text-red-400 hover:text-red-600 hover:bg-red-50"
                                onClick={() => removeFromWishlist(pkg.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Edit2 className="h-4 w-4 text-ceylon-tea" /> Profile
                        Information
                      </h3>
                      {editing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                              Display Name
                            </label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30 focus:border-ceylon-tea"
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleSaveProfile}
                              disabled={editSaving || !editName.trim()}
                              className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white gap-1.5"
                            >
                              <Save className="h-3.5 w-3.5" />
                              {editSaving ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditing(false)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">Name</p>
                            <p className="text-sm text-gray-700 font-medium">
                              {displayName}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              Email
                            </p>
                            <p className="text-sm text-gray-700">
                              {user.email}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditName(displayName);
                              setEditing(true);
                            }}
                            className="gap-1.5 mt-2"
                          >
                            <Edit2 className="h-3.5 w-3.5" /> Edit Profile
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-red-100">
                    <CardContent className="pt-5">
                      <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                        <Trash2 className="h-4 w-4" /> Danger Zone
                      </h3>
                      {!confirmDelete ? (
                        <div>
                          <p className="text-sm text-gray-500 mb-4">
                            Permanently delete your account and all associated
                            data. This cannot be undone.
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={() => setConfirmDelete(true)}
                          >
                            Delete Account
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <p className="text-sm font-semibold text-red-700 mb-2">
                            Are you absolutely sure?
                          </p>
                          <p className="text-xs text-red-500 mb-4">
                            This will permanently delete your account, all
                            bookings, and saved data.
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={handleDeleteAccount}
                            >
                              Yes, Delete My Account
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setConfirmDelete(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
