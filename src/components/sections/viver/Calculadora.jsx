"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, UtensilsCrossed, ShowerHead, Flame, Shirt } from "lucide-react";

export default function Calculadora() {
  const [data, setData] = useState({
    kmCarro: 0,
    carneSemana: 0,
    banhoMin: 0,
    energia: 0,
    modaDescarte: 0, 
  });

  const fatores = {
    kmCarro: 0.2,
    carneSemana: 2,
    banhoMin: 0.5,
    energia: 1.5,
    modaDescarte: 3, // Cada peça representa ~3kg de CO₂
  };

  const totalImpact = Math.round(
    data.kmCarro * fatores.kmCarro +
      data.carneSemana * fatores.carneSemana +
      data.banhoMin * fatores.banhoMin +
      data.energia * fatores.energia +
      data.modaDescarte * fatores.modaDescarte
  );

  const toneladasEstimadas = (data.modaDescarte * fatores.modaDescarte * 12) / 1000;

  const getColorClass = (value, max, type = 'bg') => {
    const ratio = value / max;
    if (ratio < 0.2) return `${type}-[var(--ecodoa-primary)]`;
    if (ratio < 0.4) return `${type}-[var(--ecodoa-light-olive)]`;
    if (ratio < 0.6) return `${type}-[var(--ecodoa-accent)]`;
    if (ratio < 0.8) return `${type}-orange-400`;
    return `${type}-[var(--ecodoa-alert)]`;
  };

  const getBarColor = () => {
    return getColorClass(totalImpact, 200, 'bg');
  };

  const getImpactColorValue = () => {
    const ratio = totalImpact / 200;
    if (ratio < 0.2) return 'var(--ecodoa-primary)';
    if (ratio < 0.4) return 'var(--ecodoa-light-olive)';
    if (ratio < 0.6) return 'var(--ecodoa-accent)';
    if (ratio < 0.8) return '#fb923c'; // tailwind orange-400
    return 'var(--ecodoa-alert)';
  };

  const ecoNivel =
    totalImpact < 40
      ? "Muito Baixo: Estás a viver de forma exemplar. Continua a inspirar outros!"
      : totalImpact < 80
      ? "Baixo: Pequenas ações, grande diferença. Mantém o foco sustentável!"
      : totalImpact < 120
      ? "Moderado: Estás no bom caminho, mas há espaço para melhorar."
      : totalImpact < 160
      ? "Elevado: Reduz um pouco o consumo e vais sentir o resultado rapidamente."
      : "Muito Alto: Está na hora de repensar hábitos e fazer mudanças pelo planeta.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="px-4 py-16 bg-[var(--ecodoa-bg)]"
    >
      <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-[var(--ecodoa-primary)] mb-8 text-center">
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
          {
            icon: Shirt,
            key: "modaDescarte",
            label: "Peças de roupa compradas por mês",
            min: 0,
            max: 30,
          },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-4 px-2">
            <div className="flex items-center gap-2 w-full justify-center">
              <item.icon className="w-5 h-5 text-[var(--ecodoa-primary)]" />
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
            <span
              className={`font-semibold transition-colors duration-300`}
              style={{ color: getImpactColorValue() }}
            >
              {data[item.key]}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p
          className={`text-6xl font-extrabold mb-3 transition-colors duration-300`}
          style={{ color: getImpactColorValue() }}
        >
          {totalImpact}
        </p>

        <p
          className={`text-lg mb-8 transition-colors duration-300`}
          style={{ color: getImpactColorValue() }}
        >
          {ecoNivel}
        </p>

        {/* barra de progresso */}
        <div className="relative w-full max-w-xl mx-auto h-4 bg-[var(--ecodoa-soft)]/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full`}
            style={{ backgroundColor: getImpactColorValue() }}
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min((totalImpact / 200) * 100, 100)}%`,
            }}
            transition={{ duration: 0.6 }}
          ></motion.div>
        </div>

        <div className="flex justify-between max-w-xl mx-auto text-xs text-[var(--ecodoa-text)]/60 mt-2">
          <span>Baixo</span>
          <span>Médio</span>
          <span>Alto</span>
        </div>

        {/* impacto da moda */}
        <div className="mt-10 text-sm text-[var(--ecodoa-text)]/70 max-w-xl mx-auto">
          <p>
            Estima-se que mais de <strong>39 mil toneladas</strong> de roupas sejam descartadas por ano no Deserto do Atacama. Cada peça comprada contribui para esse número.
          </p>
          <p className="mt-2">
            Com o teu consumo atual, estimas contribuir com cerca de <strong>{toneladasEstimadas.toFixed(2)} toneladas</strong> de impacto anual relacionado à moda.
          </p>
        </div>
      </div>
      </div>
    </motion.section>
  );
}
