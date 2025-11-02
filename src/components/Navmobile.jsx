"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Home, HeartHandshake, MessageCircle, User, Leaf, MapPin, Info, LogIn } from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function Navmobile() {
  const router = useRouter();
  const inApp = router?.pathname?.startsWith("/app");
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOverlayOpen, setMenuOverlayOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const onMQ = () => setIsMobile(mq.matches);
    onMQ();
    mq.addEventListener?.("change", onMQ);

    const onScroll = () => setShow(window.scrollY > 250);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const html = document.documentElement;
    const obs = new MutationObserver(() => {
      setMenuOverlayOpen(html.classList.contains("overflow-hidden"));
    });
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    setMenuOverlayOpen(html.classList.contains("overflow-hidden"));

    return () => {
      mq.removeEventListener?.("change", onMQ);
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  // Renderiza apenas no mobile para evitar flash/SSR e respeitar viewport do app
  if (!mounted || !isMobile) return null;

  // No app (/app) mantém visível; fora, só após rolagem
  const visible = (inApp ? true : show) && !menuOverlayOpen;

  const base = "z-50 bg-[#005C53]/90 text-[#D6D58E] border border-[#9FC131]/30 shadow-md backdrop-blur-sm";
  const inAppClass = "sticky bottom-0 left-0 right-0 w-full rounded-t-xl px-5 py-3 flex justify-around items-center";
  const outAppClass = "fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm rounded-full px-5 py-3 flex justify-around items-center";

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className={`${inApp ? inAppClass : outAppClass} ${base}`}
          aria-label="Navegação rápida em dispositivos móveis"
        >
          {inApp ? (
            <>
              <NavItem href="/app" icon={<Home size={18} />} label="Início" />
              <NavItem href="/app/products" icon={<HeartHandshake size={18} />} label="Doações" />
              <NavItem href="/app/chat" icon={<MessageCircle size={18} />} label="Chat" />
              {user ? (
                <NavItem href="/app/profile" icon={<User size={18} />} label="Perfil" />
              ) : (
                <NavItem href="/app/auth/login" icon={<LogIn size={18} />} label="Entrar" />
              )}
            </>
          ) : (
            <>
              <NavItem href="/" icon={<Home size={18} />} label="Início" />
              <NavItem href="/viver" icon={<Leaf size={18} />} label="Viver Bem" />
              <NavItem href="/ajuda" icon={<MapPin size={18} />} label="Ajuda" />
              <NavItem href="/sobre" icon={<Info size={18} />} label="Sobre" />
            </>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function NavItem({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-[11px] font-medium hover:text-[#DBF227] transition"
      aria-label={label}
      prefetch
    >
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D6D58E]/10 hover:bg-[#9FC131]/20 transition-all">
        {icon}
      </span>
      <span className="mt-1">{label}</span>
    </Link>
  );
}

