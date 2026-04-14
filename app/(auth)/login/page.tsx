import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "./LoginForm";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Àrea Client — Accés",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-brand shadow-md mb-4">
            <Shield className="w-6 h-6 text-white" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Àrea Client</h1>
          <p className="text-slate-500 mt-1 text-sm">ImperPro Barcelona · Demo</p>
        </div>

        {/* Banner demo */}
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
          <p className="text-amber-800 text-xs font-medium">
            🚧 Mode demostració — introdueix qualsevol email per entrar
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-card border border-slate-200 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Accedeix al teu compte</h2>
            <p className="text-slate-600 text-sm">
              Consulta els teus pressupostos, factures i fotos d&apos;obra.
            </p>
          </div>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          <a href="/" className="hover:text-slate-600 transition-colors">← Tornar a la web</a>
        </p>
      </div>
    </div>
  );
}
