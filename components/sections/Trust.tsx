"use client";

/**
 * components/sections/Trust.tsx
 * Secció de confiança: anys d'experiència, garanties, certificacions, testimonis
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Award,
  Clock,
  Star,
  Quote,
  Building2,
  Wrench,
} from "lucide-react";
import Image from "next/image";

const GUARANTEES = [
  {
    icon: Clock,
    title: "+20 Anys d'Experiència",
    description:
      "Des de 2005 impermeabilitzant edificis a Barcelona i l'àrea metropolitana. El coneixement acumulat és la nostra millor eina.",
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: Award,
    title: "Garantia 10 Anys per Escrit",
    description:
      "Lliurem un certificat de garantia amb cada obra. Si hi ha qualsevol problema, tornem sense cost addicional.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Shield,
    title: "Materials de 1ª Qualitat",
    description:
      "Treballem amb Sika, Mapei i Weber — les marques líderes del sector. Mai materials de segona categoria.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Wrench,
    title: "Equip Tècnic Propi",
    description:
      "No subcontractem. El nostre equip de paletes especialitzats és l'únic que toca la teva obra, garantint qualitat constant.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const CERTIFICATIONS = [
  {
    label: "PRL",
    fullName: "Prevenció de Riscos Laborals",
    desc: "Tots els operaris certificats",
  },
  {
    label: "REA",
    fullName: "Registre Empreses Acreditades",
    desc: "Empresa registrada i acreditada",
  },
  {
    label: "ISO 9001",
    fullName: "Gestió de la Qualitat",
    desc: "Sistema de qualitat certificat",
  },
  {
    label: "Sika Partner",
    fullName: "Sika Certified Contractor",
    desc: "Aplicador homologat Sika",
  },
];

const TESTIMONIALS = [
  {
    name: "Jordi Martínez",
    role: "President Comunitat de Veïns, L'Eixample",
    rating: 5,
    text: "Portàvem anys amb goteres al soterrani i cap empresa ens havia donat una solució definitiva. ImperPro va diagnosticar el problema en 20 minuts i la solució va funcionar. Un any després, tot perfecte.",
    building: "Edifici dels anys 60, c/ Provença",
  },
  {
    name: "Àngels Romeu",
    role: "Propietària, Badalona",
    rating: 5,
    text: "Van impermeabilitzar la meva terrassa sense haver d'aixecar les rajoles. El sistema líquid que van aplicar és increïble. Neta, ràpida i efectiva. Molt recomanable.",
    building: "Àtic, Badalona Centre",
  },
  {
    name: "Carlos Puig",
    role: "Administrador de Finques",
    rating: 5,
    text: "Treballo amb ImperPro per a totes les comunitats que gestiono. Puntuals, nets i amb una qualitat de feina constant. El seguiment post-obra és excel·lent.",
    building: "Gestió de 12 comunitats",
  },
];

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="nosaltres"
      aria-labelledby="trust-heading"
      className="section-padding bg-white scroll-mt-nav"
    >
      <div className="container" ref={ref}>
        {/* Capçalera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="badge-brand mb-4">Per què triar-nos</span>
          <h2
            id="trust-heading"
            className="section-title mb-4"
          >
            La <span className="text-gradient">confiança</span> que mereix{" "}
            <br className="hidden sm:block" />
            el teu edifici
          </h2>
          <p className="section-subtitle mx-auto text-center">
            No oferim preus més baixos que la competència. Oferim la certesa que
            la feina estarà ben feta i durarà anys.
          </p>
        </motion.div>

        {/* Garanties — Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {GUARANTEES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-card-hover transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${item.bg} mb-4`}
                >
                  <Icon className={`w-7 h-7 ${item.color}`} aria-hidden />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Certificacions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-50 rounded-3xl p-8 mb-16"
        >
          <h3 className="text-center font-bold text-slate-900 mb-2 text-lg">
            Certificacions i Acreditacions
          </h3>
          <p className="text-center text-sm text-slate-500 mb-8">
            Les comunitats de veïns i els administradors de finques ens exigeixen
            els millors avals. Els tenim tots.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card transition-shadow"
              >
                {/* Placeholder logo — substituir per logo PNG real */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center mb-3">
                  <span className="text-xs font-bold text-brand-700 text-center leading-tight px-1">
                    {cert.label}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 mb-1">
                  {cert.fullName}
                </p>
                <p className="text-xs text-slate-500">{cert.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Nota sobre logos reals */}
          <p className="text-center text-xs text-slate-400 mt-6 italic">
            * Substituir els placeholders pels logos oficials de PRL, REA, ISO i Sika
          </p>
        </motion.div>

        {/* Testimonis */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-center font-bold text-slate-900 mb-2 text-lg">
            Què diuen els nostres clients
          </h3>
          <p className="text-center text-sm text-slate-500 mb-8">
            +180 ressenyes verificades a Google · Puntuació 4.9/5
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300"
                aria-label={`Testimoni de ${testimonial.name}`}
              >
                {/* Cometes decoratives */}
                <Quote
                  className="absolute top-4 right-4 w-8 h-8 text-slate-100"
                  aria-hidden
                />

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4" aria-label={`Valoració ${testimonial.rating} estrelles`}>
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-slate-700 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                {/* Persona */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" aria-hidden />
                      <p className="text-xs text-slate-400">{testimonial.building}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
