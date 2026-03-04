import { prisma } from "@/app/lib/prisma";
import { formatTravelPackage } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const packageInclude = {
  destinations: true,
  highlights: true,
  gallery: true,
  includes: true,
  excludes: true,
  itineraryDays: {
    include: {
      accommodation: true,
      meals: true,
      activities: true,
    },
    orderBy: { dayNumber: "asc" as const },
  },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pkg = await prisma.travelPackage.findUnique({
      where: { id: parseInt(id) },
      include: packageInclude,
    });
    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    return NextResponse.json(formatTravelPackage(pkg));
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json(
      { error: "Failed to fetch package" },
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
      title,
      description,
      imageUrl,
      durationDays,
      price,
      rating,
      reviewCount,
      destinations,
      highlights,
      gallery,
      includes,
      excludes,
    } = body;

    const pkg = await prisma.travelPackage.update({
      where: { id: parseInt(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(durationDays !== undefined && { durationDays }),
        ...(price !== undefined && { price }),
        ...(rating !== undefined && { rating }),
        ...(reviewCount !== undefined && { reviewCount }),
        ...(destinations !== undefined && {
          destinations: {
            deleteMany: {},
            create: destinations.map((d: string) => ({ destination: d })),
          },
        }),
        ...(highlights !== undefined && {
          highlights: {
            deleteMany: {},
            create: highlights.map((h: string) => ({ highlight: h })),
          },
        }),
        ...(gallery !== undefined && {
          gallery: {
            deleteMany: {},
            create: gallery.map((url: string) => ({ url })),
          },
        }),
        ...(includes !== undefined && {
          includes: {
            deleteMany: {},
            create: includes.map((item: string) => ({ item })),
          },
        }),
        ...(excludes !== undefined && {
          excludes: {
            deleteMany: {},
            create: excludes.map((item: string) => ({ item })),
          },
        }),
      },
      include: packageInclude,
    });

    return NextResponse.json(formatTravelPackage(pkg));
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json(
      { error: "Failed to update package" },
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
    await prisma.travelPackage.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({
      message: `Package with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 }
    );
  }
}
