import { prisma } from "@/app/lib/prisma";
import { formatTravelComponent } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const transportInclude = {
  tags: true,
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const transport = await prisma.travelComponent.findFirst({
      where: { id: parseInt(id), componentType: "TRANSPORT" },
      include: transportInclude,
    });
    if (!transport) {
      return NextResponse.json(
        { error: "Transport not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(formatTravelComponent(transport));
  } catch (error) {
    console.error("Error fetching transport:", error);
    return NextResponse.json(
      { error: "Failed to fetch transport" },
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
      name, description, location, imageUrl, price, lat, lng, duration, tags,
      mode, departureLocation, arrivalLocation, departureLat, departureLng, arrivalLat, arrivalLng,
    } = body;

    const transport = await prisma.travelComponent.update({
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
        ...(mode !== undefined && { mode }),
        ...(departureLocation !== undefined && { departureLocation }),
        ...(arrivalLocation !== undefined && { arrivalLocation }),
        ...(departureLat !== undefined && { departureLat }),
        ...(departureLng !== undefined && { departureLng }),
        ...(arrivalLat !== undefined && { arrivalLat }),
        ...(arrivalLng !== undefined && { arrivalLng }),
        ...(tags !== undefined && {
          tags: { deleteMany: {}, create: tags.map((tag: string) => ({ tag })) },
        }),
      },
      include: transportInclude,
    });

    return NextResponse.json(formatTravelComponent(transport));
  } catch (error) {
    console.error("Error updating transport:", error);
    return NextResponse.json(
      { error: "Failed to update transport" },
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
      message: `Transport with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting transport:", error);
    return NextResponse.json(
      { error: "Failed to delete transport" },
      { status: 500 }
    );
  }
}
