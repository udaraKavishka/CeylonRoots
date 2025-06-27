import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
// import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { UserProvider } from "./contexts/UserContext";
import NotFound from './not-found';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CeylonRoots - Authentic Sri Lanka Travel Experiences",
  description:
    "Discover Sri Lanka with expert-curated travel packages, cultural experiences, and personalized itineraries. Explore ancient heritage, pristine beaches, and lush landscapes.",
  keywords: [
    "Sri Lanka travel",
    "Ceylon tourism",
    "cultural experiences",
    "custom packages",
    "luxury tours",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider delayDuration={300}>
          <UserProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            {/* <Toaster /> */}
            {/* <Sonner /> */}
          </UserProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
