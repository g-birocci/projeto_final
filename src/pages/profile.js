"use client";

import EditModal from "@/components/sections/profile/EditModal";
import Items from "@/components/sections/profile/Items";
import { DONATED_ITEMS, RECEIVED_ITEMS } from "../data/items";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, LogOut } from "lucide-react";
import EcoDoaAssistant from "@/components/EcoDoaAssistant";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    name: "Gretta Macedo Carneiro",
    email: "grettafaztudo@gmail.com",
    city: "Porto, Portugal",
    avatar: "/img/profile.jpg",
    donated: 5,
    received: 2,
    impacted: 8,
  });

  const [form, setForm] = useState(user);

  const handleEditToggle = () => setEditing(!editing);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = () => {
    if (!validateEmail(form.email)) {
      setError("Por favor, insere um e-mail válido.");
      return;
    }
    setUser(form);
    setEditing(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-white relative text-[var(--ecodoa-text)] flex flex-col px-5 py-24 sm:py-20 sm:px-8">
      {/* Botão Voltar */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-5 text-[var(--ecodoa-accent)] hover:opacity-80"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="max-w-4xl mx-auto w-full space-y-10 flex-grow">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 border-b border-[var(--ecodoa-accent)]/40 pb-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border border-[var(--ecodoa-accent)]">
            <Image src={user.avatar} alt="Avatar" fill className="object-cover" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold text-[var(--ecodoa-primary)]">
              {user.name}
            </h2>
            <button
              onClick={handleEditToggle}
              className="text-[var(--ecodoa-accent)] hover:opacity-80"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm opacity-80">{user.email}</p>
          <p className="text-sm opacity-70">{user.city}</p>

          <p className="text-[var(--ecodoa-primary)] text-base leading-snug mt-2">
            O que tu doas,{" "}
            <span className="text-[var(--ecodoa-accent)] font-semibold">
              transforma.
            </span>
          </p>

          <div className="grid grid-cols-3 text-center gap-4 mt-4">
            <DashboardStat label="Itens Doados" value={user.donated} color="primary" />
            <DashboardStat label="Ajudas Recebidas" value={user.received} color="accent" />
            <DashboardStat label="Pessoas Impactadas" value={user.impacted} color="secondary" />
          </div>
        </div>

        {/* Carrosséis/histórico */}
        <Items title="Itens Doados" items={DONATED_ITEMS} />
        <Items title="Solidariedade Recebida" items={RECEIVED_ITEMS} />
      </div>

      {/* Botão Sair */}
      <div className="flex justify-center mt-auto pt-6 border-t border-[var(--ecodoa-soft)]/40">
        <button className="flex items-center gap-2 px-5 py-2 rounded-lg border border-[var(--ecodoa-soft)] text-[var(--ecodoa-text)]/80 hover:text-[var(--ecodoa-primary)] hover:border-[var(--ecodoa-primary)] transition">
          <LogOut className="w-4 h-4" />
          Sair da sessão
        </button>
      </div>

      {/* Modal de Edição */}
      {editing && (
        <EditModal
          form={form}
          onChange={handleChange}
          error={error}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      )}

      {/* Assistente */}
      <EcoDoaAssistant />
    </div>
  );
}

/* ===== SUBCOMPONENTE ===== */
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
  <Footer/>
}
