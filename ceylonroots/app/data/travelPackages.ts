import { TravelPackage } from "../types/travel";

export const travelPackages: TravelPackage[] = [
  {
    id: "pkg-001",
    title: "Cultural Triangle Explorer",
    description:
      "Discover the ancient cities of Anuradhapura, Polonnaruwa, and the rock fortress of Sigiriya on this historical journey through Sri Lanka's Cultural Triangle.",
    image: "/images/home/img1.jpg",
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
      "Witness a traditional cultural performance in Kandy",
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
        description:
          "Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, you'll be met by your guide and transferred to your hotel in Colombo. Depending on your arrival time, enjoy a brief orientation tour of the city.",
        accommodation: "Cinnamon Grand Colombo",
        meals: "Dinner",
        activities: [
          "Airport pickup and transfer",
          "Welcome dinner",
          "Orientation briefing",
        ],
      },
      {
        title: "Colombo to Anuradhapura",
        location: "Anuradhapura",
        description:
          "After breakfast, drive to the ancient city of Anuradhapura. In the afternoon, begin exploring this UNESCO World Heritage site, visiting the Sri Maha Bodhi, Ruwanwelisaya Stupa, and other key monuments.",
        accommodation: "Palm Garden Village",
        meals: "Breakfast, Lunch, Dinner",
        activities: [
          "Sri Maha Bodhi - the sacred fig tree",
          "Ruwanwelisaya Stupa",
          "Jetavanaramaya",
          "Twin Ponds (Kuttam Pokuna)",
        ],
      },
      {
        title: "Anuradhapura to Sigiriya",
        location: "Sigiriya",
        description:
          "Continue exploring Anuradhapura in the morning. After lunch, drive to Sigiriya. Visit the Pidurangala Rock for sunset views of Sigiriya Rock.",
        accommodation: "Jetwing Vil Uyana",
        meals: "Breakfast, Lunch",
        activities: [
          "Morning exploration of Anuradhapura archaeological sites",
          "Drive to Sigiriya",
          "Sunset hike at Pidurangala Rock",
        ],
      },
      {
        title: "Sigiriya and Polonnaruwa",
        location: "Sigiriya",
        description:
          "Early morning climb to the Sigiriya Rock Fortress. After lunch, visit the ancient city of Polonnaruwa, Sri Lanka's medieval capital.",
        accommodation: "Jetwing Vil Uyana",
        meals: "Breakfast, Lunch, Dinner",
        activities: [
          "Sigiriya Rock Fortress climb",
          "Explore ancient city of Polonnaruwa",
          "Visit Gal Vihara (Rock Temple)",
          "Polonnaruwa archeological museum",
        ],
      },
      {
        title: "Sigiriya to Dambulla and Kandy",
        location: "Kandy",
        description:
          "Visit the Dambulla Cave Temple in the morning. Then drive to Kandy, stopping at a spice garden en route. Evening visit to the Temple of the Sacred Tooth Relic and a cultural performance.",
        accommodation: "Cinnamon Citadel",
        meals: "Breakfast, Dinner",
        activities: [
          "Dambulla Cave Temple tour",
          "Spice garden visit",
          "Temple of the Sacred Tooth Relic",
          "Traditional Kandyan dance performance",
        ],
      },
      {
        title: "Kandy Exploration",
        location: "Kandy",
        description:
          "Spend the day exploring Kandy, including the Royal Botanical Gardens, Kandy Lake, and local markets. Optional visit to an elephant sanctuary in the afternoon.",
        accommodation: "Cinnamon Citadel",
        meals: "Breakfast, Lunch",
        activities: [
          "Royal Botanical Gardens",
          "Kandy Lake",
          "Local market visit",
          "Optional: Pinnawala Elephant Orphanage",
        ],
      },
      {
        title: "Departure from Colombo",
        location: "Colombo",
        description:
          "Return to Colombo for your departure flight. Depending on your flight time, enjoy some last-minute shopping or sightseeing in Colombo.",
        meals: "Breakfast",
        activities: [
          "Drive to Colombo",
          "Optional shopping or sightseeing",
          "Airport transfer",
        ],
      },
    ],
    priceIncludes: [
      "6 nights' accommodation as detailed in the itinerary",
      "Daily breakfast, 4 lunches, and 4 dinners",
      "Transportation in an air-conditioned vehicle",
      "English-speaking guide throughout",
      "All entrance fees to sites mentioned in the itinerary",
      "Airport pickup and drop-off",
      "Water during transportation",
    ],
    priceExcludes: [
      "International flights",
      "Travel insurance",
      "Camera fees at monuments",
      "Personal expenses (laundry, phone calls, souvenirs, etc.)",
      "Tips for guides and drivers",
      "Optional activities",
      "Meals not mentioned in the itinerary",
    ],
  },
  {
    id: "pkg-002",
    title: "Southern Coast Beach Paradise",
    description:
      "Relax on pristine beaches and explore vibrant coastal towns along Sri Lanka's stunning southern coastline, with plenty of time for water activities and wildlife encounters.",
    image: "/images/home/img1.jpg",
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
      "Experience traditional stilt fishing in Weligama",
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
        description:
          "Arrive in Colombo and transfer directly to the beach town of Bentota. Relax at your beachfront hotel and enjoy the sunset over the Indian Ocean.",
        accommodation: "Avani Bentota Resort",
        meals: "Dinner",
        activities: [
          "Airport pickup and transfer to Bentota",
          "Beach sunset",
          "Welcome dinner",
        ],
      },
      {
        title: "Bentota Beach Day",
        location: "Bentota",
        description:
          "Enjoy a full day of relaxation on Bentota's golden beaches. Optional water sports activities are available, including jet skiing, windsurfing, and banana boat rides.",
        accommodation: "Avani Bentota Resort",
        meals: "Breakfast",
        activities: [
          "Beach relaxation",
          "Optional water sports",
          "Optional visit to Lunuganga Estate",
        ],
      },
      {
        title: "Bentota to Galle",
        location: "Galle",
        description:
          "Morning drive to the historic city of Galle. Spend the afternoon exploring Galle Fort, a UNESCO World Heritage site, with its charming colonial streets and buildings.",
        accommodation: "Fort Bazaar Galle",
        meals: "Breakfast, Lunch",
        activities: [
          "Galle Fort exploration",
          "Historical walking tour",
          "Sunset at the ramparts",
        ],
      },
      {
        title: "Galle Exploration",
        location: "Galle",
        description:
          "Enjoy a full day exploring Galle and its surroundings, including a cooking class to learn about Sri Lankan cuisine and a visit to a nearby sea turtle hatchery.",
        accommodation: "Fort Bazaar Galle",
        meals: "Breakfast, Lunch",
        activities: [
          "Sri Lankan cooking class",
          "Sea turtle hatchery visit",
          "Local market tour",
          "Free time for shopping",
        ],
      },
      {
        title: "Galle to Mirissa",
        location: "Mirissa",
        description:
          "Drive to the coastal town of Mirissa. Afternoon at leisure to enjoy the beach. Optional evening visit to witness stilt fishermen in Weligama.",
        accommodation: "Lantern Boutique Hotel",
        meals: "Breakfast",
        activities: [
          "Beach relaxation",
          "Optional stilt fishermen viewing",
          "Sunset beach dinner (optional)",
        ],
      },
      {
        title: "Whale Watching in Mirissa",
        location: "Mirissa",
        description:
          "Early morning whale watching excursion (November to April is best for sightings). Afternoon at leisure to relax on the beach or explore the town.",
        accommodation: "Lantern Boutique Hotel",
        meals: "Breakfast, Lunch",
        activities: [
          "Whale watching excursion",
          "Beach relaxation",
          "Optional surfing lessons",
        ],
      },
      {
        title: "Mirissa to Yala",
        location: "Yala",
        description:
          "Drive to Yala National Park. Afternoon safari in the park, famous for its leopard population along with elephants, sloth bears, and countless bird species.",
        accommodation: "Cinnamon Wild Yala",
        meals: "Breakfast, Dinner",
        activities: [
          "Drive to Yala National Park",
          "Afternoon wildlife safari",
          "Bird watching",
        ],
      },
      {
        title: "Yala National Park",
        location: "Yala",
        description:
          "Early morning safari in Yala National Park to maximize wildlife sightings. Afternoon relaxation at your lodge with an optional evening safari.",
        accommodation: "Cinnamon Wild Yala",
        meals: "Breakfast, Lunch, Dinner",
        activities: [
          "Morning wildlife safari",
          "Afternoon relaxation",
          "Optional evening safari",
        ],
      },
      {
        title: "Return to Colombo and Departure",
        location: "Colombo",
        description:
          "Drive back to Colombo for your departure flight. Depending on your flight time, enjoy some last-minute shopping or sightseeing in Colombo.",
        meals: "Breakfast",
        activities: [
          "Drive to Colombo",
          "Optional shopping or sightseeing",
          "Airport transfer",
        ],
      },
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
      "Water during transportation",
    ],
    priceExcludes: [
      "International flights",
      "Travel insurance",
      "Water sports activities",
      "Camera fees at monuments and parks",
      "Personal expenses (laundry, phone calls, souvenirs, etc.)",
      "Tips for guides and drivers",
      "Optional activities",
      "Meals not mentioned in the itinerary",
    ],
  },
  {
    id: "pkg-003",
    title: "Tea Country & Wildlife Safari",
    description:
      "Journey through misty tea plantations, encounter diverse wildlife in national parks, and soak in breathtaking mountain scenery on this exploration of Sri Lanka's highlands and wildlife sanctuaries.",
    image: "/images/home/img1.jpg",
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
      "Visit the Elephant Transit Home",
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
        description:
          "Arrive in Colombo and transfer to the hill city of Kandy. Visit the Temple of the Sacred Tooth Relic and the Royal Botanical Gardens at Peradeniya.",
        accommodation: "Cinnamon Citadel",
        meals: "Dinner",
        activities: [
          "Airport pickup and transfer to Kandy",
          "Temple of the Sacred Tooth Relic",
          "Royal Botanical Gardens",
        ],
      },
      {
        title: "Kandy to Nuwara Eliya",
        location: "Nuwara Eliya",
        description:
          "Drive to Nuwara Eliya, visiting a tea plantation and factory en route. Afternoon tour of Nuwara Eliya, known as 'Little England' for its colonial architecture.",
        accommodation: "Heritance Tea Factory",
        meals: "Breakfast, Lunch",
        activities: [
          "Tea plantation and factory tour",
          "c",
          "Nuwara Eliya city tour",
          "Victoria Park visit",
        ],
      },
      {
        title: "Horton Plains National Park",
        location: "Nuwara Eliya",
        description:
          "Early morning excursion to Horton Plains National Park. Hike to World's End, a stunning escarpment with a 880m drop, and Baker's Falls. Afternoon at leisure in Nuwara Eliya.",
        accommodation: "Heritance Tea Factory",
        meals: "Breakfast, Packed Lunch",
        activities: [
          "Horton Plains National Park trek",
          "World's End viewpoint",
          "Baker's Falls hike",
          "Afternoon tea experience",
        ],
      },
      {
        title: "Scenic Train to Ella",
        location: "Ella",
        description:
          "Board the scenic train from Nanu Oya to Ella, considered one of the most beautiful train journeys in the world. Evening at leisure in Ella.",
        accommodation: "98 Acres Resort",
        meals: "Breakfast",
        activities: [
          "Scenic train journey",
          "Ella town exploration",
          "Sunset views",
        ],
      },
      {
        title: "Ella Exploration",
        location: "Ella",
        description:
          "Explore the highlights of Ella including Little Adam's Peak, Nine Arch Bridge, and Ravana Falls. Optional cooking class in the evening.",
        accommodation: "98 Acres Resort",
        meals: "Breakfast, Dinner",
        activities: [
          "Little Adam's Peak hike",
          "Nine Arch Bridge",
          "Ravana Falls",
          "Optional Sri Lankan cooking class",
        ],
      },
      {
        title: "Ella to Udawalawe",
        location: "Udawalawe",
        description:
          "Drive to Udawalawe National Park. Afternoon safari in the park, which is famous for its large elephant population.",
        accommodation: "Grand Udawalawe Safari Resort",
        meals: "Breakfast, Dinner",
        activities: [
          "Drive to Udawalawe",
          "Afternoon wildlife safari",
          "Elephant observation",
        ],
      },
      {
        title: "Udawalawe National Park",
        location: "Udawalawe",
        description:
          "Morning safari in Udawalawe National Park. Visit the Elephant Transit Home to see orphaned elephants being fed. Afternoon at leisure.",
        accommodation: "Grand Udawalawe Safari Resort",
        meals: "Breakfast, Lunch, Dinner",
        activities: [
          "Morning wildlife safari",
          "Elephant Transit Home visit",
          "Bird watching",
          "Nature walk",
        ],
      },
      {
        title: "Return to Colombo and Departure",
        location: "Colombo",
        description:
          "Drive back to Colombo for your departure flight. Depending on your flight time, enjoy some last-minute shopping or sightseeing in Colombo.",
        meals: "Breakfast",
        activities: [
          "Drive to Colombo",
          "Optional shopping or sightseeing",
          "Airport transfer",
        ],
      },
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
      "Water during transportation",
    ],
    priceExcludes: [
      "International flights",
      "Travel insurance",
      "Camera fees at national parks",
      "Personal expenses (laundry, phone calls, souvenirs, etc.)",
      "Tips for guides and drivers",
      "Optional activities",
      "Meals not mentioned in the itinerary",
    ],
  },
];


import { TravelPackage } from "../types/travel";

export const travelPackages: TravelPackage[] = [
  // Existing packages here...
  
  {
    id: "pkg-004",
    title: "Wildlife & Rainforest Adventure",
    description: "Immerse yourself in Sri Lanka's biodiversity with safaris in premier national parks and exploration of UNESCO-listed rainforests, featuring elephants, leopards and endemic species.",
    image: "/images/home/img1.jpg",
    duration: 6,
    price: 949,
    rating: 4.9,
    reviewCount: 78,
    regions: ["Uva Province", "Southern Province"],
    themes: ["Wildlife", "Nature", "Adventure"],
    highlights: [
      "Leopard tracking safari in Yala National Park",
      "Elephant encounters in Udawalawe",
      "Birdwatching in Sinharaja Rainforest",
      "Night jungle walk in Kitulgala",
      "River safari in Madu Ganga wetlands"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1598024055260-9d9a0e1236d4",
      "https://images.unsplash.com/photo-1548263594-a071a1e3fe5b",
      "https://images.unsplash.com/photo-1573512449171-1a8b7e4a4143",
      "https://images.unsplash.com/photo-1567599759063-89ff5f3d56b2"
    ],
    itinerary: [
      {
        title: "Arrival & Transfer to Udawalawe",
        location: "Udawalawe",
        description: "Airport pickup and scenic drive to Udawalawe. Evening orientation and nature documentary screening.",
        accommodation: "Grand Udawalawe Safari Resort",
        meals: "Dinner",
        activities: ["Transfer from airport", "Resort orientation"]
      },
      {
        title: "Udawalawe Safari Experience",
        location: "Udawalawe",
        description: "Morning safari focusing on elephant herds. Afternoon visit to Elephant Transit Home. Evening nature walk.",
        accommodation: "Grand Udawalawe Safari Resort",
        meals: "Breakfast, Lunch",
        activities: ["Morning safari", "Elephant orphanage visit", "Guided nature walk"]
      },
      {
        title: "Sinharaja Rainforest Exploration",
        location: "Sinharaja",
        description: "Transfer to Sinharaja UNESCO Biosphere. Guided trek through primary rainforest with endemic species spotting.",
        accommodation: "Rainforest Eco Lodge",
        meals: "Breakfast, Dinner",
        activities: ["Rainforest trekking", "Birdwatching", "Waterfall swim"]
      },
      {
        title: "Kitulgala Adventure",
        location: "Kitulgala",
        description: "River tubing and rainforest canopy walk. Afternoon visit to local village and spice garden.",
        accommodation: "The Plantation",
        meals: "Breakfast, Lunch",
        activities: ["River tubing", "Canopy walkway", "Village tour"]
      },
      {
        title: "Yala National Park Safari",
        location: "Yala",
        description: "Full day safari in Yala with picnic lunch. Focus on leopard habitats and wetland birds.",
        accommodation: "Cinnamon Wild Yala",
        meals: "Breakfast, Lunch",
        activities: ["Morning safari", "Afternoon safari", "Wildlife photography"]
      },
      {
        title: "Departure via Coastal Route",
        location: "Colombo",
        description: "Scenic coastal drive to Colombo with stop at turtle hatchery. Airport transfer.",
        meals: "Breakfast",
        activities: ["Turtle conservation center", "Coastal route drive"]
      }
    ],
    priceIncludes: [
      "5 nights accommodation",
      "All safari jeeps and park entrances",
      "Professional wildlife guide",
      "Daily breakfast + 3 lunches + 3 dinners",
      "All activities mentioned",
      "Airport transfers"
    ],
    priceExcludes: [
      "Camera fees at national parks",
      "Personal expenses",
      "Optional rafting activities",
      "Tips for guides"
    ]
  },
  {
    id: "pkg-005",
    title: "East Coast Tropical Escape",
    description: "Discover Sri Lanka's unspoiled eastern coastline with pristine beaches, cultural sites and marine adventures in Trincomalee and Batticaloa.",
    image: "/images/home/img1.jpg",
    duration: 5,
    price: 799,
    rating: 4.7,
    reviewCount: 56,
    regions: ["Eastern Province"],
    themes: ["Beach", "Culture", "Diving"],
    highlights: [
      "Whale watching in Trincomalee",
      "Pigeon Island snorkeling",
      "Koneswaram Temple visit",
      "Kallady Bridge musical sands",
      "Traditional catamaran sailing"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581434681311-1fe5a1029567",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e",
      "https://images.unsplash.com/photo-1579033014070-3d7a6e11c3e2",
      "https://images.unsplash.com/photo-1577696467905-54d0bc9d1459"
    ],
    itinerary: [
      {
        title: "Arrival in Trincomalee",
        location: "Trincomalee",
        description: "Airport transfer to Trincomalee via Dambulla. Evening beach welcome ceremony.",
        accommodation: "Trinco Blu by Cinnamon",
        meals: "Dinner",
        activities: ["Transfer from airport", "Beach welcome"]
      },
      {
        title: "Marine Adventure Day",
        location: "Trincomalee",
        description: "Morning whale watching tour. Afternoon snorkeling at Pigeon Island National Park.",
        accommodation: "Trinco Blu by Cinnamon",
        meals: "Breakfast, Lunch",
        activities: ["Whale watching", "Pigeon Island snorkeling"]
      },
      {
        title: "Cultural Exploration",
        location: "Trincomalee",
        description: "Visit Koneswaram Temple and Fort Frederick. Afternoon cooking class and fishing village tour.",
        accommodation: "Trinco Blu by Cinnamon",
        meals: "Breakfast, Dinner",
        activities: ["Temple visit", "Cooking class", "Village tour"]
      },
      {
        title: "Batticaloa Lagoon Discovery",
        location: "Batticaloa",
        description: "Transfer to Batticaloa. Lagoon boat tour with musical sands experience. Dutch Fort exploration.",
        accommodation: "Amaya Beach Resort",
        meals: "Breakfast, Lunch",
        activities: ["Lagoon cruise", "Musical sands", "Fort visit"]
      },
      {
        title: "Departure with Coastal Memories",
        location: "Colombo",
        description: "Return drive to Colombo with stop at local markets. Airport transfer.",
        meals: "Breakfast",
        activities: ["Market visit", "Scenic coastal drive"]
      }
    ],
    priceIncludes: [
      "4 nights beachfront accommodation",
      "Marine activities with equipment",
      "Cultural site entries",
      "Daily breakfast + 2 lunches + 3 dinners",
      "English-speaking guide",
      "All transportation"
    ],
    priceExcludes: [
      "Diving certification fees",
      "Personal shopping",
      "Optional spa treatments",
      "Beverages"
    ]
  },
  {
    id: "pkg-006",
    title: "Wellness & Ayurveda Retreat",
    description: "Rejuvenate with authentic Ayurvedic treatments, yoga sessions and mindful nature experiences in Sri Lanka's tranquil southern and hill regions.",
    image: "/images/home/img1.jpg",
    duration: 7,
    price: 1299,
    rating: 4.9,
    reviewCount: 92,
    regions: ["Southern Province", "Sabaragamuwa Province"],
    themes: ["Wellness", "Nature", "Yoga"],
    highlights: [
      "Personalized Ayurveda consultation",
      "Daily yoga and meditation",
      "Herbal garden tour",
      "Mindfulness forest bathing",
      "Traditional detox treatments"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1549576490-b0b4831a60b1",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0",
      "https://images.unsplash.com/photo-1591348122449-02525d703f45",
      "https://images.unsplash.com/photo-1543050027-8c8d41e89e81"
    ],
    itinerary: [
      {
        title: "Arrival & Wellness Orientation",
        location: "Weligama",
        description: "Transfer to beachside wellness resort. Ayurvedic consultation and welcome ceremony.",
        accommodation: "Santani Wellness Resort",
        meals: "Detox dinner",
        activities: ["Airport transfer", "Doctor consultation"]
      },
      {
        title: "Holistic Healing Start",
        location: "Weligama",
        description: "Sunrise yoga session. Herbal compress massage. Nutrition workshop and cooking demonstration.",
        accommodation: "Santani Wellness Resort",
        meals: "All meals",
        activities: ["Yoga", "Ayurveda treatment", "Cooking class"]
      },
      {
        title: "Nature Immersion",
        location: "Weligama",
        description: "Guided forest bathing. Sound healing therapy. Afternoon mindfulness beach walk.",
        accommodation: "Santani Wellness Resort",
        meals: "All meals",
        activities: ["Nature therapy", "Sound meditation", "Beach walk"]
      },
      {
        title: "Mountain Retreat Transfer",
        location: "Kanneliya",
        description: "Scenic drive to hill retreat. Afternoon herbal garden tour and tea ceremony.",
        accommodation: "The Rainforest Ecolodge",
        meals: "All meals",
        activities: ["Garden tour", "Tea ceremony", "Sunset meditation"]
      },
      {
        title: "Water Healing Day",
        location: "Kanneliya",
        description: "Waterfall meditation. Hydrotherapy session. Evening yoga nidra.",
        accommodation: "The Rainforest Ecolodge",
        meals: "All meals",
        activities: ["Water therapy", "Hydro massage", "Deep relaxation"]
      },
      {
        title: "Integration & Reflection",
        location: "Kanneliya",
        description: "Personalized wellness plan development. Final detox treatment. Farewell ceremony.",
        accommodation: "The Rainforest Ecolodge",
        meals: "All meals",
        activities: ["Wellness planning", "Final treatment", "Closing circle"]
      },
      {
        title: "Departure with Renewed Energy",
        location: "Colombo",
        description: "Transfer to airport with herbal tea hamper. Optional Colombo spa stop.",
        meals: "Breakfast",
        activities: ["Transfer to airport", "Wellness gift"]
      }
    ],
    priceIncludes: [
      "6 nights premium wellness accommodation",
      "Daily Ayurvedic treatments (2x daily)",
      "All yoga and meditation sessions",
      "Full board organic meals",
      "Personalized wellness program",
      "All consultations and workshops",
      "Airport transfers"
    ],
    priceExcludes: [
      "Specialized therapy supplements",
      "Optional spa upgrades",
      "Personal purchases",
      "International flights"
    ]
  }
];