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
import { blogPosts } from '../data/blogPosts';

const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'hidden-gems', name: 'Hidden Gems' },
    { id: 'food', name: 'Local Food' },
    { id: 'culture', name: 'Cultural Events' },
    { id: 'stories', name: 'Traveler Stories' }
];

export default function BlogPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const activeCategory = searchParams?.category || 'all';

    // Filter posts based on category
    const filteredPosts = activeCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post =>
            post.category.toLowerCase().includes(activeCategory.toString().toLowerCase())
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
                                <Link href="/" passHref legacyBehavior>
                                    <BreadcrumbLink>Home</BreadcrumbLink>
                                </Link>
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
                <Tabs defaultValue="all" className="w-full"
                    value={activeCategory.toString()}>
                    <div className="flex justify-center mb-10">
                        <TabsList className="bg-gray-100">
                            {categories.map(category => (
                                <Link
                                    key={category.id}
                                    href={`/blog?category=${category.id}`}
                                    scroll={false}
                                >
                                    <TabsTrigger
                                        value={category.id}
                                        className="px-5 py-2 data-[state=active]:bg-ceylon-tea data-[state=active]:text-white"
                                    >
                                        {category.name}
                                    </TabsTrigger>
                                </Link>
                            ))}
                        </TabsList>
                    </div>

                    {categories.map(category => (
                        <TabsContent key={category.id} value={category.id} className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map(post => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>

                            {filteredPosts.length === 0 && (
                                <div className="text-center py-20">
                                    <h3 className="text-2xl font-medium text-gray-500">No blog posts found in this category</h3>
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}