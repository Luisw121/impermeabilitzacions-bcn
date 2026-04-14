"use client";

/**
 * components/sections/Hero.tsx
 * Hero section — impacte visual, proposta de valor i CTA
 * Imatge de fons: substituir /images/hero/edifici-barcelona.jpg per foto real
 */

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowDown,
} from "lucide-react";

const STATS = [
  { value: "+20", label: "Anys d'experiència" },
  { value: "+1.200", label: "Projectes completats" },
  { value: "10", label: "Anys de garantia" },
  { value: "98%", label: "Clients satisfets" },
];

const TRUST_BADGES = [
  "Visita tècnica gratuïta",
  "Pressupost sense compromís",
  "Garantia per escrit",
];

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="inici"
      aria-label="Secció principal"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Imatge de fons ── */}
      <div className="absolute inset-0 z-0">
        {/* Substituir per: <Image src="/images/hero/edifici-barcelona.jpg" ... />  */}
        <div
          className="absolute inset-0 bg-slate-900"
          aria-hidden
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.3) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(29,78,216,0.2) 0%, transparent 50%)
            `,
          }}
        />
        {/* Patró de quadrícula decoratiu */}
        <div
          className="absolute inset-0 opacity-[0.06] bg-grid-pattern"
          aria-hidden
        />
        {/* Gradient overlay inferior */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/60 to-transparent"
          aria-hidden
        />
      </div>

      {/* ── Contingut ── */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Columna esquerra */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge de localització */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" aria-hidden />
                Barcelona · L&apos;Hospitalet · Badalona · Àrea Metropolitana
              </span>
            </motion.div>

            {/* Títol principal */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              Protegim el teu{" "}
              <span className="relative">
                <span className="text-brand-300">edifici</span>
                <span
                  className="absolute bottom-1 left-0 right-0 h-0.5 bg-brand-400/60 rounded-full"
                  aria-hidden
                />
              </span>{" "}
              de les{" "}
              <span className="text-brand-200">humitats</span>{" "}
              per sempre
            </motion.h1>

            {/* Subtítol */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl"
            >
              Especialistes en impermeabilització de terrassos, façanes i cobertes
              a Barcelona i l&apos;àrea metropolitana. Més de 20 anys protegint edificis
              com el teu amb{" "}
              <strong className="text-white font-semibold">
                garantia per escrit de 10 anys
              </strong>
              .
            </motion.p>

            {/* Badges de confiança */}
            <motion.ul
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-8"
              aria-label="Avantatges principals"
            >
              {TRUST_BADGES.map((badge) => (
                <li
                  key={badge}
                  className="flex items-center gap-1.5 text-sm text-white/90 font-medium"
                >
                  <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" aria-hidden />
                  {badge}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="#contacte"
                className="btn-cta text-base px-7 py-3.5 shadow-cta"
                aria-label="Demanar pressupost gratuït"
              >
                Demanar Pressupost Gratuït
                <ChevronRight className="w-5 h-5" aria-hidden />
              </Link>

              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34930000000"}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base border-2 border-white/30 text-white hover:border-white hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
                aria-label="Trucar per telèfon"
              >
                <Phone className="w-5 h-5" aria-hidden />
                {process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34 93 000 00 00"}
              </a>
            </motion.div>

            {/* Reviews */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mt-8 pt-8 border-t border-white/10"
            >
              <div className="flex -space-x-2" aria-hidden>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {["JM", "AR", "CP", "LT"][i - 1]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5" aria-label="Valoració 5 estrelles">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400">
                  <span className="text-white font-semibold">4.9/5</span> · +180
                  ressenyes a Google
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna dreta — Estadístiques */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="relative bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.1] transition-colors"
              >
                <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                {/* Accent decoratiu */}
                <div
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-brand-600/30 border border-brand-500/20"
                  aria-hidden
                />
              </motion.div>
            ))}

            {/* Card de materials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="col-span-2 bg-brand-600/20 backdrop-blur-sm border border-brand-500/30 rounded-2xl p-6"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-600/30 shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-300" aria-hidden />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">
                    Materials homologats de 1ª qualitat
                  </p>
                  <p className="text-sm text-slate-400">
                    Treballem exclusivament amb Sika, Mapei i Weber —
                    les millors marques del sector per resultats duradors.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/40"
        aria-hidden
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Descobreix
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
