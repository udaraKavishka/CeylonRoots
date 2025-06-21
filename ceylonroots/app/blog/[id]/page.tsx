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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define TypeScript types matching backend structure
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

    return (
        <div className="bg-white">
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
                <div className="absolute bottom-0 left-0 right-0 ceylon-container py-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-ceylon-sand/90 text-white rounded-full mb-4">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-white/90 mb-2">
                        <div className="flex items-center mr-6">
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

            {/* Breadcrumbs */}
            <div className="border-b border-ceylon-sand/30 bg-ceylon-sand/10">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none prose-headings:text-ceylon-stone prose-a:text-ceylon-tea hover:prose-a:text-ceylon-tea-dark prose-strong:text-ceylon-stone">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </article>

                        {/* Social Share */}
                        <div className="border-t border-b border-ceylon-sand/30 py-6 my-10">
                            <div className="flex items-center flex-wrap gap-4">
                                <span className="font-medium flex items-center text-ceylon-stone">
                                    <Share2 className="h-4 w-4 mr-2 text-ceylon-tea" /> Share This Story:
                                </span>
                                <Button variant="outline" size="sm" className="rounded-full border-ceylon-sand/50" asChild>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Facebook className="h-4 w-4 mr-2 text-blue-600" /> Facebook
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full border-ceylon-sand/50" asChild>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(fullUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Twitter className="h-4 w-4 mr-2 text-blue-400" /> Twitter
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full border-ceylon-sand/50" asChild>
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

                        {/* Comments Section */}
                        <section className="my-10">
                            <h3 className="text-2xl font-bold mb-6 text-ceylon-stone">
                                Comments ({post.commentCount ?? 0})
                            </h3>

                            {post.comments?.map((comment) => (
                                <div key={comment.id} className="border-b border-ceylon-sand/30 last:border-b-0 py-6">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-10 w-10 border border-ceylon-sand/30">
                                            {comment.avatarUrl ? (
                                                <AvatarImage src={comment.avatarUrl} />
                                            ) : null}
                                            <AvatarFallback className="bg-ceylon-sand/30 text-ceylon-stone">
                                                {getInitials(comment.author)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium text-ceylon-stone">{comment.author}</h4>
                                                <span className="text-sm text-ceylon-sand">
                                                    {formatDate(comment.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-ceylon-stone/90">{comment.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Button className="mt-6 bg-ceylon-tea hover:bg-ceylon-tea/90 text-white" asChild>
                                <a href="#comment-form">
                                    <MessageSquare className="h-4 w-4 mr-2" /> Leave a Comment
                                </a>
                            </Button>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        {/* Author Box */}
                        <div className="bg-ceylon-sand/10 p-6 rounded-lg mb-8 border border-ceylon-sand/30">
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
                                An experienced travel writer with a passion for exploring Sri Lanka&#39;s hidden treasures
                                and sharing authentic cultural experiences.
                            </p>
                        </div>

                        {/* Related Posts */}
                        {post.relatedPosts && post.relatedPosts.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 pb-2 text-ceylon-stone border-b border-ceylon-sand/30">
                                    Related Articles
                                </h3>
                                <div className="space-y-4 mt-4">
                                    {post.relatedPosts.map((related) => (
                                        <article key={related.id} className="flex items-start gap-3 group">
                                            <div className="w-20 h-16 overflow-hidden rounded shrink-0">
                                                <Image
                                                    src={related.imageUrl}
                                                    alt={related.title}
                                                    width={80}
                                                    height={64}
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <div>
                                                <Link
                                                    href={`/blog/${related.id}`}
                                                    className="font-medium text-ceylon-stone hover:text-ceylon-tea line-clamp-2 text-sm transition-colors"
                                                >
                                                    {related.title}
                                                </Link>
                                                <div className="flex items-center mt-1 text-xs text-ceylon-sand">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    <span>{formatDate(related.postDate)}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        <nav className="mb-8">
                            <h3 className="text-xl font-bold mb-4 pb-2 text-ceylon-stone border-b border-ceylon-sand/30">
                                Categories
                            </h3>
                            <ul className="space-y-2 mt-4">
                                {[
                                    { id: 'hidden-gems', name: 'Hidden Gems', count: 12 },
                                    { id: 'food', name: 'Local Food', count: 8 },
                                    { id: 'culture', name: 'Cultural Events', count: 15 },
                                    { id: 'stories', name: 'Traveler Stories', count: 10 }
                                ].map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/blog?category=${category.id}`}
                                            className="flex justify-between items-center py-2 text-ceylon-stone hover:text-ceylon-tea transition-colors"
                                        >
                                            <span>{category.name}</span>
                                            <span className="text-xs bg-ceylon-sand/20 px-2 py-1 rounded-full text-ceylon-stone">
                                                {category.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Popular Tags */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 pb-2 text-ceylon-stone border-b border-ceylon-sand/30">
                                Popular Tags
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-4">
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
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;