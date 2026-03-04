import { TravelComponent } from "../types/travel";

// Accommodations
export const accommodations: TravelComponent[] = [
  {
    id: "acc-1",
    type: "accommodations",
    name: "Cinnamon Grand Colombo",
    description:
      "Luxury 5-star hotel in the heart of Colombo with world-class amenities.",
    location: "Colombo",
    image: "/images/home/img1.jpg",
    price: 150,
    coordinates: { lat: 6.9147, lng: 79.849 },
    duration: 1,
    tags: ["luxury", "5-star", "pool", "spa"],
    amenities: ["Pool", "Spa", "Restaurant", "Free WiFi"],
    rating: 4.7,
  },
  {
    id: "acc-2",
    type: "accommodations",
    name: "Heritance Kandalama",
    description:
      "Iconic architectural hotel built into a rock cliff overlooking Kandalama Lake.",
    location: "Dambulla",
    image: "/images/home/img1.jpg",
    price: 200,
    coordinates: { lat: 7.8731, lng: 80.7711 },
    duration: 1,
    tags: ["eco-friendly", "scenic", "luxury"],
    amenities: ["Swimming Pool", "Spa", "Restaurant", "Free WiFi"],
    rating: 4.8,
  },
  {
    id: "acc-3",
    type: "accommodations",
    name: "Amanwella Resort",
    description:
      "Exclusive beachfront resort with private plunge pools and ocean views.",
    location: "Tangalle",
    image: "/images/home/img1.jpg",
    price: 350,
    coordinates: { lat: 6.0174, lng: 80.82 },
    duration: 1,
    tags: ["beachfront", "luxury", "private pool"],
    amenities: ["Private Pool", "Beach Access", "Restaurant", "Spa"],
    rating: 4.9,
  },
  {
    id: "acc-4",
    type: "accommodations",
    name: "The Secret Ella",
    description: "Cozy boutique hotel with stunning views of Ella Gap.",
    location: "Ella",
    image: "/images/home/img1.jpg",
    price: 120,
    coordinates: { lat: 6.8667, lng: 81.0466 },
    duration: 1,
    tags: ["boutique", "mountain view", "peaceful"],
    amenities: ["Garden", "Restaurant", "Free WiFi", "Terrace"],
    rating: 4.5,
  },
];

// Destinations
export const destinations: TravelComponent[] = [
  {
    id: "dest-1",
    type: "destination",
    name: "Sigiriya Rock Fortress",
    description:
      "Ancient rock fortress with stunning frescoes and panoramic views.",
    location: "Sigiriya",
    image: "/images/home/img1.jpg",
    price: 30,
    coordinates: { lat: 7.9542, lng: 80.7527 },
    duration: 3,
    tags: ["UNESCO", "historical", "ancient"],
    attractions: ["Rock Fortress", "Frescoes", "Water Gardens", "Mirror Wall"],
  },
  {
    id: "dest-2",
    type: "destination",
    name: "Temple of the Sacred Tooth Relic",
    description:
      "Buddhist temple in Kandy that houses the relic of the tooth of Buddha.",
    location: "Kandy",
    image: "/images/home/img1.jpg",
    price: 15,
    coordinates: { lat: 7.2933, lng: 80.6417 },
    duration: 2,
    tags: ["religious", "cultural", "UNESCO"],
    attractions: ["Tooth Relic", "Museum", "Evening Puja Ceremony"],
  },
  {
    id: "dest-3",
    type: "destination",
    name: "Yala National Park",
    description:
      "Famous wildlife sanctuary known for leopards, elephants, and diverse bird species.",
    location: "Yala",
    image: "/images/home/img1.jpg",
    price: 40,
    coordinates: { lat: 6.3801, lng: 81.5053 },
    duration: 8,
    tags: ["wildlife", "safari", "nature"],
    attractions: ["Leopard Safari", "Elephant Sightings", "Bird Watching"],
  },
  {
    id: "dest-4",
    type: "destination",
    name: "Nine Arch Bridge",
    description:
      "Iconic colonial-era railway bridge surrounded by tea plantations.",
    location: "Ella",
    image: "/images/home/img1.jpg",
    price: 0,
    coordinates: { lat: 6.879, lng: 81.063 },
    duration: 1,
    tags: ["landmark", "scenic", "photography"],
    attractions: ["Bridge Viewing", "Train Spotting", "Tea Estate Walk"],
  },
];

// Activities
export const activities: TravelComponent[] = [
  {
    id: "act-1",
    type: "activities",
    name: "Whale Watching in Mirissa",
    description: "Boat tour to spot blue whales, sperm whales, and dolphins.",
    location: "Mirissa",
    image: "/images/home/img1.jpg",
    price: 65,
    coordinates: { lat: 5.9483, lng: 80.4283 },
    duration: 4,
    tags: ["ocean", "wildlife", "boat"],
    difficulty: "EASY",
  },
  {
    id: "act-2",
    type: "activities",
    name: "Tea Plantation Tour",
    description:
      "Guided tour of a working tea plantation and factory with tea tasting.",
    location: "Nuwara Eliya",
    image: "/images/home/img1.jpg",
    price: 25,
    coordinates: { lat: 6.97, lng: 80.77 },
    duration: 2,
    tags: ["cultural", "educational", "tea"],
    difficulty: "EASY",
  },
  {
    id: "act-3",
    type: "activities",
    name: "Ayurvedic Spa Treatment",
    description: "Traditional Sri Lankan Ayurvedic treatment and massage.",
    location: "Beruwala",
    image: "/images/home/img1.jpg",
    price: 80,
    coordinates: { lat: 6.4738, lng: 79.9833 },
    duration: 2,
    tags: ["wellness", "relaxation", "traditional"],
    difficulty: "EASY",
  },
  {
    id: "act-4",
    type: "activities",
    name: "Cooking Class",
    description: "Learn to prepare authentic Sri Lankan curry and rice dishes.",
    location: "Galle",
    image: "/images/home/img1.jpg",
    price: 35,
    coordinates: { lat: 6.0535, lng: 80.221 },
    duration: 3,
    tags: ["culinary", "cultural", "hands-on"],
    difficulty: "EASY",
  },
];

// Transport
export const transport: TravelComponent[] = [
  {
    id: "trans-1",
    type: "transport",
    name: "Private Car with Driver",
    description:
      "Comfortable car with an experienced local driver for flexible travel.",
    location: "Island-wide",
    image: "/images/home/img1.jpg",
    price: 80,
    coordinates: { lat: 7.8731, lng: 80.7718 },
    duration: 4,
    tags: ["private", "comfortable", "flexible"],
    mode: "CAR",
    departureLocation: "Colombo",
    arrivalLocation: "Destination",
    departureCoordinates: { lat: 6.9271, lng: 79.8612 },
    arrivalCoordinates: { lat: 7.8731, lng: 80.7718 },
  },
  {
    id: "trans-2",
    type: "transport",
    name: "Scenic Train Journey",
    description: "Iconic train journey through tea plantations and mountains.",
    location: "Kandy to Ella",
    image: "/images/home/img1.jpg",
    price: 15,
    coordinates: { lat: 7.2933, lng: 80.6417 },
    duration: 7,
    tags: ["scenic", "public transport", "experience"],
    mode: "TRAIN",
    departureLocation: "Kandy",
    arrivalLocation: "Ella",
    departureCoordinates: { lat: 7.2985, lng: 80.6356 },
    arrivalCoordinates: { lat: 6.8667, lng: 81.0466 },
  },
  {
    id: "trans-3",
    type: "transport",
    name: "Domestic Flight",
    description: "Quick air transfer between destinations to save time.",
    location: "Multiple Airports",
    image: "/images/home/img1.jpg",
    price: 120,
    coordinates: { lat: 7.1824, lng: 79.8841 },
    duration: 1,
    tags: ["fast", "convenient", "time-saving"],
    mode: "PLANE",
    departureLocation: "Colombo Airport",
    arrivalLocation: "Destination",
    departureCoordinates: { lat: 7.1803, lng: 79.8841 },
    arrivalCoordinates: { lat: 6.9271, lng: 79.8612 },
  },
  {
    id: "trans-4",
    type: "transport",
    name: "Tuk Tuk Experience",
    description: "Local three-wheeler taxi for short city travels.",
    location: "Urban Areas",
    image: "/images/home/img1.jpg",
    price: 10,
    coordinates: { lat: 6.9271, lng: 79.8612 },
    duration: 1,
    tags: ["local", "experience", "budget"],
    mode: "CAR",
    departureLocation: "City Center",
    arrivalLocation: "Destination",
    departureCoordinates: { lat: 6.9271, lng: 79.8612 },
    arrivalCoordinates: { lat: 6.9271, lng: 79.8612 },
  },
];

// All components combined
export const allTravelComponents: TravelComponent[] = [
  ...accommodations,
  ...destinations,
  ...activities,
  ...transport,
];

// Function to get components by type
export const getComponentsByType = (type: string): TravelComponent[] => {
  switch (type) {
    case "accommodations":
      return accommodations;
    case "destination":
      return destinations;
    case "activities":
      return activities;
    case "transport":
      return transport;
    default:
      return allTravelComponents;
  }
};
