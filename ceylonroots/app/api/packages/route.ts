import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL environment variable is not defined");
    }

    const response = await fetch(`${API_BASE_URL}/packages`);

    if (!response.ok) {
      throw new Error(
        `Backend responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error fetching packages:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch packages";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
