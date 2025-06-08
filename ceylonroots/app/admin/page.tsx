'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { Badge } from "../components/ui/badge";
import { Package, MapPin, FileText, Images, MessageSquare, Calendar, Map } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import PackageManager from '../components/admin/PackageManager';
import DestinationManager from '../components/admin/DestinationManager';
import BlogManager from '../components/admin/BlogManager';
import GalleryManager from '../components/admin/GalleryManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import ItineraryManager from '../components/admin/ItineraryManager';
import TravelComponentManager from '../components/admin/TravelComponentManager';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('packages');

    const stats = [
        { label: 'Travel Packages', value: '3', icon: Package, color: 'bg-blue-500' },
        { label: 'Destinations', value: '6', icon: MapPin, color: 'bg-green-500' },
        { label: 'Blog Posts', value: '9', icon: FileText, color: 'bg-purple-500' },
        { label: 'Gallery Items', value: '16', icon: Images, color: 'bg-orange-500' },
        { label: 'Testimonials', value: '12', icon: MessageSquare, color: 'bg-pink-500' },
        { label: 'Itineraries', value: '8', icon: Calendar, color: 'bg-indigo-500' },
        { label: 'Components', value: '24', icon: Map, color: 'bg-teal-500' },
    ];

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
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
                    </div>

                    {/* Management Tabs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Management</CardTitle>
                            <CardDescription>Add, edit, and manage your website content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
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
                                    <TabsTrigger value="gallery" className="flex items-center gap-1 py-1 text-xs">
                                        <Images className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Gallery</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="testimonials" className="flex items-center gap-1 py-1 text-xs">
                                        <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Testimonials</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="itineraries" className="flex items-center gap-1 py-1 text-xs">
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Itineraries</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="components" className="flex items-center gap-1 py-1 text-xs">
                                        <Map className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="truncate">Components</span>
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

                                <TabsContent value="gallery" className="mt-6">
                                    <GalleryManager />
                                </TabsContent>

                                <TabsContent value="testimonials" className="mt-6">
                                    <TestimonialsManager />
                                </TabsContent>

                                <TabsContent value="itineraries" className="mt-6">
                                    <ItineraryManager />
                                </TabsContent>

                                <TabsContent value="components" className="mt-6">
                                    <TravelComponentManager />
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