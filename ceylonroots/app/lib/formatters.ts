// Response formatters to match Java backend response structure

type PrismaPackage = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  durationDays: number | null;
  price: { toString(): string } | null;
  rating: number | null;
  reviewCount: number | null;
  createdAt: Date;
  updatedAt: Date;
  destinations: { destination: string }[];
  highlights: { highlight: string }[];
  gallery: { url: string }[];
  includes: { item: string }[];
  excludes: { item: string }[];
  itineraryDays: PrismaItineraryDay[];
};

type PrismaItineraryDay = {
  id: number;
  dayNumber: number;
  title: string | null;
  mainTown: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  accommodation: { name: string }[];
  meals: { meal: string }[];
  activities: { name: string }[];
};

export function formatItineraryDay(day: PrismaItineraryDay) {
  return {
    id: day.id,
    dayNumber: day.dayNumber,
    title: day.title,
    mainTown: day.mainTown,
    description: day.description,
    accommodation: day.accommodation.map((a) => a.name),
    meals: day.meals.map((m) => m.meal),
    activities: day.activities.map((a) => ({ name: a.name })),
    createdAt: day.createdAt,
    updatedAt: day.updatedAt,
  };
}

export function formatTravelPackage(pkg: PrismaPackage) {
  return {
    id: pkg.id,
    title: pkg.title,
    description: pkg.description,
    imageUrl: pkg.imageUrl,
    durationDays: pkg.durationDays,
    price: pkg.price ? parseFloat(pkg.price.toString()) : null,
    rating: pkg.rating,
    reviewCount: pkg.reviewCount,
    destinations: pkg.destinations.map((d) => d.destination),
    highlights: pkg.highlights.map((h) => h.highlight),
    gallery: pkg.gallery.map((g) => g.url),
    includes: pkg.includes.map((i) => i.item),
    excludes: pkg.excludes.map((e) => e.item),
    itineraryDays: pkg.itineraryDays.map(formatItineraryDay),
    createdAt: pkg.createdAt,
    updatedAt: pkg.updatedAt,
  };
}

type PrismaTravelComponent = {
  id: number;
  componentType: string;
  name: string;
  description: string | null;
  location: string | null;
  imageUrl: string | null;
  price: { toString(): string } | null;
  lat: number | null;
  lng: number | null;
  duration: number | null;
  createdAt: Date;
  updatedAt: Date;
  tags: { tag: string }[];
  // Accommodation
  rating?: number | null;
  amenities?: { amenity: string }[];
  // Activity
  difficulty?: string | null;
  // Transport
  mode?: string | null;
  departureLocation?: string | null;
  arrivalLocation?: string | null;
  departureLat?: number | null;
  departureLng?: number | null;
  arrivalLat?: number | null;
  arrivalLng?: number | null;
  // Destination
  destinationAttractions?: { attraction: string }[];
};

export function formatTravelComponent(component: PrismaTravelComponent) {
  const base = {
    id: component.id,
    type: component.componentType.toLowerCase() + "s",
    name: component.name,
    description: component.description,
    location: component.location,
    imageUrl: component.imageUrl,
    price: component.price ? parseFloat(component.price.toString()) : null,
    lat: component.lat,
    lng: component.lng,
    duration: component.duration,
    tags: component.tags.map((t) => t.tag),
    createdAt: component.createdAt,
    updatedAt: component.updatedAt,
  };

  switch (component.componentType) {
    case "ACCOMMODATION":
      return {
        ...base,
        rating: component.rating,
        amenities: (component.amenities || []).map((a) => a.amenity),
      };
    case "ACTIVITY":
      return {
        ...base,
        difficulty: component.difficulty,
      };
    case "TRANSPORT":
      return {
        ...base,
        mode: component.mode,
        departureLocation: component.departureLocation,
        arrivalLocation: component.arrivalLocation,
        departureLat: component.departureLat,
        departureLng: component.departureLng,
        arrivalLat: component.arrivalLat,
        arrivalLng: component.arrivalLng,
      };
    case "DESTINATION":
      return {
        ...base,
        attractions: (component.destinationAttractions || []).map(
          (a) => a.attraction
        ),
      };
    default:
      return base;
  }
}

type PrismaGalleryItem = {
  id: number;
  type: string;
  url: string;
  thumbnailUrl: string | null;
  caption: string | null;
  location: string | null;
  description: string | null;
  featured: boolean | null;
  dateAdded: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export function formatGalleryItem(item: PrismaGalleryItem) {
  return {
    id: item.id,
    type: item.type,
    url: item.url,
    thumbnailUrl: item.thumbnailUrl,
    caption: item.caption,
    location: item.location,
    description: item.description,
    featured: item.featured,
    dateAdded: item.dateAdded,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

type PrismaBlogPost = {
  id: number;
  title: string;
  excerpt: string | null;
  content: string | null;
  imageUrl: string | null;
  postDate: Date | null;
  author: string | null;
  category: string | null;
  commentCount: number | null;
  createdAt: Date;
  updatedAt: Date;
  comments: PrismaBlogComment[];
  relatedPosts: { related: { id: number; title: string } }[];
};

type PrismaBlogComment = {
  id: number;
  author: string | null;
  avatarUrl: string | null;
  commentDate: Date | null;
  text: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function formatBlogComment(comment: PrismaBlogComment) {
  return {
    id: comment.id,
    author: comment.author,
    avatarUrl: comment.avatarUrl,
    commentDate: comment.commentDate,
    text: comment.text,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}

export function formatBlogPost(post: PrismaBlogPost) {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    imageUrl: post.imageUrl,
    postDate: post.postDate,
    author: post.author,
    category: post.category,
    commentCount: post.commentCount,
    comments: post.comments.map(formatBlogComment),
    relatedPosts: post.relatedPosts.map((rp) => rp.related),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

type PrismaDestinationDetails = {
  id: number;
  name: string;
  description: string | null;
  region: string | null;
  topAttraction: string | null;
  bestTimeToVisit: string | null;
  recommendedDuration: string | null;
  culturalTips: string | null;
  image: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  updatedAt: Date;
  attractions: { attraction: string }[];
};

export function formatDestinationDetails(dest: PrismaDestinationDetails) {
  return {
    id: dest.id,
    name: dest.name,
    description: dest.description,
    region: dest.region,
    topAttraction: dest.topAttraction,
    bestTimeToVisit: dest.bestTimeToVisit,
    recommendedDuration: dest.recommendedDuration,
    culturalTips: dest.culturalTips,
    image: dest.image,
    coordinates: {
      latitude: dest.latitude,
      longitude: dest.longitude,
    },
    attractions: dest.attractions.map((a) => a.attraction),
    createdAt: dest.createdAt,
    updatedAt: dest.updatedAt,
  };
}
