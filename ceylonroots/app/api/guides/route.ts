import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const guides = await prisma.guide.findMany({
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });
  return NextResponse.json(guides);
}

export async function POST(request: Request) {
  const body = await request.json();
  const guide = await prisma.guide.create({ data: body });
  return NextResponse.json(guide, { status: 201 });
}
