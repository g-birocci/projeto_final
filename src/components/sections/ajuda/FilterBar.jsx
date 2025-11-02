"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function FilterBar({ filters, toggleFilter }) {
  const filterOptions = [
    { key: "shelter", label: "Alojamento", color: "text-rose-500", bgColor: "bg-rose-200" },
    { key: "meal", label: "Refeições", color: "text-amber-500", bgColor: "bg-amber-200" },
    { key: "course", label: "Cursos", color: "text-blue-500", bgColor: "bg-blue-200" },
    { key: "support", label: "Apoio", color: "text-emerald-600", bgColor: "bg-emerald-200" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="z-10 w-full backdrop-blur-md py-2 px-3 flex flex-wrap justify-center gap-2 sticky top-0"
    >
      {filterOptions.map(({ key, label, color, bgColor }) => (
        <button
          key={key}
          onClick={() => toggleFilter(key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            filters[key]
              ? `${bgColor} text-[var(--ecodoa-primary)]`
              : `bg-white border border-[var(--ecodoa-green)] text-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-green)]/20`
          }`}
        >
          <MapPin className={`w-4 h-4 ${color}`} />
          {label}
        </button>
      ))}
    </motion.div>
  );
}
