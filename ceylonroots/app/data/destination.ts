import { DestinationDetails } from '../types/travel';
import { TravelPackage } from '../types/travel';

// Sample data for destinations
export const allDestinations: DestinationDetails[] = [
    {
        id: 'dest-sigiriya',
        name: 'Sigiriya',
        description: 'Sigiriya, also known as the Lion Rock, is an ancient rock fortress and palace ruins situated in the central Matale District. This UNESCO World Heritage site was built by King Kasyapa and features stunning frescoes, water gardens, and the famous Lion Gate.',
        region: 'Cultural Triangle',
        image: 'https://images.unsplash.com/photo-1586185618635-913721197102?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        topAttraction: 'The Lion Rock fortress and ancient palace ruins',
        bestTimeToVisit: 'January to March (dry season)',
        recommendedDuration: '1-2 days',
        culturalTips: 'Dress modestly when visiting religious sites. Remove shoes before entering temples. Always ask for permission before taking photos of locals.',
        attractions: [
            'Sigiriya Rock Fortress',
            'Water Gardens',
            'Mirror Wall',
            'Sigiriya Museum',
            'Pidurangala Rock'
        ],
        coordinates: {
            lat: 7.9570,
            lng: 80.7603
        },
        gallery: [
            'https://images.unsplash.com/photo-1608021584660-e68c702ddc02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1596367407372-96cb88503db6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1575146162953-df054f0e2eff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1592865760661-6df4fc1c539f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'dest-kandy',
        name: 'Kandy',
        description: 'Kandy is a major city in Sri Lanka located in the Central Province. It was the last capital of the ancient kings\' era of Sri Lanka. The city lies in the midst of hills in the Kandy plateau, which crosses an area of tropical plantations, mainly tea.',
        region: 'Central Highlands',
        image: 'https://images.unsplash.com/photo-1586902552066-ec467ee266d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        topAttraction: 'Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)',
        bestTimeToVisit: 'January to April',
        recommendedDuration: '2-3 days',
        culturalTips: 'The Temple of the Tooth Relic is one of the most sacred Buddhist sites. Proper attire (covering shoulders and knees) is required. The annual Esala Perahera festival in July/August is a spectacular cultural event.',
        attractions: [
            'Temple of the Sacred Tooth Relic',
            'Kandy Lake',
            'Royal Botanical Gardens, Peradeniya',
            'Udawattakele Forest Reserve',
            'Ceylon Tea Museum'
        ],
        coordinates: {
            lat: 7.2906,
            lng: 80.6337
        },
        gallery: [
            'https://images.unsplash.com/photo-1580181462534-0731fbe0add0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1625380334954-3669606e0084?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1606046604972-77cc76aee944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'dest-galle',
        name: 'Galle',
        description: 'Galle is a major city located on the southwestern tip of Sri Lanka. It\'s known for Galle Fort, the fortified old city founded by Portuguese colonists in the 16th century. The city boasts a unique blend of European architecture and South Asian traditions.',
        region: 'Southern Coast',
        image: 'https://images.unsplash.com/photo-1575991442192-b253753ff621?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        topAttraction: 'Galle Fort and its colonial architecture',
        bestTimeToVisit: 'December to April',
        recommendedDuration: '2 days',
        culturalTips: 'Galle has a rich multicultural history with Dutch, Portuguese, British and indigenous influences. The locals are used to tourists but still appreciate respectful behavior.',
        attractions: [
            'Galle Fort',
            'Dutch Reformed Church',
            'National Maritime Museum',
            'Galle Lighthouse',
            'Unawatuna Beach'
        ],
        coordinates: {
            lat: 6.0535,
            lng: 80.2210
        },
        gallery: [
            'https://images.unsplash.com/photo-1586195831450-12e768602fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1586035758264-c5e7ce5d0e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1561647784-2f9c43b07a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1596431051169-83e910c7b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'dest-ella',
        name: 'Ella',
        description: 'Ella is a small town in the Badulla District of Uva Province, Sri Lanka. It\'s situated in the middle of beautiful countryside with tea plantations, waterfalls, and panoramic views. The area has a cooler climate than surrounding lowlands, due to its elevation.',
        region: 'Hill Country',
        image: 'https://images.unsplash.com/photo-1586699253884-e199770f52d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        topAttraction: 'Nine Arch Bridge',
        bestTimeToVisit: 'January to March',
        recommendedDuration: '2-3 days',
        culturalTips: 'Ella has become a tourist hotspot but remains a relaxed place. Respect the tranquility of the area. Try the local cuisine, especially the curries and rice dishes. Tea plantations welcome visitors.',
        attractions: [
            'Nine Arch Bridge',
            'Ella Rock',
            'Little Adam\'s Peak',
            'Ravana Falls',
            'Demodara Loop'
        ],
        coordinates: {
            lat: 6.8667,
            lng: 81.0466
        },
        gallery: [
            'https://images.unsplash.com/photo-1546866712-566f042ae2b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578559284795-49dbd11b4c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1606403754966-a961a886a3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'dest-yala',
        name: 'Yala National Park',
        description: 'Yala National Park is Sri Lanka\'s most famous wildlife park, located in the southeast region of the country. It\'s home to 44 varieties of mammals and 215 bird species, but is best known for having one of the highest leopard densities in the world.',
        region: 'Southern Wildlife',
        image: 'https://images.unsplash.com/photo-1500206329404-5057e0aefa48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        topAttraction: 'Leopard spotting on a wildlife safari',
        bestTimeToVisit: 'February to July',
        recommendedDuration: '1-2 days',
        culturalTips: 'Always follow the guide\'s instructions. Don\'t make loud noises during safaris. Never feed the animals. Photography is allowed but be respectful of wildlife.',
        attractions: [
            'Leopard safaris',
            'Elephant watching',
            'Bird watching',
            'Sithulpawwa Rock Temple',
            'Scenic beaches nearby'
        ],
        coordinates: {
            lat: 6.3801,
            lng: 81.5053
        },
        gallery: [
            'https://images.unsplash.com/photo-1594402105032-5fe5fecd4e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581517317485-5b57df6e9861?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1568393837075-aee3118b5575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581517317483-0977e8efef5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        id: 'dest-anuradhapura',
        name: 'Anuradhapura',
        description: 'Anuradhapura is one of the ancient capitals of Sri Lanka, famous for its well-preserved ruins of an ancient Sinhala civilization. The city, now a UNESCO World Heritage site, was the center of Theravada Buddhism for many centuries.',
        region: 'Cultural Triangle',
        image: 'https://images.unsplash.com/photo-1573395009163-f6856ea78268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        topAttraction: 'Sri Maha Bodhi (Sacred Bo-Tree)',
        bestTimeToVisit: 'June to September',
        recommendedDuration: '2 days',
        culturalTips: 'This is a sacred city for Buddhists. Dress appropriately (covered shoulders and knees) and remove hats and shoes when entering temples. Photography is allowed in most places but confirm before taking pictures.',
        attractions: [
            'Sri Maha Bodhi',
            'Ruwanwelisaya Stupa',
            'Jetavanaramaya',
            'Thuparamaya',
            'Isurumuniya'
        ],
        coordinates: {
            lat: 8.3114,
            lng: 80.4037
        },
        gallery: [
            'https://images.unsplash.com/photo-1630045025986-9c5db14c4ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1594731804013-4fbab053c89d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1624912042888-78e10eb50901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1606046518244-c0f91c65c5df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
    }
];

// This would typically come from a relational database
// Here we're hard-coding the relationships between packages and destinations
const destinationPackageMap: Record<string, string[]> = {
    'dest-sigiriya': ['pkg-1', 'pkg-3', 'pkg-4'],
    'dest-kandy': ['pkg-1', 'pkg-2', 'pkg-5'],
    'dest-galle': ['pkg-2', 'pkg-4'],
    'dest-ella': ['pkg-1', 'pkg-5'],
    'dest-yala': ['pkg-3', 'pkg-4'],
    'dest-anuradhapura': ['pkg-3', 'pkg-5']
};

// Function to get packages that include a specific destination
export const getRelatedPackages = (destinationId: string): TravelPackage[] => {
    // In a real app, this would query a database
    // For this example, we'll return a few hardcoded packages
    return [
        {
            id: 'pkg-1',
            title: 'Cultural Heritage Tour',
            description: 'Explore Sri Lanka\'s ancient cities and cultural sites',
            image: 'https://images.unsplash.com/photo-1573415620203-bfff7f625e35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            duration: 7,
            price: 1200,
            rating: 4.8,
            reviewCount: 24,
            regions: ['Cultural Triangle', 'Central Highlands'],
            themes: ['Culture', 'History', 'Heritage'],
            highlights: ['Ancient cities', 'Temples', 'Tea plantations'],
            gallery: [],
            itinerary: [],
            priceIncludes: [],
            priceExcludes: []
        },
        {
            id: 'pkg-2',
            title: 'Coastal Escape',
            description: 'Relax on Sri Lanka\'s stunning beaches and coastal towns',
            image: 'https://images.unsplash.com/photo-1586861256632-f6b81dafe82d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            duration: 5,
            price: 900,
            rating: 4.5,
            reviewCount: 18,
            regions: ['Southern Coast', 'Western Coast'],
            themes: ['Beach', 'Relaxation', 'Coastal'],
            highlights: ['Beautiful beaches', 'Colonial architecture', 'Seafood cuisine'],
            gallery: [],
            itinerary: [],
            priceIncludes: [],
            priceExcludes: []
        }
    ];
};
