import { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "10 Hidden Beaches in Sri Lanka You Need to Visit",
        excerpt: "Discover secluded coastal paradises away from the tourist crowds with pristine waters and untouched beauty.",
        content: [
            "Sri Lanka's coastline stretches over 1,300 kilometers, offering countless beaches that range from popular tourist spots to hidden gems known only to locals. While Unawatuna and Mirissa attract crowds of visitors year-round, there are numerous secluded beaches that offer pristine natural beauty without the crowds.",
            "One such hidden gem is Hiriketiya Beach, a horseshoe-shaped bay near Dickwella. Until recently, this beach was known only to locals and a handful of surfers seeking perfect waves. The crystal-clear waters are ideal for swimming, while the consistent breaks make it perfect for surfers of all levels.",
            "Another secret paradise is Jungle Beach near Unawatuna. Despite its proximity to one of Sri Lanka's most popular beaches, Jungle Beach remains relatively untouched. Accessible only by a short hike through dense jungle or by boat, this small cove offers excellent snorkeling opportunities with vibrant coral reefs just offshore.",
            "For those willing to venture to the east coast, Pasikuda Beach offers powdery white sand and shallow waters that extend nearly a kilometer offshore, creating a natural swimming pool. The east coast's beaches are less developed than their western counterparts, offering a glimpse of traditional coastal life.",
            "No matter which hidden beach you choose to explore, you'll be rewarded with stunning scenery, warm waters, and a peaceful atmosphere far from the tourist crowds. Just remember to respect these pristine environments by taking your trash with you and minimizing your impact on these natural treasures."
        ],
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        date: "April 5, 2025",
        author: "Nimal Perera",
        category: "Hidden Gems",
        tags: ["Beaches", "Off the Beaten Path", "Swimming", "Coastal"],
        commentCount: 8,
        comments: [
            {
                id: 1,
                author: "Sarah Thompson",
                avatar: "https://i.pravatar.cc/150?img=1",
                date: "April 6, 2025",
                text: "I visited Hiriketiya last year and it was absolutely stunning! Definitely worth the journey to get there."
            },
            {
                id: 2,
                author: "Mike Johnson",
                avatar: "https://i.pravatar.cc/150?img=2",
                date: "April 7, 2025",
                text: "Great article! I'd add Kabalana Beach to this list - it's less crowded than Mirissa but has amazing waves for surfing."
            }
        ],
        relatedPosts: [
            {
                id: 4,
                title: "Best Surf Spots in Southern Sri Lanka",
                image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
                date: "March 15, 2025"
            },
            {
                id: 7,
                title: "Coastal Conservation Efforts in Sri Lanka",
                image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
                date: "February 28, 2025"
            }
        ]
    },
    {
        id: 2,
        title: "A Culinary Journey Through Sri Lankan Spices",
        excerpt: "Explore the rich flavors that make Sri Lankan cuisine unique and learn about their medicinal properties.",
        content: [
            "Sri Lankan cuisine is renowned for its complex flavors and aromatic spices. The island's strategic position along ancient trade routes made it a hub for the spice trade, influencing both its culinary traditions and economy throughout history.",
            "Central to Sri Lankan cooking is the use of cinnamon, a spice native to the island. Sri Lankan cinnamon (Cinnamomum zeylanicum), also known as 'true cinnamon,' has a delicate, sweeter flavor compared to its more common cousin, Cassia. The spice is used in both sweet and savory dishes, from the breakfast favorite 'kiri bath' (milk rice) to rich meat curries.",
            "Another essential component of Sri Lankan cuisine is curry powder, a blend that typically includes coriander, cumin, fennel, and turmeric, among other spices. Each family often has their own unique blend, passed down through generations. The distinctive golden color of many Sri Lankan dishes comes from turmeric, which is also valued for its anti-inflammatory properties.",
            "No discussion of Sri Lankan spices would be complete without mentioning cardamom, cloves, and black pepper. These aromatic spices are often used in preparing 'tea masala' for the famous Sri Lankan spiced tea. They're also key ingredients in 'lamprais,' a Dutch-influenced dish where rice, meat curries, and accompaniments are wrapped in a banana leaf and baked.",
            "The use of spices in Sri Lankan cuisine goes beyond flavor — many have medicinal properties recognized in Ayurvedic medicine. For instance, turmeric is used as an antiseptic, cardamom aids digestion, and cinnamon helps regulate blood sugar levels."
        ],
        image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        date: "March 22, 2025",
        author: "Amaya Silva",
        category: "Local Food",
        tags: ["Cuisine", "Spices", "Cooking", "Cultural Heritage"],
        commentCount: 5,
        comments: [
            {
                id: 1,
                author: "David Wilson",
                avatar: "https://i.pravatar.cc/150?img=3",
                date: "March 23, 2025",
                text: "I took a cooking class in Colombo and was amazed at how the different spices transformed simple ingredients into extraordinary dishes."
            },
            {
                id: 2,
                author: "Lisa Chen",
                avatar: "https://i.pravatar.cc/150?img=4",
                date: "March 25, 2025",
                text: "The medicinal properties of these spices are fascinating! I've started using more turmeric in my cooking after visiting Sri Lanka."
            }
        ]
    },
    {
        id: 3,
        title: "Wildlife Safari Guide: Best Times to Visit Yala National Park",
        excerpt: "Maximize your chances of spotting leopards and other wildlife with these expert seasonal tips.",
        content: [
            "Yala National Park, located in the southeast region of Sri Lanka, is one of the island's premier wildlife destinations. Covering approximately 979 square kilometers, it's famous for having one of the highest leopard densities in the world, making it an ideal location for leopard spotting.",
            "The best time to visit Yala for wildlife viewing is generally during the dry season, which runs from February to September. During these months, water becomes scarce, forcing animals to gather around remaining water holes, making them easier to spot. The vegetation is also less dense, improving visibility throughout the park.",
            "For bird enthusiasts, the period between November and January is particularly rewarding. During this time, migratory birds from northern regions join Yala's resident bird population, significantly increasing the diversity of species you can observe.",
            "If seeing leopards is your primary goal, plan your visit during the early morning or late afternoon hours when these magnificent cats are most active. The months of May to August offer particularly good leopard sightings as the water scarcity makes their movements more predictable.",
            "Beyond leopards, Yala is home to elephants, sloth bears, crocodiles, and numerous deer species. Elephant sightings are common year-round, but you might see larger herds during the drier months when they gather near water sources."
        ],
        image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        date: "March 10, 2025",
        author: "Ravi Jayawardena",
        category: "Wildlife",
        tags: ["Safari", "Leopards", "National Parks", "Wildlife Photography"],
        commentCount: 12,
        comments: [
            {
                id: 1,
                author: "Emma Roberts",
                avatar: "https://i.pravatar.cc/150?img=5",
                date: "March 11, 2025",
                text: "I visited Yala last June and saw three leopards in one day! The guide told us we were incredibly lucky."
            },
            {
                id: 2,
                author: "James Kim",
                avatar: "https://i.pravatar.cc/150?img=6",
                date: "March 12, 2025",
                text: "Great tips! I'd also recommend bringing a good camera with a zoom lens - the animals are often at a distance."
            }
        ]
    },
    {
        id: 4,
        title: "The Ancient City of Polonnaruwa: A Traveler's Guide",
        excerpt: "Explore the ruins of Sri Lanka's medieval capital and discover architectural marvels from the 12th century.",
        image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        content: ["Full content would go here..."],
        date: "February 20, 2025",
        author: "Dinesh Fernando",
        category: "Cultural Events",
        tags: ["History", "Architecture", "UNESCO", "Ancient Ruins"],
        commentCount: 7
    },
    {
        id: 5,
        title: "My Solo Backpacking Journey Through Sri Lanka's Hill Country",
        excerpt: "Personal stories and insights from a month-long adventure through tea plantations and mountain villages.",
        image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        content: ["Full content would go here..."],
        date: "February 15, 2025",
        author: "Emily Wong",
        category: "Traveler Stories",
        tags: ["Backpacking", "Solo Travel", "Tea Plantations", "Mountains"],
        commentCount: 14
    },
    {
        id: 6,
        title: "Sri Lanka's Traditional Mask Making: A Dying Art",
        excerpt: "Meet the artisans keeping the ancient tradition of mask carving alive in coastal villages.",
        image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        content: ["Full content would go here..."],
        date: "January 28, 2025",
        author: "Sanjay Patel",
        category: "Cultural Events",
        tags: ["Crafts", "Traditional Arts", "Culture", "Masks"],
        commentCount: 4
    },
    {
        id: 7,
        title: "Beyond Curry: Unique Sri Lankan Dishes You've Never Heard Of",
        excerpt: "Move past the familiar coconut curries and discover these lesser-known culinary treasures.",
        image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        content: ["Full content would go here..."],
        date: "January 15, 2025",
        author: "Maria Rodriguez",
        category: "Local Food",
        tags: ["Cuisine", "Food", "Traditional", "Dining"],
        commentCount: 9
    },
    {
        id: 8,
        title: "Secret Waterfalls of the Knuckles Mountain Range",
        excerpt: "A hiker's guide to finding the most spectacular cascades hidden deep in the forest.",
        image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        content: ["Full content would go here..."],
        date: "January 3, 2025",
        author: "Thomas Clark",
        category: "Hidden Gems",
        tags: ["Hiking", "Waterfalls", "Nature", "Adventure"],
        commentCount: 6
    },
    {
        id: 9,
        title: "Vesak Festival: Experiencing Sri Lanka's Festival of Lights",
        excerpt: "A personal account of celebrating Buddhism's most important holiday in Colombo.",
        image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        content: ["Full content would go here..."],
        date: "December 20, 2024",
        author: "Lakshmi Nair",
        category: "Cultural Events",
        tags: ["Festivals", "Buddhism", "Celebrations", "Religion"],
        commentCount: 10
    }
];
