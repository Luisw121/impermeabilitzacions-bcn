/**
 * app/(auth)/login/page.tsx
 * Pàgina de login — Magic Link via email (NextAuth v5)
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Àrea Client — Accés",
  description: "Accedeix a l'àrea privada per veure els teus pressupostos, factures i fotos d'obra.",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ verify?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // Si ja està autenticat, redirigir al dashboard
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-brand shadow-md mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Àrea Client</h1>
          <p className="text-slate-600 mt-1 text-sm">ImperPro Barcelona</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-card border border-slate-200 p-8">
          {/* Estat: Email enviat */}
          {params.verify ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Revisa el teu correu!
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                T&apos;hem enviat un enllaç d&apos;accés al teu correu electrònic.
                Fes clic a l&apos;enllaç per accedir a la teva àrea privada.
              </p>
              <p className="text-slate-500 text-xs mt-3">
                No has rebut l&apos;email? Revisa la carpeta de spam.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Accedeix al teu compte
                </h2>
                <p className="text-slate-600 text-sm">
                  Introdueix el teu email i t&apos;enviarem un enllaç d&apos;accés
                  instantani. Sense contrasenya.
                </p>
              </div>

              {/* Error d'autenticació */}
              {params.error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Error d&apos;autenticació. Torna-ho a intentar.
                </div>
              )}

              {/* Formulari de login */}
              <LoginForm />

              <p className="text-center text-xs text-slate-500 mt-4">
                Només els clients amb pressupost aprovat tenen accés.{" "}
                <a href="/#contacte" className="text-brand-600 hover:underline">
                  Sol·licita pressupost
                </a>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          <a href="/" className="hover:text-slate-600 transition-colors">
            ← Tornar a la web
          </a>
        </p>
      </div>
    </div>
  );
}
