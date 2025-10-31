"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, HeartHandshake, Bell, LogIn, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SidebarMenu({ open, onClose }) {
  const menuItems = [
    { label: "Perfil", icon: User, href: "/perfil" },
    { label: "Histórico de Doações", icon: HeartHandshake, href: "/historico" },
    { label: "Notificações", icon: Bell, href: "/notificacoes" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Fundo escurecido */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SIDEBAR */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
            className="fixed right-0 top-0 h-full w-64 bg-[#005C53] text-[#D6D58E] shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#9FC131]/30">
              <h2 className="text-lg font-semibold text-[#DBF227]">Minha Conta</h2>
              <button
                onClick={onClose}
                className="text-[#DBF227] hover:text-[#9FC131] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Perfil mini */}
            <div className="flex flex-col items-center py-6 border-b border-[#9FC131]/30">
              <Image
                src="/img/profile.jpg"
                alt="Perfil"
                width={70}
                height={70}
                className="rounded-full border-2 border-[#9FC131]/50 mb-3"
              />
              <p className="font-medium text-[#DBF227]">Olá, Gretta!</p>
              <p className="text-xs text-[#D6D58E]/80">@ecodoa</p>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#01725e]/60 transition"
                >
                  <Icon className="w-5 h-5 text-[#DBF227]" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>

            {/* Botão de Login */}
            <div className="px-5 pb-5">
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#DBF227] text-[#005C53] font-semibold rounded-xl hover:bg-[#e9ff5f] transition-all"
              >
                <LogIn className="w-5 h-5" />
                Fazer Login ou Sair
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
