import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../../types/gallery';
import { X, ChevronLeft, ChevronRight, Share2, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface GalleryLightboxProps {
    items: GalleryItem[];
    selectedIndex: number;
    onClose: () => void;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
    items,
    selectedIndex,
    onClose
}) => {
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);
    const currentItem = items[currentIndex];

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, items.length]);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const shareItem = () => {
        if (navigator.share) {
            navigator.share({
                title: currentItem.caption,
                text: `Check out this amazing photo from Sri Lanka: ${currentItem.caption}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Link copied to clipboard!'))
                .catch(console.error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in">
            <div className="absolute top-4 right-4 z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/20"
                >
                    <X size={24} />
                </Button>
            </div>

            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPrevious}
                    className="text-white hover:bg-white/20"
                >
                    <ChevronLeft size={24} />
                </Button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToNext}
                    className="text-white hover:bg-white/20"
                >
                    <ChevronRight size={24} />
                </Button>
            </div>

            <div className="w-full max-w-5xl max-h-[80vh] flex flex-col">
                <div className="relative flex-grow flex items-center justify-center">
                    {currentItem.type === 'image' ? (
                        <img
                            src={currentItem.url}
                            alt={currentItem.caption}
                            className="max-h-[70vh] max-w-full object-contain"
                        />
                    ) : (
                        <video
                            src={currentItem.url}
                            controls
                            autoPlay
                            className="max-h-[70vh] max-w-full"
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                <div className="bg-gray-900 p-4 rounded-b-lg mt-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-white text-xl font-medium">{currentItem.caption}</h3>
                            <p className="text-gray-300 flex items-center mt-1">
                                <MapPin size={16} className="mr-1" /> {currentItem.location}
                            </p>
                            {currentItem.description && (
                                <p className="text-gray-300 mt-2">{currentItem.description}</p>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={shareItem}
                            className="text-white hover:bg-white/20"
                        >
                            <Share2 size={20} />
                        </Button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {currentItem.categories.map(category => (
                            <span key={category} className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryLightbox;