export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  testimonial: string;
  tourType: string;
  date: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Emma Thompson",
    location: "United Kingdom",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    testimonial:
      "Our trip to Sri Lanka with CeylonRoots was nothing short of magical. From the ancient ruins to the southern coast, every detail felt deeply considered.",
    tourType: "Cultural Circle",
    date: "March 2026",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Singapore",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    testimonial:
      "The itinerary was balanced perfectly. We had wildlife, coast time, and authentic food experiences without ever feeling rushed.",
    tourType: "Wildlife & Coast",
    date: "January 2026",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "Australia",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    testimonial:
      "The tea country segment was breathtaking. The team stayed flexible when weather changed and still delivered an excellent route.",
    tourType: "Tea Country Escape",
    date: "February 2026",
  },
  {
    id: 4,
    name: "David Rodriguez",
    location: "Spain",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
    rating: 5,
    testimonial:
      "Third trip with CeylonRoots and they keep improving. Local food recommendations were incredible and the guide quality was exceptional.",
    tourType: "Beach Adventure",
    date: "April 2026",
  },
  {
    id: 5,
    name: "Amit Patel",
    location: "India",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    testimonial:
      "As someone reconnecting with family roots in Sri Lanka, this felt personal and meaningful. Not generic tourism at all.",
    tourType: "Heritage Route",
    date: "December 2025",
  },
  {
    id: 6,
    name: "Julia Schmidt",
    location: "Germany",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 4,
    testimonial:
      "We traveled as a family and the pacing was very thoughtful for kids and adults. Safari day was the highlight for everyone.",
    tourType: "Family Adventure",
    date: "November 2025",
  },
];
