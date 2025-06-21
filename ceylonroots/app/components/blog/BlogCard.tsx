import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

type BlogCardPost = {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
};

interface BlogCardProps {
    post: BlogCardPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
    return (
        <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link href={`/blog/${post.id}`} className="block">
                <div className="relative h-48">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
                <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-ceylon-sand text-ceylon-stone rounded-full mb-3">
                        {post.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default BlogCard;