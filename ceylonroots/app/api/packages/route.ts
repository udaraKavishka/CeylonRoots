import { prisma } from "@/app/lib/prisma";
import { formatTravelPackage } from "@/app/lib/formatters";
import { NextResponse } from "next/server";

const packageInclude = {
  destinations: true,
  highlights: true,
  gallery: true,
  includes: true,
  excludes: true,
  itineraryDays: {
    include: {
      accommodation: true,
      meals: true,
      activities: true,
    },
    orderBy: { dayNumber: "asc" as const },
  },
};

export async function GET() {
  try {
    const packages = await prisma.travelPackage.findMany({
      include: packageInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(packages.map(formatTravelPackage));
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      imageUrl,
      durationDays,
      price,
      rating,
      reviewCount,
      destinations = [],
      highlights = [],
      gallery = [],
      includes = [],
      excludes = [],
      itineraryDays = [],
    } = body;

    const pkg = await prisma.travelPackage.create({
      data: {
        title,
        description,
        imageUrl,
        durationDays,
        price,
        rating,
        reviewCount,
        destinations: {
          create: destinations.map((d: string) => ({ destination: d })),
        },
        highlights: {
          create: highlights.map((h: string) => ({ highlight: h })),
        },
        gallery: {
          create: gallery.map((url: string) => ({ url })),
        },
        includes: {
          create: includes.map((item: string) => ({ item })),
        },
        excludes: {
          create: excludes.map((item: string) => ({ item })),
        },
        itineraryDays: {
          create: itineraryDays.map(
            (day: {
              dayNumber: number;
              title?: string;
              mainTown?: string;
              description?: string;
              accommodation?: string[];
              meals?: string[];
              activities?: { name: string }[];
            }) => ({
              dayNumber: day.dayNumber,
              title: day.title,
              mainTown: day.mainTown,
              description: day.description,
              accommodation: {
                create: (day.accommodation || []).map((name: string) => ({
                  name,
                })),
              },
              meals: {
                create: (day.meals || []).map((meal: string) => ({ meal })),
              },
              activities: {
                create: (day.activities || []).map(
                  (act: { name: string }) => ({ name: act.name })
                ),
              },
            })
          ),
        },
      },
      include: packageInclude,
    });

    return NextResponse.json(formatTravelPackage(pkg), { status: 201 });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}
