"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronDown } from "lucide-react";

export default function EcoDoaAssistant() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  const faqs = [
    {
      pergunta: "Como funciona o EcoDoa?",
      resposta:
        "O EcoDoa conecta quem quer doar com quem precisa. Faça trocas solidárias.",
    },
    {
      pergunta: "Preciso pagar para usar?",
      resposta:
        "Não! O uso é gratuito. O foco é promover solidariedade e circularidade.",
    },
    {
      pergunta: "O que posso doar?",
      resposta:
        "Itens em bom estado, como roupas, móveis, brinquedos, utensílios, entre outros.",
    },
  ];

  return (
    <div className="absolute bottom-0 right-0 w-full h-0">
      {/* === BOTÃO AMARELO PEQUENO NO CANTO === */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Dúvidas Frequentes"
        className="
          absolute bottom-5 right-5
          bg-[#FBE25D] text-[#1E2D2F]
          p-3 rounded-full shadow-md
          hover:bg-[#FAE46C]
          transition-all duration-200
          z-30
        "
      >
        {open ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
      </motion.button>

      {/* === CAIXA AMARELA DE FAQ === */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.25 }}
            className="
              absolute bottom-16 right-5
              w-[82vw] max-w-[280px]
              bg-[#FBE25D] text-[#1E2D2F]
              rounded-2xl shadow-xl
              border border-[#f5dc3c]/60
              z-20
              overflow-hidden
            "
          >
            {/* Cabeçalho */}
            <div className="px-4 py-2 flex justify-between items-center border-b border-[#e2c91d]/40">
              <h3 className="font-bold text-sm">Assistente EcoDoa</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-[#1E2D2F]/70 hover:text-[#1E2D2F] transition"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-3 max-h-[35vh] overflow-y-auto text-sm">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-[#e2c91d]/30 py-2">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex justify-between items-center text-left font-semibold"
                  >
                    {faq.pergunta}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-300 ${
                        activeIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {activeIndex === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-xs text-[#1E2D2F]/80 leading-relaxed"
                      >
                        {faq.resposta}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
