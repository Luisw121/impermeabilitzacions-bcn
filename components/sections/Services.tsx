"use client";

/**
 * components/sections/Services.tsx
 * Targetes de serveis especialitzats amb animació d'entrada
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers,
  Building2,
  Droplets,
  Home,
  Waves,
  Car,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "terrassa",
    icon: Home,
    title: "Impermeabilització de Terrassos",
    shortDesc:
      "Solució definitiva per a terrassos plans, transités i no transités. Acabem amb les goteres al pis inferior.",
    features: [
      "Diagnosi gratuïta de l'estat actual",
      "Sistemes líquids i làmines asfàltiques",
      "Compatible amb rajoles i paviments",
      "Garantia 10 anys per escrit",
    ],
    color: "from-blue-500 to-brand-700",
    bgLight: "bg-blue-50",
    accentColor: "text-blue-600",
    borderHover: "hover:border-blue-200",
    popular: true,
  },
  {
    id: "fachada",
    icon: Building2,
    title: "Impermeabilització de Façanes",
    shortDesc:
      "Protecció integral de façanes d'edificis residencials i industrials contra humitats i filtracions.",
    features: [
      "Hidrofugació de façanes de pedra i maó",
      "Tractament de juntes i fissures",
      "Pintures elàstiques impermeabilitzants",
      "Restauració de morters",
    ],
    color: "from-slate-600 to-slate-800",
    bgLight: "bg-slate-50",
    accentColor: "text-slate-600",
    borderHover: "hover:border-slate-200",
    popular: false,
  },
  {
    id: "coberta",
    icon: Layers,
    title: "Impermeabilització de Cobertes",
    shortDesc:
      "Especialistes en cobertes planes i inclinades. Teulades de teules, plaques i cobertes industrials.",
    features: [
      "Cobertes planes amb grava o acabat vist",
      "Sistemes PVC, TPO i EPDM",
      "Làmines asfàltiques amb armadura",
      "Cobertes ajardinades (green roofs)",
    ],
    color: "from-brand-600 to-brand-900",
    bgLight: "bg-brand-50",
    accentColor: "text-brand-600",
    borderHover: "hover:border-brand-200",
    popular: false,
  },
  {
    id: "capil·laritat",
    icon: Droplets,
    title: "Humitats per Capil·laritat",
    shortDesc:
      "Eliminem la humitat per capil·laritat als murs de soterranis, plantes baixes i mitgeres.",
    features: [
      "Injecció de resines expansives",
      "Barreres químiques impermeabilitzants",
      "Tractament de murs i soleres",
      "Dessalinització de paraments",
    ],
    color: "from-cyan-500 to-cyan-700",
    bgLight: "bg-cyan-50",
    accentColor: "text-cyan-600",
    borderHover: "hover:border-cyan-200",
    popular: false,
  },
  {
    id: "garatge",
    icon: Car,
    title: "Garatges i Soterranis",
    shortDesc:
      "Impermeabilització de soleres i murs de garatges amb sistemes d'alta resistència al trànsit rodat.",
    features: [
      "Resines epoxi per a trànsit pesat",
      "Injeccions en juntes estructurals",
      "Drenatges perimetrals",
      "Tractament d'eflorescències",
    ],
    color: "from-gray-600 to-gray-800",
    bgLight: "bg-gray-50",
    accentColor: "text-gray-600",
    borderHover: "hover:border-gray-200",
    popular: false,
  },
  {
    id: "piscina",
    icon: Waves,
    title: "Piscines i Dipòsits",
    shortDesc:
      "Impermeabilització i rehabilitació de piscines, dipòsits d'aigua i elements enterrats.",
    features: [
      "Morters impermeabilitzants cristal·lins",
      "Pintures especials per immersió",
      "Reparació de fissures estructurals",
      "Apta per a aigua potable",
    ],
    color: "from-teal-500 to-teal-700",
    bgLight: "bg-teal-50",
    accentColor: "text-teal-600",
    borderHover: "hover:border-teal-200",
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="serveis"
      aria-labelledby="serveis-heading"
      className="section-padding bg-slate-50 scroll-mt-nav"
    >
      <div className="container" ref={ref}>
        {/* Capçalera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="badge-brand mb-4">Els nostres serveis</span>
          <h2
            id="serveis-heading"
            className="section-title mb-4"
          >
            Solucions d&apos;impermeabilització{" "}
            <span className="text-gradient">a mida</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Cada obra és un repte únic. Analitzem la teva situació i apliquem
            el sistema més adequat per a una protecció màxima i duradora.
          </p>
        </motion.div>

        {/* Grid de targetes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                variants={cardVariants}
                className={cn(
                  "service-card group cursor-pointer",
                  service.borderHover
                )}
                aria-label={service.title}
              >
                {/* Badge "Popular" */}
                {service.popular && (
                  <span className="absolute -top-3 left-6 badge bg-brand-600 text-white shadow-sm">
                    Més demanat
                  </span>
                )}

                {/* Icona */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5",
                    "bg-gradient-to-br text-white shadow-md",
                    service.color
                  )}
                >
                  <Icon className="w-6 h-6" aria-hidden />
                </div>

                {/* Títol */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                  {service.title}
                </h3>

                {/* Descripció */}
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                {/* Llista de features */}
                <ul className="space-y-2 mb-6" aria-label={`Característiques de ${service.title}`}>
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle
                        className={cn("w-4 h-4 shrink-0 mt-0.5", service.accentColor)}
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Acció */}
                <Link
                  href="#contacte"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-semibold transition-all group/link",
                    service.accentColor
                  )}
                  aria-label={`Demanar pressupost per ${service.title}`}
                >
                  Demanar pressupost
                  <ArrowRight
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                    aria-hidden
                  />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        {/* CTA inferior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">
            No trobes el teu cas? Contacta&apos;ns i t&apos;assessorem sense compromís.
          </p>
          <Link href="#contacte" className="btn-cta">
            Consulta gratuïta ara
            <ArrowRight className="w-5 h-5" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
