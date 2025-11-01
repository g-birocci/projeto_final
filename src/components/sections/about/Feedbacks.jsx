"use client";

import { motion } from "framer-motion";

export default function Feedbacks() {
  const feedbacks = [
    {
      nome: "Carla, 32 anos",
      texto:
        "Recebi roupas e brinquedos pelo EcoDoa. Foi mais do que uma doação, foi um gesto de esperança. A energia das pessoas envolvidas me fez sentir acolhida e vista.",
    },
    {
      nome: "Rui, 47 anos",
      texto:
        "Doei ferramentas antigas que estavam guardadas há anos. Hoje, elas ajudam uma oficina comunitária. Saber que algo simples pôde gerar tanto impacto me transformou.",
    },
    {
      nome: "Inês, 24 anos",
      texto:
        "Ver o impacto direto das doações me fez acreditar no poder das pequenas ações. O EcoDoa me mostrou que cuidar do outro também é cuidar do planeta.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 px-6 bg-white text-[var(--ecodoa-secondary)]"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-[var(--ecodoa-primary)] mb-3">
          Vozes que Inspiram
        </h2>
        <p className="text-base text-[var(--ecodoa-secondary)]/80 max-w-md mx-auto leading-relaxed">
          Histórias reais de quem viveu o impacto da solidariedade.
        </p>
      </div>

      <div className="flex flex-col gap-10 max-w-2xl mx-auto">
        {feedbacks.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative text-left"
          >
            <blockquote className="border-l-4 border-[var(--ecodoa-accent)] pl-5">
              <p className="text-lg italic text-[var(--ecodoa-secondary)]/90 leading-relaxed">
                “{f.texto}”
              </p>
            </blockquote>

            <p className="mt-4 text-[var(--ecodoa-primary)] font-semibold text-sm tracking-wide">
              — {f.nome}
            </p>

            <div className="absolute -left-1 top-5 w-2 h-2 bg-[var(--ecodoa-accent)] rounded-full"></div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
