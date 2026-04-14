"use client";

/**
 * components/sections/Process.tsx
 * Com treballem — pas a pas des de la visita fins al certificat
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ClipboardList,
  Search,
  FileText,
  HardHat,
  Camera,
  BadgeCheck,
  ArrowRight,
  Phone,
} from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    icon: Phone,
    title: "Contacte i Primera Consulta",
    description:
      "Truques o omples el formulari. En menys de 2 hores et truquem per entendre la teva situació i acordar la visita tècnica.",
    duration: "El mateix dia",
    color: "bg-brand-600",
    lightColor: "bg-brand-50",
    textColor: "text-brand-600",
  },
  {
    number: "02",
    icon: Search,
    title: "Visita Tècnica Gratuïta",
    description:
      "Un tècnic especialitzat visita l'obra per diagnosticar l'origen del problema, l'abast dels treballs i el millor sistema per solucionar-ho.",
    duration: "24-48 hores",
    color: "bg-cyan-600",
    lightColor: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
  {
    number: "03",
    icon: FileText,
    title: "Pressupost Detallat",
    description:
      "Rebràs un pressupost clar, sense lletra petita, amb materials especificats, temps d'execució i condicions de garantia.",
    duration: "24-48 hores",
    color: "bg-violet-600",
    lightColor: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    number: "04",
    icon: HardHat,
    title: "Execució de l'Obra",
    description:
      "El nostre equip propi executa els treballs amb rigor tècnic, minimitzant molèsties als veïns i respectant els terminis acordats.",
    duration: "Según projet",
    color: "bg-amber-600",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    number: "05",
    icon: Camera,
    title: "Reportatge Fotogràfic",
    description:
      "Documentem tot el procés amb fotos de l'abans, durant i el resultat final. Les pujes al teu accés privat com a client.",
    duration: "Inclòs",
    color: "bg-emerald-600",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    number: "06",
    icon: BadgeCheck,
    title: "Certificat de Garantia",
    description:
      "Lliurem un certificat de garantia de 10 anys per escrit, registrat amb les dades de l'obra. Seguretat total per als teus veïns.",
    duration: "10 anys garantia",
    color: "bg-brand-800",
    lightColor: "bg-brand-50",
    textColor: "text-brand-800",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="proces"
      aria-labelledby="process-heading"
      className="section-padding bg-slate-900 scroll-mt-nav overflow-hidden"
    >
      <div className="container" ref={ref}>
        {/* Capçalera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4">
            El nostre procés
          </span>
          <h2
            id="process-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Com treballem,{" "}
            <span className="text-brand-300">pas a pas</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Transparència total des del primer contacte fins a l&apos;entrega del
            certificat. Sense sorpreses, sense costos ocults.
          </p>
        </motion.div>

        {/* Línia de temps */}
        <div className="relative">
          {/* Línia vertical connectora (desktop) */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-600/0 via-brand-600/30 to-brand-600/0"
            aria-hidden
          />

          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex gap-4 lg:gap-5 ${
                    isLeft ? "lg:pr-8 lg:text-right lg:flex-row-reverse" : "lg:pl-8"
                  }`}
                >
                  {/* Número + Icona */}
                  <div className="flex flex-col items-center lg:items-start gap-1 shrink-0">
                    <div
                      className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center shadow-lg shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" aria-hidden />
                    </div>
                    <span className="text-2xl font-black text-slate-700 leading-none mt-1">
                      {step.number}
                    </span>
                  </div>

                  {/* Contingut */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-start gap-2 mb-1 flex-wrap lg:justify-start">
                      <h3 className="text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <span
                        className={`badge ${step.lightColor} ${step.textColor} shrink-0 !text-[10px] mt-0.5`}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Punt connector a la línia vertical (desktop) */}
                  <div
                    className={`hidden lg:block absolute top-4 w-3 h-3 rounded-full ${step.color} border-2 border-slate-900 shadow-md ${
                      isLeft ? "-right-1.5" : "-left-1.5"
                    }`}
                    aria-hidden
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-left">
              <p className="text-white font-semibold">Llest per protegir el teu edifici?</p>
              <p className="text-slate-400 text-sm">
                La visita tècnica és gratuïta i sense compromís
              </p>
            </div>
            <Link
              href="#contacte"
              className="btn-cta shrink-0"
              aria-label="Demanar visita tècnica gratuïta"
            >
              Demanar Visita Gratuïta
              <ArrowRight className="w-5 h-5" aria-hidden />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
