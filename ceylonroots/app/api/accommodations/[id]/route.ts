import { prisma } from "@/app/lib/prisma";
import { formatTravelComponent } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const accommodationInclude = {
  tags: true,
  amenities: true,
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const accommodation = await prisma.travelComponent.findFirst({
      where: { id: parseInt(id), componentType: "ACCOMMODATION" },
      include: accommodationInclude,
    });
    if (!accommodation) {
      return NextResponse.json(
        { error: "Accommodation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(formatTravelComponent(accommodation));
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    return NextResponse.json(
      { error: "Failed to fetch accommodation" },
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
      name,
      description,
      location,
      imageUrl,
      price,
      lat,
      lng,
      duration,
      tags,
      rating,
      amenities,
    } = body;

    const accommodation = await prisma.travelComponent.update({
      where: { id: parseInt(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(location !== undefined && { location }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(price !== undefined && { price }),
        ...(lat !== undefined && { lat }),
        ...(lng !== undefined && { lng }),
        ...(duration !== undefined && { duration }),
        ...(rating !== undefined && { rating }),
        ...(tags !== undefined && {
          tags: {
            deleteMany: {},
            create: tags.map((tag: string) => ({ tag })),
          },
        }),
        ...(amenities !== undefined && {
          amenities: {
            deleteMany: {},
            create: amenities.map((amenity: string) => ({ amenity })),
          },
        }),
      },
      include: accommodationInclude,
    });

    return NextResponse.json(formatTravelComponent(accommodation));
  } catch (error) {
    console.error("Error updating accommodation:", error);
    return NextResponse.json(
      { error: "Failed to update accommodation" },
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
    await prisma.travelComponent.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({
      message: `Accommodation with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting accommodation:", error);
    return NextResponse.json(
      { error: "Failed to delete accommodation" },
      { status: 500 }
    );
  }
}
