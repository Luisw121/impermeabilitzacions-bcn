"use client";

/**
 * components/layout/Navbar.tsx
 * Navbar sticky con scroll effect, CTA y menú mobile
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#serveis", label: "Serveis" },
  { href: "#nosaltres", label: "Per què nosaltres" },
  { href: "#proces", label: "Com treballem" },
  { href: "#contacte", label: "Contacte" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al hacer clic en enlace
  const handleNavClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
            : "bg-transparent"
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Impermeabilitzacions BCN — Inici"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-brand shadow-md group-hover:scale-105 transition-transform duration-200">
                <Shield className="w-5 h-5 text-white" aria-hidden />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    "font-bold text-base tracking-tight transition-colors",
                    isScrolled ? "text-slate-900" : "text-white"
                  )}
                >
                  ImperPro
                </span>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isScrolled ? "text-brand-600" : "text-brand-200"
                  )}
                >
                  Barcelona
                </span>
              </div>
            </Link>

            {/* Nav Desktop */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegació principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    isScrolled
                      ? "text-slate-700 hover:text-brand-600 hover:bg-brand-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Accions dreta */}
            <div className="hidden md:flex items-center gap-3">
              {/* Telèfon */}
              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34930000000"}`}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-slate-700 hover:text-brand-600"
                    : "text-white/90 hover:text-white"
                )}
                aria-label="Trucar ara"
              >
                <Phone className="w-4 h-4" aria-hidden />
                <span className="hidden lg:inline">
                  {process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34 93 000 00 00"}
                </span>
              </a>

              {/* Àrea client */}
              <Link
                href="/login"
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200",
                  isScrolled
                    ? "border-slate-300 text-slate-700 hover:border-brand-400 hover:text-brand-700"
                    : "border-white/30 text-white hover:border-white hover:bg-white/10"
                )}
              >
                Àrea Client
              </Link>

              {/* CTA principal */}
              <Link
                href="#contacte"
                className="btn-cta text-sm px-5 py-2.5"
              >
                Pressupost Gratuït
              </Link>
            </div>

            {/* Botó menú mobile */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                "md:hidden p-2 rounded-xl transition-colors",
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={isMobileOpen ? "Tancar menú" : "Obrir menú"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menú Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
            >
              {/* Header drawer */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-brand">
                    <Shield className="w-4 h-4 text-white" aria-hidden />
                  </div>
                  <span className="font-bold text-slate-900">ImperPro BCN</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Tancar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 p-6 space-y-1" aria-label="Menú mobile">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleNavClick}
                      className="flex items-center px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                >
                  <Link
                    href="/login"
                    onClick={handleNavClick}
                    className="flex items-center px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  >
                    Àrea Client
                  </Link>
                </motion.div>
              </nav>

              {/* Footer drawer */}
              <div className="p-6 border-t border-slate-100 space-y-3">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34930000000"}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                >
                  <Phone className="w-5 h-5 text-brand-600" aria-hidden />
                  {process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34 93 000 00 00"}
                </a>
                <Link
                  href="#contacte"
                  onClick={handleNavClick}
                  className="btn-cta w-full justify-center"
                >
                  Pressupost Gratuït
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
