"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Sustentavel() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--ecodoa-bg)] via-white to-[var(--ecodoa-green)] py-28 px-6 flex flex-col items-center justify-center text-center">
      
      {/* DECORAÇÃO DE FUNDO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/img/leaves-bg.svg')] bg-cover bg-center"
      ></motion.div>

      {/* CONTEÚDO */}
      <div className="relative max-w-full mx-auto z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold text-[var(--ecodoa-primary)] mb-8 drop-shadow-sm"
        >
          Viver Sustentável
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg sm:text-xl text-[var(--ecodoa-text)]/85 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Ser sustentável é pensar no amanhã com as ações de hoje.  
          Este espaço foi criado para inspirar hábitos conscientes.
        </motion.p>
      </div>
    </section>
  );
}
