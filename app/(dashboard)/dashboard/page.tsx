import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Link from "next/link";
import {
  FileText, Receipt, Shield, Clock, CheckCircle,
  ImageIcon, Phone, Download, ExternalLink,
} from "lucide-react";
import SignOutButton from "./SignOutButton";

// ── Dades de demostració ────────────────────────────────────────────────────
const MOCK_BUDGETS = [
  {
    id: "1",
    reference: "PRES-2025-0042",
    serviceType: "Impermeabilització de terrassa transitable",
    address: "C/ Provença, 234, 4t 2a",
    city: "Barcelona",
    amount: 340000,
    status: "accepted" as const,
    pdfUrl: "#",
    createdAt: new Date("2025-03-10"),
    visitDate: new Date("2025-03-12"),
  },
  {
    id: "2",
    reference: "PRES-2025-0078",
    serviceType: "Tractament d'humitats per capil·laritat — soterrani",
    address: "Av. Diagonal, 87, local",
    city: "Barcelona",
    amount: 185000,
    status: "sent" as const,
    pdfUrl: "#",
    createdAt: new Date("2025-04-01"),
    visitDate: new Date("2025-04-03"),
  },
  {
    id: "3",
    reference: "PRES-2025-0091",
    serviceType: "Impermeabilització de coberta plana amb grava",
    address: "C/ Major, 12, esc. B",
    city: "L'Hospitalet de Llobregat",
    amount: null,
    status: "pending" as const,
    pdfUrl: null,
    createdAt: new Date("2025-04-10"),
    visitDate: null,
  },
];

const MOCK_INVOICES = [
  {
    id: "1",
    reference: "FAC-2025-0019",
    budgetRef: "PRES-2025-0042",
    amount: 340000,
    paid: true,
    paidAt: new Date("2025-03-28"),
    pdfUrl: "#",
  },
];

const MOCK_PHOTOS = [
  { id: "1", phase: "before", caption: "Estat inicial — eflorescències i filtracions", date: "12 mar 2025" },
  { id: "2", phase: "during", caption: "Aplicació primera capa membrana líquida Sika", date: "18 mar 2025" },
  { id: "3", phase: "during", caption: "Reforç perimetral juntes i boneres", date: "19 mar 2025" },
  { id: "4", phase: "after", caption: "Resultat final — acabat impermeabilitzat", date: "21 mar 2025" },
];

const STATUS_CONFIG = {
  pending:  { label: "Pendent visita", color: "text-amber-700",  bg: "bg-amber-50",   border: "border-amber-200",  dot: "bg-amber-500" },
  sent:     { label: "Enviat",         color: "text-brand-700",  bg: "bg-brand-50",   border: "border-brand-200",  dot: "bg-brand-500" },
  accepted: { label: "Acceptat",       color: "text-emerald-700",bg: "bg-emerald-50", border: "border-emerald-200",dot: "bg-emerald-500" },
  rejected: { label: "Rebutjat",       color: "text-red-700",    bg: "bg-red-50",     border: "border-red-200",    dot: "bg-red-500" },
  invoiced: { label: "Facturat",       color: "text-violet-700", bg: "bg-violet-50",  border: "border-violet-200", dot: "bg-violet-500" },
} as const;

const PHASE_CONFIG = {
  before: { label: "Abans",  bg: "bg-slate-100",   text: "text-slate-700" },
  during: { label: "Durant", bg: "bg-amber-100",   text: "text-amber-700" },
  after:  { label: "Després",bg: "bg-emerald-100", text: "text-emerald-700" },
} as const;

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("ca-ES", { style: "currency", currency: "EUR" }).format(cents / 100);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ca-ES", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const pendingCount  = MOCK_BUDGETS.filter(b => b.status === "pending").length;
  const acceptedCount = MOCK_BUDGETS.filter(b => b.status === "accepted").length;
  const unpaidCount   = MOCK_INVOICES.filter(i => !i.paid).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-brand shrink-0">
              <Shield className="w-4 h-4 text-white" aria-hidden />
            </div>
            <span className="font-bold text-slate-900 text-sm">ImperPro BCN</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="hidden sm:inline text-slate-500 text-sm">Àrea Client</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold uppercase tracking-wide">
              Demo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900">{session.name}</p>
              <p className="text-xs text-slate-400">{session.email}</p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-5xl">
        {/* Salutació */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Benvingut, {session.name.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-500 text-sm">
            Aquí trobaràs els teus pressupostos, factures i el seguiment fotogràfic de les obres.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Pressupostos",       value: MOCK_BUDGETS.length, icon: FileText,    color: "text-brand-600",   bg: "bg-brand-50" },
            { label: "Pendents visita",    value: pendingCount,        icon: Clock,       color: "text-amber-600",   bg: "bg-amber-50" },
            { label: "Treballs acceptats", value: acceptedCount,       icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Factures pendents",  value: unpaidCount,         icon: Receipt,     color: "text-violet-600",  bg: "bg-violet-50" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`p-2 rounded-xl ${bg} shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} aria-hidden />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* ── Pressupostos ── */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-brand-600" aria-hidden />
                Pressupostos
              </h2>
              <span className="text-xs text-slate-400">{MOCK_BUDGETS.length} total</span>
            </div>

            <div className="divide-y divide-slate-50">
              {MOCK_BUDGETS.map((b) => {
                const s = STATUS_CONFIG[b.status];
                return (
                  <div key={b.id} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[11px] font-mono text-slate-400">{b.reference}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${s.bg} ${s.color} ${s.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden />
                            {s.label}
                          </span>
                        </div>
                        <p className="font-medium text-slate-900 text-sm leading-tight truncate">{b.serviceType}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{b.address} · {b.city}</p>
                        {b.visitDate && (
                          <p className="text-xs text-slate-400 mt-1">
                            Visita: {formatDate(b.visitDate)}
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0 space-y-1">
                        {b.amount ? (
                          <p className="font-bold text-slate-900 text-sm">{formatCurrency(b.amount)}</p>
                        ) : (
                          <p className="text-xs text-slate-400 italic">Pendent</p>
                        )}
                        <p className="text-xs text-slate-400">{formatDate(b.createdAt)}</p>
                        {b.pdfUrl && b.pdfUrl !== "#" ? (
                          <a href={b.pdfUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline"
                            aria-label={`Descarregar PDF ${b.reference}`}>
                            <Download className="w-3 h-3" aria-hidden />PDF
                          </a>
                        ) : b.pdfUrl === "#" ? (
                          <span className="inline-flex items-center gap-1 text-xs text-brand-400 cursor-default">
                            <Download className="w-3 h-3" aria-hidden />PDF
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Columna lateral ── */}
          <div className="space-y-4">
            {/* Factures */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-violet-600" aria-hidden />
                  Factures
                </h2>
              </div>
              <div className="divide-y divide-slate-50">
                {MOCK_INVOICES.map((inv) => (
                  <div key={inv.id} className="px-4 py-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400">{inv.reference}</p>
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(inv.amount)}</p>
                      {inv.paidAt && (
                        <p className="text-xs text-slate-400">Pagada {formatDate(inv.paidAt)}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${inv.paid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {inv.paid ? "✓ Pagada" : "Pendent"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fotos d'obra */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-slate-600" aria-hidden />
                  Fotos de l&apos;obra
                </h2>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                {MOCK_PHOTOS.map((photo) => {
                  const ph = PHASE_CONFIG[photo.phase as keyof typeof PHASE_CONFIG];
                  return (
                    <div key={photo.id} className="relative rounded-xl overflow-hidden bg-slate-100 aspect-square flex flex-col justify-end">
                      {/* Placeholder de foto — substituir per <Image> real */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-slate-400" aria-hidden />
                      </div>
                      <div className="relative z-10 p-1.5">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${ph.bg} ${ph.text}`}>
                          {ph.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 pb-3">
                <p className="text-xs text-slate-400 text-center">
                  {MOCK_PHOTOS.length} fotos · Terrassa Provença 234
                </p>
              </div>
            </div>

            {/* Contacte ràpid */}
            <div className="bg-gradient-brand rounded-2xl p-4 text-white">
              <p className="font-semibold text-sm mb-0.5">Necessites ajuda?</p>
              <p className="text-white/60 text-xs mb-3">Resposta garantida en menys de 2h.</p>
              <a
                href={`tel:+34930000000`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4" aria-hidden />
                Trucar ara
              </a>
            </div>
          </div>
        </div>

        {/* Nota demo */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <p className="text-amber-800 text-xs">
            <strong>Mode demostració</strong> — Les dades mostrades són fictícies.
            Quan connectis la base de dades NeonDB, aquí apareixeran les dades reals dels teus clients.
          </p>
        </div>
      </main>
    </div>
  );
}
