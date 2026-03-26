import { prisma } from "@/app/lib/prisma";
import { formatGalleryItem } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.galleryItem.findUnique({
      where: { id: parseInt(id) },
    });
    if (!item) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(formatGalleryItem(item));
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const item = await prisma.galleryItem.update({
      where: { id: parseInt(id) },
      data: {
        ...(type !== undefined && { type }),
        ...(url !== undefined && { url }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(caption !== undefined && { caption }),
        ...(location !== undefined && { location }),
        ...(description !== undefined && { description }),
        ...(featured !== undefined && { featured }),
        ...(dateAdded !== undefined && { dateAdded: new Date(dateAdded) }),
      },
    });

    return NextResponse.json(formatGalleryItem(item));
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.galleryItem.delete({ where: { id: parseInt(id) } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
