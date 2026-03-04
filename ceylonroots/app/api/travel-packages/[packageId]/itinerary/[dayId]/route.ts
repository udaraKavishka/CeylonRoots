import { prisma } from "@/app/lib/prisma";
import { formatItineraryDay } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const itineraryDayInclude = {
  accommodation: true,
  meals: true,
  activities: true,
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ packageId: string; dayId: string }> }
) {
  try {
    const { packageId, dayId } = await params;
    const day = await prisma.itineraryDay.findFirst({
      where: {
        id: parseInt(dayId),
        travelPackageId: parseInt(packageId),
      },
      include: itineraryDayInclude,
    });
    if (!day) {
      return NextResponse.json(
        { error: "Itinerary day not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(formatItineraryDay(day));
  } catch (error) {
    console.error("Error fetching itinerary day:", error);
    return NextResponse.json(
      { error: "Failed to fetch itinerary day" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ packageId: string; dayId: string }> }
) {
  try {
    const { packageId, dayId } = await params;
    const body = await request.json();
    const { dayNumber, title, mainTown, description, accommodation, meals, activities } = body;

    const day = await prisma.itineraryDay.update({
      where: { id: parseInt(dayId) },
      data: {
        ...(dayNumber !== undefined && { dayNumber }),
        ...(title !== undefined && { title }),
        ...(mainTown !== undefined && { mainTown }),
        ...(description !== undefined && { description }),
        ...(accommodation !== undefined && {
          accommodation: {
            deleteMany: {},
            create: accommodation.map((name: string) => ({ name })),
          },
        }),
        ...(meals !== undefined && {
          meals: {
            deleteMany: {},
            create: meals.map((meal: string) => ({ meal })),
          },
        }),
        ...(activities !== undefined && {
          activities: {
            deleteMany: {},
            create: activities.map((act: { name: string }) => ({
              name: act.name,
            })),
          },
        }),
      },
      include: itineraryDayInclude,
    });

    // Verify it belongs to the package
    if (day.travelPackageId !== parseInt(packageId)) {
      return NextResponse.json(
        { error: "Itinerary day not found in this package" },
        { status: 404 }
      );
    }

    return NextResponse.json(formatItineraryDay(day));
  } catch (error) {
    console.error("Error updating itinerary day:", error);
    return NextResponse.json(
      { error: "Failed to update itinerary day" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ packageId: string; dayId: string }> }
) {
  try {
    const { dayId } = await params;
    await prisma.itineraryDay.delete({ where: { id: parseInt(dayId) } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting itinerary day:", error);
    return NextResponse.json(
      { error: "Failed to delete itinerary day" },
      { status: 500 }
    );
  }
}
