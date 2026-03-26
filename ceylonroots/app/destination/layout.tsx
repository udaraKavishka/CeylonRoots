import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations | CeylonRoots — Explore Sri Lanka",
  description:
    "Explore Sri Lanka's most breathtaking destinations — from the Cultural Triangle and Hill Country to pristine beaches, national parks, and ancient cities.",
  keywords: [
    "Sri Lanka destinations",
    "places to visit Sri Lanka",
    "Sigiriya",
    "Ella Sri Lanka",
    "Yala National Park",
    "Galle Fort",
    "Kandy Sri Lanka",
  ],
  openGraph: {
    title: "Destinations | CeylonRoots",
    description: "Explore Sri Lanka's most breathtaking destinations.",
    type: "website",
  },
};

export default function DestinationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
