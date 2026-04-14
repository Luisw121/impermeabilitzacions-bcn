/**
 * components/layout/Footer.tsx
 * Footer completo con info de empresa, certificaciones y links legales
 */

import Link from "next/link";
import { Shield, Phone, Mail, MapPin, ExternalLink, CheckCircle } from "lucide-react";

const services = [
  "Impermeabilització de terrassos",
  "Impermeabilització de façanes",
  "Impermeabilització de cobertes",
  "Humitats per capil·laritat",
  "Impermeabilització de garatges",
  "Impermeabilització de piscines",
];

const zones = [
  "Barcelona Ciutat",
  "L'Hospitalet de Llobregat",
  "Badalona",
  "Cornellà de Llobregat",
  "El Prat de Llobregat",
  "Sabadell",
  "Terrassa",
  "Sant Boi de Llobregat",
];

const certifications = [
  { label: "PRL Certificat", desc: "Prevenció de Riscos Laborals" },
  { label: "REA Registrat", desc: "Registre d'Empreses Acreditades" },
  { label: "ISO 9001", desc: "Sistema de Gestió de Qualitat" },
  { label: "Garantia 10 Anys", desc: "Per escrit en tots els treballs" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300" aria-label="Peu de pàgina">
      {/* Franja superior */}
      <div className="bg-gradient-brand">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Tens una humitat o gotera?
              </h2>
              <p className="text-brand-100">
                T&apos;assessorem sense compromís. Visita tècnica gratuïta a tota Barcelona.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34930000000"}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden />
                Trucar Ara
              </a>
              <Link
                href="#contacte"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Pressupost Gratuït
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cos principal */}
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Columna 1: Empresa */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-brand shadow-md shrink-0">
                <Shield className="w-5 h-5 text-white" aria-hidden />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-base">ImperPro</span>
                <span className="text-xs text-brand-400">Barcelona</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Especialistes en impermeabilització i tractament d&apos;humitats a Barcelona
              i l&apos;àrea metropolitana des de 2005. Treballs amb garantia per escrit.
            </p>

            {/* Dades de contacte */}
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34930000000"}`}
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-brand-900 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-brand-400" aria-hidden />
                  </div>
                  {process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34 93 000 00 00"}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "info@impermeabilitzacionsbcn.cat"}`}
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-brand-900 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-brand-400" aria-hidden />
                  </div>
                  {process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "info@impermeabilitzacionsbcn.cat"}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <div className="p-1.5 rounded-lg bg-slate-800 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" aria-hidden />
                </div>
                Barcelona i àrea metropolitana
              </li>
            </ul>
          </div>

          {/* Columna 2: Serveis */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Serveis
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#serveis"
                    className="flex items-start gap-2 text-sm hover:text-white transition-colors group"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5 group-hover:text-brand-400" aria-hidden />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Zones */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Zones d&apos;actuació
            </h3>
            <ul className="space-y-2.5">
              {zones.map((zone) => (
                <li key={zone} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" aria-hidden />
                  {zone}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Certificacions */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Certificacions i Garanties
            </h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.label}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
                >
                  {/* Placeholder logo — substituir per imatge real */}
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-brand-400" aria-hidden />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{cert.label}</p>
                    <p className="text-slate-500 text-xs">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Horari */}
            <div className="mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-white text-sm font-semibold mb-1">Horari d&apos;atenció</p>
              <p className="text-slate-400 text-xs">Dl – Dv: 8:00 – 18:00</p>
              <p className="text-slate-400 text-xs">Urgències: 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Franja inferior */}
      <div className="border-t border-slate-800">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {currentYear} ImperPro Barcelona. Tots els drets reservats. NIF: B-XXXXXXXX
            </p>
            <nav className="flex items-center gap-4" aria-label="Links legals">
              <Link href="/politica-privacitat" className="hover:text-slate-300 transition-colors">
                Política de Privacitat
              </Link>
              <Link href="/avis-legal" className="hover:text-slate-300 transition-colors">
                Avís Legal
              </Link>
              <Link href="/cookies" className="hover:text-slate-300 transition-colors">
                Cookies
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
