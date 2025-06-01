'use client';

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";
import { blogPosts } from '../../data/blogPosts';

const BlogManager = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingPost, setEditingPost] = useState<number | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author: '',
        category: '',
        tags: ''
    });

    const categories = ['Hidden Gems', 'Local Food', 'Wildlife', 'Cultural Events', 'Traveler Stories'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Blog post saved",
            description: "Blog post has been saved successfully.",
        });
        setIsCreating(false);
        setEditingPost(null);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            image: '',
            author: '',
            category: '',
            tags: ''
        });
    };

    const handleEdit = (postId: number) => {
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
            setFormData({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content.join('\n\n'),
                image: post.image,
                author: post.author,
                category: post.category,
                tags: post.tags.join(', ')
            });
            setEditingPost(postId);
        }
    };

    const handleDelete = (postId: number) => {
        // TODO: Implement deletion logic using postId
        toast({
            title: "Blog post deleted",
            description: "Blog post has been deleted successfully.",
            variant: "destructive"
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Button
                    onClick={() => {
                        setIsCreating(true);
                        setEditingPost(null);
                        setFormData({
                            title: '',
                            excerpt: '',
                            content: '',
                            image: '',
                            author: '',
                            category: '',
                            tags: ''
                        });
                    }}
                    className="flex items-center gap-2"
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
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="image">Featured Image URL *</Label>
                                    <Input
                                        id="image"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        required
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
                                    <Label htmlFor="tags">Tags (comma-separated) *</Label>
                                    <Input
                                        id="tags"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="Beaches, Off the Beaten Path, Swimming"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button type="submit" className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Post
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditingPost(null);
                                        setFormData({
                                            title: '',
                                            excerpt: '',
                                            content: '',
                                            image: '',
                                            author: '',
                                            category: '',
                                            tags: ''
                                        });
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

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
                                        <Badge variant="outline">{post.date}</Badge>
                                        <Badge variant="outline">{post.commentCount} comments</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.map((tag, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
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
        </div>
    );
};

export default BlogManager;