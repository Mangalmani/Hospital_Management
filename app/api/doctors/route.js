import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const doctors = await prisma.doctor.findMany();
        return NextResponse.json(doctors, { status: 200 });
    } catch (error) {
        console.error("Database fetch error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
