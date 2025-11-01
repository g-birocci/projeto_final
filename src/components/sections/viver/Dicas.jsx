"use client";

import { motion } from "framer-motion";
import { Recycle, Droplets, PlugZap, HeartHandshake, Leaf, BookOpen } from "lucide-react";

export default function Dicas() {
  const dicas = [
    {
      icon: Recycle,
      text: "O que hoje é lixo pode ser matéria-prima amanhã.",
    },
    {
      icon: Droplets,
      text: "Banhos curtos e torneiras fechadas fazem a diferença.",
    },
    {
      icon: PlugZap,
      text: "Desliga luzes e aparelhos quando não estiverem em uso.",
    },
    {
      icon: HeartHandshake,
      text: "Apoia quem está perto e reduz o impacto do transporte.",
    },
    {
      icon: Leaf,
      text: "Dá nova vida a frascos, roupas, objetos e ideias criativas.",
    },
    {
      icon: BookOpen,
      text: "Informação é poder, e partilhar é multiplicar impacto.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="px-4 py-16 bg-[var(--ecodoa-bg)]" 
    >
      <h2 className="text-3xl font-bold text-[var(--ecodoa-primary)] mb-8 text-center">
        Dicas Sustentáveis
      </h2>

      <p className="text-center text-[var(--ecodoa-text)]/70 mb-12 text-base max-w-full mx-auto">
        Pequenas ações geram grandes mudanças. </p>

      <div className="grid grid-cols-1 gap-8 max-w-full mx-auto text-base leading-relaxed text-[var(--ecodoa-text)]/85"> {/* Ajustado para grid-cols-1 e tamanhos de fonte/gap */}
        {dicas.map((d, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="flex items-start gap-4 group"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--ecodoa-light-olive)]/25 text-[var(--ecodoa-primary)] group-hover:bg-[var(--ecodoa-accent)]/40 transition-all duration-300">
              <d.icon className="w-5 h-5" />
            </div>
            <p className="group-hover:text-[var(--ecodoa-primary)] transition-colors duration-300">
              {d.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
