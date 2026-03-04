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
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    const { packageId } = await params;
    const days = await prisma.itineraryDay.findMany({
      where: { travelPackageId: parseInt(packageId) },
      include: itineraryDayInclude,
      orderBy: { dayNumber: "asc" },
    });
    return NextResponse.json(days.map(formatItineraryDay));
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return NextResponse.json(
      { error: "Failed to fetch itinerary" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    const { packageId } = await params;
    const body = await request.json();
    const {
      dayNumber,
      title,
      mainTown,
      description,
      accommodation = [],
      meals = [],
      activities = [],
    } = body;

    const packageExists = await prisma.travelPackage.findUnique({
      where: { id: parseInt(packageId) },
    });
    if (!packageExists) {
      return NextResponse.json(
        { error: "Travel package not found" },
        { status: 404 }
      );
    }

    const day = await prisma.itineraryDay.create({
      data: {
        travelPackageId: parseInt(packageId),
        dayNumber,
        title,
        mainTown,
        description,
        accommodation: {
          create: accommodation.map((name: string) => ({ name })),
        },
        meals: {
          create: meals.map((meal: string) => ({ meal })),
        },
        activities: {
          create: activities.map((act: { name: string }) => ({
            name: act.name,
          })),
        },
      },
      include: itineraryDayInclude,
    });

    return NextResponse.json(formatItineraryDay(day), { status: 201 });
  } catch (error) {
    console.error("Error creating itinerary day:", error);
    return NextResponse.json(
      { error: "Failed to create itinerary day" },
      { status: 500 }
    );
  }
}
