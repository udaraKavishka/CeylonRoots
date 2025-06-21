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
            {/* Vibrant Header */}
            <div className="relative bg-gradient-to-br from-ceylon-tea/95 via-ceylon-stone/90 to-ceylon-tea-dark/95 pt-28 pb-16">
                <div className="ceylon-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Discover Sri Lanka&#39;s Hidden Stories
                        </h1>

                        <p className="text-xl text-ceylon-sand-light max-w-2xl mx-auto mb-10">
                            Journey through authentic experiences, local secrets, and cultural treasures
                        </p>

                        <div className="flex justify-center">
                            <div className="bg-ceylon-sand/20 backdrop-blur-sm rounded-xl p-5 border border-ceylon-sand/30">
                                <div className="flex flex-wrap justify-center gap-6">
                                    <div className="text-center">
                                        <p className="text-xs uppercase tracking-wider text-ceylon-sand-light mb-2">Stories</p>
                                        <p className="text-2xl font-bold text-black">{blogPosts.length}</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs uppercase tracking-wider text-ceylon-sand-light mb-2">Categories</p>
                                        <p className="text-2xl font-bold text-black">{categories.length}</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs uppercase tracking-wider text-ceylon-sand-light mb-2">Authors</p>
                                        <p className="text-2xl font-bold text-black">
                                            {[...new Set(blogPosts.map(post => post.author))].length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 w-full h-20 z-0">
                    <svg className="w-full h-full text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="bg-ceylon-sand/10 py-4">
                <div className="ceylon-container">
                    <Breadcrumb>
                        <BreadcrumbList className="text-ceylon-stone">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" asChild>
                                    <Link href="/" className="hover:text-ceylon-tea transition-colors">
                                        Home
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-ceylon-sand" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-ceylon-tea font-medium">
                                    Travel Blog
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            {/* Blog Content */}
            <div className="ceylon-container py-16">
                <div className="max-w-4xl mx-auto mb-14 text-center">
                    <h2 className="text-3xl font-bold text-ceylon-stone mb-4">
                        Explore by Category
                    </h2>
                    <p className="text-black max-w-2xl mx-auto">
                        Dive into our curated collections of travel experiences and stories
                    </p>
                </div>

                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                    <div className="flex justify-center mb-16">
                        <TabsList className="bg-ceylon-sand/10 p-2 rounded-xl">
                            {categories.map(category => (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.id}
                                    className="px-6 py-3 rounded-lg data-[state=active]:bg-ceylon-tea data-[state=active]:text-black transition-all"
                                >
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-ceylon-tea mx-auto mb-6"></div>
                            <p className="text-ceylon-stone text-lg">Discovering amazing stories...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <div className="bg-red-100 rounded-full p-4 inline-block mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-ceylon-stone mb-4">Error Loading Stories</h2>
                            <p className="text-red-500 mb-8 max-w-md mx-auto">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-3 bg-ceylon-tea text-white rounded-xl hover:bg-ceylon-tea/90 transition-colors font-medium"
                            >
                                Retry Loading
                            </button>
                        </div>
                    ) : (
                        categories.map(category => (
                            <TabsContent key={category.id} value={category.id} className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                                    <div className="text-center py-24 bg-ceylon-sand/5 rounded-2xl border border-ceylon-sand/20">
                                        <div className="bg-ceylon-sand/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-ceylon-tea" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-medium text-ceylon-stone mb-2">
                                            No stories found in &quot;{category.name}&quot;
                                        </h3>
                                        <p className="text-ceylon-sand max-w-md mx-auto">
                                            Our writers are crafting new content. Check back soon for inspiring stories!
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