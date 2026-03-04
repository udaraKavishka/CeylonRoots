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

export async function GET() {
  try {
    const destinations = await prisma.travelComponent.findMany({
      where: { componentType: "DESTINATION" },
      include: destinationInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(destinations.map(formatTravelComponent));
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
      location,
      imageUrl,
      price,
      lat,
      lng,
      duration,
      tags = [],
      attractions = [],
    } = body;

    const destination = await prisma.travelComponent.create({
      data: {
        componentType: "DESTINATION",
        name,
        description,
        location,
        imageUrl,
        price,
        lat,
        lng,
        duration,
        tags: { create: tags.map((tag: string) => ({ tag })) },
        destinationAttractions: {
          create: attractions.map((attraction: string) => ({ attraction })),
        },
      },
      include: destinationInclude,
    });

    return NextResponse.json(formatTravelComponent(destination), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating destination:", error);
    return NextResponse.json(
      { error: "Failed to create destination" },
      { status: 500 }
    );
  }
}
