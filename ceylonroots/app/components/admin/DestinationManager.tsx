'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from "../../components/ui/use-toast";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Destination = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  region: string;
  image: string;
  topAttraction: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  culturalTips: string;
  attractions: string[];
  coordinates: Coordinates;
};

const initialFormState = {
  name: '',
  description: '',
  region: '',
  image: '',
  topAttraction: '',
  bestTimeToVisit: '',
  recommendedDuration: '',
  culturalTips: '',
  attractions: '',
  lat: '',
  lng: ''
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const DestinationManager = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingDestination, setEditingDestination] = useState<string | null>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/destinationdetail`);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch destinations. Please try again later.",
        variant: "destructive"
      });
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);


  useEffect(() => {
    if (formData.image) {
      setImagePreview(formData.image);
    } else {
      setImagePreview(null);
    }
  }, [formData.image]);

  const createDestination = async (destinationData: Partial<Destination>) => {
    const response = await fetch(`${API_BASE_URL}/destinationdetail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(destinationData)
    });
    if (!response.ok) throw new Error(`Failed to create destination: ${response.status}`);
    return response.json();
  };

  const updateDestination = async (id: string, destinationData: Partial<Destination>) => {
    const response = await fetch(`${API_BASE_URL}/destinationdetail/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(destinationData)
    });
    if (!response.ok) throw new Error(`Failed to update destination: ${response.status}`);
    return response.json();
  };

  const deleteDestination = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/destinationdetail/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Failed to delete destination: ${response.status}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate coordinates
      const lat = parseFloat(formData.lat);
      const lng = parseFloat(formData.lng);
      
      if (isNaN(lat)) throw new Error("Latitude must be a valid number");
      if (isNaN(lng)) throw new Error("Longitude must be a valid number");
      if (lat < -90 || lat > 90) throw new Error("Latitude must be between -90 and 90");
      if (lng < -180 || lng > 180) throw new Error("Longitude must be between -180 and 180");

      const destinationData = {
        ...formData,
        attractions: formData.attractions.split(',').map(a => a.trim()).filter(Boolean),
        coordinates: {
          latitude: lat,
          longitude: lng
        }
      };

      // Remove temporary fields
      delete (destinationData as Record<string, unknown>).lat;
      delete (destinationData as Record<string, unknown>).lng;

      if (editingDestination) {
        const updatedDestination = await updateDestination(editingDestination, destinationData);
        setDestinations(prev =>
          prev.map(d => d.id === editingDestination ? updatedDestination : d)
        );
        toast({ title: "Destination updated", description: "Destination updated successfully." });
      } else {
        const newDestination = await createDestination(destinationData);
        setDestinations(prev => [...prev, newDestination]);
        toast({ title: "Destination saved", description: "Destination saved successfully." });
      }

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : `Failed to ${editingDestination ? 'update' : 'create'} destination.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (destinationId: string) => {
    const destination = destinations.find(d => d.id === destinationId);
    if (destination) {
      setFormData({
        name: destination.name,
        description: destination.description,
        region: destination.region,
        image: destination.image,
        topAttraction: destination.topAttraction,
        bestTimeToVisit: destination.bestTimeToVisit,
        recommendedDuration: destination.recommendedDuration,
        culturalTips: destination.culturalTips,
        attractions: destination.attractions.join(', '),
        lat: destination.coordinates.latitude.toString(),
        lng: destination.coordinates.longitude.toString()
      });
      setEditingDestination(destinationId);
      setIsCreating(false);
    }
  };

  const handleDelete = async (destinationId: string) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await deleteDestination(destinationId);
        setDestinations(prev => prev.filter(d => d.id !== destinationId));
        toast({
          title: "Destination deleted",
          description: "Destination was successfully deleted.",
        });
      } catch {
        toast({
          title: "Error",
          description: "Failed to delete destination. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setIsCreating(false);
    setEditingDestination(null);
    setFormData(initialFormState);
    setImagePreview(null);
  };

  const renderDestinations = () => {
    if (destinations.length === 0) {
      return (
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-medium mb-2">No destinations found</h3>
            <Button onClick={() => setIsCreating(true)}>
              Create New Destination
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid gap-4">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden">
            <CardContent className="p-4 md:p-6">
              {editingDestination === destination.id ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Destination Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Sigiriya"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="region">Region *</Label>
                      <Input
                        id="region"
                        value={formData.region}
                        onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                        placeholder="Cultural Triangle"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Image URL *</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      required
                      disabled={isSubmitting}
                    />
                    
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-3">
                        <Label>Image Preview</Label>
                        <div className="relative mt-1 border rounded-md overflow-hidden w-full max-w-xs aspect-video">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                            style={{ objectFit: 'cover' }}
                            onError={() => setImagePreview('/images/placeholder.jpg')}
                            sizes="(max-width: 640px) 100vw, 400px"
                            priority
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Sigiriya, also known as the Lion Rock, is an ancient rock fortress..."
                      rows={3}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="topAttraction">Top Attraction *</Label>
                      <Input
                        id="topAttraction"
                        value={formData.topAttraction}
                        onChange={(e) => setFormData(prev => ({ ...prev, topAttraction: e.target.value }))}
                        placeholder="The Lion Rock fortress and ancient palace ruins"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bestTimeToVisit">Best Time to Visit *</Label>
                      <Input
                        id="bestTimeToVisit"
                        value={formData.bestTimeToVisit}
                        onChange={(e) => setFormData(prev => ({ ...prev, bestTimeToVisit: e.target.value }))}
                        placeholder="January to March (dry season)"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="recommendedDuration">Recommended Duration *</Label>
                    <Input
                      id="recommendedDuration"
                      value={formData.recommendedDuration}
                      onChange={(e) => setFormData(prev => ({ ...prev, recommendedDuration: e.target.value }))}
                      placeholder="1-2 days"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="attractions">Attractions (comma-separated) *</Label>
                    <Textarea
                      id="attractions"
                      value={formData.attractions}
                      onChange={(e) => setFormData(prev => ({ ...prev, attractions: e.target.value }))}
                      placeholder="Sigiriya Rock Fortress, Water Gardens, Mirror Wall"
                      rows={2}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="culturalTips">Cultural Tips *</Label>
                    <Textarea
                      id="culturalTips"
                      value={formData.culturalTips}
                      onChange={(e) => setFormData(prev => ({ ...prev, culturalTips: e.target.value }))}
                      placeholder="Dress modestly when visiting religious sites. Remove shoes before entering temples..."
                      rows={3}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lat">Latitude *</Label>
                      <Input
                        id="lat"
                        type="number"
                        step="any"
                        value={formData.lat}
                        onChange={(e) => setFormData(prev => ({ ...prev, lat: e.target.value }))}
                        placeholder="7.9570"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lng">Longitude *</Label>
                      <Input
                        id="lng"
                        type="number"
                        step="any"
                        value={formData.lng}
                        onChange={(e) => setFormData(prev => ({ ...prev, lng: e.target.value }))}
                        placeholder="80.7603"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex items-center gap-2"
                      disabled={isSubmitting}
                    >
                      <Save className="h-4 w-4" />
                      {isSubmitting ? "Processing..." : "Save Destination"}
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
              ) : (
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2 truncate">{destination.name}</h3>
                    
                    {/* Destination Image */}
                    <div className="relative w-full h-48 rounded-md overflow-hidden border mb-3">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        style={{ objectFit: 'cover' }}
                        onError={() => {}}
                        sizes="(max-width: 640px) 100vw, 400px"
                        priority={false}
                      />
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{destination.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{destination.region}</Badge>
                      <Badge variant="outline">{destination.bestTimeToVisit}</Badge>
                      <Badge variant="outline">{destination.recommendedDuration}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      <span className="font-medium">Top Attraction:</span> {destination.topAttraction}
                    </p>
                    <div className="mt-2">
                      <span className="font-medium text-sm">Attractions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {destination.attractions.map((attraction, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {attraction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Coordinates:</span>
                      {` ${destination.coordinates.latitude}, ${destination.coordinates.longitude}`}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(destination.id)}
                      className="flex-shrink-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(destination.id)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Destinations</h2>
        <Button
          onClick={() => {
            setIsCreating(true);
            setEditingDestination(null);
            setFormData(initialFormState);
          }}
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          <Plus className="h-4 w-4" />
          Add Destination
        </Button>
      </div>

      {isCreating && editingDestination === null && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Destination</CardTitle>
            <CardDescription>Fill in the details for the destination</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Destination Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Sigiriya"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region *</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    placeholder="Cultural Triangle"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  required
                  disabled={isSubmitting}
                />
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-3">
                    <Label>Image Preview</Label>
                    <div className="relative mt-1 border rounded-md overflow-hidden w-full max-w-xs aspect-video">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        style={{ objectFit: 'cover' }}
                        onError={() => setImagePreview('/images/placeholder.jpg')}
                        sizes="(max-width: 640px) 100vw, 400px"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Sigiriya, also known as the Lion Rock, is an ancient rock fortress..."
                  rows={3}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="topAttraction">Top Attraction *</Label>
                  <Input
                    id="topAttraction"
                    value={formData.topAttraction}
                    onChange={(e) => setFormData(prev => ({ ...prev, topAttraction: e.target.value }))}
                    placeholder="The Lion Rock fortress and ancient palace ruins"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="bestTimeToVisit">Best Time to Visit *</Label>
                  <Input
                    id="bestTimeToVisit"
                    value={formData.bestTimeToVisit}
                    onChange={(e) => setFormData(prev => ({ ...prev, bestTimeToVisit: e.target.value }))}
                    placeholder="January to March (dry season)"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="recommendedDuration">Recommended Duration *</Label>
                <Input
                  id="recommendedDuration"
                  value={formData.recommendedDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, recommendedDuration: e.target.value }))}
                  placeholder="1-2 days"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="attractions">Attractions (comma-separated) *</Label>
                <Textarea
                  id="attractions"
                  value={formData.attractions}
                  onChange={(e) => setFormData(prev => ({ ...prev, attractions: e.target.value }))}
                  placeholder="Sigiriya Rock Fortress, Water Gardens, Mirror Wall"
                  rows={2}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="culturalTips">Cultural Tips *</Label>
                <Textarea
                  id="culturalTips"
                  value={formData.culturalTips}
                  onChange={(e) => setFormData(prev => ({ ...prev, culturalTips: e.target.value }))}
                  placeholder="Dress modestly when visiting religious sites. Remove shoes before entering temples..."
                  rows={3}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lat">Latitude *</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData(prev => ({ ...prev, lat: e.target.value }))}
                    placeholder="7.9570"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="lng">Longitude *</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) => setFormData(prev => ({ ...prev, lng: e.target.value }))}
                    placeholder="80.7603"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting ? "Processing..." : "Save Destination"}
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
            <p className="text-gray-600">Loading destinations...</p>
          </div>
        </div>
      ) : (
        renderDestinations()
      )}
    </div>
  );
};

export default DestinationManager;