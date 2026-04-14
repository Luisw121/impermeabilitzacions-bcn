/**
 * lib/validations.ts
 * Esquemas Zod para validación del formulario de contacto y auth
 */

import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nom ha de tenir almenys 2 caràcters")
    .max(100, "El nom és massa llarg"),
  email: z.string().email("Correu electrònic no vàlid"),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Telèfon no vàlid"
    )
    .optional()
    .or(z.literal("")),
  zone: z.enum([
    "barcelona-ciutat",
    "lhospitalet",
    "badalona",
    "sabadell",
    "terrassa",
    "cornella",
    "sant-boi",
    "el-prat",
    "viladecans",
    "gava",
    "castelldefels",
    "sitges",
    "altres",
  ]),
  serviceType: z.enum([
    "terrassa",
    "coberta",
    "fachada",
    "capil·laritat",
    "garatge",
    "piscina",
    "altres",
  ]),
  message: z
    .string()
    .min(10, "El missatge ha de tenir almenys 10 caràcters")
    .max(2000, "El missatge és massa llarg"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Has d'acceptar la política de privacitat",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().email("Correu electrònic no vàlid"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Labels per al formulari
export const ZONES = [
  { value: "barcelona-ciutat", label: "Barcelona Ciutat" },
  { value: "lhospitalet", label: "L'Hospitalet de Llobregat" },
  { value: "badalona", label: "Badalona" },
  { value: "sabadell", label: "Sabadell" },
  { value: "terrassa", label: "Terrassa" },
  { value: "cornella", label: "Cornellà de Llobregat" },
  { value: "sant-boi", label: "Sant Boi de Llobregat" },
  { value: "el-prat", label: "El Prat de Llobregat" },
  { value: "viladecans", label: "Viladecans" },
  { value: "gava", label: "Gavà" },
  { value: "castelldefels", label: "Castelldefels" },
  { value: "sitges", label: "Sitges" },
  { value: "altres", label: "Altres zones de Catalunya" },
] as const;

export const SERVICES = [
  { value: "terrassa", label: "Impermeabilització de terrasses" },
  { value: "coberta", label: "Impermeabilització de cobertes/teulades" },
  { value: "fachada", label: "Impermeabilització de façanes" },
  { value: "capil·laritat", label: "Tractament d'humitats per capil·laritat" },
  { value: "garatge", label: "Impermeabilització de garatges/soterranis" },
  { value: "piscina", label: "Impermeabilització de piscines" },
  { value: "altres", label: "Altres serveis" },
] as const;
