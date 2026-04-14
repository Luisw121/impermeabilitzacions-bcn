/**
 * app/api/contact/route.ts
 * API Route per al formulari de contacte
 * Desa el missatge a NeonDB i envia email via Resend
 */

import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // 1. Parsejar i validar el body
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dades invàlides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, zone, serviceType, message } = parsed.data;

    // 2. Desar a la base de dades
    await db.insert(contactMessages).values({
      name,
      email,
      phone: phone || null,
      zone,
      serviceType,
      message,
    });

    // 3. Enviar email de notificació a l'empresa
    if (process.env.RESEND_API_KEY && process.env.EMAIL_TO) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "noreply@impermeabilitzacionsbcn.cat",
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `[ImperPro BCN] Nova sol·licitud de pressupost — ${serviceType} — ${zone}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: #1B3A6B; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; font-size: 20px; margin: 0;">
                🔔 Nova sol·licitud de pressupost
              </h1>
            </div>
            <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Nom:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">
                    <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
                  </td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Telèfon:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">
                    <a href="tel:${phone}" style="color: #2563eb;">${phone}</a>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Zona:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${zone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Servei:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${serviceType}</td>
                </tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 12px; margin: 0 0 8px;">Missatge:</p>
                <p style="color: #0f172a; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              <div style="margin-top: 20px; text-align: center;">
                <a href="mailto:${email}?subject=Re: Sol·licitud de pressupost ImperPro BCN"
                   style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; border-radius: 8px; text-decoration: none; font-weight: 600;">
                  Respondre al client
                </a>
              </div>
            </div>
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
              ImperPro BCN · Formulari de contacte web
            </p>
          </div>
        `,
      });

      // 4. Enviar email de confirmació al client
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "noreply@impermeabilitzacionsbcn.cat",
        to: email,
        subject: "Hem rebut la teva sol·licitud — ImperPro BCN",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: #1B3A6B; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 22px; margin: 0;">ImperPro BCN</h1>
              <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">Especialistes en impermeabilització a Barcelona</p>
            </div>
            <div style="background: white; padding: 32px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">
              <h2 style="color: #0f172a; font-size: 18px;">Hola, ${name}! 👋</h2>
              <p style="color: #475569; line-height: 1.6;">
                Hem rebut la teva sol·licitud de pressupost per a <strong>${serviceType}</strong> a la zona de <strong>${zone}</strong>.
              </p>
              <p style="color: #475569; line-height: 1.6;">
                El nostre equip tècnic et contactarà en <strong>menys de 2 hores</strong> en horari laboral per concretar la visita gratuïta.
              </p>
              <div style="margin: 24px 0; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #2563eb;">
                <p style="color: #1d4ed8; font-weight: 600; margin: 0 0 4px;">✓ Visita tècnica gratuïta</p>
                <p style="color: #1d4ed8; font-weight: 600; margin: 0 0 4px;">✓ Pressupost sense compromís</p>
                <p style="color: #1d4ed8; font-weight: 600; margin: 0;">✓ Garantia per escrit 10 anys</p>
              </div>
              <p style="color: #475569; line-height: 1.6;">
                Si tens qualsevol urgència, pots trucar-nos al
                <a href="tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}" style="color: #2563eb; font-weight: 600;">
                  ${process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34 93 000 00 00"}
                </a>
                o escriure'ns per WhatsApp.
              </p>
            </div>
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
              © ${new Date().getFullYear()} ImperPro BCN · Barcelona, Catalunya
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: "Sol·licitud rebuda correctament" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      { error: "Error intern del servidor" },
      { status: 500 }
    );
  }
}
