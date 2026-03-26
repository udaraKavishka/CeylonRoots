import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sri Lanka Tour Packages | CeylonRoots",
  description:
    "Compare Sri Lanka tour packages by region, budget, and travel style. Build a personalized itinerary with CeylonRoots.",
  keywords: [
    "Sri Lanka tour packages",
    "Sri Lanka holiday packages",
    "custom Sri Lanka itinerary",
    "Sri Lanka package deals",
    "Sri Lanka travel planner",
    "best Sri Lanka tours",
  ],
  alternates: {
    canonical: "/travelPackages",
  },
  openGraph: {
    title: "Sri Lanka Tour Packages | CeylonRoots",
    description:
      "Discover and compare Sri Lanka packages by region, themes, and trip duration.",
    url: "/travelPackages",
    type: "website",
    images: [
      {
        url: "/og/packages.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Lanka tour packages by CeylonRoots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Tour Packages | CeylonRoots",
    description:
      "Discover and compare Sri Lanka packages by region, themes, and trip duration.",
    images: ["/og/packages.jpg"],
  },
};

export default function TravelPackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
