import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../auth';

const prisma = new PrismaClient();

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();

    const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
            package: {
                select: { id: true, title: true, imageUrl: true, durationDays: true, price: true },
            },
        },
    });

    if (!booking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Allow viewing if: the booking email matches session user, user is admin, or booking has no userId (guest)
    const userRole = (session?.user as { role?: string } | undefined)?.role;
    const sessionUserId = session?.user?.id;

    const isOwner = booking.userId === sessionUserId;
    const isAdmin = userRole === 'admin';
    const isGuest = !booking.userId;

    if (!isOwner && !isAdmin && !isGuest) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(booking);
}
