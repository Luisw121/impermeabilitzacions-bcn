/**
 * app/api/auth/login/route.ts
 * Login demo — qualsevol email accedeix al dashboard (sense BD)
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { encodeSession, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/session";

const schema = z.object({
  email: z.string().email(),
});

// Usuari demo per a qualsevol email
function getDemoName(email: string): string {
  const local = email.split("@")[0];
  return local.charAt(0).toUpperCase() + local.slice(1).replace(/[._-]/g, " ");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Email no vàlid" }, { status: 400 });
  }

  const session = {
    email: parsed.data.email,
    name: getDemoName(parsed.data.email),
  };

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}
