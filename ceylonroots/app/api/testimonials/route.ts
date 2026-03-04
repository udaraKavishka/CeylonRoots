import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: [
                { featured: 'desc' },
                { createdAt: 'desc' }
            ]
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const testimonial = await prisma.testimonial.create({
            data: {
                name: body.name,
                location: body.location,
                image: body.image || null,
                rating: body.rating ?? 5,
                testimonial: body.testimonial,
                tourType: body.tourType || null,
                tourDate: body.tourDate || null,
                featured: body.featured ?? false,
            }
        });
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
