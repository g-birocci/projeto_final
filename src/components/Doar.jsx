"use client";

import { motion } from "framer-motion";

export default function Doar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 flex flex-col items-center justify-center text-center bg-white"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Pronto para fazer parte dessa corrente do bem?
      </h2>
      <p className="text-[#1E2D2F]/80 mb-10 max-w-xl">
        Cada doação transforma não só quem recebe, mas também quem doa.  
        Juntos, criamos um ciclo de empatia e sustentabilidade.
      </p>

      <motion.a
        href="/doacao"
        whileHover={{ scale: 1.08, backgroundColor: "#16a34a" }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-600 text-white font-semibold px-10 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
      >
        Quero Doar
      </motion.a>
    </motion.section>
  );
}
