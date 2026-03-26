import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const [
    packages,
    blogs,
    destinations,
    guides,
    reviews,
    testimonials,
    gallery,
  ] = await Promise.all([
    prisma.travelPackage.count(),
    prisma.blogPost.count(),
    prisma.destinationDetails.count(),
    prisma.guide.count(),
    prisma.review.count(),
    prisma.testimonial.count(),
    prisma.galleryItem.count(),
  ]);

  // Top-rated packages
  const topPackages = await prisma.travelPackage.findMany({
    select: {
      id: true,
      title: true,
      rating: true,
      reviewCount: true,
      price: true,
    },
    orderBy: { rating: "desc" },
    take: 6,
  });

  // Reviews breakdown by rating
  const reviewsByRating = await prisma.review.groupBy({
    by: ["rating"],
    _count: { id: true },
    orderBy: { rating: "asc" },
  });

  return NextResponse.json({
    counts: {
      packages,
      blogs,
      destinations,
      guides,
      reviews,
      testimonials,
      gallery,
    },
    topPackages,
    reviewsByRating,
  });
}
