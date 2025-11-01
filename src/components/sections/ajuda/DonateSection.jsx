"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoarEcoModal from "@/components/sections/about/DoarEcoModal";
import { Sparkles, HeartHandshake } from "lucide-react";

export default function DonateSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== SEÇÃO DE DOAÇÃO ===== */}
      <section className="relative overflow-hidden bg-[var(--ecodoa-primary)] text-white py-24 px-6 text-center">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('/img/leaves-bg.svg')] opacity-10 bg-cover bg-center"
        />

        <div className="relative max-w-3xl mx-auto z-10">
          {/* Ícone principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="bg-[var(--ecodoa-accent)]/20 p-4 rounded-full shadow-inner">
              <HeartHandshake className="w-8 h-8 text-[var(--ecodoa-accent)]" />
            </div>
          </motion.div>

          {/* Título e texto */}
          {/* Título e texto */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold mb-4 tracking-tight"
          >
            Ajuda-nos a manter o EcoDoa vivo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[var(--ecodoa-soft)] mb-10 leading-relaxed"
          >
            Cada contribuição mantém o projeto ativo e faz o bem continuar a circular.
            Apoia esta comunidade solidária e sustentável.
          </motion.p>

          {/* BOTÃO QUE ABRE O MODAL */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)} // 🔥 Abre o modal
            className="inline-flex items-center justify-center gap-2 
                       bg-[var(--ecodoa-accent)] text-[var(--ecodoa-secondary)] font-semibold px-10 py-4 
                       rounded-2xl shadow-md hover:bg-[var(--ecodoa-light-olive)] transition-all duration-200"
          >
            <Sparkles className="w-5 h-5 text-[var(--ecodoa-secondary)]" />
            Apoiar o EcoDoa
          </motion.button>
        </div>
      </section>

      {/* MODAL DE DOAÇÃO */}
      <AnimatePresence>
        {open && <DoarEcoModal isOpen={open} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
