'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";

type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    postDate: string;
    author: string;
    category: string;
    commentCount: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const BlogManager = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPost, setEditingPost] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        author: '',
        category: '',
        commentCount: 0
    });

    const categories = ['Hidden Gems', 'Local Food', 'Wildlife', 'Cultural Events', 'Traveler Stories'];

    const fetchBlogPosts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/blogpost`);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setBlogPosts(Array.isArray(data) ? data : []);
        } catch {
            toast({
                title: "Error",
                description: "Failed to fetch blog posts. Please try again later.",
                variant: "destructive"
            });
            setBlogPosts([]);
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchBlogPosts();
    }, [fetchBlogPosts]);

    const createBlogPost = async (postData: Partial<BlogPost>) => {
        const response = await fetch(`${API_BASE_URL}/blogpost`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        if (!response.ok) throw new Error(`Failed to create post: ${response.status}`);
        return response.json();
    };

    const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
        const response = await fetch(`${API_BASE_URL}/blogpost/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        if (!response.ok) throw new Error(`Failed to update post: ${response.status}`);
        return response.json();
    };

    const deleteBlogPost = async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/blogpost/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Failed to delete post: ${response.status}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const postData = {
                ...formData,
                commentCount: Number(formData.commentCount) || 0
            };

            if (editingPost) {
                const updatedPost = await updateBlogPost(editingPost, postData);
                setBlogPosts(prev =>
                    prev.map(p => p.id === editingPost ? updatedPost : p)
                );
                toast({ title: "Blog post updated", description: "Post updated successfully." });
            } else {
                const newPost = await createBlogPost(postData);
                setBlogPosts(prev => [...prev, newPost]);
                toast({ title: "Blog post created", description: "Post created successfully." });
            }

            resetForm();
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error
                    ? error.message
                    : `Failed to ${editingPost ? 'update' : 'create'} blog post.`,
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (postId: string) => {
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
            setFormData({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                imageUrl: post.imageUrl,
                author: post.author,
                category: post.category,
                commentCount: post.commentCount
            });
            setEditingPost(postId);
            setIsCreating(false);
        }
    };

    const handleDelete = async (postId: string) => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            try {
                await deleteBlogPost(postId);
                setBlogPosts(prev => prev.filter(p => p.id !== postId));
                toast({
                    title: "Blog post deleted",
                    description: "Post was successfully deleted.",
                });
            } catch {
                toast({
                    title: "Error",
                    description: "Failed to delete blog post. Please try again.",
                    variant: "destructive"
                });
            }
        }
    };

    const resetForm = () => {
        setIsCreating(false);
        setEditingPost(null);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            imageUrl: '',
            author: '',
            category: '',
            commentCount: 0
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Button
                    onClick={() => {
                        setIsCreating(true);
                        setEditingPost("");
                        setFormData({
                            title: '',
                            excerpt: '',
                            content: '',
                            imageUrl: '',
                            author: '',
                            category: '',
                            commentCount: 0
                        });
                    }}
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                >
                    <Plus className="h-4 w-4" />
                    Add Blog Post
                </Button>
            </div>

            {(isCreating || editingPost !== null) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingPost !== null ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
                        <CardDescription>Fill in the details for the blog post</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="10 Hidden Beaches in Sri Lanka You Need to Visit"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <Label htmlFor="excerpt">Excerpt *</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Discover secluded coastal paradises away from the tourist crowds..."
                                    rows={2}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write your blog post content here..."
                                    rows={8}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="imageUrl">Featured Image URL *</Label>
                                    <Input
                                        id="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="author">Author *</Label>
                                    <Input
                                        id="author"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        placeholder="Nimal Perera"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="category">Category *</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="commentCount">Comment Count</Label>
                                    <Input
                                        id="commentCount"
                                        type="number"
                                        value={formData.commentCount}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            commentCount: parseInt(e.target.value) || 0
                                        })}
                                        placeholder="0"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    type="submit"
                                    className="flex items-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    <Save className="h-4 w-4" />
                                    {isSubmitting ? "Processing..." : "Save Post"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                        <p className="text-gray-600">Loading blog posts...</p>
                    </div>
                </div>
            ) : blogPosts.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
                        <Button onClick={() => setIsCreating(true)}>
                            Create New Blog Post
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {blogPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold mb-2 truncate">{post.title}</h3>
                                        <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <Badge variant="secondary">{post.category}</Badge>
                                            <Badge variant="outline">By {post.author}</Badge>
                                            <Badge variant="outline">{new Date(post.postDate).toLocaleDateString()}</Badge>
                                            <Badge variant="outline">{post.commentCount} comments</Badge>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2 md:mt-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(post.id)}
                                            className="flex-shrink-0"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(post.id)}
                                            className="flex-shrink-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogManager;