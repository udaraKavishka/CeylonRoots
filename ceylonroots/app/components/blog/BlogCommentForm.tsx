'use client';

import { useState } from 'react';
import { MessageSquare, Send, User, CheckCircle } from 'lucide-react';

type Comment = {
    id: number;
    author: string;
    text: string;
    createdAt: string;
    avatarUrl: string | null;
};

type Props = {
    postId: string;
    onCommentAdded?: (comment: Comment) => void;
};

export default function BlogCommentForm({ postId, onCommentAdded }: Props) {
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!author.trim() || !text.trim()) return;

        setIsSubmitting(true);
        setError('');

        try {
            const res = await fetch(`/api/blogpost/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author: author.trim(), text: text.trim() }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.error || 'Failed to post comment. Please try again.');
                return;
            }

            const newComment: Comment = await res.json();
            onCommentAdded?.(newComment);
            setAuthor('');
            setText('');
            setSubmitted(true);
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div
                id="comment-form"
                className="flex flex-col items-center justify-center py-10 text-center"
            >
                <div className="w-14 h-14 rounded-full bg-ceylon-tea/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-7 w-7 text-ceylon-tea" />
                </div>
                <h4 className="text-lg font-semibold text-ceylon-stone mb-1">Comment Posted!</h4>
                <p className="text-ceylon-stone/60 text-sm mb-5">
                    Thank you for sharing your thoughts.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-ceylon-tea hover:underline"
                >
                    Write another comment
                </button>
            </div>
        );
    }

    return (
        <div id="comment-form" className="mt-8 pt-8 border-t border-ceylon-sand/20">
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-5 w-5 text-ceylon-tea" />
                <h4 className="text-xl font-semibold text-ceylon-stone">Leave a Comment</h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-ceylon-stone/80 mb-1.5">
                        Your Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ceylon-sand pointer-events-none h-4 w-4" />
                        <input
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            required
                            placeholder="Jane Smith"
                            className="w-full pl-10 pr-4 py-3 border border-ceylon-sand/30 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30 focus:border-ceylon-tea transition placeholder:text-gray-300"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-ceylon-stone/80 mb-1.5">
                        Your Comment <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                        rows={5}
                        placeholder="Share your thoughts, questions, or travel experiences..."
                        className="w-full px-4 py-3 border border-ceylon-sand/30 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ceylon-tea/30 focus:border-ceylon-tea transition resize-none placeholder:text-gray-300"
                    />
                    <p className="text-xs text-ceylon-stone/40 mt-1.5 text-right">
                        {text.length} characters
                    </p>
                </div>

                {error && (
                    <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-3">
                        <span className="mt-0.5">⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || !author.trim() || !text.trim()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #2E8B57 0%, #1A5276 100%)' }}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Posting...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            Post Comment
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
