import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const packageId = searchParams.get("packageId");

  if (!packageId) {
    return NextResponse.json(
      { error: "packageId is required" },
      { status: 400 }
    );
  }

  const departures = await prisma.packageDeparture.findMany({
    where: {
      packageId: Number(packageId),
      status: { not: "cancelled" },
      departureDate: { gte: new Date() },
    },
    orderBy: { departureDate: "asc" },
  });

  return NextResponse.json(departures);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { packageId, departureDate, maxSlots, priceOverride } = body;

  if (!packageId || !departureDate || !maxSlots) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const departure = await prisma.packageDeparture.create({
    data: {
      packageId: Number(packageId),
      departureDate: new Date(departureDate),
      maxSlots: Number(maxSlots),
      priceOverride: priceOverride ? Number(priceOverride) : null,
      status: "available",
    },
  });

  return NextResponse.json(departure, { status: 201 });
}
