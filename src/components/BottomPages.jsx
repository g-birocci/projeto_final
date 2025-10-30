"use client";

import { motion } from "framer-motion";

export default function BottomPages() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-white text-center border-t border-green-100"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Continua a jornada
      </h2>

      <p className="text-[#1E2D2F]/80 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
        O impacto começa com um gesto, mas continua com ação.  
        Descobre como viver de forma mais sustentável ou saiba sobre parceiros e como conseguir ajuda.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Vida Sustentável */}
        <motion.a
          href="/viver"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-2xl border-2 border-green-600 text-green-700 font-semibold text-lg hover:bg-green-50 transition-all shadow-sm hover:shadow-md"
        >
         Explorar Vida Sustentável
        </motion.a>

        {/* Pontos de Ajuda */}
        <motion.a
          href="/ajuda"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-2xl border-2 border-green-600 text-green-700 font-semibold text-lg hover:bg-green-50 transition-all shadow-sm hover:shadow-md"
        >
        Encontrar Pontos de Ajuda
        </motion.a>
      </div>
    </motion.section>
  );
}
