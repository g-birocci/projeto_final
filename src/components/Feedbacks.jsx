"use client";

import { motion } from "framer-motion";

export default function Feedbacks() {
  const feedbacks = [
    { nome: "Carla, 32 anos", texto: "Recebi roupas e brinquedos pelo EcoDoa. Foi mais do que uma doação — foi um gesto de esperança." },
    { nome: "Rui, 47 anos", texto: "Doei ferramentas antigas que estavam guardadas há anos. Hoje, elas ajudam uma oficina comunitária!" },
    { nome: "Inês, 24 anos", texto: "Ver o impacto direto das doações me fez acreditar no poder das pequenas ações." },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-green-50"
    >
      <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
        Vozes que Inspiram
      </h2>
<<<<<<< HEAD
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 px-6">
=======
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
>>>>>>> main
        {feedbacks.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-3xl shadow-md p-8"
          >
            <p className="text-[#1E2D2F]/80 italic mb-6 text-lg leading-relaxed">“{f.texto}”</p>
            <p className="text-green-700 font-semibold">{f.nome}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
