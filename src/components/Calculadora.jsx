"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, UtensilsCrossed, ShowerHead, Flame } from "lucide-react";

export default function Calculadora() {
  const [data, setData] = useState({ kmCarro: 10, carneSemana: 3, banhoMin: 10, energia: 5 });

  const totalImpact = Math.round(
    data.kmCarro * 0.2 + data.carneSemana * 2 + data.banhoMin * 0.5 + data.energia * 1.5
  );

  const ecoNivel =
    totalImpact < 10
      ? "Impacto Baixo — Estás a viver de forma exemplar."
      : totalImpact < 25
      ? "Impacto Moderado — Há espaço para melhorias."
      : "Impacto Alto — Pequenas mudanças farão uma grande diferença.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-6 py-24"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">
        Calcula o teu impacto
      </h2>

      <div className="flex flex-col gap-10">
        {[
          { icon: Car, key: "kmCarro", label: "Km de carro por dia", min: 0, max: 50 },
          { icon: UtensilsCrossed, key: "carneSemana", label: "Refeições com carne por semana", min: 0, max: 14 },
          { icon: ShowerHead, key: "banhoMin", label: "Minutos de banho por dia", min: 1, max: 20 },
          { icon: Flame, key: "energia", label: "Horas de eletricidade por dia", min: 1, max: 24 },
        ].map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3 w-64">
              <item.icon className="w-6 h-6 text-green-600" />
              <span className="font-medium text-[#1E2D2F]">{item.label}</span>
            </div>
            <input
              type="range"
              min={item.min}
              max={item.max}
              value={data[item.key]}
              onChange={(e) => setData({ ...data, [item.key]: parseInt(e.target.value) })}
              className="w-full accent-green-600 cursor-pointer"
            />
            <span className="text-green-700 font-semibold">{data[item.key]}</span>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-6xl font-extrabold text-green-700 mb-3">{totalImpact}</p>
        <p className="text-lg text-[#1E2D2F]/80 mb-8">{ecoNivel}</p>

        <div className="relative w-full max-w-xl mx-auto h-3 bg-green-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((totalImpact / 30) * 100, 100)}%` }}
            transition={{ duration: 1 }}
            className="absolute left-0 top-0 h-full bg-green-600"
          ></motion.div>
        </div>
      </div>
    </motion.section>
  );
}
