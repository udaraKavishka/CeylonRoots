import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding CeylonRoots database...");

  // ============================================================
  // DESTINATION DETAILS
  // ============================================================
  console.log("Creating destination details...");

  await prisma.destinationDetails.createMany({
    data: [
      {
        name: "Sigiriya",
        description:
          "Sigiriya, also known as Lion Rock, is an ancient rock fortress and palace ruin in the central Matale District. This UNESCO World Heritage Site dates back to the 5th century AD and offers panoramic views of the surrounding jungle.",
        region: "Central Province",
        topAttraction: "Sigiriya Rock Fortress",
        bestTimeToVisit: "January to April",
        recommendedDuration: "1-2 days",
        culturalTips:
          "Dress modestly when visiting religious sites. Remove shoes before entering temples. Avoid pointing feet at sacred objects.",
        image:
          "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=800",
        latitude: 7.9569,
        longitude: 80.7603,
      },
      {
        name: "Kandy",
        description:
          "Kandy is a major city in Sri Lanka's Central Province and was the capital of the last Sinhalese kingdom. Home to the famous Temple of the Tooth Relic, it is surrounded by mountains and the picturesque Kandy Lake.",
        region: "Central Province",
        topAttraction: "Temple of the Tooth Relic (Sri Dalada Maligawa)",
        bestTimeToVisit: "December to April",
        recommendedDuration: "2-3 days",
        culturalTips:
          "Visitors to the Temple of the Tooth must wear covered shoulders and knees. The Esala Perahera festival in July/August is a spectacular event to witness.",
        image:
          "https://images.unsplash.com/photo-1566996533071-2c578080c06f?w=800",
        latitude: 7.2906,
        longitude: 80.6337,
      },
      {
        name: "Galle",
        description:
          "Galle is a historic city on the southwestern tip of Sri Lanka. The Galle Fort, built by the Portuguese and later fortified by the Dutch in the 17th century, is a stunning UNESCO World Heritage Site featuring colonial architecture and ocean views.",
        region: "Southern Province",
        topAttraction: "Galle Fort",
        bestTimeToVisit: "November to April",
        recommendedDuration: "2-3 days",
        culturalTips:
          "The fort area has many boutique shops and cafes. Walking the fort walls at sunset is a must-do experience.",
        image:
          "https://images.unsplash.com/photo-1580803834054-c8ee4a44a71b?w=800",
        latitude: 6.0535,
        longitude: 80.2210,
      },
      {
        name: "Ella",
        description:
          "Ella is a small town in the Badulla District, known for its stunning mountain scenery, cool climate, and tea plantations. The famous Nine Arches Bridge and Little Adam's Peak make it a favorite destination for nature lovers.",
        region: "Uva Province",
        topAttraction: "Nine Arches Bridge",
        bestTimeToVisit: "January to April",
        recommendedDuration: "2-3 days",
        culturalTips:
          "The train ride from Kandy to Ella is considered one of the most scenic in the world. Try local arrack and hoppers at local cafes.",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        latitude: 6.8667,
        longitude: 81.0466,
      },
      {
        name: "Yala National Park",
        description:
          "Yala National Park is the most visited and second largest national park in Sri Lanka. It is famous for having one of the highest leopard densities in the world, along with elephants, sloth bears, and diverse bird species.",
        region: "Southern Province",
        topAttraction: "Leopard Safari",
        bestTimeToVisit: "February to July",
        recommendedDuration: "2-3 days",
        culturalTips:
          "Book safari jeeps in advance during peak season. Dawn and dusk safaris offer the best wildlife sightings. Follow park regulations strictly.",
        image:
          "https://images.unsplash.com/photo-1520637836993-5f5101e8b08e?w=800",
        latitude: 6.3619,
        longitude: 81.5181,
      },
      {
        name: "Mirissa",
        description:
          "Mirissa is a small fishing port and resort town on the southern coast of Sri Lanka. It is renowned for its whale watching opportunities, crescent-shaped bay, coconut palm-fringed beach, and vibrant nightlife.",
        region: "Southern Province",
        topAttraction: "Blue Whale Watching",
        bestTimeToVisit: "November to April",
        recommendedDuration: "2-4 days",
        culturalTips:
          "Blue whale and sperm whale sightings are possible from November to April. Book responsible whale watching tours that follow ethical guidelines.",
        image:
          "https://images.unsplash.com/photo-1565073624497-7144969da6e4?w=800",
        latitude: 5.9486,
        longitude: 80.4716,
      },
    ],
    skipDuplicates: true,
  });

  // Add attractions to destinations
  const destinations = await prisma.destinationDetails.findMany();
  const attractionsMap: Record<string, string[]> = {
    Sigiriya: [
      "Rock Fortress Ruins",
      "Frescoes of Sigiriya",
      "Water Gardens",
      "Boulder Gardens",
      "Pidurangala Rock",
    ],
    Kandy: [
      "Temple of the Tooth",
      "Kandy Lake",
      "Royal Botanical Gardens Peradeniya",
      "Udawatta Kele Sanctuary",
      "Kandy Cultural Centre",
    ],
    Galle: [
      "Galle Fort",
      "Dutch Reformed Church",
      "Galle Lighthouse",
      "National Museum",
      "Jungle Beach",
    ],
    Ella: [
      "Nine Arches Bridge",
      "Little Adam's Peak",
      "Ella Rock",
      "Ravana Falls",
      "Lipton's Seat",
    ],
    "Yala National Park": [
      "Leopard Safaris",
      "Elephant Sightings",
      "Crocodile Lake",
      "Sithulpawwa Rock Temple",
      "Buttuwa Lagoon",
    ],
    Mirissa: [
      "Whale Watching",
      "Mirissa Beach",
      "Parrot Rock",
      "Secret Beach",
      "Coconut Tree Hill",
    ],
  };

  for (const dest of destinations) {
    const attrList = attractionsMap[dest.name];
    if (attrList) {
      for (const attraction of attrList) {
        await prisma.destinationDetailAttraction.upsert({
          where: { id: -1 },
          update: {},
          create: { attraction, detailsId: dest.id },
        });
      }
    }
  }

  // ============================================================
  // TRAVEL COMPONENTS: ACCOMMODATIONS
  // ============================================================
  console.log("Creating accommodations...");

  const accommodations = await Promise.all([
    prisma.travelComponent.create({
      data: {
        componentType: "ACCOMMODATION",
        name: "Heritance Kandalama",
        description:
          "Luxurious eco-resort nestled in the jungle near Sigiriya and Dambulla, designed by Geoffrey Bawa. Features stunning views of Kandalama Lake.",
        location: "Dambulla",
        imageUrl:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        price: 250,
        lat: 7.9175,
        lng: 80.6556,
        duration: 1,
        rating: 4.8,
        tags: {
          create: [{ tag: "luxury" }, { tag: "eco" }, { tag: "pool" }],
        },
        amenities: {
          create: [
            { amenity: "Swimming Pool" },
            { amenity: "Spa" },
            { amenity: "Restaurant" },
            { amenity: "Free WiFi" },
            { amenity: "Air Conditioning" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "ACCOMMODATION",
        name: "The Kandy House",
        description:
          "Boutique colonial mansion surrounded by paddy fields and spice gardens, a 15-minute drive from Kandy city center.",
        location: "Kandy",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        price: 180,
        lat: 7.2906,
        lng: 80.5937,
        duration: 1,
        rating: 4.7,
        tags: {
          create: [{ tag: "boutique" }, { tag: "colonial" }, { tag: "garden" }],
        },
        amenities: {
          create: [
            { amenity: "Pool" },
            { amenity: "Garden" },
            { amenity: "Restaurant" },
            { amenity: "Free WiFi" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "ACCOMMODATION",
        name: "Amangalla",
        description:
          "A legendary colonial-era property inside Galle Fort, converted from the original Dutch governor's residence. Offers timeless elegance and world-class service.",
        location: "Galle",
        imageUrl:
          "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800",
        price: 450,
        lat: 6.0295,
        lng: 80.2214,
        duration: 1,
        rating: 4.9,
        tags: {
          create: [{ tag: "luxury" }, { tag: "historic" }, { tag: "fort" }],
        },
        amenities: {
          create: [
            { amenity: "Swimming Pool" },
            { amenity: "Spa" },
            { amenity: "Bar" },
            { amenity: "Restaurant" },
            { amenity: "Free WiFi" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "ACCOMMODATION",
        name: "98 Acres Resort",
        description:
          "A hilltop resort in Ella with stunning views of Ella Gap and surrounding tea estates. Features infinity pools and nature walks.",
        location: "Ella",
        imageUrl:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        price: 200,
        lat: 6.8736,
        lng: 81.0461,
        duration: 1,
        rating: 4.6,
        tags: {
          create: [
            { tag: "mountain" },
            { tag: "tea-estate" },
            { tag: "sunrise" },
          ],
        },
        amenities: {
          create: [
            { amenity: "Infinity Pool" },
            { amenity: "Restaurant" },
            { amenity: "Hiking Trails" },
            { amenity: "Free WiFi" },
            { amenity: "Yoga Classes" },
          ],
        },
      },
    }),
  ]);

  // ============================================================
  // TRAVEL COMPONENTS: ACTIVITIES
  // ============================================================
  console.log("Creating activities...");

  await Promise.all([
    prisma.travelComponent.create({
      data: {
        componentType: "ACTIVITY",
        name: "Sigiriya Rock Fortress Climb",
        description:
          "Climb the iconic 200-meter rock fortress with ancient frescoes and stunning panoramic views of the surrounding jungle.",
        location: "Sigiriya",
        imageUrl:
          "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=800",
        price: 30,
        lat: 7.9569,
        lng: 80.7603,
        duration: 3,
        difficulty: "MODERATE",
        tags: {
          create: [
            { tag: "hiking" },
            { tag: "heritage" },
            { tag: "photography" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "ACTIVITY",
        name: "Yala Leopard Safari",
        description:
          "Full-day jeep safari in Yala National Park with expert naturalist guides. Chance to spot leopards, elephants, sloth bears, and hundreds of bird species.",
        location: "Yala",
        imageUrl:
          "https://images.unsplash.com/photo-1520637836993-5f5101e8b08e?w=800",
        price: 85,
        lat: 6.3619,
        lng: 81.5181,
        duration: 8,
        difficulty: "EASY",
        tags: {
          create: [
            { tag: "safari" },
            { tag: "wildlife" },
            { tag: "photography" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "ACTIVITY",
        name: "Blue Whale Watching",
        description:
          "Early morning whale watching boat tour from Mirissa harbor. Excellent chance to see blue whales, sperm whales, and spinner dolphins.",
        location: "Mirissa",
        imageUrl:
          "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800",
        price: 45,
        lat: 5.9486,
        lng: 80.4716,
        duration: 4,
        difficulty: "EASY",
        tags: {
          create: [
            { tag: "ocean" },
            { tag: "wildlife" },
            { tag: "morning" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "ACTIVITY",
        name: "Tea Estate Walking Tour",
        description:
          "Guided walking tour through a working tea estate in Nuwara Eliya. Learn about tea picking, processing, and enjoy tastings of Ceylon's finest teas.",
        location: "Nuwara Eliya",
        imageUrl:
          "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800",
        price: 25,
        lat: 6.9497,
        lng: 80.7891,
        duration: 3,
        difficulty: "EASY",
        tags: {
          create: [{ tag: "tea" }, { tag: "culture" }, { tag: "nature" }],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "ACTIVITY",
        name: "White Water Rafting - Kitulgala",
        description:
          "Thrilling white water rafting experience on the Kelani River in Kitulgala, the location used for filming The Bridge on the River Kwai.",
        location: "Kitulgala",
        imageUrl:
          "https://images.unsplash.com/photo-1533587527723-93a5db63b0f6?w=800",
        price: 40,
        lat: 6.9908,
        lng: 80.4153,
        duration: 4,
        difficulty: "CHALLENGING",
        tags: {
          create: [
            { tag: "adventure" },
            { tag: "water-sports" },
            { tag: "outdoor" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "ACTIVITY",
        name: "Galle Fort Heritage Walk",
        description:
          "Guided walking tour of the UNESCO-listed Galle Fort, exploring its cobbled streets, Dutch and Portuguese colonial architecture, museums, and boutiques.",
        location: "Galle",
        imageUrl:
          "https://images.unsplash.com/photo-1580803834054-c8ee4a44a71b?w=800",
        price: 20,
        lat: 6.0295,
        lng: 80.2214,
        duration: 3,
        difficulty: "EASY",
        tags: {
          create: [
            { tag: "history" },
            { tag: "architecture" },
            { tag: "walking" },
          ],
        },
      },
    }),
  ]);

  // ============================================================
  // TRAVEL COMPONENTS: TRANSPORT
  // ============================================================
  console.log("Creating transport options...");

  await Promise.all([
    prisma.travelComponent.create({
      data: {
        componentType: "TRANSPORT",
        name: "Scenic Train - Kandy to Ella",
        description:
          "The legendary hill country train journey regarded as one of the most beautiful in the world. The route passes through tea plantations, waterfalls, and mountain passes.",
        location: "Kandy Railway Station",
        imageUrl:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        price: 15,
        lat: 7.2985,
        lng: 80.6356,
        duration: 7,
        mode: "TRAIN",
        departureLocation: "Kandy",
        arrivalLocation: "Ella",
        departureLat: 7.2985,
        departureLng: 80.6356,
        arrivalLat: 6.8667,
        arrivalLng: 81.0466,
        tags: {
          create: [
            { tag: "scenic" },
            { tag: "iconic" },
            { tag: "mountain" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "TRANSPORT",
        name: "Private AC Van Transfer",
        description:
          "Comfortable air-conditioned private van with professional driver for airport transfers or inter-city travel. Maximum 8 passengers.",
        location: "Colombo",
        imageUrl:
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
        price: 60,
        lat: 6.9271,
        lng: 79.8612,
        duration: 3,
        mode: "CAR",
        departureLocation: "Colombo Bandaranaike Airport",
        arrivalLocation: "Kandy",
        departureLat: 7.1803,
        departureLng: 79.8841,
        arrivalLat: 7.2906,
        arrivalLng: 80.6337,
        tags: {
          create: [
            { tag: "private" },
            { tag: "comfortable" },
            { tag: "airport" },
          ],
        },
      },
    }),
    prisma.travelComponent.create({
      data: {
        componentType: "TRANSPORT",
        name: "Speed Boat - Galle to Mirissa",
        description:
          "Coastal speedboat transfer along Sri Lanka's stunning southern coastline from Galle harbor to Mirissa fishing port.",
        location: "Galle Harbor",
        imageUrl:
          "https://images.unsplash.com/photo-1564840803285-90c64ccbad72?w=800",
        price: 35,
        lat: 6.0295,
        lng: 80.2266,
        duration: 1,
        mode: "BOAT",
        departureLocation: "Galle Harbor",
        arrivalLocation: "Mirissa Harbor",
        departureLat: 6.0295,
        departureLng: 80.2266,
        arrivalLat: 5.9486,
        arrivalLng: 80.4716,
        tags: {
          create: [{ tag: "coastal" }, { tag: "ocean" }, { tag: "scenic" }],
        },
      },
    }),
  ]);

  // ============================================================
  // TRAVEL PACKAGES
  // ============================================================
  console.log("Creating travel packages...");

  const pkg1 = await prisma.travelPackage.create({
    data: {
      title: "Classic Sri Lanka Highlights",
      description:
        "Discover the best of Sri Lanka on this comprehensive 10-day tour covering ancient ruins, hill country tea estates, colonial forts, and pristine beaches. Experience the diverse cultures, wildlife, and landscapes that make Sri Lanka one of Asia's top travel destinations.",
      imageUrl:
        "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=800",
      durationDays: 10,
      price: 1850,
      rating: 4.8,
      reviewCount: 124,
      destinations: {
        create: [
          { destination: "Sigiriya" },
          { destination: "Kandy" },
          { destination: "Nuwara Eliya" },
          { destination: "Ella" },
          { destination: "Galle" },
        ],
      },
      highlights: {
        create: [
          { highlight: "Climb the ancient Sigiriya Rock Fortress" },
          { highlight: "Visit the sacred Temple of the Tooth in Kandy" },
          { highlight: "Scenic train ride through tea country to Ella" },
          { highlight: "Walk the cobbled streets of Galle Fort" },
          { highlight: "Sunset at Mirissa Beach" },
          { highlight: "Tea plantation tour in Nuwara Eliya" },
        ],
      },
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=800",
          },
          {
            url: "https://images.unsplash.com/photo-1566996533071-2c578080c06f?w=800",
          },
          {
            url: "https://images.unsplash.com/photo-1580803834054-c8ee4a44a71b?w=800",
          },
          {
            url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
          },
        ],
      },
      includes: {
        create: [
          { item: "9 nights accommodation (4-star hotels)" },
          { item: "Daily breakfast and selected meals" },
          { item: "Air-conditioned private vehicle" },
          { item: "English-speaking guide" },
          { item: "All entrance fees" },
          { item: "Kandy to Ella scenic train ticket" },
        ],
      },
      excludes: {
        create: [
          { item: "International flights" },
          { item: "Travel insurance" },
          { item: "Personal expenses" },
          { item: "Tips & gratuities" },
          { item: "Optional activities not mentioned" },
        ],
      },
      itineraryDays: {
        create: [
          {
            dayNumber: 1,
            title: "Arrival in Colombo",
            mainTown: "Colombo",
            description:
              "Arrive at Bandaranaike International Airport. Transfer to Colombo hotel. Evening leisure visit to Galle Face Green and Pettah Market.",
            accommodation: { create: [{ name: "Cinnamon Grand Colombo" }] },
            meals: { create: [{ meal: "DINNER" }] },
            activities: {
              create: [
                { name: "Galle Face Green Walk" },
                { name: "Pettah Market Visit" },
              ],
            },
          },
          {
            dayNumber: 2,
            title: "Colombo to Sigiriya",
            mainTown: "Sigiriya",
            description:
              "Drive to Dambulla. Visit the famous Dambulla Cave Temple with its stunning Buddha statues and ceiling murals. Continue to Sigiriya. Climb the iconic rock fortress in the afternoon.",
            accommodation: { create: [{ name: "Heritance Kandalama" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: {
              create: [
                { name: "Dambulla Cave Temple" },
                { name: "Sigiriya Rock Fortress Climb" },
              ],
            },
          },
          {
            dayNumber: 3,
            title: "Polonnaruwa Ancient City",
            mainTown: "Polonnaruwa",
            description:
              "Cycle through the ancient ruins of Polonnaruwa, the medieval capital of Sri Lanka. Visit the Royal Palace, Gal Vihara rock temple, and Lotus Pond.",
            accommodation: { create: [{ name: "Heritance Kandalama" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }] },
            activities: {
              create: [
                { name: "Polonnaruwa Cycling Tour" },
                { name: "Gal Vihara Rock Temple" },
              ],
            },
          },
          {
            dayNumber: 4,
            title: "Sigiriya to Kandy",
            mainTown: "Kandy",
            description:
              "Morning visit to Minneriya National Park for elephant gathering. Drive to Kandy via Matale Spice Garden. Evening attend the cultural dance show at Temple of the Tooth.",
            accommodation: { create: [{ name: "The Kandy House" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: {
              create: [
                { name: "Minneriya Elephant Safari" },
                { name: "Matale Spice Garden" },
                { name: "Kandyan Cultural Dance Show" },
              ],
            },
          },
          {
            dayNumber: 5,
            title: "Kandy City Tour",
            mainTown: "Kandy",
            description:
              "Morning visit to the Temple of the Tooth Relic. Afternoon walk around Kandy Lake and visit the Royal Botanical Gardens in Peradeniya. Evening free time at Kandy City Centre.",
            accommodation: { create: [{ name: "The Kandy House" }] },
            meals: { create: [{ meal: "BREAKFAST" }] },
            activities: {
              create: [
                { name: "Temple of the Tooth Relic" },
                { name: "Peradeniya Botanical Gardens" },
                { name: "Kandy Lake Walk" },
              ],
            },
          },
          {
            dayNumber: 6,
            title: "Train to Ella via Nuwara Eliya",
            mainTown: "Ella",
            description:
              "Board the famous scenic train from Kandy to Ella. Stop in Nuwara Eliya for tea estate visit. Continue by train through breathtaking mountain scenery to Ella.",
            accommodation: { create: [{ name: "98 Acres Resort" }] },
            meals: {
              create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }],
            },
            activities: {
              create: [
                { name: "Scenic Train Journey" },
                { name: "Pedro Tea Estate Tour" },
                { name: "Gregory Lake Visit" },
              ],
            },
          },
          {
            dayNumber: 7,
            title: "Ella Hikes",
            mainTown: "Ella",
            description:
              "Morning hike to Little Adam's Peak for sunrise views. Visit the iconic Nine Arches Bridge. Afternoon hike to Ella Rock for panoramic views.",
            accommodation: { create: [{ name: "98 Acres Resort" }] },
            meals: { create: [{ meal: "BREAKFAST" }] },
            activities: {
              create: [
                { name: "Little Adam's Peak Sunrise Hike" },
                { name: "Nine Arches Bridge" },
                { name: "Ella Rock Hike" },
              ],
            },
          },
          {
            dayNumber: 8,
            title: "Ella to Yala",
            mainTown: "Yala",
            description:
              "Drive south through Wellawaya. Stop at Ravana Falls. Check in at Yala safari lodge. Afternoon jeep safari in Yala National Park.",
            accommodation: { create: [{ name: "Jetwing Yala" }] },
            meals: {
              create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }],
            },
            activities: {
              create: [
                { name: "Ravana Falls Visit" },
                { name: "Afternoon Yala Safari" },
              ],
            },
          },
          {
            dayNumber: 9,
            title: "Yala to Galle",
            mainTown: "Galle",
            description:
              "Early morning Yala National Park safari for leopard spotting. Drive along the southern coast to Galle. Afternoon guided walk of Galle Fort.",
            accommodation: { create: [{ name: "Amangalla" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: {
              create: [
                { name: "Early Morning Yala Safari" },
                { name: "Galle Fort Heritage Walk" },
                { name: "Polhena Beach Snorkeling" },
              ],
            },
          },
          {
            dayNumber: 10,
            title: "Departure",
            mainTown: "Colombo",
            description:
              "Morning at leisure in Galle. Drive to Colombo airport for departure flight. Optional visit to a gem museum or spice garden en route.",
            accommodation: { create: [] },
            meals: { create: [{ meal: "BREAKFAST" }] },
            activities: {
              create: [
                { name: "Airport Transfer" },
              ],
            },
          },
        ],
      },
    },
  });

  const pkg2 = await prisma.travelPackage.create({
    data: {
      title: "Sri Lanka Wildlife & Nature Discovery",
      description:
        "An immersive 7-day journey through Sri Lanka's most spectacular wilderness areas. Encounter leopards in Yala, elephant herds in Udawalawe, and blue whales off Mirissa. Perfect for wildlife enthusiasts and nature photographers.",
      imageUrl:
        "https://images.unsplash.com/photo-1520637836993-5f5101e8b08e?w=800",
      durationDays: 7,
      price: 1450,
      rating: 4.9,
      reviewCount: 87,
      destinations: {
        create: [
          { destination: "Udawalawe" },
          { destination: "Yala National Park" },
          { destination: "Mirissa" },
          { destination: "Tangalle" },
        ],
      },
      highlights: {
        create: [
          { highlight: "Yala National Park leopard safari" },
          { highlight: "Udawalawe elephant orphanage visit" },
          { highlight: "Blue whale watching at Mirissa" },
          { highlight: "Turtle nesting site visits in Rekawa" },
          { highlight: "Scenic coastal highway drive" },
          { highlight: "Night wildlife sounds experience" },
        ],
      },
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1520637836993-5f5101e8b08e?w=800",
          },
          {
            url: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800",
          },
          {
            url: "https://images.unsplash.com/photo-1565073624497-7144969da6e4?w=800",
          },
        ],
      },
      includes: {
        create: [
          { item: "6 nights accommodation in eco-lodges" },
          { item: "Daily breakfast" },
          { item: "All safari jeep fees and park entrance" },
          { item: "Whale watching boat tour" },
          { item: "Expert wildlife naturalist guide" },
          { item: "Airport transfers" },
        ],
      },
      excludes: {
        create: [
          { item: "International flights" },
          { item: "Travel insurance" },
          { item: "Personal expenses" },
          { item: "Photography permits" },
          { item: "Alcoholic beverages" },
        ],
      },
      itineraryDays: {
        create: [
          {
            dayNumber: 1,
            title: "Arrival & Transfer to Udawalawe",
            mainTown: "Udawalawe",
            description:
              "Arrive in Colombo and transfer directly to Udawalawe National Park. Afternoon safari to spot herds of wild elephants and water buffalo.",
            accommodation: {
              create: [{ name: "Kalu's Hideaway Udawalawe" }],
            },
            meals: { create: [{ meal: "DINNER" }] },
            activities: {
              create: [
                { name: "Udawalawe Afternoon Safari" },
                { name: "Elephant Transit Home Visit" },
              ],
            },
          },
          {
            dayNumber: 2,
            title: "Udawalawe to Yala",
            mainTown: "Yala",
            description:
              "Morning safari in Udawalawe. Drive to Yala. Check in at the safari lodge. Afternoon evening drive in Yala National Park Block 1.",
            accommodation: { create: [{ name: "Jetwing Yala" }] },
            meals: {
              create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }],
            },
            activities: {
              create: [
                { name: "Udawalawe Morning Safari" },
                { name: "Yala Evening Drive" },
              ],
            },
          },
          {
            dayNumber: 3,
            title: "Full Day Yala Safari",
            mainTown: "Yala",
            description:
              "Full day in Yala National Park with two safari drives, dawn and dusk, maximizing leopard, elephant, and sloth bear sightings.",
            accommodation: { create: [{ name: "Jetwing Yala" }] },
            meals: {
              create: [
                { meal: "BREAKFAST" },
                { meal: "LUNCH" },
                { meal: "DINNER" },
              ],
            },
            activities: {
              create: [
                { name: "Dawn Yala Safari" },
                { name: "Dusk Yala Leopard Drive" },
              ],
            },
          },
          {
            dayNumber: 4,
            title: "Yala to Mirissa",
            mainTown: "Mirissa",
            description:
              "Early morning safari in Yala. Drive to Mirissa along the southern coast. Evening beach time and fresh seafood dinner.",
            accommodation: { create: [{ name: "Secret Garden Villa Mirissa" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }] },
            activities: {
              create: [
                { name: "Yala Early Safari" },
                { name: "Coastal Drive Scenic Stop" },
                { name: "Mirissa Beach Sunset" },
              ],
            },
          },
          {
            dayNumber: 5,
            title: "Whale Watching at Mirissa",
            mainTown: "Mirissa",
            description:
              "Early 5:30am departure for blue whale watching. Excellent chance to see the world's largest animals in their natural habitat.",
            accommodation: {
              create: [{ name: "Secret Garden Villa Mirissa" }],
            },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: {
              create: [
                { name: "Blue Whale Watching Tour" },
                { name: "Snorkeling at Secret Beach" },
              ],
            },
          },
          {
            dayNumber: 6,
            title: "Turtle Watching & Galle",
            mainTown: "Galle",
            description:
              "Morning visit to Rekawa Beach for sea turtle research program. Drive to Galle Fort for afternoon exploration. Sunset walk along the fort walls.",
            accommodation: { create: [{ name: "Amangalla" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }] },
            activities: {
              create: [
                { name: "Rekawa Turtle Project" },
                { name: "Galle Fort Walk" },
              ],
            },
          },
          {
            dayNumber: 7,
            title: "Galle to Colombo Departure",
            mainTown: "Colombo",
            description:
              "Breakfast at the fort. Drive to Colombo. Optional visit to the National Museum. Airport transfer for departure.",
            accommodation: { create: [] },
            meals: { create: [{ meal: "BREAKFAST" }] },
            activities: {
              create: [
                { name: "Colombo National Museum" },
                { name: "Airport Transfer" },
              ],
            },
          },
        ],
      },
    },
  });

  const pkg3 = await prisma.travelPackage.create({
    data: {
      title: "Romantic Sri Lanka Getaway",
      description:
        "A 6-day romantic escape across the island's most enchanting destinations. From misty mountains and tea estates to turquoise beaches, this package creates perfect memories for couples.",
      imageUrl:
        "https://images.unsplash.com/photo-1565073624497-7144969da6e4?w=800",
      durationDays: 6,
      price: 1650,
      rating: 4.7,
      reviewCount: 63,
      destinations: {
        create: [
          { destination: "Kandy" },
          { destination: "Ella" },
          { destination: "Mirissa" },
        ],
      },
      highlights: {
        create: [
          { highlight: "Private dinner at a colonial mansion" },
          { highlight: "Couples spa treatment" },
          { highlight: "Sunrise hike to Little Adam's Peak" },
          { highlight: "Sunset whale watching" },
          { highlight: "Private beach picnic" },
          { highlight: "Candlelit dinner on the beach" },
        ],
      },
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1565073624497-7144969da6e4?w=800",
          },
          {
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
          },
          {
            url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
          },
        ],
      },
      includes: {
        create: [
          { item: "5 nights luxury accommodation" },
          { item: "Daily breakfast & 3 romantic dinners" },
          { item: "Couples spa session" },
          { item: "Private vehicle & chauffeur" },
          { item: "Flower/wine welcome amenity" },
          { item: "All entrance fees" },
        ],
      },
      excludes: {
        create: [
          { item: "International flights" },
          { item: "Travel insurance" },
          { item: "Additional spa treatments" },
          { item: "Alcoholic beverages (except welcome)" },
          { item: "Shopping" },
        ],
      },
      itineraryDays: {
        create: [
          {
            dayNumber: 1,
            title: "Arrival in Kandy",
            mainTown: "Kandy",
            description:
              "Arrive in Colombo and transfer to Kandy. Welcome champagne at the hotel. Romantic sunset stroll around Kandy Lake.",
            accommodation: { create: [{ name: "The Kandy House" }] },
            meals: { create: [{ meal: "DINNER" }] },
            activities: {
              create: [
                { name: "Kandy Lake Sunset Walk" },
                { name: "Temple of the Tooth Evening Puja" },
              ],
            },
          },
          {
            dayNumber: 2,
            title: "Kandy to Ella by Train",
            mainTown: "Ella",
            description:
              "Morning couples spa at the hotel. Board the scenic hill country train to Ella. Check in at hilltop resort with valley views.",
            accommodation: { create: [{ name: "98 Acres Resort" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }] },
            activities: {
              create: [
                { name: "Couples Spa Treatment" },
                { name: "Scenic Train Kandy to Ella" },
              ],
            },
          },
          {
            dayNumber: 3,
            title: "Ella Adventures",
            mainTown: "Ella",
            description:
              "Sunrise hike to Little Adam's Peak. Breakfast with mountain views. Evening walk to Nine Arches Bridge at golden hour.",
            accommodation: { create: [{ name: "98 Acres Resort" }] },
            meals: {
              create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }],
            },
            activities: {
              create: [
                { name: "Little Adam's Peak Sunrise Hike" },
                { name: "Nine Arches Bridge Golden Hour" },
                { name: "Ella Infinity Pool Afternoon" },
              ],
            },
          },
          {
            dayNumber: 4,
            title: "Drive to Mirissa",
            mainTown: "Mirissa",
            description:
              "Drive south from Ella through tea estates to the southern coast. Arrive at beachfront villa. Sunset cocktails on the private terrace.",
            accommodation: {
              create: [{ name: "Secret Garden Villa Mirissa" }],
            },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }] },
            activities: {
              create: [
                { name: "Coastal Drive Scenic Stops" },
                { name: "Mirissa Sunset Cocktails" },
              ],
            },
          },
          {
            dayNumber: 5,
            title: "Mirissa Beach Day",
            mainTown: "Mirissa",
            description:
              "Whale watching morning tour. Afternoon beach picnic arranged by the hotel. Evening candlelit seafood dinner on the beach.",
            accommodation: {
              create: [{ name: "Secret Garden Villa Mirissa" }],
            },
            meals: {
              create: [
                { meal: "BREAKFAST" },
                { meal: "LUNCH" },
                { meal: "DINNER" },
              ],
            },
            activities: {
              create: [
                { name: "Whale Watching Tour" },
                { name: "Private Beach Picnic" },
                { name: "Candlelit Beach Dinner" },
              ],
            },
          },
          {
            dayNumber: 6,
            title: "Departure",
            mainTown: "Colombo",
            description:
              "Leisurely morning at Mirissa Beach. Drive to Colombo airport. Optional stop at a gem store for jewelry souvenirs.",
            accommodation: { create: [] },
            meals: { create: [{ meal: "BREAKFAST" }] },
            activities: {
              create: [
                { name: "Last Morning Swim" },
                { name: "Airport Transfer" },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(
    `Created packages: ${pkg1.id}, ${pkg2.id}, ${pkg3.id}`
  );

  // ============================================================
  // GALLERY ITEMS
  // ============================================================
  console.log("Creating gallery items...");

  await prisma.galleryItem.createMany({
    data: [
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=400",
        caption: "Sigiriya Rock Fortress at Sunrise",
        location: "Sigiriya",
        description: "The iconic Lion Rock fortress bathed in golden morning light",
        featured: true,
        dateAdded: new Date("2024-01-15"),
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1566996533071-2c578080c06f?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1566996533071-2c578080c06f?w=400",
        caption: "Temple of the Tooth, Kandy",
        location: "Kandy",
        description: "Sri Lanka's most revered Buddhist temple housing the relic of the Buddha",
        featured: true,
        dateAdded: new Date("2024-02-10"),
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        caption: "Nine Arches Bridge, Ella",
        location: "Ella",
        description:
          "The iconic stone arch viaduct surrounded by jungle and tea plantations",
        featured: true,
        dateAdded: new Date("2024-03-05"),
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1580803834054-c8ee4a44a71b?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1580803834054-c8ee4a44a71b?w=400",
        caption: "Galle Fort Colonial Architecture",
        location: "Galle",
        description: "Historic Dutch colonial fort walls with lighthouse and ocean views",
        featured: true,
        dateAdded: new Date("2024-03-20"),
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1520637836993-5f5101e8b08e?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1520637836993-5f5101e8b08e?w=400",
        caption: "Wild Leopard in Yala",
        location: "Yala National Park",
        description: "A majestic leopard resting on a rock in Yala National Park",
        featured: true,
        dateAdded: new Date("2024-04-01"),
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1565073624497-7144969da6e4?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1565073624497-7144969da6e4?w=400",
        caption: "Mirissa Beach Sunrise",
        location: "Mirissa",
        description: "Golden hour at the crescent bay of Mirissa with coconut palms",
        featured: false,
        dateAdded: new Date("2024-04-15"),
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=400",
        caption: "Ceylon Tea Plantation",
        location: "Nuwara Eliya",
        description: "Vibrant green tea bushes stretching across rolling hills",
        featured: false,
        dateAdded: new Date("2024-05-10"),
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400",
        caption: "Blue Whale in the Indian Ocean",
        location: "Mirissa",
        description: "A magnificent blue whale surfacing near Mirissa",
        featured: false,
        dateAdded: new Date("2024-05-25"),
      },
    ],
    skipDuplicates: false,
  });

  // ============================================================
  // BLOG POSTS
  // ============================================================
  console.log("Creating blog posts...");

  const post1 = await prisma.blogPost.create({
    data: {
      title: "The Ultimate Guide to Climbing Sigiriya Rock Fortress",
      excerpt:
        "Everything you need to know about visiting Sigiriya - the iconic Lion Rock that has stood for 1,500 years in the heart of Sri Lanka.",
      content: `
# The Ultimate Guide to Climbing Sigiriya Rock Fortress

Sigiriya is without doubt one of the most extraordinary archaeological sites in Asia. Rising 200 meters above the surrounding jungle, this ancient rock fortress was built by King Kashyapa in the 5th century AD and is now a UNESCO World Heritage Site.

## Getting There

The closest major city is Dambulla, about 20km away. Most visitors approach from Colombo (4 hours) or Kandy (3 hours). The town of Sigiriya itself is very small.

## The Climb

The climb takes approximately 1.5-2 hours return. The path is well-maintained with metal staircases and railings at the steeper sections. The famous frescoes (ladies of Sigiriya) are found about halfway up on a sheltered rock face.

## Best Time to Visit

Early morning (7-8am) is ideal to beat the heat and crowds. The site opens at 7am. Avoid midday when it becomes very hot.

## Practical Tips

- Wear comfortable shoes with good grip
- Bring plenty of water
- Apply sunscreen and insect repellent
- The entrance fee is $30 USD for foreign visitors
- Allow half a day for the full experience

The views from the summit are absolutely spectacular - worth every step of the climb!
      `,
      imageUrl:
        "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=800",
      postDate: new Date("2024-02-14"),
      author: "Priya Fernando",
      category: "Destinations",
      commentCount: 18,
      comments: {
        create: [
          {
            author: "James Wilson",
            commentDate: new Date("2024-02-16"),
            text: "Excellent guide! We visited last month and the early morning tip was spot on - we practically had the place to ourselves.",
          },
          {
            author: "Maria Santos",
            commentDate: new Date("2024-02-20"),
            text: "The frescoes are absolutely stunning. Don't miss them on your way up!",
          },
        ],
      },
    },
  });

  const post2 = await prisma.blogPost.create({
    data: {
      title: "Sri Lanka's Hill Country: Taking the Scenic Train from Kandy to Ella",
      excerpt:
        "The train journey from Kandy to Ella is considered one of the world's most beautiful rail trips. Here's everything you need to know.",
      content: `
# Sri Lanka's Hill Country Train Journey

The 7-hour train ride from Kandy to Ella is on every travel bucket list. Winding through emerald tea plantations, misty mountains, and over spectacular viaducts, this journey is an experience in itself.

## The Route

The train departs Kandy station and ascends through Peradeniya, Gampola, Nawalapitiya, and Hatton before reaching Nanuoya (for Nuwara Eliya) and then continuing through Haputale to Ella.

## Booking Your Ticket

Book at least a week in advance for first and second class tickets. The "observation saloon" at the back of the train offers the best views. Third class is unreserved and much cheaper.

## What to Expect

- Duration: 7 hours (often delayed)
- Best seats: Right side for most scenic views
- Key highlight: Demodara Nine Arches Bridge
- Perfect for photography enthusiasts

## Getting Off

Many travelers alight at Nanuoya for Nuwara Eliya, or ride all the way to Ella. The final stretch from Haputale to Ella offers some of the most spectacular scenery.
      `,
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      postDate: new Date("2024-03-05"),
      author: "Rohan Perera",
      category: "Travel Tips",
      commentCount: 32,
      comments: {
        create: [
          {
            author: "Sophie Chen",
            commentDate: new Date("2024-03-08"),
            text: "We did this last year and it's absolutely magical. Book the observation car!",
          },
        ],
      },
    },
  });

  const post3 = await prisma.blogPost.create({
    data: {
      title: "Whale Watching in Mirissa: A Complete Guide",
      excerpt:
        "Mirissa offers some of the best whale watching in the world. Blue whales, sperm whales, and dolphins await just off the southern coast.",
      content: `
# Whale Watching in Mirissa

Sri Lanka is one of the world's premier whale watching destinations. Between November and April, the waters off Mirissa host blue whales, sperm whales, Bryde's whales, and pods of spinner dolphins.

## Best Season

November to April is peak whale watching season. January to March offers the highest probability of blue whale sightings.

## Choosing a Tour

Select responsible operators who follow whale watching guidelines, maintain safe distances, and employ marine biologists. Avoid operators who chase or harass animals.

## What You Might See

- Blue whale (world's largest animal)
- Sperm whale
- Bryde's whale
- Spinner dolphins
- Bottlenose dolphins
- Flying fish

## Practical Tips

- Depart early (5:30am) for best conditions
- Take seasickness medication if needed
- Bring sunscreen, hat, and camera
- Wear layers (it's cold at sea before sunrise)
- The tour typically lasts 4-5 hours
      `,
      imageUrl:
        "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800",
      postDate: new Date("2024-03-22"),
      author: "Nimal Jayawardena",
      category: "Wildlife",
      commentCount: 24,
    },
  });

  // Link related posts
  await prisma.relatedPost.createMany({
    data: [
      { postId: post1.id, relatedId: post2.id },
      { postId: post2.id, relatedId: post1.id },
      { postId: post2.id, relatedId: post3.id },
      { postId: post3.id, relatedId: post2.id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded successfully!");
  console.log(`   - 6 destination details`);
  console.log(`   - 4 accommodations`);
  console.log(`   - 6 activities`);
  console.log(`   - 3 transport options`);
  console.log(`   - 3 travel packages`);
  console.log(`   - 8 gallery items`);
  console.log(`   - 3 blog posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
