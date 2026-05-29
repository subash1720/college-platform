import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const totalColleges = await prisma.college.count();
  const totalUsers = await prisma.user.count();

  return NextResponse.json({
    totalColleges,
    totalUsers,
  });
}