import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "../../components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Calendar, User, Share2, Facebook, Twitter, Instagram, MessageSquare } from 'lucide-react';

// Define TypeScript types matching backend structure
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
    comments: CommentType[];
    relatedPosts: RelatedPostType[];
};

type CommentType = {
    id: number;
    author: string;
    text: string;
    createdAt: string;
    avatarUrl: string | null;
};

type RelatedPostType = {
    id: number;
    title: string;
    imageUrl: string;
    postDate: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getBlogPost(id: string): Promise<BlogPostType | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/blogpost/${id}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch blog post');
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const post = await getBlogPost(params.id);

    if (!post) {
        return {
            title: 'Blog Post Not Found | Travel Blog',
            description: 'The blog post you\'re looking for doesn\'t exist',
        };
    }

    return {
        title: `${post.title} | Travel Blog`,
        description: post.excerpt,
        openGraph: {
            images: [post.imageUrl || '/default-blog.jpg'],
        },
    };
}

const BlogPostPage = async ({ params }: { params: { id: string } }) => {
    const post = await getBlogPost(params.id);
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const fullUrl = `${protocol}://${host}/blog/${params.id}`;

    if (!post) {
        notFound();
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white">
            {/* Header Image */}
            <div className="relative h-[50vh] min-h-[400px]">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 ceylon-container py-8">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-ceylon-sand/90 text-ceylon-stone rounded-full mb-4">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center text-white/90 gap-4">
                            <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full">
                                <User className="h-5 w-5 mr-2" />
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full">
                                <Calendar className="h-5 w-5 mr-2" />
                                <span className="font-medium">{formatDate(post.postDate)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="bg-ceylon-sand/20">
                <div className="ceylon-container py-3">
                    <Breadcrumb className="text-ceylon-stone">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/" className="hover:text-ceylon-tea transition-colors">
                                        Home
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-ceylon-stone" />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/blog" className="hover:text-ceylon-tea transition-colors">
                                        Travel Blog
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-ceylon-stone" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-medium text-ceylon-tea line-clamp-1 max-w-[200px] md:max-w-none">
                                    {post.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            {/* Blog Content */}
            <div className="ceylon-container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none prose-headings:text-ceylon-stone prose-headings:font-bold prose-p:text-gray-700 prose-blockquote:border-l-ceylon-tea prose-blockquote:bg-ceylon-sand/10 prose-blockquote:py-2 prose-blockquote:px-4 prose-img:rounded-xl prose-img:shadow-lg prose-a:text-ceylon-tea hover:prose-a:text-ceylon-stone">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </article>

                        {/* Social Share */}
                        <div className="bg-ceylon-sand/10 rounded-xl p-6 my-10">
                            <h3 className="text-xl font-bold text-ceylon-stone mb-4 flex items-center">
                                <Share2 className="h-5 w-5 mr-2" /> Share This Story
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="secondary" className="rounded-full bg-white hover:bg-ceylon-sand/20 border border-ceylon-sand/30" asChild>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        <Facebook className="h-4 w-4 mr-2" /> Facebook
                                    </a>
                                </Button>
                                <Button variant="secondary" className="rounded-full bg-white hover:bg-ceylon-sand/20 border border-ceylon-sand/30" asChild>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(fullUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        <Twitter className="h-4 w-4 mr-2" /> Twitter
                                    </a>
                                </Button>
                                <Button variant="secondary" className="rounded-full bg-white hover:bg-ceylon-sand/20 border border-ceylon-sand/30" asChild>
                                    <a
                                        href={`https://www.instagram.com/share?url=${encodeURIComponent(fullUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        <Instagram className="h-4 w-4 mr-2" /> Instagram
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <section className="my-12">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-ceylon-stone">
                                    Comments ({post.commentCount ?? 0})
                                </h3>
                                <Button className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white" asChild>
                                    <a href="#comment-form" className="flex items-center">
                                        <MessageSquare className="h-4 w-4 mr-2" /> Leave a Comment
                                    </a>
                                </Button>
                            </div>

                            <div className="space-y-8">
                                {post.comments?.map((comment) => (
                                    <div key={comment.id} className="border-l-4 border-ceylon-tea pl-4 py-2">
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-ceylon-sand">
                                                {comment.avatarUrl ? (
                                                    <AvatarImage src={comment.avatarUrl} />
                                                ) : null}
                                                <AvatarFallback className="bg-ceylon-sand text-ceylon-stone font-medium">
                                                    {getInitials(comment.author)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                                                    <h4 className="font-bold text-lg text-ceylon-stone">{comment.author}</h4>
                                                    <span className="text-sm text-gray-500 bg-ceylon-sand/10 px-3 py-1 rounded-full">
                                                        {formatDate(comment.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700">{comment.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        {/* Author Box */}
                        <div className="bg-ceylon-sand/10 p-6 rounded-xl">
                            <div className="flex items-center mb-5">
                                <Avatar className="h-16 w-16 mr-4 border-2 border-ceylon-sand">
                                    <AvatarFallback className="bg-ceylon-sand text-ceylon-stone font-bold">
                                        {getInitials(post.author)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-xl text-ceylon-stone">{post.author}</h3>
                                    <p className="text-gray-500">Travel Writer</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                An experienced travel writer with a passion for exploring Sri Lanka&#39;s hidden treasures
                                and sharing authentic cultural experiences.
                            </p>
                        </div>

                        {/* Related Posts */}
                        {post.relatedPosts && post.relatedPosts.length > 0 && (
                            <div className="bg-ceylon-sand/5 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-ceylon-stone mb-5 pb-2 border-b border-ceylon-sand/20">
                                    Related Articles
                                </h3>
                                <div className="space-y-5">
                                    {post.relatedPosts.map((related) => (
                                        <article key={related.id} className="flex items-start gap-4 group">
                                            <div className="w-24 h-20 overflow-hidden rounded-lg shrink-0">
                                                <Image
                                                    src={related.imageUrl}
                                                    alt={related.title}
                                                    width={96}
                                                    height={80}
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div>
                                                <Link
                                                    href={`/blog/${related.id}`}
                                                    className="font-bold text-ceylon-stone group-hover:text-ceylon-tea transition-colors line-clamp-2"
                                                >
                                                    {related.title}
                                                </Link>
                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                    <Calendar className="h-3 w-3 mr-1.5" />
                                                    <span>{formatDate(related.postDate)}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        <div className="bg-ceylon-sand/5 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-ceylon-stone mb-5 pb-2 border-b border-ceylon-sand/20">
                                Categories
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { id: 'hidden-gems', name: 'Hidden Gems', count: 12 },
                                    { id: 'food', name: 'Local Food', count: 8 },
                                    { id: 'culture', name: 'Cultural Events', count: 15 },
                                    { id: 'stories', name: 'Traveler Stories', count: 10 }
                                ].map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/blog?category=${category.id}`}
                                            className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-white hover:bg-ceylon-sand/20 transition-colors group"
                                        >
                                            <span className="font-medium text-gray-700 group-hover:text-ceylon-tea">
                                                {category.name}
                                            </span>
                                            <span className="text-sm bg-ceylon-sand text-ceylon-stone font-bold px-2 py-1 rounded-full min-w-[30px] text-center">
                                                {category.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Popular Tags */}
                        <div className="bg-ceylon-sand/5 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-ceylon-stone mb-5 pb-2 border-b border-ceylon-sand/20">
                                Popular Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['beaches', 'wildlife', 'temples', 'hiking', 'photography', 'ayurveda', 'culture', 'food', 'nature'].map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog?tag=${tag}`}
                                        className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm hover:bg-ceylon-tea hover:text-white transition-colors capitalize shadow-sm"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;