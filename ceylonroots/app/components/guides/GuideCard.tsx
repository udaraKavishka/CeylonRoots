'use client';

import { Star, Clock, Languages, Award, MessageCircle } from 'lucide-react';

interface Guide {
    id: number;
    name: string;
    photo?: string | null;
    bio: string;
    expertise: string[];
    languages: string[];
    experience: number;
    rating: number;
    reviewCount: number;
    responseTime?: string | null;
    featured: boolean;
}

interface GuideCardProps {
    guide: Guide;
    onClick?: () => void;
}

const EXPERTISE_COLORS: Record<string, string> = {
    Wildlife: 'bg-green-100 text-green-700',
    Cultural: 'bg-orange-100 text-orange-700',
    Photography: 'bg-purple-100 text-purple-700',
    Adventure: 'bg-red-100 text-red-700',
    History: 'bg-yellow-100 text-yellow-700',
    Beach: 'bg-blue-100 text-blue-700',
    Hiking: 'bg-teal-100 text-teal-700',
    Birdwatching: 'bg-lime-100 text-lime-700',
};

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function GuideCard({ guide, onClick }: GuideCardProps) {
    return (
        <div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1 group"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
            aria-label={`View details for ${guide.name}`}
        >
            {/* Photo / Avatar */}
            <div className="relative bg-gradient-to-br from-ceylon-stone to-ceylon-tea flex items-center justify-center h-48 overflow-hidden">
                {guide.photo ? (
                    <img
                        src={guide.photo}
                        alt={guide.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <span className="text-5xl font-bold text-white/90 select-none">
                        {getInitials(guide.name)}
                    </span>
                )}
                {guide.featured && (
                    <span className="absolute top-3 right-3 bg-ceylon-gold text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Award className="h-3 w-3" /> Featured
                    </span>
                )}
                {/* Click hint overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-3 py-1 rounded-full">
                        View Profile
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-ceylon-tea transition-colors">{guide.name}</h3>

                {/* Rating and reviews */}
                <div className="flex items-center gap-2 mt-1 mb-3">
                    <div className="flex items-center gap-1 text-ceylon-gold">
                        <Star className="h-4 w-4 fill-ceylon-gold" />
                        <span className="text-sm font-semibold text-gray-700">{guide.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-gray-400">({guide.reviewCount} reviews)</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-gray-500">{guide.experience} yrs exp</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{guide.bio}</p>

                {/* Expertise tags */}
                {guide.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {guide.expertise.slice(0, 4).map(e => (
                            <span
                                key={e}
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${EXPERTISE_COLORS[e] ?? 'bg-gray-100 text-gray-600'}`}
                            >
                                {e}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto space-y-1.5 text-sm text-gray-500">
                    {guide.languages.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Languages className="h-3.5 w-3.5 text-ceylon-tea flex-shrink-0" />
                            <span>{guide.languages.join(', ')}</span>
                        </div>
                    )}
                    {guide.responseTime && (
                        <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-ceylon-tea flex-shrink-0" />
                            <span>{guide.responseTime}</span>
                        </div>
                    )}
                </div>

                <a
                    href={`https://wa.me/94112345678?text=Hi!%20I%27d%20like%20to%20book%20a%20tour%20with%20${encodeURIComponent(guide.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-ceylon-tea hover:bg-ceylon-tea/90 text-white text-sm font-medium transition-colors"
                >
                    <MessageCircle className="h-4 w-4" />
                    Enquire with {guide.name.split(' ')[0]}
                </a>
            </div>
        </div>
    );
}
