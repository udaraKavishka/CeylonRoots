import { prisma } from "@/app/lib/prisma";
import { formatTravelComponent } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const destinationInclude = {
  tags: true,
  destinationAttractions: true,
  destinationGallery: {
    include: { gallery: true },
  },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const destination = await prisma.travelComponent.findFirst({
      where: { id: parseInt(id), componentType: "DESTINATION" },
      include: destinationInclude,
    });
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(formatTravelComponent(destination));
  } catch (error) {
    console.error("Error fetching destination:", error);
    return NextResponse.json(
      { error: "Failed to fetch destination" },
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
      attractions,
    } = body;

    const destination = await prisma.travelComponent.update({
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
        ...(tags !== undefined && {
          tags: {
            deleteMany: {},
            create: tags.map((tag: string) => ({ tag })),
          },
        }),
        ...(attractions !== undefined && {
          destinationAttractions: {
            deleteMany: {},
            create: attractions.map((attraction: string) => ({ attraction })),
          },
        }),
      },
      include: destinationInclude,
    });

    return NextResponse.json(formatTravelComponent(destination));
  } catch (error) {
    console.error("Error updating destination:", error);
    return NextResponse.json(
      { error: "Failed to update destination" },
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
      message: `Destination with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting destination:", error);
    return NextResponse.json(
      { error: "Failed to delete destination" },
      { status: 500 }
    );
  }
}
