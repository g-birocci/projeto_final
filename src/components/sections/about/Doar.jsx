"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";

export default function ChamadaDoacao() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 flex flex-col items-center justify-center text-center bg-white px-4"
    >
      <h2 className="text-2xl font-bold text-[var(--ecodoa-primary)] mb-4">
        Pronto para fazer parte dessa corrente do bem?
      </h2>
      <p className="text-[#1E2D2F]/80 mb-10 max-w-xl">
        Cada doação transforma não só quem recebe, mas também quem doa.  
        Juntos, criamos um ciclo de empatia e sustentabilidade.
      </p>

      <motion.a
        href="/" icon={<HeartHandshake />} label="Doar" 
        whileHover={{ scale: 1.08, backgroundColor: "#DBF227" }}
        whileTap={{ scale: 0.95 }}
        className="bg-[var(--ecodoa-primary)] text-white font-semibold px-10 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
      >
        Quero Doar
      </motion.a>
    </motion.section>
  );
}
