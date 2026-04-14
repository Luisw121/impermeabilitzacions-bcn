/**
 * app/page.tsx
 * Landing page principal — composició de totes les seccions
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Trust from "@/components/sections/Trust";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import WhatsAppWidget from "@/components/widgets/WhatsAppWidget";

export default function HomePage() {
  return (
    <>
      {/* Skip to main content — accessibilitat */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-600 focus:text-white focus:font-medium"
      >
        Anar al contingut principal
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <Services />
        <Trust />
        <Process />
        <Contact />
      </main>

      <Footer />

      {/* Widget flotant WhatsApp */}
      <WhatsAppWidget />
    </>
  );
}
