import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const destinations = await prisma.destinationDetails.findMany({
      include: { attractions: true },
      orderBy: { createdAt: "desc" },
    });

    const mapped = destinations.map((dest) => ({
      id: dest.id,
      name: dest.name,
      description: dest.description,
      region: dest.region,
      topAttraction: dest.topAttraction,
      bestTimeToVisit: dest.bestTimeToVisit,
      recommendedDuration: dest.recommendedDuration,
      culturalTips: dest.culturalTips,
      attractions: dest.attractions.map((a) => a.attraction) || [],
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}
