import { NextResponse } from "next/server";

interface Destination {
  id: number;
  name: string;
  description: string;
  region: string;
  topAttraction: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  culturalTips: string;
  attractions: string[];
}

export async function GET() {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL environment variable is not defined");
    }

    const response = await fetch(`${API_BASE_URL}/destinationdetail`);

    if (!response.ok) {
      throw new Error(
        `Backend responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data: Destination[] = await response.json();

    // Map backend data to frontend structure (without image)
    const mappedDestinations = data.map((destination: Destination) => ({
      id: destination.id,
      name: destination.name,
      description: destination.description,
      region: destination.region,
      topAttraction: destination.topAttraction,
      bestTimeToVisit: destination.bestTimeToVisit,
      recommendedDuration: destination.recommendedDuration,
      culturalTips: destination.culturalTips,
      attractions: destination.attractions || [],
    }));

    return NextResponse.json(mappedDestinations);
  } catch (error: unknown) {
    console.error("Error fetching destinations:", error);
    let errorMessage = "Failed to fetch destinations";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
