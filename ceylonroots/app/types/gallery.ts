
export type GalleryItemType = 'image' | 'video';

export interface GalleryItem {
    id: string;
    type: GalleryItemType;
    url: string;
    thumbnailUrl?: string; // For videos
    caption: string;
    location: string;
    description?: string;
    categories: string[];
    featured?: boolean;
    submittedBy?: {
        name: string;
        email: string;
    };
    dateAdded: string;
}
