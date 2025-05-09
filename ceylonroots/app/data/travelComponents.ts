import { TravelComponent } from '../types/travel';

// Accommodations
export const accommodations: TravelComponent[] = [
    {
        id: 'acc-1',
        type: 'accommodation',
        name: 'Cinnamon Grand Colombo',
        description: 'Luxury 5-star hotel in the heart of Colombo with world-class amenities.',
        location: 'Colombo',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 150,
        coordinates: { lat: 6.9147, lng: 79.8490 },
        tags: ['luxury', '5-star', 'pool', 'spa'],
    },
    {
        id: 'acc-2',
        type: 'accommodation',
        name: 'Heritance Kandalama',
        description: 'Iconic architectural hotel built into a rock cliff overlooking Kandalama Lake.',
        location: 'Dambulla',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 200,
        coordinates: { lat: 7.8731, lng: 80.7711 },
        tags: ['eco-friendly', 'scenic', 'luxury'],
    },
    {
        id: 'acc-3',
        type: 'accommodation',
        name: 'Amanwella Resort',
        description: 'Exclusive beachfront resort with private plunge pools and ocean views.',
        location: 'Tangalle',
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 350,
        coordinates: { lat: 6.0174, lng: 80.8200 },
        tags: ['beachfront', 'luxury', 'private pool'],
    },
    {
        id: 'acc-4',
        type: 'accommodation',
        name: 'The Secret Ella',
        description: 'Cozy boutique hotel with stunning views of Ella Gap.',
        location: 'Ella',
        image: 'https://images.unsplash.com/photo-1604952863571-b3c0f315a836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 120,
        coordinates: { lat: 6.8667, lng: 81.0466 },
        tags: ['boutique', 'mountain view', 'peaceful'],
    },
];

// Destinations
export const destinations: TravelComponent[] = [
    {
        id: 'dest-1',
        type: 'destination',
        name: 'Sigiriya Rock Fortress',
        description: 'Ancient rock fortress with stunning frescoes and panoramic views.',
        location: 'Sigiriya',
        image: 'https://images.unsplash.com/photo-1480996408299-fc0e830b5db1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 30,
        coordinates: { lat: 7.9542, lng: 80.7527 },
        tags: ['UNESCO', 'historical', 'ancient'],
    },
    {
        id: 'dest-2',
        type: 'destination',
        name: 'Temple of the Sacred Tooth Relic',
        description: 'Buddhist temple in Kandy that houses the relic of the tooth of Buddha.',
        location: 'Kandy',
        image: 'https://images.unsplash.com/photo-1578128178799-ffdd12f6b531?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 15,
        coordinates: { lat: 7.2933, lng: 80.6417 },
        tags: ['religious', 'cultural', 'UNESCO'],
    },
    {
        id: 'dest-3',
        type: 'destination',
        name: 'Yala National Park',
        description: 'Famous wildlife sanctuary known for leopards, elephants, and diverse bird species.',
        location: 'Yala',
        image: 'https://images.unsplash.com/photo-1572551280644-fa893b5e43b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 40,
        coordinates: { lat: 6.3801, lng: 81.5053 },
        tags: ['wildlife', 'safari', 'nature'],
    },
    {
        id: 'dest-4',
        type: 'destination',
        name: 'Nine Arch Bridge',
        description: 'Iconic colonial-era railway bridge surrounded by tea plantations.',
        location: 'Ella',
        image: 'https://images.unsplash.com/photo-1551211963-c3a0f959914e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 0,
        coordinates: { lat: 6.8790, lng: 81.0630 },
        tags: ['landmark', 'scenic', 'photography'],
    },
];

// Activities
export const activities: TravelComponent[] = [
    {
        id: 'act-1',
        type: 'activity',
        name: 'Whale Watching in Mirissa',
        description: 'Boat tour to spot blue whales, sperm whales, and dolphins.',
        location: 'Mirissa',
        image: 'https://images.unsplash.com/photo-1560369457-fb1181a609f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 65,
        coordinates: { lat: 5.9483, lng: 80.4283 },
        duration: 4,
        tags: ['ocean', 'wildlife', 'boat'],
    },
    {
        id: 'act-2',
        type: 'activity',
        name: 'Tea Plantation Tour',
        description: 'Guided tour of a working tea plantation and factory with tea tasting.',
        location: 'Nuwara Eliya',
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 25,
        coordinates: { lat: 6.9700, lng: 80.7700 },
        duration: 2,
        tags: ['cultural', 'educational', 'tea'],
    },
    {
        id: 'act-3',
        type: 'activity',
        name: 'Ayurvedic Spa Treatment',
        description: 'Traditional Sri Lankan Ayurvedic treatment and massage.',
        location: 'Beruwala',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 80,
        coordinates: { lat: 6.4738, lng: 79.9833 },
        duration: 2,
        tags: ['wellness', 'relaxation', 'traditional'],
    },
    {
        id: 'act-4',
        type: 'activity',
        name: 'Cooking Class',
        description: 'Learn to prepare authentic Sri Lankan curry and rice dishes.',
        location: 'Galle',
        image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 35,
        coordinates: { lat: 6.0535, lng: 80.2210 },
        duration: 3,
        tags: ['culinary', 'cultural', 'hands-on'],
    },
];

// Transport
export const transport: TravelComponent[] = [
    {
        id: 'trans-1',
        type: 'transport',
        name: 'Private Car with Driver',
        description: 'Comfortable car with an experienced local driver for flexible travel.',
        location: 'Island-wide',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 80,
        coordinates: { lat: 7.8731, lng: 80.7718 }, // Center of Sri Lanka
        tags: ['private', 'comfortable', 'flexible'],
    },
    {
        id: 'trans-2',
        type: 'transport',
        name: 'Scenic Train Journey',
        description: 'Iconic train journey through tea plantations and mountains.',
        location: 'Kandy to Ella',
        image: 'https://images.unsplash.com/photo-1578662996442-48f1e16243aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 15,
        coordinates: { lat: 7.2933, lng: 80.6417 }, // Kandy
        tags: ['scenic', 'public transport', 'experience'],
    },
    {
        id: 'trans-3',
        type: 'transport',
        name: 'Domestic Flight',
        description: 'Quick air transfer between destinations to save time.',
        location: 'Multiple Airports',
        image: 'https://images.unsplash.com/photo-1583224994076-ae183eda0cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 120,
        coordinates: { lat: 7.1824, lng: 79.8841 }, // Colombo Airport
        tags: ['fast', 'convenient', 'time-saving'],
    },
    {
        id: 'trans-4',
        type: 'transport',
        name: 'Tuk Tuk Experience',
        description: 'Local three-wheeler taxi for short city travels.',
        location: 'Urban Areas',
        image: 'https://images.unsplash.com/photo-1625643079639-fedea467ccd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        price: 10,
        coordinates: { lat: 6.9271, lng: 79.8612 }, // Colombo
        tags: ['local', 'experience', 'budget'],
    },
];

// All components combined
export const allTravelComponents: TravelComponent[] = [
    ...accommodations,
    ...destinations,
    ...activities,
    ...transport
];

// Function to get components by type
export const getComponentsByType = (type: string): TravelComponent[] => {
    switch (type) {
        case 'accommodation':
            return accommodations;
        case 'destination':
            return destinations;
        case 'activity':
            return activities;
        case 'transport':
            return transport;
        default:
            return allTravelComponents;
    }
};