import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Guides in Sri Lanka | CeylonRoots",
  description:
    "Find verified local guides in Sri Lanka for cultural tours, wildlife safaris, hiking routes, and private travel experiences.",
  keywords: [
    "Sri Lanka tour guide",
    "local guide Sri Lanka",
    "private guide Sri Lanka",
    "Sri Lanka travel guide booking",
    "wildlife guide Sri Lanka",
    "cultural guide Sri Lanka",
  ],
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Local Guides in Sri Lanka | CeylonRoots",
    description:
      "Book experienced local guides in Sri Lanka for personalized, destination-based travel.",
    url: "/guides",
    type: "website",
    images: [
      {
        url: "/og/guides.jpg",
        width: 1200,
        height: 630,
        alt: "CeylonRoots local guides in Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Guides in Sri Lanka | CeylonRoots",
    description:
      "Book experienced local guides in Sri Lanka for personalized, destination-based travel.",
    images: ["/og/guides.jpg"],
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
