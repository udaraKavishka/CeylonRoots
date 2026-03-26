import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../auth";
import { sendBookingConfirmationEmail } from "../../lib/email";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    packageId,
    firstName,
    lastName,
    email,
    phone,
    travelerCount,
    totalAmount,
    paymentMethod,
    specialRequests,
  } = body;

  if (
    !packageId ||
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !travelerCount ||
    !totalAmount
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Check if user is logged in to link booking to account
  const session = await auth();
  const userId = session?.user?.id ?? null;

  const booking = await prisma.booking.create({
    data: {
      packageId: Number(packageId),
      userId,
      firstName,
      lastName,
      email,
      phone,
      travelerCount: Number(travelerCount),
      totalAmount: Number(totalAmount),
      paymentMethod: paymentMethod ?? null,
      specialRequests: specialRequests ?? null,
      status: "pending",
    },
    include: {
      package: { select: { id: true, title: true, price: true } },
    },
  });

  // Send confirmation email (fire-and-forget — errors don't block the response)
  sendBookingConfirmationEmail({
    bookingId: booking.id,
    firstName,
    lastName,
    email,
    packageTitle: booking.package.title,
    travelerCount: Number(travelerCount),
    totalAmount: Number(totalAmount),
    paymentMethod: paymentMethod ?? null,
  }).catch((err: unknown) => console.error("Booking email error:", err));

  return NextResponse.json(booking, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  // Only allow users to see their own bookings; admins can see any
  if (
    (session.user as { role?: string }).role !== "admin" &&
    userId !== session.user.id
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: userId ?? session.user.id },
    include: {
      package: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
          durationDays: true,
          price: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}
