import { prisma } from "@/app/lib/prisma";
import { formatTravelComponent } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const activityInclude = {
  tags: true,
  activityGallery: {
    include: { gallery: true },
  },
};

export async function GET() {
  try {
    const activities = await prisma.travelComponent.findMany({
      where: { componentType: "ACTIVITY" },
      include: activityInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(activities.map(formatTravelComponent));
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
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
      difficulty,
    } = body;

    const activity = await prisma.travelComponent.create({
      data: {
        componentType: "ACTIVITY",
        name,
        description,
        location,
        imageUrl,
        price,
        lat,
        lng,
        duration,
        difficulty,
        tags: { create: tags.map((tag: string) => ({ tag })) },
      },
      include: activityInclude,
    });

    return NextResponse.json(formatTravelComponent(activity), { status: 201 });
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 }
    );
  }
}
