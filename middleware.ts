/**
 * middleware.ts — Demo sense NextAuth
 * Protegeix /dashboard comprovant la cookie de sessió
 */

import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/session";

export function middleware(request: NextRequest) {
  const session = request.cookies.get(COOKIE_NAME)?.value;

  if (!session) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
