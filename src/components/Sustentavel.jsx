"use client";

import { motion } from "framer-motion";

export default function Sustentavel() {
  return (
    <section className="px-6 py-28 max-w-6xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-green-700 mb-6"
      >
        Viver Sustentável
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg text-[#1E2D2F]/80 max-w-2xl mx-auto leading-relaxed"
      >
        Ser sustentável é pensar no amanhã com as ações de hoje.  
        Este espaço foi criado para inspirar hábitos conscientes e mostrar como  
        cada pequena escolha pode gerar um grande impacto positivo.
      </motion.p>
    </section>
  );
}
