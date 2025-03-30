import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { name, password } = await req.json();

        // Check if admin already exists
        const existingAdmin = await prisma.admin.findUnique({ where: { name } });
        if (existingAdmin) {
            return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        await prisma.admin.create({
            data: {
                name,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "Signup successful. Please log in." }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
