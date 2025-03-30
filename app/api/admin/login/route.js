// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();
// const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Store this securely

// export async function POST(req) {
//     try {
//         const { name, password } = await req.json();

//         console.log({ name, password })

//         // Find admin by name
//         const admin = await prisma.admin.findUnique({ where: { name } });

//         if (!admin) {
//             return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ adminId: admin.id, name: admin.name }, SECRET_KEY, { expiresIn: "1h" });

//         // Store token in HTTP-only cookie
//         const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
//         response.cookies.set("token", token, { httpOnly: true, secure: true });

//         return response;
//     } catch (error) {
//         console.error("Login error:", error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // ✅ Correct way to set cookies

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "SECRET"; // Replace with an env variable

export async function POST(req) {
    try {
        const { name, password } = await req.json();

        console.log({ name, password });

        // Find admin by name
        const admin = await prisma.admin.findUnique({ where: { name } });

        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ adminId: admin.id, name: admin.name }, SECRET_KEY, { expiresIn: "1h" });

        // ✅ Set HTTP-only cookie correctly using `cookies()`
        cookies().set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "Strict",
            maxAge: 3600, // 1 hour
            path: "/",
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
