import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
import { Calendar, User, Tag, Share2, Facebook, Twitter, Instagram, MessageSquare } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

export async function generateStaticParams() {
    return blogPosts.map(post => ({
        id: post.id.toString(),
    }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const post = blogPosts.find(post => post.id.toString() === params.id);

    return {
        title: `${post?.title} | Travel Blog`,
        description: post?.excerpt,
        openGraph: {
            images: [post?.image || '/default-blog.jpg'],
        },
    };
}

const BlogPostPage = ({ params }: { params: { id: string } }) => {
    const post = blogPosts.find(post => post.id.toString() === params.id);

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

    return (
        <div className="bg-white">
            {/* Header Image */}
            <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 ceylon-container py-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-ceylon-sand/90 text-ceylon-stone rounded-full mb-4">
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
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>
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
                                <Link href="/blog" passHref legacyBehavior>
                                    <BreadcrumbLink>Travel Blog</BreadcrumbLink>
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{post.title}</BreadcrumbPage>
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
                        <article className="prose prose-lg max-w-none">
                            {post.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </article>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-8">
                            {post.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                    <Tag className="h-3.5 w-3.5 mr-1.5" />
                                    {tag}
                                </div>
                            ))}
                        </div>

                        {/* Social Share */}
                        <div className="border-t border-b py-6 my-8">
                            <div className="flex items-center flex-wrap gap-4">
                                <span className="font-medium mr-2 flex items-center">
                                    <Share2 className="h-4 w-4 mr-2" /> Share This Story:
                                </span>
                                <Button variant="outline" size="sm" className="rounded-full" asChild>
                                    <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}>
                                        <Facebook className="h-4 w-4 mr-2" /> Facebook
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full" asChild>
                                    <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}>
                                        <Twitter className="h-4 w-4 mr-2" /> Twitter
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full" asChild>
                                    <Link href={`https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}`}>
                                        <Instagram className="h-4 w-4 mr-2" /> Instagram
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <section className="my-10">
                            <h3 className="text-2xl font-bold mb-6">Comments ({post.commentCount})</h3>

                            {post.comments?.map((comment, index) => (
                                <div key={index} className="border-b last:border-b-0 py-6">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={comment.avatar} />
                                            <AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">{comment.author}</h4>
                                                <span className="text-sm text-gray-500">{comment.date}</span>
                                            </div>
                                            <p className="text-gray-700">{comment.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Button className="mt-6 bg-ceylon-tea hover:bg-ceylon-tea/90 text-white" asChild>
                                <Link href="#comment-form">
                                    <MessageSquare className="h-4 w-4 mr-2" /> Leave a Comment
                                </Link>
                            </Button>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        {/* Author Box */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8">
                            <div className="flex items-center mb-4">
                                <Avatar className="h-14 w-14 mr-4">
                                    <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-lg">{post.author}</h3>
                                    <p className="text-gray-500 text-sm">Travel Writer</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                An experienced travel writer with a passion for exploring Sri Lanka&#39;s hidden treasures
                                and sharing authentic cultural experiences.
                            </p>
                        </div>

                        {/* Related Posts */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">Related Articles</h3>
                            <div className="space-y-4 mt-4">
                                {post.relatedPosts?.map((related) => (
                                    <article key={related.id} className="flex items-start gap-3">
                                        <div className="w-20 h-16 overflow-hidden rounded shrink-0">
                                            <Image
                                                src={related.image}
                                                alt={related.title}
                                                width={80}
                                                height={64}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <Link
                                                href={`/blog/${related.id}`}
                                                className="font-medium hover:text-ceylon-tea line-clamp-2 text-sm"
                                            >
                                                {related.title}
                                            </Link>
                                            <div className="flex items-center mt-1 text-xs text-gray-500">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                <span>{related.date}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <nav className="mb-8">
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">Categories</h3>
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
                                            className="flex justify-between items-center py-2 hover:text-ceylon-tea"
                                        >
                                            <span>{category.name}</span>
                                            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                                                {category.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Popular Tags */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">Popular Tags</h3>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {['beaches', 'wildlife', 'temples', 'hiking', 'photography', 'ayurveda'].map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog?tag=${tag}`}
                                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-ceylon-sand hover:text-ceylon-stone capitalize"
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