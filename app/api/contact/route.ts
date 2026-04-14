/**
 * app/api/contact/route.ts
 * Versió demo — valida i retorna èxit sense guardar res
 */

import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dades invàlides", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Demo: simular un retard de procés
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      { success: true, message: "Sol·licitud rebuda correctament" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Error intern" }, { status: 500 });
  }
}
