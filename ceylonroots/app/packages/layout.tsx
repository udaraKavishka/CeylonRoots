import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Travel Packages | CeylonRoots — Sri Lanka Tours',
    description:
        'Browse our curated Sri Lanka travel packages — cultural tours, wildlife safaris, beach getaways, and luxury journeys. Compare, wishlist, and book your perfect trip.',
    keywords: [
        'Sri Lanka travel packages',
        'Ceylon tours',
        'cultural tour Sri Lanka',
        'wildlife safari Sri Lanka',
        'beach holiday Sri Lanka',
        'luxury travel Sri Lanka',
    ],
    openGraph: {
        title: 'Travel Packages | CeylonRoots',
        description: 'Curated Sri Lanka tours and packages for every traveller.',
        type: 'website',
    },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
