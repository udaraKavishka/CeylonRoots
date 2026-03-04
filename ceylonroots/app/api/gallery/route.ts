import { prisma } from "@/app/lib/prisma";
import { formatGalleryItem } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items.map(formatGalleryItem));
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type,
      url,
      thumbnailUrl,
      caption,
      location,
      description,
      featured,
      dateAdded,
    } = body;

    const item = await prisma.galleryItem.create({
      data: {
        type,
        url,
        thumbnailUrl,
        caption,
        location,
        description,
        featured,
        dateAdded: dateAdded ? new Date(dateAdded) : null,
      },
    });

    return NextResponse.json(formatGalleryItem(item));
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
