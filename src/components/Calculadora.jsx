"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, UtensilsCrossed, ShowerHead, Flame } from "lucide-react";

export default function Calculadora() {
  const [data, setData] = useState({
    kmCarro: 0,
    carneSemana: 0,
    banhoMin: 0,
    energia: 0,
  });

  const totalImpact = Math.round(
    data.kmCarro * 0.2 +
      data.carneSemana * 2 +
      data.banhoMin * 0.5 +
      data.energia * 1.5
  );

  const getBarColor = () => {
    if (totalImpact < 40) return "bg-[var(--ecodoa-primary)]";
    if (totalImpact < 80) return "bg-[var(--ecodoa-light-olive)]";
    if (totalImpact < 120) return "bg-[var(--ecodoa-accent)]";
    if (totalImpact < 160) return "bg-orange-400";
    return "bg-[var(--ecodoa-alert)]";
  };

  const ecoNivel =
    totalImpact < 40
      ? "Impacto Muito Baixo: Estás a viver de forma exemplar. Continua a inspirar outros!"
      : totalImpact < 80
      ? "Impacto Baixo: Pequenas ações, grande diferença. Mantém o foco sustentável!"
      : totalImpact < 120
      ? "Impacto Moderado: Estás no bom caminho, mas há espaço para melhorar."
      : totalImpact < 160
      ? "Impacto Elevado: Reduz um pouco o consumo e vais sentir o resultado rapidamente."
      : "Impacto Muito Alto: Está na hora de repensar hábitos e fazer mudanças pelo planeta.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-6 py-24 bg-[var(--ecodoa-bg)]"
    >
      <h2 className="text-4xl font-bold text-[var(--ecodoa-primary)] mb-10 text-center">
        Calcula o teu Impacto
      </h2>

      <div className="flex flex-col gap-10">
        {[
          {
            icon: Car,
            key: "kmCarro",
            label: "Km de carro por dia",
            min: 0,
            max: 50,
          },
          {
            icon: UtensilsCrossed,
            key: "carneSemana",
            label: "Refeições com carne por semana",
            min: 0,
            max: 50,
          },
          {
            icon: ShowerHead,
            key: "banhoMin",
            label: "Minutos de banho por dia",
            min: 0,
            max: 50,
          },
          {
            icon: Flame,
            key: "energia",
            label: "Horas de eletricidade por dia",
            min: 0,
            max: 50,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-center gap-6 px-2 sm:px-6"
          >
            <div className="flex items-center gap-3 w-64">
              <item.icon className="w-6 h-6 text-[var(--ecodoa-primary)]" />
              <span className="font-medium text-[var(--ecodoa-text)]">
                {item.label}
              </span>
            </div>
            <input
              type="range"
              min={item.min}
              max={item.max}
              value={data[item.key]}
              onChange={(e) =>
                setData({ ...data, [item.key]: parseInt(e.target.value) })
              }
              className="w-full accent-[var(--ecodoa-olive)] cursor-pointer"
            />
            <span className="text-[var(--ecodoa-primary)] font-semibold">
              {data[item.key]}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-6xl font-extrabold text-[var(--ecodoa-accent)] mb-3">
          {totalImpact}
        </p>
        <p className="text-lg text-[var(--ecodoa-text)]/80 mb-8">{ecoNivel}</p>

        <div className="relative w-full max-w-xl mx-auto h-4 bg-[var(--ecodoa-soft)]/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min((totalImpact / 200) * 100, 100)}%`,
            }}
            transition={{ duration: 1 }}
            className={`absolute left-0 top-0 h-full rounded-full ${getBarColor()} shadow-sm`}
          ></motion.div>
        </div>

        <div className="flex justify-between max-w-xl mx-auto text-xs text-[var(--ecodoa-text)]/60 mt-2">
          <span>Baixo</span>
          <span>Médio</span>
          <span>Alto</span>
        </div>
      </div>
    </motion.section>
  );
}
