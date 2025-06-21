'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import PackageFilter from '../components/packages/PackageFilter';
import PackageCard from '../components/packages/PackageCard';
import PackageDetailModal from '../components/packages/PackageDetailModal';
import { TravelPackage } from '../types/travel';
import { packageImages, packageGalleries } from '../data/packageImageMap';

const regions = ["All Regions", "Cultural Triangle", "Hill Country", "Southern Coast", "Northern Province", "Eastern Coast"];
const durations = ["Any Duration", "1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];
const costRanges = ["Any Budget", "Economy ($0-$999)", "Standard ($1000-$1999)", "Premium ($2000-$2999)", "Luxury ($3000+)"];
const themes = ["All Themes", "Beach", "Wildlife", "Culture", "Adventure", "Wellness", "Food", "Family"];

const TravelPackages = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [packages, setPackages] = useState<TravelPackage[]>([]);
    const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedRegion, setSelectedRegion] = useState("All Regions");
    const [selectedDuration, setSelectedDuration] = useState("Any Duration");
    const [selectedCost, setSelectedCost] = useState("Any Budget");
    const [selectedTheme, setSelectedTheme] = useState("All Themes");
    const [searchQuery, setSearchQuery] = useState("");

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Fetch packages from backend API
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/packages`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch packages: ${response.status}`);
                }
                const data = await response.json();

                // Map backend data to frontend structure
                interface BackendPackage {
                    id: string;
                    title: string;
                    description: string;
                    durationDays: number;
                    price: number;
                    rating: number;
                    reviewCount: number;
                    destinations: string[];
                    highlights: string[];
                    includes?: string[];
                    excludes?: string[];
                    itineraryDays?: {
                        dayNumber: number;
                        title: string;
                        description: string;
                        activities?: { name?: string }[] | string[];
                    }[];
                }

                const mappedPackages = data.map((pkg: BackendPackage) => {
                    // Use local images instead of backend URLs
                    const imageUrl = packageImages[pkg.id] || "/placeholder.jpg";
                    const gallery = packageGalleries[pkg.id] || [];

                    return {
                        id: pkg.id,
                        title: pkg.title,
                        description: pkg.description,
                        imageUrl, // Use local image
                        duration: pkg.durationDays,
                        price: pkg.price,
                        rating: pkg.rating,
                        reviewCount: pkg.reviewCount,
                        regions: pkg.destinations,
                        themes: pkg.highlights,
                        includes: pkg.includes || [],
                        excludes: pkg.excludes || [],
                        itineraryDays: (pkg.itineraryDays || []).map((day: {
                            dayNumber: number;
                            title: string;
                            description: string;
                            activities?: { name?: string }[] | string[];
                        }) => ({
                            dayNumber: day.dayNumber,
                            title: day.title,
                            description: day.description,
                            activities: day.activities
                                ? (Array.isArray(day.activities)
                                    ? (day.activities as ({ name?: string } | string)[]).map((act) =>
                                        typeof act === 'string'
                                            ? { name: act }
                                            : { name: act.name || '' }
                                    )
                                    : [{ name: String(day.activities) }]
                                )
                                : []
                        })),
                        gallery
                    };
                });

                setPackages(mappedPackages);
                setError(null);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to load packages');
                }
                setPackages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [API_BASE_URL]);

    // Initialize filters from URL params
    useEffect(() => {
        const region = searchParams.get('region');
        const duration = searchParams.get('duration');
        const cost = searchParams.get('cost');
        const theme = searchParams.get('theme');
        const search = searchParams.get('search');

        if (region && regions.includes(region)) setSelectedRegion(region);
        if (duration && durations.includes(duration)) setSelectedDuration(duration);
        if (cost && costRanges.includes(cost)) setSelectedCost(cost);
        if (theme && themes.includes(theme)) setSelectedTheme(theme);
        if (search) setSearchQuery(search);
    }, [searchParams]);

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();

        if (selectedRegion !== "All Regions") params.set('region', selectedRegion);
        if (selectedDuration !== "Any Duration") params.set('duration', selectedDuration);
        if (selectedCost !== "Any Budget") params.set('cost', selectedCost);
        if (selectedTheme !== "All Themes") params.set('theme', selectedTheme);
        if (searchQuery) params.set('search', searchQuery);

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [selectedRegion, selectedDuration, selectedCost, selectedTheme, searchQuery, router]);

    // Apply filters to packages
    useEffect(() => {
        if (packages.length === 0) {
            setFilteredPackages([]);
            return;
        }

        let result = [...packages];

        // Region filter
        if (selectedRegion !== "All Regions") {
            result = result.filter(pkg => pkg.regions.includes(selectedRegion));
        }

        // Duration filter
        if (selectedDuration !== "Any Duration") {
            if (selectedDuration === "15+ Days") {
                result = result.filter(pkg => pkg.duration >= 15);
            } else {
                const [min, max] = selectedDuration.split('-').map(part =>
                    parseInt(part.replace(/\D/g, ''))
                );
                result = result.filter(pkg =>
                    pkg.duration >= min &&
                    pkg.duration <= (max || min)
                );
            }
        }

        // Cost filter
        if (selectedCost !== "Any Budget") {
            const priceRangeMatch = selectedCost.match(/\$(\d+)-\$(\d+)|\$(\d+)\+/);

            if (priceRangeMatch) {
                if (priceRangeMatch[3]) {
                    // Luxury ($3000+) format
                    const minPrice = parseInt(priceRangeMatch[3]);
                    result = result.filter(pkg => pkg.price >= minPrice);
                } else {
                    // Standard format ($1000-$1999)
                    const minPrice = parseInt(priceRangeMatch[1]);
                    const maxPrice = parseInt(priceRangeMatch[2]);
                    result = result.filter(pkg =>
                        pkg.price >= minPrice &&
                        pkg.price <= maxPrice
                    );
                }
            }
        }

        // Theme filter
        if (selectedTheme !== "All Themes") {
            result = result.filter(pkg => pkg.themes.includes(selectedTheme));
        }

        // Search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(pkg =>
                pkg.title.toLowerCase().includes(query) ||
                pkg.description.toLowerCase().includes(query) ||
                pkg.regions.some(r => r.toLowerCase().includes(query)) ||
                pkg.themes.some(t => t.toLowerCase().includes(query))
            );
        }

        setFilteredPackages(result);
    }, [packages, selectedRegion, selectedDuration, selectedCost, selectedTheme, searchQuery]);

    const handleOpenModal = (pkg: TravelPackage) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPackage(null);
    };

    const handleCustomize = (pkg: TravelPackage) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('basePackage', JSON.stringify(pkg));
            window.location.href = '/customize';
        }
    };

    const handleBookNow = () => {
        router.push('/checkout');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ceylon-teal mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading travel packages...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8 bg-red-50 rounded-lg max-w-md">
                        <h3 className="text-xl font-semibold text-red-700 mb-2">Loading Error</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-ceylon-teal hover:bg-ceylon-teal-dark text-white"
                        >
                            Retry Loading
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-ceylon-teal-700 to-ceylon-teal-900 py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Discover Sri Lanka Tours & Packages
                        </h1>
                        <p className="text-black text-xl max-w-3xl">
                            Explore our carefully curated travel packages designed to showcase the best of Sri Lanka&apos;s
                            natural beauty, rich history, and vibrant culture.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto py-8 px-4">
                    <PackageFilter
                        regions={regions}
                        durations={durations}
                        costRanges={costRanges}
                        themes={themes}
                        selectedRegion={selectedRegion}
                        selectedDuration={selectedDuration}
                        selectedCost={selectedCost}
                        selectedTheme={selectedTheme}
                        searchQuery={searchQuery}
                        onRegionChange={setSelectedRegion}
                        onDurationChange={setSelectedDuration}
                        onCostChange={setSelectedCost}
                        onThemeChange={setSelectedTheme}
                        onSearchChange={setSearchQuery}
                    />

                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {filteredPackages.length} {filteredPackages.length === 1 ? 'Package' : 'Packages'} Available
                            </h2>
                        </div>

                        {filteredPackages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPackages.map(pkg => (
                                    <PackageCard
                                        key={pkg.id}
                                        travelPackage={pkg}
                                        onView={() => handleOpenModal(pkg)}
                                        onBookNow={handleBookNow}
                                        onCustomize={() => handleCustomize(pkg)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No packages match your criteria</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your filters or search query to find more options.</p>
                                <Button
                                    variant="outline"
                                    className="border-ceylon-teal text-ceylon-teal hover:bg-ceylon-teal hover:text-white"
                                    onClick={() => {
                                        setSelectedRegion("All Regions");
                                        setSelectedDuration("Any Duration");
                                        setSelectedCost("Any Budget");
                                        setSelectedTheme("All Themes");
                                        setSearchQuery("");
                                    }}
                                >
                                    Reset All Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Package Detail Modal */}
            {selectedPackage && (
                <PackageDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    travelPackage={selectedPackage}
                    onCustomize={() => handleCustomize(selectedPackage)}
                    onBookNow={handleBookNow}
                />
            )}


        </div>
    );
};

export default TravelPackages;