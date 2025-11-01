"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HeartHandshake, Leaf, Info, MapPin, Home } from "lucide-react";

export default function Navmobile() {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOverlayOpen, setMenuOverlayOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    // detectar mobile
    const mq = window.matchMedia("(max-width: 767px)");
    const onMQ = () => setIsMobile(mq.matches);
    onMQ();
    mq.addEventListener?.("change", onMQ);

    // mostrar depois do scroll Y
    const onScroll = () => setShow(window.scrollY > 250);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // observar se o Nave bloqueou o scroll (classe overflow-hidden no <html>)
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

  // evita “flash” de SSR e só renderiza no mobile
  if (!mounted || !isMobile) return null;

  // não mostra se o overlay do menu grande estiver aberto
  const visible = show && !menuOverlayOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#005C53]/90 text-[#D6D58E] border border-[#9FC131]/30 shadow-md rounded-full px-5 py-3 flex justify-around items-center w-[90%] max-w-sm backdrop-blur-sm"
          aria-label="Navegação rápida em dispositivos móveis"
        >
          <NavItem href="/" icon={<Home size={18} />} label="Início" />
          <NavItem href="/doacoes" icon={<HeartHandshake size={18} />} label="Doar" />
          <NavItem href="/viver" icon={<Leaf size={18} />} label="Viver Bem" />
          <NavItem href="/ajuda" icon={<MapPin size={18} />} label="Ajuda" />
          <NavItem href="/sobre" icon={<Info size={18} />} label="Sobre" />
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