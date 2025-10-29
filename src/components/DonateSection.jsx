"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoarEcoDoaModal from "@/components/DoarEcoModal";
import { Sparkles, HeartHandshake } from "lucide-react";

export default function DonateSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-green-600 text-white py-24 px-6 text-center">
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
            <div className="bg-white/20 p-4 rounded-full">
              <HeartHandshake className="w-8 h-8 text-[#DBF227]" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4 tracking-tight"
          >
            Ajuda-nos a manter o EcoDoa vivo
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/90 mb-10 leading-relaxed"
          >
            Cada contribuição mantém o projeto ativo e faz o bem continuar a circular.  
            Apoia esta comunidade solidária e sustentável 🌱
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 
                       bg-white text-green-700 font-semibold px-10 py-4 
                       rounded-2xl shadow-lg hover:bg-green-50 
                       transition-all duration-200"
          >
            <Sparkles className="w-5 h-5 text-green-700" />
            Apoiar o EcoDoa
          </motion.button>
        </div>
      </section>

      {/* Modal de doação */}
      <AnimatePresence>
        {open && <DoarEcoDoaModal isOpen={open} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
