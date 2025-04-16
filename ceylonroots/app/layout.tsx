import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
// import { Toaster } from './components/ui/toaster';
// import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from './components/ui/tooltip';
// import NotFound from './not-found';
// import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CeylonRoots - Authentic Sri Lanka Travel Experiences',
  description: 'Discover Sri Lanka with expert-curated travel packages, cultural experiences, and personalized itineraries. Explore ancient heritage, pristine beaches, and lush landscapes.',
  keywords: ['Sri Lanka travel', 'Ceylon tourism', 'cultural experiences', 'custom packages', 'luxury tours'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ceylonroots.com',
    siteName: 'CeylonRoots',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
    }]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ceylonroots',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider delayDuration={300}>
          <Navbar />
          <HeroSection />
          <main className="min-h-screen">
            {children}
          </main>
            <Footer />
            {/* <Toaster /> */}
            {/* <Sonner /> */}
        </TooltipProvider>
      
    </body>
    </html >
  );
}