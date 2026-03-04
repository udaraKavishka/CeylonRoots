import { prisma } from "@/app/lib/prisma";
import { formatTravelComponent } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const transportInclude = {
  tags: true,
};

export async function GET() {
  try {
    const transports = await prisma.travelComponent.findMany({
      where: { componentType: "TRANSPORT" },
      include: transportInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(transports.map(formatTravelComponent));
  } catch (error) {
    console.error("Error fetching transport:", error);
    return NextResponse.json(
      { error: "Failed to fetch transport" },
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
      mode,
      departureLocation,
      arrivalLocation,
      departureLat,
      departureLng,
      arrivalLat,
      arrivalLng,
    } = body;

    const transport = await prisma.travelComponent.create({
      data: {
        componentType: "TRANSPORT",
        name,
        description,
        location,
        imageUrl,
        price,
        lat,
        lng,
        duration,
        mode,
        departureLocation,
        arrivalLocation,
        departureLat,
        departureLng,
        arrivalLat,
        arrivalLng,
        tags: { create: tags.map((tag: string) => ({ tag })) },
      },
      include: transportInclude,
    });

    return NextResponse.json(formatTravelComponent(transport), { status: 201 });
  } catch (error) {
    console.error("Error creating transport:", error);
    return NextResponse.json(
      { error: "Failed to create transport" },
      { status: 500 }
    );
  }
}
