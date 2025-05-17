import React from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Search, Filter } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../components/ui/select';

interface PackageFilterProps {
    regions: string[];
    durations: string[];
    costRanges: string[];
    themes: string[];
    selectedRegion: string;
    selectedDuration: string;
    selectedCost: string;
    selectedTheme: string;
    searchQuery: string;
    onRegionChange: (value: string) => void;
    onDurationChange: (value: string) => void;
    onCostChange: (value: string) => void;
    onThemeChange: (value: string) => void;
    onSearchChange: (value: string) => void;
}

const PackageFilter: React.FC<PackageFilterProps> = ({
    regions,
    durations,
    costRanges,
    themes,
    selectedRegion,
    selectedDuration,
    selectedCost,
    selectedTheme,
    searchQuery,
    onRegionChange,
    onDurationChange,
    onCostChange,
    onThemeChange,
    onSearchChange
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-ceylon-spice" />
                <h2 className="text-lg font-semibold">Filter Packages</h2>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        className="pl-10"
                        placeholder="Search packages..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="region-filter">Region</Label>
                    <Select value={selectedRegion} onValueChange={onRegionChange}>
                        <SelectTrigger id="region-filter">
                            <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((region) => (
                                <SelectItem key={region} value={region}>
                                    {region}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="duration-filter">Duration</Label>
                    <Select value={selectedDuration} onValueChange={onDurationChange}>
                        <SelectTrigger id="duration-filter">
                            <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                            {durations.map((duration) => (
                                <SelectItem key={duration} value={duration}>
                                    {duration}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cost-filter">Price Range</Label>
                    <Select value={selectedCost} onValueChange={onCostChange}>
                        <SelectTrigger id="cost-filter">
                            <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                            {costRanges.map((cost) => (
                                <SelectItem key={cost} value={cost}>
                                    {cost}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="theme-filter">Theme</Label>
                    <Select value={selectedTheme} onValueChange={onThemeChange}>
                        <SelectTrigger id="theme-filter">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {themes.map((theme) => (
                                <SelectItem key={theme} value={theme}>
                                    {theme}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default PackageFilter;