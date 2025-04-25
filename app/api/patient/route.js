import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const patients = await prisma.patient.findMany();
        return NextResponse.json({ patients });
    } catch (error) {
        console.error("Database fetch error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}