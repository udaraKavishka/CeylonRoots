import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Calendar, User, MessageSquare, Tag } from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
    return (
        <Card className="blog-card border-0 shadow-lg group overflow-hidden h-full flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-ceylon-sand/80 text-ceylon-stone rounded-full">
                        {post.category}
                    </span>
                </div>
            </div>

            <CardContent className="pt-5 flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="flex items-center mr-4">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{post.date}</span>
                    </div>
                </div>

                <Link href={`/blog/${post.id}`} legacyBehavior>
                    <a>
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-ceylon-tea transition-colors">
                            {post.title}
                        </h3>
                    </a>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.map((tag, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-500">
                            <Tag className="h-3 w-3 mr-1" />
                            <span>{tag}</span>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="border-t p-4 pt-3 flex justify-between">
                <div className="flex items-center text-sm text-gray-500">
                    <MessageSquare className="h-3.5 w-3.5 mr-1" />
                    <span>{post.commentCount} comments</span>
                </div>

                <Link
                    href={`/blog/${post.id}`}
                    className="text-ceylon-tea hover:text-ceylon-tea/80 font-medium inline-flex items-center text-sm"
                >
                    Read Full Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default BlogCard;