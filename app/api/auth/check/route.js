import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const token = cookies().get("token"); // Read token from HTTP-only cookies

    if (!token) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({ isAuthenticated: true }, { status: 200 });
}
