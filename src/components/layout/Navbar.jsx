// src/components/Navbar.jsx
"use client";

import { useState, useEffect, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const navItems = [
  { href: "/doacoes", label: "Doações", key: "doacoes" },
  { href: "/ajuda", label: "Pontos de Ajuda", key: "ajuda" },
  { href: "/viver", label: "Vida Sustentável", key: "viver" },
  { href: "/sobre", label: "Quem Somos", key: "sobre" },
];

const previews = {
  doacoes: {
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600&auto=format&fit=crop",
    alt: "Mãos segurando um coração / doações",
  },
  ajuda: {
    img: "https://images.unsplash.com/photo-1509099836639-7b0a5d19e5f4?q=80&w=1600&auto=format&fit=crop",
    alt: "Pontos de ajuda / comunidade",
  },
  viver: {
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    alt: "Natureza e vida sustentável",
  },
  sobre: {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    alt: "Equipe reunida / quem somos",
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(navItems[0].key);
  const panelId = useId();

  // lock de scroll quando o menu abre
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [open]);

  // fechar com ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="hidden md:block">{/* desktop-only via CSS, sem afetar SSR */}
      {/* LOGO à esquerda */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Image
          src="/img/EcoDoa.svg"
          alt="EcoDoa"
          width={50}
          height={50}
          className="drop-shadow-md"
          priority
          loading="eager"
        />
        <span className="text-xl font-bold tracking-tight text-[var(--ecodoa-primary)]">
          EcoDoa
        </span>
      </Link>

      {/* HAMBURGER à direita com as CORES EcoDoa */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-[var(--ecodoa-accent)] text-[var(--ecodoa-primary)] rounded-full flex flex-col items-center justify-center shadow-lg hover:bg-[var(--ecodoa-olive)] transition-all duration-300 hover:scale-110 gap-[6px]"
      >
        <span className="block h-[2px] w-6 bg-[var(--ecodoa-primary)] rounded"></span>
        <span className="block h-[2px] w-6 bg-[var(--ecodoa-primary)] rounded"></span>
      </button>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* PAINEL */}
      <div
        id={panelId}
        className={`fixed top-0 right-0 h-full w-full lg:flex bg-[var(--ecodoa-primary)] z-50 transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* IMAGEM (esquerda) */}
        <div className="relative flex-1 hidden lg:block">
          {navItems.map((n) => {
            const v = previews[n.key];
            return (
              <div
                key={n.key}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  current === n.key ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={current !== n.key}
              >
                <Image
                  src={v.img}
                  alt={v.alt}
                  fill
                  sizes="60vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* CONTEÚDO (direita) */}
        <div className="w-full lg:w-[420px] shrink-0 bg-[var(--ecodoa-primary)] h-full p-8 relative flex flex-col">
          {/* fechar */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--ecodoa-secondary)]/50 hover:bg-[var(--ecodoa-olive)]/30 transition-all duration-300"
            aria-label="Fechar menu"
          >
            <X size={24} className="text-[var(--ecodoa-accent)]" />
          </button>

          {/* perfil */}
          <div className="flex items-center gap-4 mt-16 mb-10">
            <Image
              src="/img/profile.jpg"
              alt="Perfil"
              width={60}
              height={60}
              className="rounded-full border-2 border-[var(--ecodoa-accent)] shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-[var(--ecodoa-accent)]">Olá, Gretta.</h2>
              <p className="text-sm text-[var(--ecodoa-soft)]">Portugal</p>
            </div>
          </div>

          {/* links */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setCurrent(item.key)}
                    onFocus={() => setCurrent(item.key)}
                    onClick={() => setOpen(false)}
                    className="block w-full text-left py-4 px-5 text-lg font-semibold text-[var(--ecodoa-soft)] hover:text-[var(--ecodoa-accent)] hover:bg-[var(--ecodoa-secondary)]/30 rounded-xl transition-all duration-200 hover:translate-x-2 border border-transparent hover:border-[var(--ecodoa-light-olive)]/40"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA (como Link também) */}
          <div className="mt-8">
            <Link
              href="/doacoes"
              onClick={() => setOpen(false)}
              className="block text-center bg-[var(--ecodoa-accent)] text-white py-4 rounded-full font-semibold hover:bg-[var(--ecodoa-olive)] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Log in ou Log out
            </Link>
          </div>

          {/* rodapé */}
          <div className="mt-8 pt-8 border-t border-[var(--ecodoa-light-olive)]/30">
            <p className="text-sm text-[var(--ecodoa-soft)]">
              <span className="block font-semibold text-[var(--ecodoa-accent)] mb-2">
                Junte-se a nós
              </span>
              Transforme vidas através da doação e sustentabilidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
