// export type ComponentType =
//   | "accommodations"
//   | "destination"
//   | "activities"
//   | "transport";

// export type Coordinates = {
//   lat: number;
//   lng: number;
// };

// export type BaseTravelComponent = {
//   id: string;
//   type: ComponentType;
//   name: string;
//   description: string;
//   location: string;
//   image: string;
//   price: number;
//   coordinates: Coordinates;
//   duration: number;
//   tags: string[];
// };

// export type AccommodationComponent = BaseTravelComponent & {
//   type: "accommodations";
//   amenities: string[];
//   rating: number;
// };

// export type ActivityDifficulty = "EASY" | "MODERATE" | "CHALLENGING";

// export type ActivityComponent = BaseTravelComponent & {
//   type: "activities";
//   difficulty: ActivityDifficulty;
// };

// export type DestinationComponent = BaseTravelComponent & {
//   type: "destination";
//   attractions: string[];
// };

// export type TransportMode = "CAR" | "TRAIN" | "BUS" | "PLANE" | "BOAT";

// export type TransportComponent = BaseTravelComponent & {
//   type: "transport";
//   mode: TransportMode;
//   departureLocation: string;
//   arrivalLocation: string;
//   departureCoordinates: Coordinates;
//   arrivalCoordinates: Coordinates;
// };

// export type TravelComponent =
//   | AccommodationComponent
//   | ActivityComponent
//   | DestinationComponent
//   | TransportComponent;

// // New interfaces for the travel packages page

// export interface ItineraryDay {
//   id: number;
//   dayNumber: number;
//   title: string;
//   mainTown: string;
//   description: string;
//   accommodation: string[];
//   meals: string[];
//   activities: string[];
//   createdAt?: string;
//   updatedAt?: string;
// }

// // export interface TravelPackage {
// //     id: string;
// //     title: string;
// //     description: string;
// //     image: string;
// //     duration: number;
// //     price: number;
// //     rating: number;
// //     reviewCount: number;
// //     regions: string[];
// //     themes: string[];
// //     highlights: string[];
// //     gallery: string[];
// //     itinerary: ItineraryDay[];
// //     priceIncludes: string[];
// //     priceExcludes: string[];
// // }

// export type TravelPackage = {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   duration: number;
//   price: number;
//   rating: number;
//   reviewCount: number;
//   regions: string[];
//   themes: string[];
//   includes: string[];
//   excludes: string[];
//   itineraryDays: {
//     dayNumber: number;
//     title: string;
//     description: string;
//     activities: { name: string }[];
//   }[];
//   gallery: string[];
// };

// // New interface for detailed destination information
// // export interface DestinationDetails {
// //     id: string;
// //     name: string;
// //     description: string;
// //     region: string;
// //     image: string;
// //     topAttraction: string;
// //     bestTimeToVisit: string;
// //     recommendedDuration: string;
// //     culturalTips: string;
// //     attractions: string[];
// //     coordinates: {
// //         lat: number;
// //         lng: number;
// //     };
// //     gallery: string[];
// // }

// export type DestinationDetails = {
//   id: number;
//   name: string;
//   description: string;
//   region: string;
//   topAttraction: string;
//   bestTimeToVisit: string;
//   recommendedDuration: string;
//   culturalTips: string;
//   image: string; // Now using local images
//   attractions: string[];
// };

export type ComponentType =
  | "accommodations"
  | "destination"
  | "activities"
  | "transport";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type BaseTravelComponent = {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  location: string;
  image: string;
  price: number;
  coordinates: Coordinates;
  duration: number;
  tags: string[];
};

export type AccommodationComponent = BaseTravelComponent & {
  type: "accommodations";
  amenities: string[];
  rating: number;
};

export type ActivityDifficulty = "EASY" | "MODERATE" | "CHALLENGING";

export type ActivityComponent = BaseTravelComponent & {
  type: "activities";
  difficulty: ActivityDifficulty;
};

export type DestinationComponent = BaseTravelComponent & {
  type: "destination";
  attractions: string[];
};

export type TransportMode = "CAR" | "TRAIN" | "BUS" | "PLANE" | "BOAT";

export type TransportComponent = BaseTravelComponent & {
  type: "transport";
  mode: TransportMode;
  departureLocation: string;
  arrivalLocation: string;
  departureCoordinates: Coordinates;
  arrivalCoordinates: Coordinates;
};

export type TravelComponent =
  | AccommodationComponent
  | ActivityComponent
  | DestinationComponent
  | TransportComponent;

export interface ItineraryDay {
  id: number;
  dayNumber: number;
  title: string;
  mainTown: string;
  description: string;
  accommodation: string[];
  meals: string[];
  activities: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type TravelPackage = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
  price: number;
  rating: number;
  reviewCount: number;
  regions: string[];
  themes: string[];
  includes: string[];
  excludes: string[];
  itineraryDays: {
    dayNumber: number;
    title: string;
    description: string;
    activities: { name: string }[];
  }[];
  gallery: string[];
};

export type DestinationDetails = {
  id: number;
  name: string;
  description: string;
  region: string;
  topAttraction: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  culturalTips: string;
  image: string;
  attractions: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  slug: string;
  tags: string[];
};