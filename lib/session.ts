/**
 * lib/session.ts
 * Gestió de sessió demo — cookie simple, sense base de dades
 */

import { cookies } from "next/headers";

const COOKIE_NAME = "demo-session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 dies

export interface DemoSession {
  email: string;
  name: string;
}

export async function getSession(): Promise<DemoSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf-8")) as DemoSession;
  } catch {
    return null;
  }
}

export function encodeSession(session: DemoSession): string {
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export { COOKIE_NAME, COOKIE_MAX_AGE };
