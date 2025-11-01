"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoarEcoModal from "@/components/sections/ajuda/DoarEcoModal";
import { Sparkles, HeartHandshake } from "lucide-react";

export default function DonateSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--ecodoa-primary)] text-white py-24 px-6 text-center">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('/img/leaves-bg.svg')] opacity-10 bg-cover bg-center"
        />

        <div className="relative max-w-3xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="flex justify-center mt-2 mb-4">
              <Image
                src="/img/EcoDoa.svg"
                alt="Logo EcoDoa"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </motion.div>

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

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 
                       bg-[var(--ecodoa-accent)] text-[var(--ecodoa-secondary)] font-semibold px-10 py-4 
                       rounded-2xl shadow-md hover:bg-[var(--ecodoa-light-olive)] transition-all duration-200"
          >
            Apoiar o EcoDoa
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DoarEcoModal isOpen={open} onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
