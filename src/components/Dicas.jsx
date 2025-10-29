"use client";

import { motion } from "framer-motion";
import { Recycle, Droplets, PlugZap, HeartHandshake, Leaf, BookOpen } from "lucide-react";

export default function Dicas() {
  const dicas = [
    { icon: Recycle, text: "Recicla sempre: o que hoje é lixo pode ser matéria-prima amanhã." },
    { icon: Droplets, text: "Poupa água: banhos curtos e torneiras fechadas fazem diferença." },
    { icon: PlugZap, text: "Usa energia consciente: desliga luzes e aparelhos quando não estiverem em uso." },
    { icon: HeartHandshake, text: "Compra local: apoia quem está perto e reduz o impacto do transporte." },
    { icon: Leaf, text: "Reutiliza: dá nova vida a frascos, roupas, objetos e ideias." },
    { icon: BookOpen, text: "Aprende e partilha: informação é poder — e partilhar é multiplicar impacto." },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">Dicas sustentáveis</h2>
      <div className="space-y-8 max-w-4xl mx-auto text-lg leading-relaxed text-[#1E2D2F]/85">
        {dicas.map((d, i) => (
          <div key={i} className="flex items-start gap-4">
            <d.icon className="w-6 h-6 text-green-600 mt-1" />
            <p>{d.text}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
