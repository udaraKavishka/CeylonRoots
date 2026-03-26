import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CeylonRoots | Sri Lanka Travel Experts",
  description:
    "Contact CeylonRoots for Sri Lanka travel planning, custom itineraries, tour bookings, and destination support.",
  keywords: [
    "contact ceylonroots",
    "Sri Lanka travel agency contact",
    "Sri Lanka tour booking support",
    "custom Sri Lanka itinerary help",
    "Sri Lanka holiday planning",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact CeylonRoots | Sri Lanka Travel Experts",
    description:
      "Talk to our travel team for Sri Lanka itinerary planning and package bookings.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/og/contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact CeylonRoots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact CeylonRoots | Sri Lanka Travel Experts",
    description:
      "Talk to our travel team for Sri Lanka itinerary planning and package bookings.",
    images: ["/og/contact.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
