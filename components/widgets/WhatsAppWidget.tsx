"use client";

/**
 * components/widgets/WhatsAppWidget.tsx
 * Botó flotant de WhatsApp — el canal #1 de conversió a Espanya
 * Apareix als 3 segonds d'arribar a la pàgina
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34600000000";
const WA_MESSAGE = encodeURIComponent(
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
    "Hola! M'agradaria demanar un pressupost gratuït per impermeabilització."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const QUICK_REPLIES = [
  "Vull un pressupost gratuït",
  "Tinc una gotera urgent",
  "Impermeabilitzar terrassa",
  "Humitats al soterrani",
];

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Aparèixer als 3 segonds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Tancar el popup però mantenir el botó
  const handleDismiss = () => {
    setIsOpen(false);
    setDismissed(true);
    // Reocultar el popup però mantenir el botó visible
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      aria-label="Contacte per WhatsApp"
    >
      {/* Popup de benvinguda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-72 overflow-hidden"
            role="dialog"
            aria-label="Xat de WhatsApp"
          >
            {/* Capçalera */}
            <div className="bg-[#075E54] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  {/* Icona representativa — substituir per foto real de l'empresa */}
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">ImperPro BCN</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#25D366]" aria-hidden />
                    <p className="text-white/80 text-xs">En línia ara</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tancar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bombe de missatge */}
            <div className="p-4 bg-[#ECE5DD]">
              <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[85%]">
                <p className="text-slate-800 text-sm leading-relaxed">
                  👋 Hola! Sóc l&apos;equip de <strong>ImperPro BCN</strong>.
                </p>
                <p className="text-slate-800 text-sm mt-1 leading-relaxed">
                  Et podem ajudar amb goteres, humitats o qualsevol problema
                  d&apos;impermeabilització.
                </p>
                <p className="text-slate-800 text-sm mt-1">
                  🎁 <strong>Visita tècnica gratuïta</strong> sense compromís!
                </p>
                <p className="text-[10px] text-slate-400 text-right mt-1">
                  Ara · ✓✓
                </p>
              </div>
            </div>

            {/* Respostes ràpides */}
            <div className="p-3 bg-white border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-2 font-medium">
                Respostes ràpides:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((reply) => (
                  <a
                    key={reply}
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(reply)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-xs px-2.5 py-1.5 rounded-full border border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-colors font-medium"
                    aria-label={`Enviar per WhatsApp: ${reply}`}
                  >
                    {reply}
                  </a>
                ))}
              </div>
            </div>

            {/* Botó d'obrir WhatsApp */}
            <div className="p-3 bg-white">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5a] transition-colors"
                aria-label="Obrir WhatsApp"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escriure per WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botó flotant principal */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative"
          >
            {/* Efecte de pols */}
            {!isOpen && (
              <span
                className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"
                aria-hidden
              />
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-whatsapp hover:bg-[#1ebe5a] active:scale-95 transition-all duration-200 flex items-center justify-center"
              aria-label={isOpen ? "Tancar xat WhatsApp" : "Obrir xat WhatsApp"}
              aria-expanded={isOpen}
              aria-haspopup="dialog"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="whatsapp"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Notificació numèrica */}
            {!isOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm"
                aria-hidden
              >
                1
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
