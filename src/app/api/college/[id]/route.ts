import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const college = await prisma.college.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!college) {
    return NextResponse.json(
      { message: "College not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(college);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const {
    name,
    location,
    fees,
    rating,
    description,
    imageUrl,
  } = await request.json();

  const updatedCollege = await prisma.college.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      location,
      fees,
      rating: Number(rating),
      description,
      imageUrl,
    },
  });

  return NextResponse.json(updatedCollege);
}