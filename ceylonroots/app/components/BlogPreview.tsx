'use client';

import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from "../types/travel";

interface BlogPreviewProps {
    posts: BlogPost[];
}

const BlogPreview = ({ posts }: BlogPreviewProps) => {
    // Safeguard against undefined posts
    if (!posts || posts.length === 0) {
        return (
            <section className="py-16 bg-white" aria-label="Travel blog preview">
                <div className="ceylon-container">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Travel Insights & Stories
                        </h2>
                        <p className="text-gray-600">
                            Expert tips, cultural insights, and traveler stories to inspire your Sri Lankan adventure
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-gray-500">No blog posts available at the moment</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-white" aria-label="Travel blog preview">
            <div className="ceylon-container">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Travel Insights & Stories
                    </h2>
                    <p className="text-gray-600">
                        Expert tips, cultural insights, and traveler stories to inspire your Sri Lankan adventure
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => {
                        // Safeguard against missing tags array
                        const tags = post.tags || [];

                        return (
                            <Card key={post.id} className="ceylon-card border-0 shadow-lg group">
                                <div className="aspect-video overflow-hidden relative">
                                    <Image
                                        src={post.imageUrl}
                                        alt={`Featured image for ${post.title}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <CardContent className="pt-6">
                                    <div>
                                        {/* Use the first tag as category */}
                                        {tags.length > 0 && (
                                            <span className="inline-block px-3 py-1 text-xs font-medium bg-ceylon-sand/30 text-ceylon-stone rounded-full mb-3">
                                                {tags[0]}
                                            </span>
                                        )}
                                    </div>
                                    <h3
                                        className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-ceylon-tea transition-colors"
                                        aria-label={post.title}
                                    >
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2" aria-label="Post excerpt">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                                        <span>{post.date}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-ceylon-tea hover:text-ceylon-tea/80 font-medium inline-flex items-center text-sm"
                                        aria-label={`Read full article: ${post.title}`}
                                    >
                                        Read Full Article
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 ml-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </Link>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/blog"
                        className="inline-block px-6 py-3 border-2 border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white rounded-md transition-colors font-medium"
                        aria-label="View all blog articles"
                    >
                        View All Articles
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;