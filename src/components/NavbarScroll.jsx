"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {HeartHandshake, Leaf, Info, MapPin, Home,} from "lucide-react";

export default function NavbarScroll() {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShow(scrollY > 250); // aparece após rolar 250px
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isMobile) return null; // só mostra no mobile

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#005C53]/90 text-[#D6D58E] border border-[#9FC131]/30 shadow-md rounded-full px-5 py-3 flex justify-around items-center w-[90%] max-w-sm backdrop-blur-sm"
        >
          <NavItem href="/" icon={<Home />} label="Início" />
          <NavItem href="/doacao" icon={<HeartHandshake />} label="Doar" />
          <NavItem href="/viver" icon={<Leaf />} label="´Viver Bem" />
          <NavItem href="/ajuda" icon={<MapPin />} label="Ajuda" />
          <NavItem href="/sobre" icon={<Info />} label="Sobre" />
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
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D6D58E]/10 hover:bg-[#9FC131]/20 transition-all">
        {icon}
      </div>
      <span className="mt-1">{label}</span>
    </Link>
  );
}