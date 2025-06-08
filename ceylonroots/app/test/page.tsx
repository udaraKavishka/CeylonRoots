// pages/packages.js

'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

const API_BASE_URL = 'http://localhost:8080'; // Change this to your backend URL

type TravelPackage = {
    id: number | null;
    title: string;
    description: string;
    imageUrl: string;
    durationDays: number;
    price: number;
    rating: number;
    reviewCount: number;
};

export default function PackagesPage() {
    const [packages, setPackages] = useState<TravelPackage[]>([]);
    const [formData, setFormData] = useState<TravelPackage>({
        id: null,
        title: '',
        description: '',
        imageUrl: '',
        durationDays: 1,
        price: 0,
        rating: 0,
        reviewCount: 0,
    });
    const [editing, setEditing] = useState(false);

    const fetchPackages = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/packages`);
            const data = await response.json();
            setPackages(data);
        } catch (error) {
            console.error('Failed to fetch packages:', error);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ['price', 'rating', 'reviewCount', 'durationDays'].includes(name)
                ? Number(value)
                : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing
            ? `${API_BASE_URL}/packages/${formData.id}`
            : `${API_BASE_URL}/packages`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to submit');
            setEditing(false);
            setFormData({
                id: null,
                title: '',
                description: '',
                imageUrl: '',
                durationDays: 1,
                price: 0,
                rating: 0,
                reviewCount: 0,
            });
            fetchPackages();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (pkg: TravelPackage) => {
        setFormData(pkg);
        setEditing(true);
    };

    const handleDelete = async (id: number | null) => {
        if (id === null) return;
        try {
            const res = await fetch(`${API_BASE_URL}/packages/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete');
            fetchPackages();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Travel Packages CRUD Tester</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <h2>{editing ? 'Edit' : 'Create'} Package</h2>
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required /><br />
                <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required /><br />
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required /><br />
                <input name="durationDays" type="number" value={formData.durationDays} onChange={handleChange} placeholder="Duration (days)" required /><br />
                <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Price" required /><br />
                <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} placeholder="Rating" required /><br />
                <input name="reviewCount" type="number" value={formData.reviewCount} onChange={handleChange} placeholder="Review Count" required /><br />
                <button type="submit">{editing ? 'Update' : 'Create'}</button>
                {editing && (
                    <button type="button" onClick={() => {
                        setEditing(false);
                        setFormData({
                            id: null,
                            title: '',
                            description: '',
                            imageUrl: '',
                            durationDays: 1,
                            price: 0,
                            rating: 0,
                            reviewCount: 0,
                        });
                    }}>Cancel</button>
                )}
            </form>

            <h2>Available Packages</h2>
            {packages.length === 0 ? (
                <p>No packages found.</p>
            ) : (
                <ul>
                    {packages.map((pkg) => (
                        <li key={pkg.id ?? Math.random()} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
                            <div style={{ position: 'relative', width: '150px', height: '100px' }}>
                                <Image
                                    src={pkg.imageUrl || '/images/placeholder.png'}
                                    alt={pkg.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <strong>{pkg.title}</strong><br />
                            {pkg.description}<br />
                            <small>Duration: {pkg.durationDays} days</small><br />
                            <small>Price: ${pkg.price}</small><br />
                            <small>Rating: {pkg.rating} ({pkg.reviewCount} reviews)</small><br />
                            <button onClick={() => handleEdit(pkg)}>Edit</button>
                            <button onClick={() => handleDelete(pkg.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
