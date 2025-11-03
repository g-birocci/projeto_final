"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  HeartHandshake,
  MessageCircle,
  User,
  Package,
  History,
  LogIn,
  LogOut,
  X,
  Menu,
  MapPin
} from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function HamburgerMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isOpen) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }
    return () => root.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);

  if (!mounted) return null;

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  const menuItems = user
    ? [
      { href: "/app", icon: <Home size={18} />, label: "Início" },
      { href: "/app/products", icon: <HeartHandshake size={18} />, label: "Doações" },
      { href: "/app/products/my", icon: <Package size={18} />, label: "Meus Produtos" },
      { href: "/app/products/history", icon: <History size={18} />, label: "Histórico" },
      { href: "/app/chat", icon: <MessageCircle size={18} />, label: "Chat" },
      { href: "/app/profile", icon: <User size={18} />, label: "Perfil" },

    ]
    : [
      { href: "/app", icon: <Home size={18} />, label: "Início" },
      { href: "/app/products", icon: <HeartHandshake size={18} />, label: "Doações" },
      { href: "/app/auth/login", icon: <LogIn size={18} />, label: "Entrar" },

    ];

  return (
    <>
      {/* Botão Hamburger - dentro do container 375px */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-8 left-3 z-50 w-10 h-10 text-[var(--ecodoa-primary)] rounded-md flex items-center justify-center hover:cursor-pointer transition-all md:hidden"
        aria-label="Abrir menu"
      >
        <Menu size={18} />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />


            {/* Menu Lateral Direito */}
            <div className="absolute top-0 left-0 h-dvh w-[260px] bg-ecodoa-secondary shadow-2xl z-50 flex flex-col">
              {/* Header do Menu */}
              <div className="flex items-center justify-between p-3 border-b border-ecodoa-accent">

                <div className="px-3 py-2 text-sm text-ecodoa-primary">
                    <p className="font-medium truncate">{user?.email}</p>
                    {user?.firstName && (
                      <p className="text-[10px] opacity-70 truncate">
                        {user.firstName} {user?.lastName}
                      </p>
                    )}
                  </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-ecodoa-accent/20 text-ecodoa-primary transition"
                  aria-label="Fechar menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* <div className="flex items-center justify-between p-3 border-b border-ecodoa-accent/30 bg-ecodoa-soft">
                <h2 className="text-base font-semibold text-ecodoa-primary">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-ecodoa-accent/20 text-ecodoa-primary transition"
                  aria-label="Fechar menu"
                >
                  <X size={18} />
                </button>
              </div> */}


              {/* Itens do Menu */}
              <nav className="flex-1 overflow-y-auto py-3">
                <ul className="space-y-1 px-2">
                  {menuItems.map((item) => {
                    const isActive = router.pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-sm ${isActive
                              ? "bg-ecodoa-accent text-ecodoa-primary font-medium"
                              : "text-ecodoa-soft hover:bg-ecodoa-soft"
                            }`}
                        >
                          <span className={isActive ? "text-ecodoa-primary" : "text-ecodoa-soft"}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer do Menu */}
              {user && (
                <div className="p-3 py-8">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-ecodoa-soft font-bold"
                  >
                    <LogOut size={18} />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

