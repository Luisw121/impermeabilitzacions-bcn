/**
 * app/api/auth/[...nextauth]/route.ts
 * Handler de NextAuth v5 — exporta GET i POST
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;

// Configuració per Vercel Edge
export const runtime = "nodejs";
