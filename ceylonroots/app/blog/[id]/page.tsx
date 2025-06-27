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
import { Calendar, User, Facebook, Twitter, Instagram, MessageSquare } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type BlogPostType = {
    id: number;
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

// Generate static paths at build time
export async function generateStaticParams() {
    try {
        const res = await fetch(`${API_BASE_URL}/blogpost`);
        if (!res.ok) return [];
        const posts: BlogPostType[] = await res.json();
        return posts.map(post => ({ id: post.id.toString() }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

const BlogPostPage = async ({ params }: { params: { id: string } }) => {
    // First get the post data
    const post = await getBlogPost(params.id);

    // Then get headers
    const headersList = headers();
    const host = (await headersList).get('host');
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

    const cardClass = "bg-white rounded-xl border border-ceylon-sand/20 shadow-md overflow-hidden";
    const sectionHeadingClass = "text-2xl font-bold text-ceylon-stone mb-6 pb-2 border-b border-ceylon-sand/30";

    return (
        <div className="bg-ceylon-sand/5 min-h-screen">
            {/* Header Image */}
            <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ceylon-stone/90 via-ceylon-stone/40 to-ceylon-stone/10" />
                <div className="absolute bottom-0 left-0 right-0 ceylon-container py-8">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-ceylon-sand/90 text-white rounded-full mb-4">
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center text-white/90 gap-4">
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{formatDate(post.postDate)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="bg-white border-b border-ceylon-sand/30">
                <div className="ceylon-container py-4">
                    <Breadcrumb>
                        <BreadcrumbList className="text-ceylon-stone">
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/" className="hover:text-ceylon-tea transition-colors">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-ceylon-sand" />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/blog" className="hover:text-ceylon-tea transition-colors">Travel Blog</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-ceylon-sand" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-ceylon-tea font-medium">
                                    {post.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            {/* Blog Content */}
            <div className="ceylon-container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Article Card */}
                        <div className={cardClass}>
                            <article className="prose prose-lg max-w-none p-6 md:p-8">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </article>
                        </div>

                        {/* Social Share Card */}
                        <div className={cardClass}>
                            <div className="p-6 md:p-8">
                                <h3 className="text-xl font-semibold text-ceylon-stone mb-4">
                                    Share This Story
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="outline" className="rounded-full" asChild>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Facebook className="h-4 w-4 mr-2 text-blue-600" /> Facebook
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="rounded-full" asChild>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(fullUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Twitter className="h-4 w-4 mr-2 text-blue-400" /> Twitter
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="rounded-full" asChild>
                                        <a
                                            href={`https://www.instagram.com/share?url=${encodeURIComponent(fullUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Instagram className="h-4 w-4 mr-2 text-pink-500" /> Instagram
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Comments Card */}
                        <div className={cardClass}>
                            <div className="p-6 md:p-8">
                                <h3 className={sectionHeadingClass}>
                                    Comments ({post.commentCount ?? 0})
                                </h3>

                                <div className="space-y-6">
                                    {post.comments?.map((comment) => (
                                        <div key={comment.id} className="flex items-start gap-4">
                                            <Avatar className="h-12 w-12 border border-ceylon-sand/30">
                                                {comment.avatarUrl ? (
                                                    <AvatarImage src={comment.avatarUrl} />
                                                ) : null}
                                                <AvatarFallback className="bg-ceylon-sand/30 text-ceylon-stone">
                                                    {getInitials(comment.author)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                    <h4 className="font-medium text-ceylon-stone">{comment.author}</h4>
                                                    <span className="text-sm text-ceylon-sand">
                                                        {formatDate(comment.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-ceylon-stone/90">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <Button className="mt-4 bg-ceylon-tea hover:bg-ceylon-tea/90 text-white" asChild>
                                        <a href="#comment-form">
                                            <MessageSquare className="h-4 w-4 mr-2" /> Leave a Comment
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Author Card */}
                        <div className={cardClass}>
                            <div className="p-6 md:p-8">
                                <div className="flex items-center mb-4">
                                    <Avatar className="h-14 w-14 mr-4 border border-ceylon-sand/30">
                                        <AvatarFallback className="bg-ceylon-sand/30 text-ceylon-stone">
                                            {getInitials(post.author)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-lg text-ceylon-stone">{post.author}</h3>
                                        <p className="text-ceylon-sand text-sm">Travel Writer</p>
                                    </div>
                                </div>
                                <p className="text-ceylon-stone/90 text-sm">
                                    An experienced travel writer with a passion for exploring Sri Lanka &apos;s hidden treasures
                                    and sharing authentic cultural experiences.
                                </p>
                            </div>
                        </div>

                        {/* Related Posts Card */}
                        {post.relatedPosts && post.relatedPosts.length > 0 && (
                            <div className={cardClass}>
                                <div className="p-6 md:p-8">
                                    <h3 className={sectionHeadingClass}>
                                        Related Articles
                                    </h3>
                                    <div className="space-y-5">
                                        {post.relatedPosts.map((related) => (
                                            <Link
                                                href={`/blog/${related.id}`}
                                                key={related.id}
                                                className="group flex items-start gap-4 transition-transform hover:-translate-y-0.5"
                                            >
                                                <div className="w-20 h-16 overflow-hidden rounded-lg shrink-0">
                                                    <Image
                                                        src={related.imageUrl}
                                                        alt={related.title}
                                                        width={80}
                                                        height={64}
                                                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-ceylon-stone group-hover:text-ceylon-tea line-clamp-2 text-sm transition-colors">
                                                        {related.title}
                                                    </h4>
                                                    <div className="flex items-center mt-1 text-xs text-ceylon-sand">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        <span>{formatDate(related.postDate)}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Categories Card */}
                        <div className={cardClass}>
                            <div className="p-6 md:p-8">
                                <h3 className={sectionHeadingClass}>
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
                                                className="flex justify-between items-center py-2 px-3 -mx-3 rounded-lg text-ceylon-stone hover:bg-ceylon-sand/10 transition-colors"
                                            >
                                                <span>{category.name}</span>
                                                <span className="text-xs bg-ceylon-sand/20 px-2 py-1 rounded-full text-ceylon-stone">
                                                    {category.count}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Tags Card */}
                        <div className={cardClass}>
                            <div className="p-6 md:p-8">
                                <h3 className={sectionHeadingClass}>
                                    Popular Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['beaches', 'wildlife', 'temples', 'hiking', 'photography', 'ayurveda'].map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/blog?tag=${tag}`}
                                            className="px-3 py-1.5 bg-ceylon-sand/10 text-ceylon-stone rounded-full text-sm hover:bg-ceylon-tea hover:text-white transition-colors capitalize"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;