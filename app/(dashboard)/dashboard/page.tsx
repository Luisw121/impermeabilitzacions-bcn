/**
 * app/(dashboard)/dashboard/page.tsx
 * Dashboard client — resum de pressupostos, factures i obres
 */

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { budgets, invoices } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  FileText,
  Image as ImageIcon,
  Receipt,
  Shield,
  LogOut,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import SignOutButton from "./SignOutButton";

const STATUS_CONFIG = {
  pending: { label: "Pendent", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  sent: { label: "Enviat", icon: FileText, color: "text-brand-600", bg: "bg-brand-50", border: "border-brand-200" },
  accepted: { label: "Acceptat", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  rejected: { label: "Rebutjat", icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  invoiced: { label: "Facturat", icon: Receipt, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200" },
} as const;

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Obtenir pressupostos i factures de l'usuari
  const [userBudgets, userInvoices] = await Promise.all([
    db
      .select()
      .from(budgets)
      .where(eq(budgets.userId, session.user.id as string))
      .orderBy(desc(budgets.createdAt))
      .limit(10),
    db
      .select()
      .from(invoices)
      .where(eq(invoices.userId, session.user.id as string))
      .orderBy(desc(invoices.createdAt))
      .limit(5),
  ]);

  const pendingBudgets = userBudgets.filter((b) => b.status === "pending").length;
  const acceptedBudgets = userBudgets.filter((b) => b.status === "accepted").length;
  const pendingInvoices = userInvoices.filter((i) => !i.paid).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-brand">
              <Shield className="w-4 h-4 text-white" aria-hidden />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">ImperPro BCN</span>
              <span className="hidden sm:inline text-slate-400 text-sm"> · </span>
              <span className="hidden sm:inline text-slate-500 text-sm">Àrea Client</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900">{session.user.name ?? "Client"}</p>
              <p className="text-xs text-slate-500">{session.user.email}</p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Benvinguda */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Benvingut, {session.user.name?.split(" ")[0] ?? "Client"} 👋
          </h1>
          <p className="text-slate-600">
            Aquí pots consultar l&apos;estat dels teus pressupostos, factures i fotos d&apos;obra.
          </p>
        </div>

        {/* Stats ràpides */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Pressupostos totals", value: userBudgets.length, icon: FileText, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Pendents de resposta", value: pendingBudgets, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Treballs acceptats", value: acceptedBudgets, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Factures pendents", value: pendingInvoices, icon: Receipt, color: "text-violet-600", bg: "bg-violet-50" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-3"
              >
                <div className={`p-2.5 rounded-xl ${stat.bg} shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} aria-hidden />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pressupostos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-600" aria-hidden />
                  Els meus pressupostos
                </h2>
                <Link
                  href="/dashboard/pressupostos"
                  className="text-xs text-brand-600 hover:underline font-medium"
                >
                  Veure tots
                </Link>
              </div>

              {userBudgets.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" aria-hidden />
                  <p className="text-sm">Encara no tens cap pressupost.</p>
                  <Link href="/#contacte" className="text-brand-600 hover:underline text-sm mt-1 inline-block">
                    Sol·licita el primer pressupost
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {userBudgets.map((budget) => {
                    const statusConf = STATUS_CONFIG[budget.status];
                    const StatusIcon = statusConf.icon;
                    return (
                      <div
                        key={budget.id}
                        className="p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-mono text-slate-500">
                                {budget.reference}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusConf.bg} ${statusConf.color} ${statusConf.border}`}
                              >
                                <StatusIcon className="w-3 h-3" aria-hidden />
                                {statusConf.label}
                              </span>
                            </div>
                            <p className="font-medium text-slate-900 text-sm truncate">
                              {budget.serviceType}
                            </p>
                            <p className="text-xs text-slate-500">
                              {budget.address}, {budget.city}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            {budget.amount && (
                              <p className="font-bold text-slate-900 text-sm">
                                {formatCurrency(budget.amount)}
                              </p>
                            )}
                            <p className="text-xs text-slate-400">
                              {formatDate(budget.createdAt)}
                            </p>
                            {budget.pdfUrl && (
                              <a
                                href={budget.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline mt-1"
                                aria-label={`Descarregar PDF del pressupost ${budget.reference}`}
                              >
                                <FileText className="w-3 h-3" aria-hidden />
                                PDF
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-4">
            {/* Factures */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                  <Receipt className="w-4 h-4 text-violet-600" aria-hidden />
                  Factures
                </h2>
                <Link
                  href="/dashboard/factures"
                  className="text-xs text-brand-600 hover:underline font-medium"
                >
                  Veure totes
                </Link>
              </div>

              {userInvoices.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  <p className="text-sm">Cap factura disponible.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {userInvoices.map((invoice) => (
                    <div key={invoice.id} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-mono text-slate-500">{invoice.reference}</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatCurrency(invoice.amount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            invoice.paid
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {invoice.paid ? "Pagada" : "Pendent"}
                        </span>
                        {invoice.pdfUrl && (
                          <a
                            href={invoice.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Descarregar factura ${invoice.reference}`}
                            className="p-1 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accés ràpid fotos */}
            <Link
              href="/dashboard/fotos"
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-card transition-all group"
              aria-label="Veure fotos de les obres"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-brand-50 transition-colors">
                <ImageIcon className="w-5 h-5 text-slate-600 group-hover:text-brand-600 transition-colors" aria-hidden />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 text-sm">Fotos de les obres</p>
                <p className="text-xs text-slate-500">Abans, durant i after</p>
              </div>
              <svg
                className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Contacte ràpid */}
            <div className="bg-gradient-brand rounded-2xl p-4 text-white">
              <p className="font-semibold text-sm mb-1">Necessites ajuda?</p>
              <p className="text-white/70 text-xs mb-3">
                El nostre equip tècnic et respon en menys de 2 hores.
              </p>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34930000000"}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium"
                aria-label="Trucar a ImperPro BCN"
              >
                Trucar ara
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
