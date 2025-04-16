import { TravelPackage } from '../types/travel';

export const travelPackages: TravelPackage[] = [
    {
        id: "pkg-001",
        title: "Cultural Triangle Explorer",
        description: "Discover the ancient cities of Anuradhapura, Polonnaruwa, and the rock fortress of Sigiriya on this historical journey through Sri Lanka's Cultural Triangle.",
        image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
        duration: 7,
        price: 899,
        rating: 4.8,
        reviewCount: 124,
        regions: ["Cultural Triangle", "Central Province"],
        themes: ["Culture", "History", "UNESCO Sites"],
        highlights: [
            "Climb the ancient rock fortress of Sigiriya",
            "Explore the sacred city of Anuradhapura",
            "Visit the Dambulla Cave Temple with its stunning Buddha statues",
            "Tour the medieval capital of Polonnaruwa",
            "Witness a traditional cultural performance in Kandy"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1588159229515-c7ce57451e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1589980555269-a52e346dc90a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1501179891640-9bbf5a76a2fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1624461063672-fb93119c9abb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1590168557862-3b8c59a17324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        ],
        itinerary: [
            {
                title: "Arrival in Colombo",
                location: "Colombo",
                description: "Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, you'll be met by your guide and transferred to your hotel in Colombo. Depending on your arrival time, enjoy a brief orientation tour of the city.",
                accommodation: "Cinnamon Grand Colombo",
                meals: "Dinner",
                activities: [
                    "Airport pickup and transfer",
                    "Welcome dinner",
                    "Orientation briefing"
                ]
            },
            {
                title: "Colombo to Anuradhapura",
                location: "Anuradhapura",
                description: "After breakfast, drive to the ancient city of Anuradhapura. In the afternoon, begin exploring this UNESCO World Heritage site, visiting the Sri Maha Bodhi, Ruwanwelisaya Stupa, and other key monuments.",
                accommodation: "Palm Garden Village",
                meals: "Breakfast, Lunch, Dinner",
                activities: [
                    "Sri Maha Bodhi - the sacred fig tree",
                    "Ruwanwelisaya Stupa",
                    "Jetavanaramaya",
                    "Twin Ponds (Kuttam Pokuna)"
                ]
            },
            {
                title: "Anuradhapura to Sigiriya",
                location: "Sigiriya",
                description: "Continue exploring Anuradhapura in the morning. After lunch, drive to Sigiriya. Visit the Pidurangala Rock for sunset views of Sigiriya Rock.",
                accommodation: "Jetwing Vil Uyana",
                meals: "Breakfast, Lunch",
                activities: [
                    "Morning exploration of Anuradhapura archaeological sites",
                    "Drive to Sigiriya",
                    "Sunset hike at Pidurangala Rock"
                ]
            },
            {
                title: "Sigiriya and Polonnaruwa",
                location: "Sigiriya",
                description: "Early morning climb to the Sigiriya Rock Fortress. After lunch, visit the ancient city of Polonnaruwa, Sri Lanka's medieval capital.",
                accommodation: "Jetwing Vil Uyana",
                meals: "Breakfast, Lunch, Dinner",
                activities: [
                    "Sigiriya Rock Fortress climb",
                    "Explore ancient city of Polonnaruwa",
                    "Visit Gal Vihara (Rock Temple)",
                    "Polonnaruwa archeological museum"
                ]
            },
            {
                title: "Sigiriya to Dambulla and Kandy",
                location: "Kandy",
                description: "Visit the Dambulla Cave Temple in the morning. Then drive to Kandy, stopping at a spice garden en route. Evening visit to the Temple of the Sacred Tooth Relic and a cultural performance.",
                accommodation: "Cinnamon Citadel",
                meals: "Breakfast, Dinner",
                activities: [
                    "Dambulla Cave Temple tour",
                    "Spice garden visit",
                    "Temple of the Sacred Tooth Relic",
                    "Traditional Kandyan dance performance"
                ]
            },
            {
                title: "Kandy Exploration",
                location: "Kandy",
                description: "Spend the day exploring Kandy, including the Royal Botanical Gardens, Kandy Lake, and local markets. Optional visit to an elephant sanctuary in the afternoon.",
                accommodation: "Cinnamon Citadel",
                meals: "Breakfast, Lunch",
                activities: [
                    "Royal Botanical Gardens",
                    "Kandy Lake",
                    "Local market visit",
                    "Optional: Pinnawala Elephant Orphanage"
                ]
            },
            {
                title: "Departure from Colombo",
                location: "Colombo",
                description: "Return to Colombo for your departure flight. Depending on your flight time, enjoy some last-minute shopping or sightseeing in Colombo.",
                meals: "Breakfast",
                activities: [
                    "Drive to Colombo",
                    "Optional shopping or sightseeing",
                    "Airport transfer"
                ]
            }
        ],
        priceIncludes: [
            "6 nights' accommodation as detailed in the itinerary",
            "Daily breakfast, 4 lunches, and 4 dinners",
            "Transportation in an air-conditioned vehicle",
            "English-speaking guide throughout",
            "All entrance fees to sites mentioned in the itinerary",
            "Airport pickup and drop-off",
            "Water during transportation"
        ],
        priceExcludes: [
            "International flights",
            "Travel insurance",
            "Camera fees at monuments",
            "Personal expenses (laundry, phone calls, souvenirs, etc.)",
            "Tips for guides and drivers",
            "Optional activities",
            "Meals not mentioned in the itinerary"
        ]
    },
    {
        id: "pkg-002",
        title: "Southern Coast Beach Paradise",
        description: "Relax on pristine beaches and explore vibrant coastal towns along Sri Lanka's stunning southern coastline, with plenty of time for water activities and wildlife encounters.",
        image: "https://images.unsplash.com/photo-1632752893701-39800c3015a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
        duration: 9,
        price: 1099,
        rating: 4.9,
        reviewCount: 87,
        regions: ["Southern Coast", "Southern Province"],
        themes: ["Beach", "Wildlife", "Relaxation"],
        highlights: [
            "Relax on the golden beaches of Bentota",
            "Explore the historic Galle Fort",
            "Take a wildlife safari in Yala National Park",
            "Watch for blue whales and dolphins in Mirissa",
            "Experience traditional stilt fishing in Weligama"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1586500036706-41963de24d8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1606547512270-295708d33e58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1546367070-2b3cef66dc77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1605971658793-a226dd9a80cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        ],
        itinerary: [
            {
                title: "Arrival and Transfer to Bentota",
                location: "Bentota",
                description: "Arrive in Colombo and transfer directly to the beach town of Bentota. Relax at your beachfront hotel and enjoy the sunset over the Indian Ocean.",
                accommodation: "Avani Bentota Resort",
                meals: "Dinner",
                activities: [
                    "Airport pickup and transfer to Bentota",
                    "Beach sunset",
                    "Welcome dinner"
                ]
            },
            {
                title: "Bentota Beach Day",
                location: "Bentota",
                description: "Enjoy a full day of relaxation on Bentota's golden beaches. Optional water sports activities are available, including jet skiing, windsurfing, and banana boat rides.",
                accommodation: "Avani Bentota Resort",
                meals: "Breakfast",
                activities: [
                    "Beach relaxation",
                    "Optional water sports",
                    "Optional visit to Lunuganga Estate"
                ]
            },
            {
                title: "Bentota to Galle",
                location: "Galle",
                description: "Morning drive to the historic city of Galle. Spend the afternoon exploring Galle Fort, a UNESCO World Heritage site, with its charming colonial streets and buildings.",
                accommodation: "Fort Bazaar Galle",
                meals: "Breakfast, Lunch",
                activities: [
                    "Galle Fort exploration",
                    "Historical walking tour",
                    "Sunset at the ramparts"
                ]
            },
            {
                title: "Galle Exploration",
                location: "Galle",
                description: "Enjoy a full day exploring Galle and its surroundings, including a cooking class to learn about Sri Lankan cuisine and a visit to a nearby sea turtle hatchery.",
                accommodation: "Fort Bazaar Galle",
                meals: "Breakfast, Lunch",
                activities: [
                    "Sri Lankan cooking class",
                    "Sea turtle hatchery visit",
                    "Local market tour",
                    "Free time for shopping"
                ]
            },
            {
                title: "Galle to Mirissa",
                location: "Mirissa",
                description: "Drive to the coastal town of Mirissa. Afternoon at leisure to enjoy the beach. Optional evening visit to witness stilt fishermen in Weligama.",
                accommodation: "Lantern Boutique Hotel",
                meals: "Breakfast",
                activities: [
                    "Beach relaxation",
                    "Optional stilt fishermen viewing",
                    "Sunset beach dinner (optional)"
                ]
            },
            {
                title: "Whale Watching in Mirissa",
                location: "Mirissa",
                description: "Early morning whale watching excursion (November to April is best for sightings). Afternoon at leisure to relax on the beach or explore the town.",
                accommodation: "Lantern Boutique Hotel",
                meals: "Breakfast, Lunch",
                activities: [
                    "Whale watching excursion",
                    "Beach relaxation",
                    "Optional surfing lessons"
                ]
            },
            {
                title: "Mirissa to Yala",
                location: "Yala",
                description: "Drive to Yala National Park. Afternoon safari in the park, famous for its leopard population along with elephants, sloth bears, and countless bird species.",
                accommodation: "Cinnamon Wild Yala",
                meals: "Breakfast, Dinner",
                activities: [
                    "Drive to Yala National Park",
                    "Afternoon wildlife safari",
                    "Bird watching"
                ]
            },
            {
                title: "Yala National Park",
                location: "Yala",
                description: "Early morning safari in Yala National Park to maximize wildlife sightings. Afternoon relaxation at your lodge with an optional evening safari.",
                accommodation: "Cinnamon Wild Yala",
                meals: "Breakfast, Lunch, Dinner",
                activities: [
                    "Morning wildlife safari",
                    "Afternoon relaxation",
                    "Optional evening safari"
                ]
            },
            {
                title: "Return to Colombo and Departure",
                location: "Colombo",
                description: "Drive back to Colombo for your departure flight. Depending on your flight time, enjoy some last-minute shopping or sightseeing in Colombo.",
                meals: "Breakfast",
                activities: [
                    "Drive to Colombo",
                    "Optional shopping or sightseeing",
                    "Airport transfer"
                ]
            }
        ],
        priceIncludes: [
            "8 nights' accommodation as detailed in the itinerary",
            "Daily breakfast, 3 lunches, and 3 dinners",
            "Transportation in an air-conditioned vehicle",
            "English-speaking guide throughout",
            "Whale watching excursion in Mirissa (seasonal)",
            "Safari jeep and entrance fees for Yala National Park",
            "All entrance fees to sites mentioned in the itinerary",
            "Airport pickup and drop-off",
            "Water during transportation"
        ],
        priceExcludes: [
            "International flights",
            "Travel insurance",
            "Water sports activities",
            "Camera fees at monuments and parks",
            "Personal expenses (laundry, phone calls, souvenirs, etc.)",
            "Tips for guides and drivers",
            "Optional activities",
            "Meals not mentioned in the itinerary"
        ]
    },
    {
        id: "pkg-003",
        title: "Tea Country & Wildlife Safari",
        description: "Journey through misty tea plantations, encounter diverse wildlife in national parks, and soak in breathtaking mountain scenery on this exploration of Sri Lanka's highlands and wildlife sanctuaries.",
        image: "https://images.unsplash.com/photo-1582233522182-4a34a3ecb5b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
        duration: 8,
        price: 1249,
        rating: 4.7,
        reviewCount: 63,
        regions: ["Hill Country", "Central Province", "Southern Province"],
        themes: ["Nature", "Wildlife", "Adventure"],
        highlights: [
            "Explore tea plantations and learn about tea production",
            "Scenic train journey through the highlands",
            "Hike to World's End in Horton Plains National Park",
            "Safari adventures in Udawalawe National Park",
            "Visit the Elephant Transit Home"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1599825025310-a2a91204edd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1555431189-0fabdd398748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1625664517817-641c889a3c34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1606331926466-28661377c4b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        ],
        itinerary: [
            {
                title: "Arrival and Transfer to Kandy",
                location: "Kandy",
                description: "Arrive in Colombo and transfer to the hill city of Kandy. Visit the Temple of the Sacred Tooth Relic and the Royal Botanical Gardens at Peradeniya.",
                accommodation: "Cinnamon Citadel",
                meals: "Dinner",
                activities: [
                    "Airport pickup and transfer to Kandy",
                    "Temple of the Sacred Tooth Relic",
                    "Royal Botanical Gardens"
                ]
            },
            {
                title: "Kandy to Nuwara Eliya",
                location: "Nuwara Eliya",
                description: "Drive to Nuwara Eliya, visiting a tea plantation and factory en route. Afternoon tour of Nuwara Eliya, known as 'Little England' for its colonial architecture.",
                accommodation: "Heritance Tea Factory",
                meals: "Breakfast, Lunch",
                activities: [
                    "Tea plantation and factory tour",
                    "Tea tasting experience",
                    "Nuwara Eliya city tour",
                    "Victoria Park visit"
                ]
            },
            {
                title: "Horton Plains National Park",
                location: "Nuwara Eliya",
                description: "Early morning excursion to Horton Plains National Park. Hike to World's End, a stunning escarpment with a 880m drop, and Baker's Falls. Afternoon at leisure in Nuwara Eliya.",
                accommodation: "Heritance Tea Factory",
                meals: "Breakfast, Packed Lunch",
                activities: [
                    "Horton Plains National Park trek",
                    "World's End viewpoint",
                    "Baker's Falls hike",
                    "Afternoon tea experience"
                ]
            },
            {
                title: "Scenic Train to Ella",
                location: "Ella",
                description: "Board the scenic train from Nanu Oya to Ella, considered one of the most beautiful train journeys in the world. Evening at leisure in Ella.",
                accommodation: "98 Acres Resort",
                meals: "Breakfast",
                activities: [
                    "Scenic train journey",
                    "Ella town exploration",
                    "Sunset views"
                ]
            },
            {
                title: "Ella Exploration",
                location: "Ella",
                description: "Explore the highlights of Ella including Little Adam's Peak, Nine Arch Bridge, and Ravana Falls. Optional cooking class in the evening.",
                accommodation: "98 Acres Resort",
                meals: "Breakfast, Dinner",
                activities: [
                    "Little Adam's Peak hike",
                    "Nine Arch Bridge",
                    "Ravana Falls",
                    "Optional Sri Lankan cooking class"
                ]
            },
            {
                title: "Ella to Udawalawe",
                location: "Udawalawe",
                description: "Drive to Udawalawe National Park. Afternoon safari in the park, which is famous for its large elephant population.",
                accommodation: "Grand Udawalawe Safari Resort",
                meals: "Breakfast, Dinner",
                activities: [
                    "Drive to Udawalawe",
                    "Afternoon wildlife safari",
                    "Elephant observation"
                ]
            },
            {
                title: "Udawalawe National Park",
                location: "Udawalawe",
                description: "Morning safari in Udawalawe National Park. Visit the Elephant Transit Home to see orphaned elephants being fed. Afternoon at leisure.",
                accommodation: "Grand Udawalawe Safari Resort",
                meals: "Breakfast, Lunch, Dinner",
                activities: [
                    "Morning wildlife safari",
                    "Elephant Transit Home visit",
                    "Bird watching",
                    "Nature walk"
                ]
            },
            {
                title: "Return to Colombo and Departure",
                location: "Colombo",
                description: "Drive back to Colombo for your departure flight. Depending on your flight time, enjoy some last-minute shopping or sightseeing in Colombo.",
                meals: "Breakfast",
                activities: [
                    "Drive to Colombo",
                    "Optional shopping or sightseeing",
                    "Airport transfer"
                ]
            }
        ],
        priceIncludes: [
            "7 nights' accommodation as detailed in the itinerary",
            "Daily breakfast, 4 lunches, and 4 dinners",
            "Transportation in an air-conditioned vehicle",
            "Train tickets from Nanu Oya to Ella (first or second class)",
            "English-speaking guide throughout",
            "Safari jeep and entrance fees for Udawalawe National Park",
            "Entrance fees to Horton Plains National Park",
            "All entrance fees to sites mentioned in the itinerary",
            "Airport pickup and drop-off",
            "Water during transportation"
        ],
        priceExcludes: [
            "International flights",
            "Travel insurance",
            "Camera fees at national parks",
            "Personal expenses (laundry, phone calls, souvenirs, etc.)",
            "Tips for guides and drivers",
            "Optional activities",
            "Meals not mentioned in the itinerary"
        ]
    }
];
