import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const packageId = searchParams.get("packageId");

  if (!packageId) {
    return NextResponse.json(
      { error: "packageId is required" },
      { status: 400 }
    );
  }

  const reviews = await prisma.review.findMany({
    where: { packageId: parseInt(packageId) },
    orderBy: [{ verified: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    packageId,
    authorName,
    authorEmail,
    rating,
    comment,
    guideRating,
    valueRating,
    itineraryRating,
    travelType,
    tripDate,
  } = body;

  if (!packageId || !authorName || !authorEmail || !rating || !comment) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const review = await prisma.review.create({
    data: {
      packageId: parseInt(packageId),
      authorName,
      authorEmail,
      rating: parseFloat(rating),
      guideRating: guideRating ? parseFloat(guideRating) : null,
      valueRating: valueRating ? parseFloat(valueRating) : null,
      itineraryRating: itineraryRating ? parseFloat(itineraryRating) : null,
      comment,
      travelType: travelType || null,
      tripDate: tripDate || null,
    },
  });

  return NextResponse.json(review, { status: 201 });
}
