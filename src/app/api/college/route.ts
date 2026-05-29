import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
  name,
  location,
  fees,
  rating,
  description,
  imageUrl,
} = await req.json();

    const college = await prisma.college.create({
      data: {
        name,
        location,
        fees,
        rating: Number(rating),
        description,
        imageUrl,
      },
    });

    return NextResponse.json(college, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const colleges = await prisma.college.findMany();

  return NextResponse.json(colleges);
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.college.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "College deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}