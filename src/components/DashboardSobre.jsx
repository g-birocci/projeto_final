"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TreePine, Users, Recycle, Globe } from "lucide-react";

export default function DashboardSobre() {
  const [counts, setCounts] = useState({ itens: 0, doadores: 0, residuos: 0, projetos: 0 });

  useEffect(() => {
    const targets = { itens: 1247, doadores: 342, residuos: 1850, projetos: 12 };
    const duration = 1800;
    const start = Date.now();

    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setCounts({
        itens: Math.floor(progress * targets.itens),
        doadores: Math.floor(progress * targets.doadores),
        residuos: Math.floor(progress * targets.residuos),
        projetos: Math.floor(progress * targets.projetos),
      });
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const stats = [
    { icon: TreePine, value: counts.itens, label: "Itens Reutilizados" },
    { icon: Users, value: counts.doadores, label: "Doadores Ativos" },
    { icon: Recycle, value: counts.residuos, label: "Kg de Resíduos Evitados" },
    { icon: Globe, value: counts.projetos, label: "Projetos Sustentáveis" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto px-6 pb-12"
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center"
        >
          <s.icon className="w-10 h-10 text-[var(--ecodoa-primary)] mb-3" />
          <p className="text-4xl font-extrabold text-[var(--ecodoa-primary)]">{s.value}</p>
          <p className="text-sm text-[#1E2D2F]/70">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
