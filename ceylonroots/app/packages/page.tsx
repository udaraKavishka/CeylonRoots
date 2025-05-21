'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
// import { useToast } from '../components/ui/use-toast';
import PackageFilter from '../components/packages/PackageFilter';
import PackageCard from '../components/packages/PackageCard';
import PackageDetailModal from '../components/packages/PackageDetailModal';
import { TravelPackage } from '../types/travel';
import { travelPackages } from '../data/travelPackages';

const regions = ["All Regions", "Cultural Triangle", "Hill Country", "Southern Coast", "Northern Province", "Eastern Coast"];
const durations = ["Any Duration", "1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];
const costRanges = ["Any Budget", "Economy ($0-$999)", "Standard ($1000-$1999)", "Premium ($2000-$2999)", "Luxury ($3000+)"];
const themes = ["All Themes", "Beach", "Wildlife", "Culture", "Adventure", "Wellness", "Food", "Family"];

const TravelPackages = () => {
    // const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [packages] = useState<TravelPackage[]>(travelPackages);
    const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>(travelPackages);
    const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedRegion, setSelectedRegion] = useState("All Regions");
    const [selectedDuration, setSelectedDuration] = useState("Any Duration");
    const [selectedCost, setSelectedCost] = useState("Any Budget");
    const [selectedTheme, setSelectedTheme] = useState("All Themes");
    const [searchQuery, setSearchQuery] = useState("");

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

    useEffect(() => {
        const params = new URLSearchParams();

        if (selectedRegion !== "All Regions") params.set('region', selectedRegion);
        if (selectedDuration !== "Any Duration") params.set('duration', selectedDuration);
        if (selectedCost !== "Any Budget") params.set('cost', selectedCost);
        if (selectedTheme !== "All Themes") params.set('theme', selectedTheme);
        if (searchQuery) params.set('search', searchQuery);

        router.replace(`?${params.toString()}`);
    }, [selectedRegion, selectedDuration, selectedCost, selectedTheme, searchQuery, router]);

    useEffect(() => {
        let result = [...packages];

        if (selectedRegion !== "All Regions") {
            result = result.filter(pkg => pkg.regions.includes(selectedRegion));
        }

        if (selectedDuration !== "Any Duration") {
            const [min, max] = selectedDuration === "15+ Days"
                ? [15, 100]
                : selectedDuration.split('-').map(d => parseInt(d.replace(/\D/g, '')));

            result = result.filter(pkg => pkg.duration >= min && (max ? pkg.duration <= max : true));
        }

        if (selectedCost !== "Any Budget") {
            const priceRangeMatch = selectedCost.match(/\$(\d+)-\$(\d+)|\$(\d+)\+/);

            if (priceRangeMatch) {
                if (priceRangeMatch[3]) {
                    const minPrice = parseInt(priceRangeMatch[3]);
                    result = result.filter(pkg => pkg.price >= minPrice);
                } else {
                    const minPrice = parseInt(priceRangeMatch[1]);
                    const maxPrice = parseInt(priceRangeMatch[2]);
                    result = result.filter(pkg => pkg.price >= minPrice && pkg.price <= maxPrice);
                }
            }
        }

        if (selectedTheme !== "All Themes") {
            result = result.filter(pkg => pkg.themes.includes(selectedTheme));
        }

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

    const handleBookNow = (pkg: TravelPackage) => {
        router.push('/checkout');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <div className="bg-gradient-to-r from-ceylon-tea to-ceylon-spice py-16 px-4">
                    <div className="ceylon-container">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Discover Sri Lanka Tours & Packages
                        </h1>
                        <p className="text-white text-xl max-w-2xl">
                            Explore our carefully curated travel packages designed to showcase the best of Sri Lanka&apos;s
                            natural beauty, rich history, and vibrant culture.
                        </p>
                    </div>
                </div>

                <div className="ceylon-container py-8">
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
                                        onCustomize={() => handleCustomize(pkg)}
                                        onBookNow={() => handleBookNow(pkg)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No packages match your criteria</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your filters or search query to find more options.</p>
                                <Button
                                    variant="outline"
                                    className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white"
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

            {selectedPackage && (
                <PackageDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    travelPackage={selectedPackage}
                    onCustomize={() => handleCustomize(selectedPackage)}
                    onBookNow={() => handleBookNow(selectedPackage)}
                />
            )}

            <Footer />
        </div>
    );
};

export default TravelPackages;