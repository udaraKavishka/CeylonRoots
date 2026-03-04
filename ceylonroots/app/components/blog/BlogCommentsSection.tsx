'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import BlogCommentForm from './BlogCommentForm';

type Comment = {
    id: number;
    author: string;
    text: string;
    createdAt: string;
    avatarUrl: string | null;
};

type Props = {
    postId: string;
    initialComments: Comment[];
    initialCount: number;
};

const getInitials = (name: string) =>
    name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

export default function BlogCommentsSection({ postId, initialComments, initialCount }: Props) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [count, setCount] = useState(initialCount);

    const handleCommentAdded = (comment: Comment) => {
        setComments(prev => [...prev, comment]);
        setCount(prev => prev + 1);
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-ceylon-stone mb-6 pb-2 border-b border-ceylon-sand/30">
                Comments ({count})
            </h3>

            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-ceylon-stone/50 text-sm italic py-4">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border border-ceylon-sand/30 shrink-0">
                                {comment.avatarUrl ? (
                                    <AvatarImage src={comment.avatarUrl} />
                                ) : null}
                                <AvatarFallback className="bg-ceylon-sand/30 text-ceylon-stone text-sm font-medium">
                                    {getInitials(comment.author)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                    <h4 className="font-semibold text-ceylon-stone text-sm">{comment.author}</h4>
                                    <span className="text-xs text-ceylon-sand">
                                        {formatDate(comment.createdAt)}
                                    </span>
                                </div>
                                <p className="text-ceylon-stone/80 text-sm leading-relaxed">{comment.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <BlogCommentForm postId={postId} onCommentAdded={handleCommentAdded} />
        </div>
    );
}
