/**
 * app/layout.tsx
 * Layout raíz — SEO global, fonts, providers
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1B3A6B",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.impermeabilitzacionsbcn.cat"),
  title: {
    default: "Impermeabilitzacions Barcelona | Terrassos, Façanes i Cobertes",
    template: "%s | Impermeabilitzacions BCN",
  },
  description:
    "Experts en impermeabilització a Barcelona, L'Hospitalet i Badalona. Terrassos, façanes, cobertes i humitats per capil·laritat. Pressupost gratuït. Garantia 10 anys.",
  keywords: [
    "impermeabilitzacions Barcelona",
    "impermeabilización Barcelona",
    "impermeabilitzar terrassa Barcelona",
    "humitats capil·laritat Barcelona",
    "impermeabilitzar façana",
    "impermeabilitzar coberta",
    "impermeabilitzacions L'Hospitalet",
    "impermeabilitzacions Badalona",
    "empresa impermeabilitzacions Catalunya",
    "pressupost impermeabilització gratuït",
  ],
  authors: [{ name: "Impermeabilitzacions BCN" }],
  creator: "Impermeabilitzacions BCN",
  publisher: "Impermeabilitzacions BCN",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ca_ES",
    alternateLocale: ["es_ES"],
    url: "https://www.impermeabilitzacionsbcn.cat",
    siteName: "Impermeabilitzacions BCN",
    title: "Impermeabilitzacions Barcelona | Terrassos, Façanes i Cobertes",
    description:
      "Experts en impermeabilització a Barcelona i àrea metropolitana. Visita tècnica gratuïta. Garantia 10 anys. Pressupost sense compromís.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Impermeabilitzacions BCN — Protegim el teu edifici",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impermeabilitzacions Barcelona | Pressupost Gratuït",
    description:
      "Experts en impermeabilitzar terrassos, façanes i cobertes a Barcelona. Garantia 10 anys.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.impermeabilitzacionsbcn.cat",
    languages: {
      "ca-ES": "https://www.impermeabilitzacionsbcn.cat",
      "es-ES": "https://www.impermeabilitzacionsbcn.cat/es",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

// Schema.org JSON-LD per a negoci local
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.impermeabilitzacionsbcn.cat",
  name: "Impermeabilitzacions BCN",
  description:
    "Empresa especialitzada en impermeabilització de terrassos, façanes, cobertes i tractament d'humitats a Barcelona i àrea metropolitana.",
  url: "https://www.impermeabilitzacionsbcn.cat",
  telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE,
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressRegion: "Catalunya",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "41.3851",
    longitude: "2.1734",
  },
  areaServed: [
    "Barcelona",
    "L'Hospitalet de Llobregat",
    "Badalona",
    "Sabadell",
    "Terrassa",
    "Cornellà de Llobregat",
    "Sant Boi de Llobregat",
  ],
  serviceType: [
    "Impermeabilització de terrassos",
    "Impermeabilització de façanes",
    "Impermeabilització de cobertes",
    "Tractament d'humitats per capil·laritat",
    "Impermeabilització de garatges",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serveis d'impermeabilització",
  },
  openingHours: "Mo-Fr 08:00-18:00",
  priceRange: "€€",
  image: "https://www.impermeabilitzacionsbcn.cat/images/og-image.jpg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect per a fonts i analytics */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
