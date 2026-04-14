"use client";

/**
 * components/sections/Contact.tsx
 * Formulari de contacte optimitzat amb validació en temps real (react-hook-form + zod)
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  contactSchema,
  ContactFormData,
  ZONES,
  SERVICES,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error enviant el formulari");

      setStatus("success");
      reset();
      // Reset a idle después de 6 segonds
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contacte"
      aria-labelledby="contact-heading"
      className="section-padding bg-slate-50 scroll-mt-nav"
    >
      <div className="container">
        {/* Capçalera */}
        <div className="text-center mb-12">
          <span className="badge-brand mb-4">Contacte</span>
          <h2 id="contact-heading" className="section-title mb-4">
            Demana el teu{" "}
            <span className="text-gradient">pressupost gratuït</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Respostem en menys de 2 hores en horari laboral. La visita tècnica
            és completament gratuïta i sense cap compromís.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-5xl mx-auto">
          {/* Columna esquerra — Info de contacte */}
          <div className="lg:col-span-2 space-y-6">
            {/* Targetes d'info */}
            {[
              {
                icon: Phone,
                label: "Telèfon",
                value: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34 93 000 00 00",
                href: `tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34930000000"}`,
                sub: "Atenció immediata · Urgències 24h",
              },
              {
                icon: Mail,
                label: "Correu electrònic",
                value: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "info@impermeabilitzacionsbcn.cat",
                href: `mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "info@impermeabilitzacionsbcn.cat"}`,
                sub: "Resposta en menys de 2 hores",
              },
              {
                icon: MapPin,
                label: "Zona d'actuació",
                value: "Barcelona i àrea metropolitana",
                href: null,
                sub: "L'Hospitalet · Badalona · Cornellà",
              },
              {
                icon: Clock,
                label: "Horari",
                value: "Dl – Dv: 8:00 – 18:00",
                href: null,
                sub: "Urgències: disponibles 24/7",
              },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-card transition-all duration-200 group">
                  <div className="p-2.5 rounded-xl bg-brand-50 group-hover:bg-brand-100 transition-colors shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-slate-900 font-semibold text-sm">{item.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            {/* WhatsApp directe */}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34600000000"}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "Hola! Voldria demanar un pressupost gratuït.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full p-4 rounded-2xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5a] active:scale-[0.98] transition-all duration-200 shadow-whatsapp"
              aria-label="Contactar per WhatsApp"
            >
              {/* Icona WhatsApp SVG inline */}
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escriure per WhatsApp
            </a>
          </div>

          {/* Columna dreta — Formulari */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 md:p-8">
              {/* Missatge d'èxit */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Missatge enviat!
                    </h3>
                    <p className="text-slate-600">
                      Et truquem en menys de 2 hores per concretar la visita
                      tècnica gratuïta.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Formulari */}
              {status !== "success" && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label="Formulari de contacte"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Nom */}
                    <div className="sm:col-span-2 md:col-span-1">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Nom i cognoms{" "}
                        <span className="text-red-500" aria-hidden>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Joan Garcia Puig"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={cn(
                          "form-input",
                          errors.name && "border-red-300 focus:ring-red-400",
                          touchedFields.name && !errors.name && "border-emerald-300"
                        )}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Correu electrònic{" "}
                        <span className="text-red-500" aria-hidden>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="joan@exemple.cat"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(
                          "form-input",
                          errors.email && "border-red-300 focus:ring-red-400",
                          touchedFields.email && !errors.email && "border-emerald-300"
                        )}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Telèfon */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Telèfon
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+34 600 000 000"
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={cn(
                          "form-input",
                          errors.phone && "border-red-300 focus:ring-red-400"
                        )}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Zona */}
                    <div>
                      <label
                        htmlFor="zone"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Zona geogràfica{" "}
                        <span className="text-red-500" aria-hidden>*</span>
                      </label>
                      <select
                        id="zone"
                        aria-required="true"
                        aria-invalid={!!errors.zone}
                        aria-describedby={errors.zone ? "zone-error" : undefined}
                        className={cn(
                          "form-input",
                          errors.zone && "border-red-300 focus:ring-red-400"
                        )}
                        {...register("zone")}
                      >
                        <option value="">Selecciona la zona...</option>
                        {ZONES.map((z) => (
                          <option key={z.value} value={z.value}>
                            {z.label}
                          </option>
                        ))}
                      </select>
                      {errors.zone && (
                        <p id="zone-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden />
                          {errors.zone.message}
                        </p>
                      )}
                    </div>

                    {/* Tipus de servei */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="serviceType"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Tipus de servei{" "}
                        <span className="text-red-500" aria-hidden>*</span>
                      </label>
                      <select
                        id="serviceType"
                        aria-required="true"
                        aria-invalid={!!errors.serviceType}
                        aria-describedby={errors.serviceType ? "service-error" : undefined}
                        className={cn(
                          "form-input",
                          errors.serviceType && "border-red-300 focus:ring-red-400"
                        )}
                        {...register("serviceType")}
                      >
                        <option value="">Quin servei necessites?</option>
                        {SERVICES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      {errors.serviceType && (
                        <p id="service-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden />
                          {errors.serviceType.message}
                        </p>
                      )}
                    </div>

                    {/* Missatge */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Descripció del problema{" "}
                        <span className="text-red-500" aria-hidden>*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Explica'ns breument el problema que tens (goteres, humitats, tipus d'edifici, superfície aproximada...)"
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={cn(
                          "form-input resize-none",
                          errors.message && "border-red-300 focus:ring-red-400",
                          touchedFields.message && !errors.message && "border-emerald-300"
                        )}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Privacitat */}
                    <div className="sm:col-span-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          aria-required="true"
                          aria-invalid={!!errors.privacy}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                          {...register("privacy")}
                        />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          He llegit i accepto la{" "}
                          <a
                            href="/politica-privacitat"
                            className="text-brand-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Política de Privacitat
                          </a>{" "}
                          i consent el tractament de les meves dades per a la
                          gestió de la meva sol·licitud.{" "}
                          <span className="text-red-500" aria-hidden>*</span>
                        </span>
                      </label>
                      {errors.privacy && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden />
                          {errors.privacy.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Error general */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden />
                      Hi ha hagut un error. Torna-ho a intentar o truca&apos;ns directament.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-cta w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label={status === "loading" ? "Enviant..." : "Enviar sol·licitud de pressupost"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                        Enviant...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden />
                        Demanar Pressupost Gratuït
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 mt-3">
                    Resposta garantida en menys de 2 hores · Sense compromís · 100% gratuït
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
