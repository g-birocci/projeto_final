"use client";

import EditModal from "@/components/sections/profile/EditModal";
import Items from "@/components/sections/profile/Items";
import { DONATED_ITEMS, RECEIVED_ITEMS } from "../data/items";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { getUser } from "@/services/api";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, LogOut } from "lucide-react";
import EcoDoaAssistant from "@/components/EcoDoaAssistant";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, logout: logoutAuth, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!authLoading) {
      if (!authUser) {
        router.push("/auth/login");
      } else {
        loadUserProfile();
      }
    }
  }, [authUser, authLoading]);

  async function loadUserProfile() {
    try {
      setLoading(true);
      const result = await getUser();
      if (result && result.data) {
        const userData = result.data;
        const userProfile = {
          id: userData._id || userData.id,
          name: `${userData.firtName || ""} ${userData.lastName || ""}`.trim() || userData.email,
          email: userData.email,
          city: userData.city ? `${userData.city}, ${userData.district || "Portugal"}` : "Portugal",
          district: userData.district || "",
          avatar: "/img/profile.jpg",
          donated: userData.donationsGiven || 0,
          received: userData.donationsRecived || 0,
          impacted: (userData.donationsGiven || 0) + (userData.donationsRecived || 0),
          firstName: userData.firtName || "",
          lastName: userData.lastName || "",
        };
        setUser(userProfile);
        setForm(userProfile);
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setError("Erro ao carregar dados do perfil");
    } finally {
      setLoading(false);
    }
  }

  const handleEditToggle = () => setEditing(!editing);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = async () => {
    if (!validateEmail(form.email)) {
      setError("Por favor, insere um e-mail válido.");
      return;
    }
    try {
      // TODO: Implementar updateUser quando o endpoint estiver disponível
      setUser(form);
      setEditing(false);
      setError("");
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setError("Erro ao salvar alterações");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAuth();
      router.push("/");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  if (loading || !user || !form) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--ecodoa-primary)] mx-auto mb-4"></div>
          <p className="text-[var(--ecodoa-primary)]">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative text-[var(--ecodoa-text)] flex flex-col">
      <Navbar />
      <div className="px-5 py-24 sm:py-20 sm:px-8">
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
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 rounded-lg border border-[var(--ecodoa-soft)] text-[var(--ecodoa-text)]/80 hover:text-[var(--ecodoa-primary)] hover:border-[var(--ecodoa-primary)] transition"
        >
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
      <Footer />
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
}
