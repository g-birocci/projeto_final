"use client";

import { motion } from "framer-motion";
import { Home, Utensils, Briefcase, GraduationCap, Heart, Shirt } from "lucide-react";

export default function FilterBar({ filters, toggleFilter }) {
  const filterOptions = [
    { key: "shelter", label: "Alojamento", icon: Home },
    { key: "meal", label: "Refeições", icon: Utensils },

    { key: "course", label: "Cursos", icon: GraduationCap },
    { key: "support", label: "Apoio", icon: Heart },
    { key: "clothes", label: "Roupas", icon: Shirt },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="z-10 w-full bg-[var(--ecodoa-bg)] border-y border-[var(--ecodoa-soft)]/60 shadow-sm py-4 px-6 flex flex-wrap justify-center gap-3"
    >
      {filterOptions.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => toggleFilter(key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-sm ${
            filters[key]
              ? "bg-[var(--ecodoa-primary)] text-white hover:bg-[var(--ecodoa-secondary)]"
              : "bg-white border border-[var(--ecodoa-light-olive)] text-[var(--ecodoa-text)] hover:bg-[var(--ecodoa-green)]/40"
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </motion.div>
  );
}
