"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";

export default function Profile({ user, onEdit }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 border-b border-[var(--ecodoa-accent)]/40 pb-6">
      {/* Avatar */}
      <div className="relative w-28 h-28 rounded-full overflow-hidden border border-[var(--ecodoa-accent)]">
        <Image src={user.avatar} alt="Avatar" fill className="object-cover" />
      </div>

      {/* Nome + Editar */}
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-2xl font-semibold text-[var(--ecodoa-primary)]">
          {user.name}
        </h2>
        <button
          onClick={onEdit}
          className="text-[var(--ecodoa-accent)] hover:opacity-80"
        >
          <Edit3 className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm opacity-80">{user.email}</p>
      <p className="text-sm opacity-70">{user.city}</p>

      {/* Frase */}
      <p className="text-[var(--ecodoa-primary)] text-base leading-snug mt-2">
        O que tu doas,{" "}
        <span className="text-[var(--ecodoa-accent)] font-semibold">
          transforma.
        </span>
      </p>

      {/* Dashboard */}
      <div className="grid grid-cols-3 text-center gap-4 mt-4">
        <DashboardStat label="Itens Doados" value={user.donated} color="primary" />
        <DashboardStat
          label="Solidariedade Recebida"
          value={user.received}
          color="accent"
        />
        <DashboardStat
          label="Pessoas Impactadas"
          value={user.impacted}
          color="secondary"
        />
      </div>
    </div>
  );
}

function DashboardStat({ label, value, color }) {
  const tone =
    color === "primary"
      ? "text-[#007f5f]"
      : color === "accent"
      ? "text-[#2a9d8f]"
      : "text-[#90a955]";

  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <p className={`text-3xl font-bold ${tone}`}>{value}</p>
      <p className="text-xs opacity-70 uppercase tracking-wide">{label}</p>
    </motion.div>
  );
}
