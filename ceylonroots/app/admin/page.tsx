'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Package, MapPin, FileText, Calendar, Map, BarChart2, Star, Users, MessageSquare, Image } from 'lucide-react';
import PackageManager from '../components/admin/PackageManager';
import DestinationManager from '../components/admin/DestinationManager';
import BlogManager from '../components/admin/BlogManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import ItineraryManager from '../components/admin/ItineraryManager';
import TravelComponentManager from '../components/admin/TravelComponentManager';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';

interface AdminStats {
    counts: {
        packages: number; blogs: number; destinations: number;
        guides: number; reviews: number; testimonials: number; gallery: number;
    };
    topPackages: { id: number; title: string; rating: number | null; reviewCount: number | null }[];
    reviewsByRating: { rating: number; _count: { id: number } }[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Admin = () => {
    const [activeTab, setActiveTab] = useState('packages');
    const [stats, setStats] = useState<AdminStats | null>(null);

    useEffect(() => {
        if (activeTab === 'analytics') {
            fetch(`${API_BASE_URL}/admin/stats`)
                .then(r => r.json())
                .then(setStats)
                .catch(() => setStats(null));
        }
    }, [activeTab]);

    return (
        <div className="flex flex-col min-h-screen mt-4">
            {/* <Navbar /> */}

            <main className="flex-grow bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="mb-8 mt-15">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">Manage your travel website content</p>
                    </div>

                    {/* Stats Overview */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
                        {stats.map((stat, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardContent className="flex items-center p-4">
                                    <div className={`${stat.color} p-3 rounded-lg mr-3 flex-shrink-0`}>
                                        <stat.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xl font-bold truncate">{stat.value}</p>
                                        <p className="text-gray-600 text-sm truncate">{stat.label}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div> */}

                    {/* Management Tabs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Management</CardTitle>
                            <CardDescription>Add, edit, and manage your website content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-1">
                                    <TabsTrigger value="packages" className="flex items-center gap-1 py-1 text-xs">
                                        <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Packages</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="destinations" className="flex items-center gap-1 py-1 text-xs">
                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Destinations</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="blog" className="flex items-center gap-1 py-1 text-xs">
                                        <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Blog</span>
                                    </TabsTrigger>
                                    {/* <TabsTrigger value="gallery" className="flex items-center gap-1 py-1 text-xs">
                                        <Images className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Gallery</span>
                                    </TabsTrigger> */}
                                    {/* <TabsTrigger value="testimonials" className="flex items-center gap-1 py-1 text-xs">
                                        <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Testimonials</span>
                                    </TabsTrigger> */}
                                    <TabsTrigger value="itineraries" className="flex items-center gap-1 py-1 text-xs">
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Itineraries</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="components" className="flex items-center gap-1 py-1 text-xs">
                                        <Map className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Components</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="testimonials" className="flex items-center gap-1 py-1 text-xs">
                                        <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Testimonials</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="analytics" className="flex items-center gap-1 py-1 text-xs">
                                        <BarChart2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Analytics</span>
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="packages" className="mt-6">
                                    <PackageManager />
                                </TabsContent>

                                <TabsContent value="destinations" className="mt-6">
                                    <DestinationManager />
                                </TabsContent>

                                <TabsContent value="blog" className="mt-6">
                                    <BlogManager />
                                </TabsContent>

                                {/* <TabsContent value="gallery" className="mt-6">
                                    <GalleryManager />
                                </TabsContent> */}

                                <TabsContent value="testimonials" className="mt-6">
                                    <TestimonialsManager />
                                </TabsContent>

                                <TabsContent value="itineraries" className="mt-6">
                                    <ItineraryManager />
                                </TabsContent>

                                <TabsContent value="components" className="mt-6">
                                    <TravelComponentManager />
                                </TabsContent>

                                <TabsContent value="analytics" className="mt-6">
                                    {!stats ? (
                                        <div className="flex justify-center py-16">
                                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-ceylon-tea" />
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {/* Stat cards */}
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                                                {[
                                                    { label: 'Packages', value: stats.counts.packages, icon: Package, color: 'bg-blue-500' },
                                                    { label: 'Blogs', value: stats.counts.blogs, icon: FileText, color: 'bg-purple-500' },
                                                    { label: 'Destinations', value: stats.counts.destinations, icon: MapPin, color: 'bg-green-500' },
                                                    { label: 'Reviews', value: stats.counts.reviews, icon: Star, color: 'bg-yellow-500' },
                                                    { label: 'Guides', value: stats.counts.guides, icon: Users, color: 'bg-teal-500' },
                                                    { label: 'Gallery', value: stats.counts.gallery, icon: Image, color: 'bg-orange-500' },
                                                    { label: 'Testimonials', value: stats.counts.testimonials, icon: MessageSquare, color: 'bg-pink-500' },
                                                ].map(s => (
                                                    <Card key={s.label} className="overflow-hidden">
                                                        <CardContent className="flex items-center p-3">
                                                            <div className={`${s.color} p-2 rounded-lg mr-2 flex-shrink-0`}>
                                                                <s.icon className="h-4 w-4 text-white" />
                                                            </div>
                                                            <div>
                                                                <p className="text-lg font-bold">{s.value}</p>
                                                                <p className="text-gray-500 text-xs">{s.label}</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>

                                            {/* Content breakdown bar chart */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-base">Content Breakdown</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ResponsiveContainer width="100%" height={280}>
                                                        <BarChart data={[
                                                            { name: 'Packages', count: stats.counts.packages, fill: '#3b82f6' },
                                                            { name: 'Blogs', count: stats.counts.blogs, fill: '#a855f7' },
                                                            { name: 'Destinations', count: stats.counts.destinations, fill: '#22c55e' },
                                                            { name: 'Reviews', count: stats.counts.reviews, fill: '#eab308' },
                                                            { name: 'Guides', count: stats.counts.guides, fill: '#14b8a6' },
                                                            { name: 'Gallery', count: stats.counts.gallery, fill: '#f97316' },
                                                            { name: 'Testimonials', count: stats.counts.testimonials, fill: '#ec4899' },
                                                        ]}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                                            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                                                            <Tooltip />
                                                            <Bar dataKey="count" name="Count" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </CardContent>
                                            </Card>

                                            {/* Top packages radar chart */}
                                            {stats.topPackages.length > 0 && (
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-base">Top Packages by Rating</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <ResponsiveContainer width="100%" height={320}>
                                                            <RadarChart data={stats.topPackages.map(p => ({
                                                                name: p.title.length > 20 ? p.title.slice(0, 20) + '…' : p.title,
                                                                rating: p.rating ?? 0,
                                                                reviews: Math.min((p.reviewCount ?? 0) / 10, 5),
                                                            }))}>
                                                                <PolarGrid />
                                                                <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                                                                <Radar name="Rating" dataKey="rating" stroke="#2D6A4F" fill="#2D6A4F" fillOpacity={0.3} />
                                                                <Radar name="Reviews (÷10)" dataKey="reviews" stroke="#B5451B" fill="#B5451B" fillOpacity={0.2} />
                                                                <Legend />
                                                                <Tooltip />
                                                            </RadarChart>
                                                        </ResponsiveContainer>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Admin;