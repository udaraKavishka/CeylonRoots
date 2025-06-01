'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryLightbox from '../components/gallery/GalleryLightBox';
import SubmitPhotoForm from '../components/gallery/SubmitPhotoForm';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { galleryItems } from '../data/galleryItems';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { Camera } from 'lucide-react';

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const categories = [
        { id: "all", name: "All Photos" },
        { id: "beaches", name: "Beaches" },
        { id: "wildlife", name: "Wildlife" },
        { id: "cultural", name: "Cultural Sites" },
        { id: "adventure", name: "Adventure" },
        { id: "food", name: "Food & Cuisine" }
    ];

    const filteredItems = selectedCategory === "all"
        ? galleryItems
        : galleryItems.filter(item => item.categories.includes(selectedCategory));

    const openLightbox = (index: number) => {
        setSelectedItem(index);
    };

    const closeLightbox = () => {
        setSelectedItem(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-ceylon-tea/20 to-ceylon-spice/10 py-16">
                    <div className="ceylon-container">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Our <span className="text-ceylon-spice">Photo Gallery</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-8">
                            Explore stunning visuals from across Sri Lanka - from pristine beaches to ancient temples,
                            wildlife encounters to delicious cuisine.
                        </p>
                        <div className="flex justify-between items-center">
                            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setSelectedCategory}>
                                <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full md:w-auto">
                                    {categories.map(category => (
                                        <TabsTrigger key={category.id} value={category.id} className="text-sm">
                                            {category.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="hidden md:flex bg-ceylon-spice hover:bg-ceylon-spice/90">
                                        <Camera className="mr-2 h-4 w-4" />
                                        Submit Your Photo
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <SubmitPhotoForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="py-12">
                    <div className="ceylon-container">
                        <GalleryGrid items={filteredItems} onItemClick={openLightbox} />
                        <div className="mt-8 md:hidden flex justify-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-ceylon-spice hover:bg-ceylon-spice/90">
                                        <Camera className="mr-2 h-4 w-4" />
                                        Submit Your Photo
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <SubmitPhotoForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </main>

            {/* Lightbox */}
            {selectedItem !== null && (
                <GalleryLightbox
                    items={filteredItems}
                    selectedIndex={selectedItem}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
};

export default Gallery;