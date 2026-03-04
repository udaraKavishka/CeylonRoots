import { prisma } from "@/app/lib/prisma";
import { formatTravelComponent } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const activityInclude = {
  tags: true,
  activityGallery: {
    include: { gallery: true },
  },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const activity = await prisma.travelComponent.findFirst({
      where: { id: parseInt(id), componentType: "ACTIVITY" },
      include: activityInclude,
    });
    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(formatTravelComponent(activity));
  } catch (error) {
    console.error("Error fetching activity:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
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
    const { name, description, location, imageUrl, price, lat, lng, duration, tags, difficulty } = body;

    const activity = await prisma.travelComponent.update({
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
        ...(difficulty !== undefined && { difficulty }),
        ...(tags !== undefined && {
          tags: { deleteMany: {}, create: tags.map((tag: string) => ({ tag })) },
        }),
      },
      include: activityInclude,
    });

    return NextResponse.json(formatTravelComponent(activity));
  } catch (error) {
    console.error("Error updating activity:", error);
    return NextResponse.json(
      { error: "Failed to update activity" },
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
      message: `Activity with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting activity:", error);
    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 }
    );
  }
}
