import React from 'react';
import { GalleryItem } from '../../types/gallery';
import { Image, Video, Play } from 'lucide-react';

interface GalleryGridProps {
    items: GalleryItem[];
    onItemClick: (index: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, onItemClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer hover-scale"
                    onClick={() => onItemClick(index)}
                >
                    <div className="aspect-square overflow-hidden bg-gray-100">
                        {item.type === 'image' ? (
                            <img
                                src={item.url}
                                alt={item.caption}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                        ) : (
                            <div className="relative w-full h-full">
                                <img
                                    src={item.thumbnailUrl || item.url}
                                    alt={item.caption}
                                    className="w-full h-full object-cover brightness-75"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play size={48} className="text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1">
                        {item.type === 'image' ? (
                            <Image size={16} />
                        ) : (
                            <Video size={16} />
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <h3 className="text-white text-sm font-medium truncate">{item.caption}</h3>
                        <p className="text-white/80 text-xs">{item.location}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GalleryGrid;