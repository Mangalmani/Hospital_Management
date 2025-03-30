import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token");

    // If user is not logged in, redirect to /login
    if (!token && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to only the home route
export const config = {
    matcher: ["/"],
};
