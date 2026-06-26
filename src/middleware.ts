import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "da_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("Missing AUTH_SECRET");

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    if (payload.mustChangePassword && pathname !== "/change-password") {
      return NextResponse.redirect(new URL("/change-password", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
