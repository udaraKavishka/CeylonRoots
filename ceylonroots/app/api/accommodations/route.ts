import { prisma } from "@/app/lib/prisma";
import { formatTravelComponent } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const accommodationInclude = {
  tags: true,
  amenities: true,
};

export async function GET() {
  try {
    const accommodations = await prisma.travelComponent.findMany({
      where: { componentType: "ACCOMMODATION" },
      include: accommodationInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(accommodations.map(formatTravelComponent));
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    return NextResponse.json(
      { error: "Failed to fetch accommodations" },
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
      rating,
      amenities = [],
    } = body;

    const accommodation = await prisma.travelComponent.create({
      data: {
        componentType: "ACCOMMODATION",
        name,
        description,
        location,
        imageUrl,
        price,
        lat,
        lng,
        duration,
        rating,
        tags: { create: tags.map((tag: string) => ({ tag })) },
        amenities: {
          create: amenities.map((amenity: string) => ({ amenity })),
        },
      },
      include: accommodationInclude,
    });

    return NextResponse.json(formatTravelComponent(accommodation));
  } catch (error) {
    console.error("Error creating accommodation:", error);
    return NextResponse.json(
      { error: "Failed to create accommodation" },
      { status: 500 }
    );
  }
}
