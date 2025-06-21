'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "../components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import BlogCard from '../components/blog/BlogCard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'hidden-gems', name: 'Hidden Gems' },
    { id: 'food', name: 'Local Food' },
    { id: 'culture', name: 'Cultural Events' },
    { id: 'stories', name: 'Traveler Stories' }
];

// Define TypeScript types matching backend structure
type BlogComment = {
    id: number;
    author: string;
    avatar?: string;
    date: string;
    text: string;
}


type BlogPostType = {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    postDate: string;
    author: string;
    category: string;
    commentCount: number | null;
    comments: BlogComment[];
    relatedPosts: BlogPostType[];
};

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blog posts from backend
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/blogpost`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                const data: BlogPostType[] = await response.json();
                setBlogPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    // Filter posts by category if not "all"
    const filteredPosts = activeCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post =>
            post.category.toLowerCase().replace(/\s+/g, '-') === activeCategory
        );

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="relative bg-gradient-to-r from-ceylon-stone to-ceylon-tea py-16 md:py-24">
                <div className="ceylon-container relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Travel Stories & Insights
                        </h1>
                        <p className="text-white/80 text-lg">
                            Discover hidden gems, local cuisine, cultural celebrations, and traveler experiences across Sri Lanka
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 z-0"></div>
            </div>

            {/* Breadcrumbs */}
            <div className="border-b">
                <div className="ceylon-container py-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Travel Blog</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            {/* Blog Content */}
            <div className="ceylon-container py-12">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                    <div className="flex justify-center mb-10">
                        <TabsList className="bg-gray-100">
                            {categories.map(category => (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.id}
                                    className="px-5 py-2 data-[state=active]:bg-ceylon-tea data-[state=active]:text-white"
                                >
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ceylon-tea mx-auto mb-4"></div>
                            <p>Loading blog posts...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold mb-4">Error Loading Blog Posts</h2>
                            <p className="text-red-500 mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-ceylon-tea text-white rounded-lg hover:bg-ceylon-tea/80 transition-colors"
                            >
                                Retry Loading
                            </button>
                        </div>
                    ) : (
                        categories.map(category => (
                            <TabsContent key={category.id} value={category.id} className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredPosts.map(post => (
                                        <BlogCard
                                            key={post.id}
                                            post={{
                                                ...post,
                                                image: post.imageUrl, 
                                                date: post.postDate || post.createdAt, 
                                                tags: post.category ? [post.category] : [] 
                                            }}
                                        />
                                    ))}
                                </div>

                                {filteredPosts.length === 0 && (
                                    <div className="text-center py-20">
                                        <h3 className="text-2xl font-medium text-gray-500">
                                            No blog posts found in this category
                                        </h3>
                                        <p className="mt-2 text-gray-500">
                                            Check back later for new content
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                        ))
                    )}
                </Tabs>
            </div>
        </div>
    );
};

export default Blog;