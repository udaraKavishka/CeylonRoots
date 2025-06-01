'use client';

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { Plus, Edit, Trash2, Save, ImageIcon, VideoIcon } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";
import { galleryItems } from '../../data/galleryItems';

const GalleryManager = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        type: 'image' as 'image' | 'video',
        url: '',
        thumbnailUrl: '',
        caption: '',
        location: '',
        description: '',
        categories: [] as string[],
        featured: false
    });

    const availableCategories = ['cultural', 'adventure', 'beaches', 'wildlife', 'food'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Gallery item saved",
            description: "Gallery item has been saved successfully.",
        });
        setIsCreating(false);
        setEditingItem(null);
        setFormData({
            type: 'image',
            url: '',
            thumbnailUrl: '',
            caption: '',
            location: '',
            description: '',
            categories: [],
            featured: false
        });
    };

    const handleEdit = (itemId: string) => {
        const item = galleryItems.find(i => i.id === itemId);
        if (item) {
            setFormData({
                type: item.type,
                url: item.url,
                thumbnailUrl: item.thumbnailUrl || '',
                caption: item.caption,
                location: item.location,
                description: item.description || '',
                categories: item.categories,
                featured: item.featured || false
            });
            setEditingItem(itemId);
        }
    };

    const handleDelete = (itemId: string) => {
        toast({
            title: "Gallery item deleted",
            description: "Gallery item has been deleted successfully.",
            variant: "destructive"
        });
    };

    const handleCategoryChange = (category: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            categories: checked
                ? [...prev.categories, category]
                : prev.categories.filter(c => c !== category)
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gallery Items</h2>
                <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Gallery Item
                </Button>
            </div>

            {(isCreating || editingItem) && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingItem ? 'Edit Gallery Item' : 'Create New Gallery Item'}</CardTitle>
                        <CardDescription>Fill in the details for the gallery item</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="type">Type</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(value: 'image' | 'video') => setFormData(prev => ({ ...prev, type: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="image">Image</SelectItem>
                                            <SelectItem value="video">Video</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="caption">Caption</Label>
                                    <Input
                                        id="caption"
                                        value={formData.caption}
                                        onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                                        placeholder="Sigiriya Rock Fortress"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="url">{formData.type === 'video' ? 'Video URL' : 'Image URL'}</Label>
                                <Input
                                    id="url"
                                    value={formData.url}
                                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                                    placeholder="https://images.unsplash.com/..."
                                    required
                                />
                            </div>

                            {formData.type === 'video' && (
                                <div>
                                    <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                                    <Input
                                        id="thumbnailUrl"
                                        value={formData.thumbnailUrl}
                                        onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                            )}

                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="Sigiriya, Cultural Triangle"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="The ancient rock fortress and palace ruins of Sigiriya..."
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label>Categories</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                    {availableCategories.map((category) => (
                                        <div key={category} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={category}
                                                checked={formData.categories.includes(category)}
                                                onCheckedChange={(checked) =>
                                                    handleCategoryChange(category, checked as boolean)
                                                }
                                            />
                                            <Label htmlFor={category} className="text-sm font-normal capitalize">
                                                {category}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="featured"
                                    checked={formData.featured}
                                    onCheckedChange={(checked) =>
                                        setFormData(prev => ({ ...prev, featured: checked as boolean }))
                                    }
                                />
                                <Label htmlFor="featured">Featured item</Label>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Item
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditingItem(null);
                                        setFormData({
                                            type: 'image',
                                            url: '',
                                            thumbnailUrl: '',
                                            caption: '',
                                            location: '',
                                            description: '',
                                            categories: [],
                                            featured: false
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
                {galleryItems.map((item) => (
                    <Card key={item.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                        {item.type === 'video' ? (
                                            <VideoIcon className="h-6 w-6 text-gray-500" />
                                        ) : (
                                            <ImageIcon className="h-6 w-6 text-gray-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-1">{item.caption}</h3>
                                        <p className="text-gray-600 mb-2">{item.location}</p>
                                        {item.description && (
                                            <p className="text-sm text-gray-500 mb-3">{item.description.substring(0, 100)}...</p>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant={item.type === 'video' ? 'secondary' : 'outline'}>
                                                {item.type}
                                            </Badge>
                                            {item.featured && <Badge variant="default">Featured</Badge>}
                                            {item.categories.map((category) => (
                                                <Badge key={category} variant="outline" className="text-xs capitalize">
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(item.id)}
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

export default GalleryManager;