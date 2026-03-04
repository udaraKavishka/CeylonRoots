import { prisma } from "@/app/lib/prisma";
import { formatDestinationDetails } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const destinationDetailsInclude = {
  attractions: true,
};

export async function GET() {
  try {
    const destinations = await prisma.destinationDetails.findMany({
      include: destinationDetailsInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(destinations.map(formatDestinationDetails));
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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
      attractions = [],
    } = body;

    const dest = await prisma.destinationDetails.create({
      data: {
        name,
        description,
        region,
        topAttraction,
        bestTimeToVisit,
        recommendedDuration,
        culturalTips,
        image,
        latitude: coordinates?.latitude ?? body.latitude ?? null,
        longitude: coordinates?.longitude ?? body.longitude ?? null,
        attractions: {
          create: attractions.map((attraction: string) => ({ attraction })),
        },
      },
      include: destinationDetailsInclude,
    });

    return NextResponse.json(formatDestinationDetails(dest), { status: 201 });
  } catch (error) {
    console.error("Error creating destination details:", error);
    return NextResponse.json(
      { error: "Failed to create destination details" },
      { status: 500 }
    );
  }
}
