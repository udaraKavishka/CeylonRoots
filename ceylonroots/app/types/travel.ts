export type ComponentType = 'accommodation' | 'destination' | 'activity' | 'transport';

export interface TravelComponent {
    id: string;
    type: ComponentType;
    name: string;
    description: string;
    location: string;
    image: string;
    price: number;
    coordinates: {
        lat: number;
        lng: number;
    };
    duration?: number; // in hours for activities, days for accommodations
    tags?: string[];
}

export interface Accommodation extends TravelComponent {
    type: 'accommodation';
    amenities: string[];
    rating: number;
}

export interface Destination extends TravelComponent {
    type: 'destination';
    attractions: string[];
}

export interface Activity extends TravelComponent {
    type: 'activity';
    duration: number; // in hours
    difficulty?: 'easy' | 'moderate' | 'challenging';
}

export interface Transport extends TravelComponent {
    type: 'transport';
    mode: 'car' | 'train' | 'bus' | 'plane' | 'boat';
    departureLocation: string;
    arrivalLocation: string;
    departureCoordinates: {
        lat: number;
        lng: number;
    };
    arrivalCoordinates: {
        lat: number;
        lng: number;
    };
}

// New interfaces for the travel packages page

export interface ItineraryDay {
    title: string;
    location: string;
    description: string;
    accommodation?: string;
    meals?: string;
    activities?: string[];
}

export interface TravelPackage {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    price: number;
    rating: number;
    reviewCount: number;
    regions: string[];
    themes: string[];
    highlights: string[];
    gallery: string[];
    itinerary: ItineraryDay[];
    priceIncludes: string[];
    priceExcludes: string[];
}

// New interface for detailed destination information
export interface DestinationDetails {
    id: string;
    name: string;
    description: string;
    region: string;
    image: string;
    topAttraction: string;
    bestTimeToVisit: string;
    recommendedDuration: string;
    culturalTips: string;
    attractions: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    gallery: string[];
}