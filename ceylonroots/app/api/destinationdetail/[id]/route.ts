import { prisma } from "@/app/lib/prisma";
import { formatDestinationDetails } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const destinationDetailsInclude = {
  attractions: true,
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dest = await prisma.destinationDetails.findUnique({
      where: { id: parseInt(id) },
      include: destinationDetailsInclude,
    });
    if (!dest) {
      return NextResponse.json(
        { error: "Destination detail not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(formatDestinationDetails(dest));
  } catch (error) {
    console.error("Error fetching destination detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch destination detail" },
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
      region,
      topAttraction,
      bestTimeToVisit,
      recommendedDuration,
      culturalTips,
      image,
      coordinates,
      attractions,
    } = body;

    const dest = await prisma.destinationDetails.update({
      where: { id: parseInt(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(region !== undefined && { region }),
        ...(topAttraction !== undefined && { topAttraction }),
        ...(bestTimeToVisit !== undefined && { bestTimeToVisit }),
        ...(recommendedDuration !== undefined && { recommendedDuration }),
        ...(culturalTips !== undefined && { culturalTips }),
        ...(image !== undefined && { image }),
        ...(() => {
          const lat = coordinates?.latitude ?? body.latitude;
          const lng = coordinates?.longitude ?? body.longitude;
          return {
            ...(lat !== undefined && { latitude: lat }),
            ...(lng !== undefined && { longitude: lng }),
          };
        })(),
        ...(attractions !== undefined && {
          attractions: {
            deleteMany: {},
            create: attractions.map((attraction: string) => ({ attraction })),
          },
        }),
      },
      include: destinationDetailsInclude,
    });

    return NextResponse.json(formatDestinationDetails(dest));
  } catch (error) {
    console.error("Error updating destination detail:", error);
    return NextResponse.json(
      { error: "Failed to update destination detail" },
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
    await prisma.destinationDetails.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({
      message: `Destination detail with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting destination detail:", error);
    return NextResponse.json(
      { error: "Failed to delete destination detail" },
      { status: 500 }
    );
  }
}
