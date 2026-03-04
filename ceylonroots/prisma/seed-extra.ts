import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding additional CeylonRoots data...");

  // ============================================================
  // ADDITIONAL DESTINATION DETAILS
  // ============================================================
  console.log("Adding more destination details...");

  const nuwara = await prisma.destinationDetails.create({
    data: {
      name: "Nuwara Eliya",
      description:
        "Known as 'Little England', Nuwara Eliya sits at 1,868m and is surrounded by rolling tea estates, colonial-era bungalows, and cool misty air. The town is the heart of Sri Lanka's tea industry and offers a refreshing escape from tropical heat.",
      region: "Central Province",
      topAttraction: "Tea Plantations & Horton Plains",
      bestTimeToVisit: "January to April",
      recommendedDuration: "2-3 days",
      culturalTips:
        "Morning visits to tea factories offer fresh brews. Bring warm clothing as temperatures drop below 10°C at night.",
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800",
      latitude: 6.9497,
      longitude: 80.7891,
      attractions: {
        create: [
          { attraction: "Horton Plains National Park" },
          { attraction: "World's End Viewpoint" },
          { attraction: "Pedro Tea Estate" },
          { attraction: "Gregory Lake" },
          { attraction: "Victoria Park" },
        ],
      },
    },
  });

  const trinco = await prisma.destinationDetails.create({
    data: {
      name: "Trincomalee",
      description:
        "Trincomalee on the northeast coast boasts one of the world's finest natural harbours and some of Sri Lanka's most pristine beaches. It's a hotspot for whale watching (May–September), diving, and discovering Hindu temples perched on dramatic sea cliffs.",
      region: "Eastern Province",
      topAttraction: "Pigeon Island & Koneswaram Temple",
      bestTimeToVisit: "May to September",
      recommendedDuration: "2-3 days",
      culturalTips:
        "Koneswaram Temple requires modest dress. Pigeon Island is a marine national park — no littering allowed.",
      image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800",
      latitude: 8.5874,
      longitude: 81.2152,
      attractions: {
        create: [
          { attraction: "Pigeon Island National Park" },
          { attraction: "Koneswaram Temple" },
          { attraction: "Marble Beach" },
          { attraction: "Fort Frederick" },
          { attraction: "Koneshwaram Hot Springs" },
        ],
      },
    },
  });

  console.log(`Created destination details: Nuwara Eliya (${nuwara.id}), Trincomalee (${trinco.id})`);

  // ============================================================
  // DESTINATION TRAVEL COMPONENTS
  // ============================================================
  console.log("Adding destination travel components...");

  const destinations = await prisma.travelComponent.createMany({
    data: [
      {
        componentType: "DESTINATION",
        name: "Sigiriya Rock Fortress",
        description: "Ancient rock fortress with stunning 5th-century frescoes and panoramic views across the jungle.",
        location: "Sigiriya",
        imageUrl: "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=800",
        price: 30,
        lat: 7.9569,
        lng: 80.7603,
        duration: 3,
      },
      {
        componentType: "DESTINATION",
        name: "Temple of the Tooth Relic",
        description: "Sacred Buddhist temple in Kandy housing the relic of the tooth of the Buddha.",
        location: "Kandy",
        imageUrl: "https://images.unsplash.com/photo-1567598460019-64c40c23a8cf?w=800",
        price: 15,
        lat: 7.2933,
        lng: 80.6413,
        duration: 2,
      },
      {
        componentType: "DESTINATION",
        name: "Galle Dutch Fort",
        description: "UNESCO World Heritage Site — a 17th-century Dutch colonial fortification on the southern tip of Sri Lanka.",
        location: "Galle",
        imageUrl: "https://images.unsplash.com/photo-1586500036706-41963de24d8c?w=800",
        price: 0,
        lat: 6.0269,
        lng: 80.2169,
        duration: 3,
      },
      {
        componentType: "DESTINATION",
        name: "Nine Arch Bridge",
        description: "Iconic colonial-era railway viaduct surrounded by lush tea plantations in the highlands.",
        location: "Ella",
        imageUrl: "https://images.unsplash.com/photo-1620766786530-7fa86dee13cb?w=800",
        price: 0,
        lat: 6.879,
        lng: 81.063,
        duration: 1,
      },
      {
        componentType: "DESTINATION",
        name: "Yala National Park",
        description: "Sri Lanka's most famous wildlife sanctuary with the highest density of leopards in the world.",
        location: "Yala",
        imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800",
        price: 40,
        lat: 6.3801,
        lng: 81.5053,
        duration: 8,
      },
    ],
  });

  console.log(`Created ${destinations.count} destination travel components`);

  // Add tags for destination components
  const destComponents = await prisma.travelComponent.findMany({
    where: { componentType: "DESTINATION" },
  });

  const destTags: Record<string, string[]> = {
    "Sigiriya Rock Fortress": ["UNESCO", "historical", "ancient", "climbing"],
    "Temple of the Tooth Relic": ["religious", "cultural", "Buddhist", "UNESCO"],
    "Galle Dutch Fort": ["UNESCO", "colonial", "historical", "coastal"],
    "Nine Arch Bridge": ["landmark", "scenic", "photography", "train"],
    "Yala National Park": ["wildlife", "safari", "leopard", "nature"],
  };

  for (const comp of destComponents) {
    const tags = destTags[comp.name];
    if (tags) {
      await prisma.componentTag.createMany({
        data: tags.map((tag) => ({ tag, componentId: comp.id })),
      });
    }
  }

  // ============================================================
  // MORE TRAVEL PACKAGES
  // ============================================================
  console.log("Adding more travel packages...");

  const pkg4 = await prisma.travelPackage.create({
    data: {
      title: "Wildlife & Rainforest Adventure",
      description:
        "Immerse yourself in Sri Lanka's extraordinary biodiversity. Track leopards in Yala, witness elephant herds in Udawalawe, and trek through the UNESCO Sinharaja Rainforest with expert naturalist guides.",
      imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800",
      durationDays: 6,
      price: 949,
      rating: 4.9,
      reviewCount: 78,
      destinations: {
        create: [
          { destination: "Yala National Park" },
          { destination: "Udawalawe" },
          { destination: "Sinharaja Rainforest" },
          { destination: "Kitulgala" },
        ],
      },
      highlights: {
        create: [
          { highlight: "Leopard tracking safari in Yala National Park" },
          { highlight: "Elephant encounters in Udawalawe" },
          { highlight: "Birdwatching in Sinharaja UNESCO Rainforest" },
          { highlight: "Night jungle walk in Kitulgala" },
          { highlight: "River tubing on the Kelani River" },
        ],
      },
      gallery: {
        create: [
          { url: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800" },
          { url: "https://images.unsplash.com/photo-1573512449171-1a8b7e4a4143?w=800" },
          { url: "https://images.unsplash.com/photo-1624461063672-fb93119c9abb?w=800" },
          { url: "https://images.unsplash.com/photo-1598024055260-9d9a0e1236d4?w=800" },
        ],
      },
      includes: {
        create: [
          { item: "5 nights accommodation" },
          { item: "All safari jeeps and park entrance fees" },
          { item: "Professional wildlife naturalist guide" },
          { item: "Daily breakfast + 3 lunches + 3 dinners" },
          { item: "River tubing equipment" },
          { item: "Airport transfers" },
        ],
      },
      excludes: {
        create: [
          { item: "Camera fees at national parks" },
          { item: "Personal expenses and souvenirs" },
          { item: "Optional white-water rafting" },
          { item: "Tips for guides and drivers" },
          { item: "International flights & travel insurance" },
        ],
      },
      itineraryDays: {
        create: [
          {
            dayNumber: 1,
            title: "Arrival & Transfer to Udawalawe",
            mainTown: "Udawalawe",
            description: "Airport pickup and scenic drive to Udawalawe. Evening orientation and nature documentary screening at the lodge.",
            accommodation: { create: [{ name: "Grand Udawalawe Safari Resort" }] },
            meals: { create: [{ meal: "DINNER" }] },
            activities: { create: [{ name: "Transfer from airport" }, { name: "Resort orientation" }] },
          },
          {
            dayNumber: 2,
            title: "Udawalawe Elephant Safari",
            mainTown: "Udawalawe",
            description: "Morning safari focusing on elephant herds. Afternoon visit to Elephant Transit Home. Evening nature walk.",
            accommodation: { create: [{ name: "Grand Udawalawe Safari Resort" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: { create: [{ name: "Morning 4x4 wildlife safari" }, { name: "Elephant orphanage visit" }, { name: "Guided nature walk" }] },
          },
          {
            dayNumber: 3,
            title: "Sinharaja Rainforest Trek",
            mainTown: "Sinharaja",
            description: "Transfer to Sinharaja UNESCO Biosphere Reserve. Guided trek through primary rainforest with endemic species spotting.",
            accommodation: { create: [{ name: "Rainforest Eco Lodge" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }] },
            activities: { create: [{ name: "Rainforest trekking (full day)" }, { name: "Endemic bird watching" }, { name: "Hidden waterfall swim" }] },
          },
          {
            dayNumber: 4,
            title: "Kitulgala River Adventure",
            mainTown: "Kitulgala",
            description: "River tubing on the Kelani River. Afternoon rainforest canopy walk and spice garden visit.",
            accommodation: { create: [{ name: "The Plantation Hotel" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: { create: [{ name: "River tubing" }, { name: "Canopy walkway" }, { name: "Village and spice garden tour" }] },
          },
          {
            dayNumber: 5,
            title: "Yala Leopard Safari",
            mainTown: "Yala",
            description: "Full day in Yala National Park — morning and afternoon safaris with packed lunch. Focus on leopard habitats and wetland birds.",
            accommodation: { create: [{ name: "Cinnamon Wild Yala" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: { create: [{ name: "Morning wildlife safari" }, { name: "Afternoon safari" }, { name: "Wildlife photography session" }] },
          },
          {
            dayNumber: 6,
            title: "Coastal Drive & Departure",
            mainTown: "Colombo",
            description: "Scenic coastal drive to Colombo with stop at turtle conservation centre. Airport transfer.",
            meals: { create: [{ meal: "BREAKFAST" }] },
            activities: { create: [{ name: "Sea turtle conservation centre" }, { name: "Coastal scenic drive" }, { name: "Airport transfer" }] },
          },
        ],
      },
    },
  });

  const pkg5 = await prisma.travelPackage.create({
    data: {
      title: "East Coast Tropical Escape",
      description:
        "Discover Sri Lanka's unspoiled eastern coastline — crystal-clear turquoise waters, vibrant coral reefs, ancient Hindu temples, and traditional fishing villages untouched by mass tourism.",
      imageUrl: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800",
      durationDays: 5,
      price: 799,
      rating: 4.7,
      reviewCount: 56,
      destinations: {
        create: [
          { destination: "Trincomalee" },
          { destination: "Pigeon Island" },
          { destination: "Batticaloa" },
        ],
      },
      highlights: {
        create: [
          { highlight: "Whale watching in Trincomalee Bay (May–Sep)" },
          { highlight: "Snorkelling at Pigeon Island National Park" },
          { highlight: "Koneswaram Temple on Swami Rock" },
          { highlight: "Batticaloa Lagoon moonlight kayaking" },
          { highlight: "Traditional catamaran sailing at sunset" },
        ],
      },
      gallery: {
        create: [
          { url: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800" },
          { url: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800" },
          { url: "https://images.unsplash.com/photo-1597466760503-7efab5b74c9b?w=800" },
        ],
      },
      includes: {
        create: [
          { item: "4 nights beachfront accommodation" },
          { item: "All marine activity equipment" },
          { item: "Cultural site entrance fees" },
          { item: "Daily breakfast + 2 lunches + 3 dinners" },
          { item: "English-speaking guide throughout" },
          { item: "All transportation" },
        ],
      },
      excludes: {
        create: [
          { item: "Diving certification fees" },
          { item: "Personal shopping" },
          { item: "Optional spa treatments" },
          { item: "Beverages and alcoholic drinks" },
          { item: "International flights" },
        ],
      },
      itineraryDays: {
        create: [
          {
            dayNumber: 1,
            title: "Arrival in Trincomalee",
            mainTown: "Trincomalee",
            description: "Transfer from Colombo to Trincomalee. Evening beach welcome ceremony with traditional drumming.",
            accommodation: { create: [{ name: "Trinco Blu by Cinnamon" }] },
            meals: { create: [{ meal: "DINNER" }] },
            activities: { create: [{ name: "Transfer from Colombo" }, { name: "Beach welcome ceremony" }] },
          },
          {
            dayNumber: 2,
            title: "Marine Adventure Day",
            mainTown: "Trincomalee",
            description: "Morning whale watching excursion. Afternoon snorkelling at Pigeon Island National Park with abundant marine life.",
            accommodation: { create: [{ name: "Trinco Blu by Cinnamon" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: { create: [{ name: "Whale watching boat tour" }, { name: "Pigeon Island snorkelling" }] },
          },
          {
            dayNumber: 3,
            title: "Cultural Exploration",
            mainTown: "Trincomalee",
            description: "Visit Koneswaram Temple perched on Swami Rock. Afternoon cooking class and fishing village tour.",
            accommodation: { create: [{ name: "Trinco Blu by Cinnamon" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "DINNER" }] },
            activities: { create: [{ name: "Koneswaram Temple visit" }, { name: "Sri Lankan cooking class" }, { name: "Fishing village tour" }] },
          },
          {
            dayNumber: 4,
            title: "Batticaloa Lagoon Discovery",
            mainTown: "Batticaloa",
            description: "Transfer to Batticaloa. Sunset kayaking on the famous lagoon. Experience the 'singing fish' phenomenon at Kallady.",
            accommodation: { create: [{ name: "Amaya Beach Resort" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }] },
            activities: { create: [{ name: "Lagoon kayaking" }, { name: "Kallady musical sands" }, { name: "Dutch Fort exploration" }] },
          },
          {
            dayNumber: 5,
            title: "Departure with Coastal Memories",
            mainTown: "Colombo",
            description: "Scenic return drive with stop at local artisan markets. Airport transfer.",
            meals: { create: [{ meal: "BREAKFAST" }] },
            activities: { create: [{ name: "Artisan market visit" }, { name: "Scenic coastal drive" }, { name: "Airport transfer" }] },
          },
        ],
      },
    },
  });

  const pkg6 = await prisma.travelPackage.create({
    data: {
      title: "Wellness & Ayurveda Retreat",
      description:
        "Rejuvenate body and mind with authentic Sri Lankan Ayurvedic treatments, guided yoga, forest bathing, and mindful living in serene beachside and hillside wellness sanctuaries.",
      imageUrl: "https://images.unsplash.com/photo-1549576490-b0b4831a60b1?w=800",
      durationDays: 7,
      price: 1299,
      rating: 4.9,
      reviewCount: 92,
      destinations: {
        create: [
          { destination: "Weligama" },
          { destination: "Kanneliya Forest" },
        ],
      },
      highlights: {
        create: [
          { highlight: "Personalised Ayurveda consultation with resident doctor" },
          { highlight: "Daily sunrise yoga and beach meditation" },
          { highlight: "Herbal garden tour and medicinal plant workshop" },
          { highlight: "Forest bathing and mindfulness immersion" },
          { highlight: "Traditional detox and rejuvenation treatments" },
        ],
      },
      gallery: {
        create: [
          { url: "https://images.unsplash.com/photo-1549576490-b0b4831a60b1?w=800" },
          { url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800" },
          { url: "https://images.unsplash.com/photo-1591348122449-02525d703f45?w=800" },
        ],
      },
      includes: {
        create: [
          { item: "6 nights premium wellness accommodation" },
          { item: "Daily Ayurvedic treatments (2x per day)" },
          { item: "All yoga and meditation sessions" },
          { item: "Full board organic vegetarian meals" },
          { item: "Personalised wellness programme" },
          { item: "All workshops, consultations, and activities" },
          { item: "Airport transfers" },
        ],
      },
      excludes: {
        create: [
          { item: "Optional premium treatment upgrades" },
          { item: "Herbal supplement purchases" },
          { item: "Personal shopping" },
          { item: "International flights and travel insurance" },
        ],
      },
      itineraryDays: {
        create: [
          {
            dayNumber: 1,
            title: "Arrival & Wellness Orientation",
            mainTown: "Weligama",
            description: "Transfer to beachside wellness resort. Initial Ayurvedic dosha consultation with resident physician.",
            accommodation: { create: [{ name: "Santani Wellness Resort" }] },
            meals: { create: [{ meal: "DINNER" }] },
            activities: { create: [{ name: "Airport transfer" }, { name: "Doctor consultation" }, { name: "Resort orientation" }] },
          },
          {
            dayNumber: 2,
            title: "Holistic Healing Begins",
            mainTown: "Weligama",
            description: "Sunrise yoga session on the beach. Herbal compress massage. Nutrition workshop and cooking demonstration.",
            accommodation: { create: [{ name: "Santani Wellness Resort" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }, { meal: "DINNER" }] },
            activities: { create: [{ name: "Sunrise yoga (1.5 hrs)" }, { name: "Abhyanga oil massage" }, { name: "Nutrition & cooking workshop" }] },
          },
          {
            dayNumber: 3,
            title: "Nature Immersion",
            mainTown: "Weligama",
            description: "Forest bathing therapy. Sound healing with traditional instruments. Mindfulness beach walk at sunset.",
            accommodation: { create: [{ name: "Santani Wellness Resort" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }, { meal: "DINNER" }] },
            activities: { create: [{ name: "Forest bathing therapy" }, { name: "Sound healing session" }, { name: "Sunset beach walk" }] },
          },
          {
            dayNumber: 4,
            title: "Mountain Retreat Transfer",
            mainTown: "Kanneliya",
            description: "Scenic drive to hill country eco-retreat. Afternoon herbal garden tour and traditional tea ceremony.",
            accommodation: { create: [{ name: "The Rainforest Ecolodge" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }, { meal: "DINNER" }] },
            activities: { create: [{ name: "Herbal garden tour" }, { name: "Traditional tea ceremony" }, { name: "Sunset hilltop meditation" }] },
          },
          {
            dayNumber: 5,
            title: "Water Healing Day",
            mainTown: "Kanneliya",
            description: "Waterfall meditation in a secluded forest pool. Hydrotherapy session. Evening yoga nidra (yogic sleep).",
            accommodation: { create: [{ name: "The Rainforest Ecolodge" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }, { meal: "DINNER" }] },
            activities: { create: [{ name: "Waterfall meditation" }, { name: "Hydrotherapy session" }, { name: "Yoga nidra (deep relaxation)" }] },
          },
          {
            dayNumber: 6,
            title: "Integration & Reflection",
            mainTown: "Kanneliya",
            description: "Personalised wellness plan development for home practice. Final signature Ayurveda treatment. Closing circle ceremony.",
            accommodation: { create: [{ name: "The Rainforest Ecolodge" }] },
            meals: { create: [{ meal: "BREAKFAST" }, { meal: "LUNCH" }, { meal: "DINNER" }] },
            activities: { create: [{ name: "Personalised wellness planning" }, { name: "Signature final treatment" }, { name: "Closing ceremony" }] },
          },
          {
            dayNumber: 7,
            title: "Departure Renewed",
            mainTown: "Colombo",
            description: "Transfer to Colombo with herbal tea hamper gift. Optional Colombo city spa stop before airport.",
            meals: { create: [{ meal: "BREAKFAST" }] },
            activities: { create: [{ name: "Herbal gift hamper presentation" }, { name: "Transfer to airport" }] },
          },
        ],
      },
    },
  });

  console.log(`Created packages: ${pkg4.id}, ${pkg5.id}, ${pkg6.id}`);

  // ============================================================
  // MORE GALLERY ITEMS
  // ============================================================
  console.log("Adding more gallery items...");

  await prisma.galleryItem.createMany({
    data: [
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400",
        caption: "Blue whale surfacing in Mirissa",
        location: "Mirissa",
        description: "The blue whale, the largest animal on Earth, breaches off the coast of Mirissa during peak season.",
        featured: true,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400",
        caption: "Tea estate at sunrise, Nuwara Eliya",
        location: "Nuwara Eliya",
        description: "Rolling green tea estates catch the early morning light in Sri Lanka's hill country.",
        featured: true,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1567598460019-64c40c23a8cf?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1567598460019-64c40c23a8cf?w=400",
        caption: "Temple of the Tooth Relic, Kandy",
        location: "Kandy",
        description: "The sacred Dalada Maligawa, housing the relic of the Buddha's tooth, illuminated during Esala Perahera.",
        featured: false,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1620766786530-7fa86dee13cb?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1620766786530-7fa86dee13cb?w=400",
        caption: "Nine Arch Bridge through the mist",
        location: "Ella",
        description: "The iconic Nine Arch Bridge emerges from the morning jungle mist as a train crosses through tea country.",
        featured: true,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400",
        caption: "Sri Lankan elephant herd",
        location: "Udawalawe",
        description: "A family herd of wild elephants at a waterhole in Udawalawe National Park at dusk.",
        featured: true,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1586500036706-41963de24d8c?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1586500036706-41963de24d8c?w=400",
        caption: "Galle Fort lighthouse at dusk",
        location: "Galle",
        description: "The colonial-era Galle Fort lighthouse against a vivid tropical sunset.",
        featured: false,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=400",
        caption: "Pristine Marble Beach, Trincomalee",
        location: "Trincomalee",
        description: "Crystal-clear waters and white sand at Marble Beach on Sri Lanka's unspoiled eastern coast.",
        featured: false,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=400",
        caption: "Pigeon Island coral reef",
        location: "Trincomalee",
        description: "Vibrant coral gardens teeming with tropical fish at Pigeon Island Marine National Park.",
        featured: false,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1573512449171-1a8b7e4a4143?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1573512449171-1a8b7e4a4143?w=400",
        caption: "Leopard in Yala",
        location: "Yala",
        description: "A majestic Sri Lankan leopard rests on a rock in Yala National Park, home to the world's highest leopard density.",
        featured: true,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1624461063672-fb93119c9abb?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1624461063672-fb93119c9abb?w=400",
        caption: "Ayurvedic herbal treatment",
        location: "Weligama",
        description: "Traditional Ayurvedic oil massage using centuries-old herbal formulations at a coastal wellness retreat.",
        featured: false,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400",
        caption: "Traditional Sri Lankan cuisine",
        location: "Colombo",
        description: "An authentic rice and curry spread featuring dhal, jackfruit curry, pol sambol, and papadam.",
        featured: false,
      },
      {
        type: "IMAGE",
        url: "https://images.unsplash.com/photo-1590168557862-3b8c59a17324?w=800",
        thumbnailUrl: "https://images.unsplash.com/photo-1590168557862-3b8c59a17324?w=400",
        caption: "Kandyan cultural dance performance",
        location: "Kandy",
        description: "Traditional Kandyan dancers in vibrant costume perform during the famous Esala Perahera festival.",
        featured: false,
      },
    ],
  });

  console.log("Added 12 more gallery items");

  // ============================================================
  // MORE BLOG POSTS
  // ============================================================
  console.log("Adding more blog posts...");

  const blog4 = await prisma.blogPost.create({
    data: {
      title: "Planning Your Sri Lanka Safari: Yala vs Udawalawe vs Wilpattu",
      excerpt: "Comparing the three best national parks for wildlife viewing — which one is right for your trip?",
      content: `Sri Lanka packs an extraordinary amount of wildlife into a surprisingly small island. Three national parks dominate most safari itineraries: Yala, Udawalawe, and Wilpattu — and each delivers a very different experience.

Yala National Park in the southeast is the headline act. With the world's highest density of wild leopards, seeing one here is almost a guarantee on a full-day visit. Block 1 (the most visited section) also features elephants, sloth bears, crocodiles, and over 200 bird species in a dramatic landscape of scrub jungle, lagoons, and rocky outcrops. The best time to visit is February to July when water levels drop and animals congregate around remaining waterholes.

Udawalawe, by contrast, is Sri Lanka's elephant park. The reservoir at its centre draws enormous herds — you can reliably see 50-100 elephants on a single game drive. The Elephant Transit Home at the park entrance rehabilitates injured calves, with a public feeding session daily at 9am, 12pm, 3pm, and 6pm. Udawalawe is excellent year-round, though June to September offers peak concentrations.

Wilpattu, in the northwest, is the largest and most remote of the three. Its signature feature is the natural 'willus' — white sand-rimmed natural lakes that attract leopards and sloth bears. Far fewer visitors than Yala means the experience is more exclusive and the wildlife less habituated. The park reopened after a 30-year civil war closure in 2010 and is rapidly rehabilitating its leopard population.

For most visitors on a 10-day trip, combining Yala (or Wilpattu) with Udawalawe gives the best breadth of wildlife. Budget safari jeep costs from $50-90 per vehicle plus park entrance fees of $15-40 per person.`,
      imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800",
      postDate: new Date("2025-02-10"),
      author: "Chaminda Rajapaksa",
      category: "Wildlife",
      commentCount: 11,
      comments: {
        create: [
          {
            author: "James Holloway",
            avatarUrl: "https://i.pravatar.cc/150?img=15",
            commentDate: new Date("2025-02-12"),
            text: "Just back from Yala — we saw 3 leopards in one day! Absolutely incredible. Would back up everything in this article.",
          },
          {
            author: "Priya Nair",
            avatarUrl: "https://i.pravatar.cc/150?img=16",
            commentDate: new Date("2025-02-14"),
            text: "We chose Wilpattu for the exclusivity and it was stunning. Worth the longer drive from Colombo.",
          },
          {
            author: "Tom Werner",
            avatarUrl: "https://i.pravatar.cc/150?img=17",
            commentDate: new Date("2025-02-15"),
            text: "Udawalawe for elephant lovers is a must. The Transit Home feeding session is genuinely moving.",
          },
        ],
      },
    },
  });

  const blog5 = await prisma.blogPost.create({
    data: {
      title: "Sri Lanka Street Food: 15 Dishes You Must Try",
      excerpt: "From kottu roti to hoppers — a complete guide to eating your way through Sri Lanka's vibrant street food scene.",
      content: `Sri Lanka's street food culture is one of the most rewarding and affordable ways to experience the island. Here are 15 dishes you cannot leave without trying.

**Kottu Roti** is the street food soundtrack of Sri Lanka — you hear the rhythmic clatter of metal blades on a flat griddle before you see it. Shredded roti bread is chopped and mixed with egg, vegetables, and your choice of chicken, mutton, beef, or seafood. Available everywhere from midnight food stalls to restaurant kitchens.

**Hoppers (Appa)** are bowl-shaped rice flour pancakes with a crispy lacey edge and soft centre. Egg hoppers add a fried egg to the centre. String hoppers are steamed noodle nests. Both are eaten with coconut sambol, dhal curry, and seeni sambol (caramelised onion).

**Isso Wadde (Prawn Fritters)** are sold along every beach road in the south — crispy gram flour fritters topped with whole prawns. Find them at Galle Face Green in Colombo, where hawkers sell them directly from street carts.

**Pol Roti** is a thick flatbread made with coconut and green chilli, cooked on a flat pan. Pair it with pol sambol (fresh coconut relish) for one of the most satisfying breakfasts imaginable.

**Isso Curry (Prawn Curry)** from roadside pot stalls uses coconut milk, roasted curry leaves, and Sri Lankan black pepper for a depth of flavour that rivals any high-end restaurant.

**Kiri Bath (Milk Rice)** is the ceremonial dish served on every auspicious occasion. Creamy rice cooked in coconut milk and cut into diamond shapes — traditionally eaten with jagery on New Year's Day.

Other must-tries: **Wood apple juice**, **king coconut water** (thambili), **ISSO WADE**, **vade** (savoury lentil donuts), **pittu** (steamed rice cylinders), **watalappan** (coconut jaggery pudding), **aluwa** (cashew-jaggery sweets), **pol pani** (coconut pancakes), and **banana flower curry**.

Best cities for street eating: Colombo's Pettah Market, Galle Fort's evening stalls, Kandy's central market, and any coastal town at sunset.`,
      imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
      postDate: new Date("2025-03-01"),
      author: "Dilani Fernando",
      category: "Food & Culture",
      commentCount: 19,
      comments: {
        create: [
          {
            author: "Nina Schulz",
            avatarUrl: "https://i.pravatar.cc/150?img=20",
            commentDate: new Date("2025-03-03"),
            text: "The kottu roti I had in Colombo was one of the best things I've ever eaten. Absolutely addictive.",
          },
          {
            author: "Rajiv Kumar",
            avatarUrl: "https://i.pravatar.cc/150?img=21",
            commentDate: new Date("2025-03-05"),
            text: "Don't miss the pol roti with kiri hodi (coconut milk curry). This combo changed my life.",
          },
        ],
      },
    },
  });

  const blog6 = await prisma.blogPost.create({
    data: {
      title: "Galle Fort: The Complete Visitor's Guide",
      excerpt: "Everything you need to know to explore one of South Asia's best preserved colonial fortifications.",
      content: `Galle Fort on Sri Lanka's southern tip is one of the best-preserved examples of European colonial architecture in South and Southeast Asia, and with good reason — UNESCO listed it as a World Heritage Site in 1988. Yet it remains a living, breathing town of 400+ residents, boutique hotels, art galleries, and some of the island's finest restaurants.

**History**: The Portuguese built the original fortification in 1588. The Dutch, who captured Galle in 1640, expanded it massively into the formidable structure you see today — 36 hectares enclosed by 1.5km of walls up to 3 stories high. The British took over in 1796 but largely left the Dutch infrastructure intact, preferring to develop Colombo as their administrative capital.

**Must-see within the fort**: The Dutch Reformed Church (1755) houses original Dutch family tombstones in its flagstone floor. The Maritime Museum in the Old Dutch Hospital tells the fort's nautical history. The lighthouse at the south point is one of the most photographed spots in Sri Lanka. The Galle Fort Hotel in the old governor's residence is worth visiting even just for a drink on its terrace.

**The rampart walk**: The 1.5km circumnavigation of the fort walls takes about 45 minutes at a leisurely pace. Sunset from the northwestern bastion is unmissable — local families gather here nightly.

**Eating and shopping**: Pedlar Street and Church Street are lined with excellent cafés, restaurants, and jewellery shops. Fort Printers has the most atmospheric breakfast terrace. Old Town Galle's Cargills food court offers local lunch options.

**Getting there**: 2.5 hours by road from Colombo, or 2 hours on the Coastal Line train. Trains are scenic and worth the minor scheduling effort. From Colombo's Maradana or Fort stations, book 2nd class observation car seats in advance.

**Practical**: Entry to the fort is free. The main car park is just outside the outer gate. Most attractions are closed on Sundays or Poya (full moon) holidays.`,
      imageUrl: "https://images.unsplash.com/photo-1586500036706-41963de24d8c?w=800",
      postDate: new Date("2025-03-15"),
      author: "Nimal Perera",
      category: "Destinations",
      commentCount: 7,
      comments: {
        create: [
          {
            author: "Sophie Laurent",
            avatarUrl: "https://i.pravatar.cc/150?img=25",
            commentDate: new Date("2025-03-17"),
            text: "Spent a whole afternoon walking the ramparts. The sunset was absolutely spectacular. Don't skip it!",
          },
          {
            author: "David Chen",
            avatarUrl: "https://i.pravatar.cc/150?img=26",
            commentDate: new Date("2025-03-18"),
            text: "The Dutch Reformed Church interior with the tombstones is eerie and fascinating. Great tip.",
          },
        ],
      },
    },
  });

  const blog7 = await prisma.blogPost.create({
    data: {
      title: "Best Time to Visit Sri Lanka: A Month-by-Month Guide",
      excerpt: "Sri Lanka has two distinct monsoon seasons. Here's exactly when to visit for the best weather in each region.",
      content: `Sri Lanka's weather is governed by two monsoon seasons, which means — uniquely — you can find sunshine somewhere on the island year-round. The key is knowing which coast to visit when.

**The Southwest Monsoon (Yala: May–September)** brings heavy rain to the western and southern coasts including Colombo, Galle, and Mirissa. This is the best time for the eastern coast (Trincomalee, Arugam Bay) and the Cultural Triangle (Sigiriya, Polonnaruwa, Anuradhapura), which remain largely dry.

**The Northeast Monsoon (Maha: October–January)** brings rain to the east and north. This is peak season for the south and west coast — perfect timing for Galle, Mirissa whale watching (November–April), and the hill country.

**January–March**: Peak season. The southwest coast is at its best — calm seas, whale watching in Mirissa, and the hill country is lush and green. Colombo's Galle Face Green is buzzing. This is also the driest period around Sigiriya and the Cultural Triangle.

**April**: Short inter-monsoon period. Unpredictable rain everywhere but Sinhala and Tamil New Year (April 13/14) is a spectacular festival to experience.

**May–September**: East coast season. Arugam Bay has Sri Lanka's best surf breaks. Trincomalee beaches are exquisite. The Cultural Triangle stays dry. Yala National Park closes in September for the annual cull of undergrowth.

**October–November**: Transitional period. The northeast monsoon begins — rain on the east, but the southwest coast starts clearing. Good whale shark sightings off Kalpitiya (August–November).

**December**: Festive season. The whole southwest coast is glorious — Galle Literature Festival draws international writers. Beach hotels book out months in advance.

**Year-round highlights**: Kandy (hill country is good most of the year), Sigiriya, and all cultural sites. The temperature in the highlands stays cool 15–25°C regardless of season.`,
      imageUrl: "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=800",
      postDate: new Date("2025-03-20"),
      author: "Ishara Wijesinghe",
      category: "Travel Tips",
      commentCount: 23,
      comments: {
        create: [
          {
            author: "Maria Gonzalez",
            avatarUrl: "https://i.pravatar.cc/150?img=30",
            commentDate: new Date("2025-03-22"),
            text: "Saved this! Planning for October and was confused about the monsoons. Now I know to head east first.",
          },
          {
            author: "Ben Foster",
            avatarUrl: "https://i.pravatar.cc/150?img=31",
            commentDate: new Date("2025-03-23"),
            text: "The Galle Literature Festival in December is magical. Worth planning an entire trip around.",
          },
        ],
      },
    },
  });

  const blog8 = await prisma.blogPost.create({
    data: {
      title: "Sigiriya Rock Fortress: How to Climb It & What to Expect",
      excerpt: "The complete guide to visiting Sri Lanka's most iconic landmark — logistics, history, and insider tips.",
      content: `Rising 200 metres from the jungle floor, Sigiriya is Sri Lanka's most photographed landmark and one of the most dramatic archaeological sites in Asia. Built by King Kashyapa I in the 5th century, this 'Lion Rock' fortress combines extraordinary engineering with artistic genius — the frescoes painted on the rock face are considered masterpieces of ancient art.

**The climb**: The route from the base takes 1–1.5 hours to the summit and involves several distinct sections. First, the water gardens at the base — formal pools and fountains still functional after 1,500 years. Next, the boulder gardens with ancient cave inscriptions. Then the spiral staircase to the Mirror Wall and the famous Sigiriya Damsels (vivid frescoes of celestially beautiful women, most likely apsaras or lightning princesses from the king's court). Finally, the giant Lion's Paws mark the entrance to the summit staircase through the cliff face.

**The summit**: At the top, the ruins of the royal palace reveal an astonishing feat of engineering — swimming pool, throne room, and audience halls all carved from or built atop a sheer rock pinnacle. Views extend 360° across the Central Province jungle.

**Practical information**: Entrance fee is $30 per adult (2025 rates). Open daily 7am–5:30pm. Go as early as possible — by 9am the queue for the frescoes section can be 40 minutes. Bring water; there are no facilities on the rock itself. Around 1,200 steps to the top — manageable for most fitness levels but not recommended in the midday heat.

Insider tips: Book a certified Sigiriya guide from the ticket office for historical context. Visit Pidurangala Rock the afternoon before — a 45-minute climb rewards with the best photograph of Sigiriya at sunrise. Stay in nearby Dambulla or a jungle lodge outside the village for same-morning access.`,
      imageUrl: "https://images.unsplash.com/photo-1590766940543-4ab56e0b8a40?w=800",
      postDate: new Date("2025-03-28"),
      author: "Nimal Perera",
      category: "Destinations",
      commentCount: 14,
      comments: {
        create: [
          {
            author: "Alex Kim",
            avatarUrl: "https://i.pravatar.cc/150?img=35",
            commentDate: new Date("2025-03-30"),
            text: "The Pidurangala tip is gold. Sunset from there with Sigiriya in the frame is absolutely unbeatable.",
          },
          {
            author: "Charlotte Webb",
            avatarUrl: "https://i.pravatar.cc/150?img=36",
            commentDate: new Date("2025-03-31"),
            text: "Arrived at 7am sharp and was fourth in the queue. Worth it completely — had the frescoes almost to myself.",
          },
        ],
      },
    },
  });

  // Link related posts
  await prisma.relatedPost.createMany({
    data: [
      { postId: blog4.id, relatedId: blog7.id },
      { postId: blog5.id, relatedId: blog6.id },
      { postId: blog6.id, relatedId: blog8.id },
      { postId: blog7.id, relatedId: blog4.id },
      { postId: blog8.id, relatedId: blog6.id },
    ],
  });

  console.log(`Created 5 more blog posts (ids: ${blog4.id}, ${blog5.id}, ${blog6.id}, ${blog7.id}, ${blog8.id})`);

  // ============================================================
  // SUMMARY
  // ============================================================
  const counts = await Promise.all([
    prisma.travelPackage.count(),
    prisma.destinationDetails.count(),
    prisma.travelComponent.count(),
    prisma.blogPost.count(),
    prisma.galleryItem.count(),
    prisma.itineraryDay.count(),
  ]);

  console.log(`
✅ Additional seeding complete!
   - ${counts[0]} total travel packages
   - ${counts[1]} total destination details
   - ${counts[2]} total travel components
   - ${counts[3]} total blog posts
   - ${counts[4]} total gallery items
   - ${counts[5]} total itinerary days
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
