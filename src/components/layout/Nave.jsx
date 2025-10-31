// src/components/layout/Nave.jsx
import React, { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Import } from "lucide-react";
import Image from "next/image";

// seus itens
const navItems = [
  { href: "/doacoes", label: "Doações", key: "doacoes" },
  { href: "/ajuda", label: "Pontos de Ajuda", key: "ajuda" },
  { href: "/viver", label: "Vida Sustentável", key: "viver" },
  { href: "/sobre", label: "Quem Somos", key: "sobre" },
];

// imagens de prévia (pode trocar os URLs)
const previews = {
  doacoes: {
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600&auto=format&fit=crop",
    alt: "Mãos segurando um coração/doação",
  },
  ajuda: {
    img: "https://images.unsplash.com/photo-1509099836639-7b0a5d19e5f4?q=80&w=1600&auto=format&fit=crop",
    alt: "Pessoas ajudando/comunidade",
  },
  viver: {
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    alt: "Natureza e vida sustentável",
  },
  sobre: {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    alt: "Equipe reunida em mesa",
  },
};

export default function Nave() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(navItems[0].key);
  const panelId = useId();
  const firstLinkRef = useRef(null);
  const router = useRouter();

  // seta imagem inicial pela rota
  useEffect(() => {
    const p = router?.pathname?.toLowerCase() || "";
    const found =
      navItems.find((n) => p.startsWith(n.href))?.key ?? navItems[0].key;
    setCurrent(found);
  }, [router?.pathname]);

  // ESC fecha
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // foco inicial + lock de scroll
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      firstLinkRef.current?.focus();
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }
    return () => root.classList.remove("overflow-hidden");
  }, [open]);

  const go = async (href) => {
    setOpen(false);
    await router.push(href);
  };

  return (
    <>
      {/* topbar com hamburger à DIREITA */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black/10">
        <div className="h-14 px-4 lg:px-6 max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="font-extrabold tracking-wide">
            Brandigo
          </a>
          <button
            aria-label="Abrir menu"
            aria-controls={panelId}
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex flex-col items-center justify-center gap-[6px] p-2 rounded-lg border border-black/10 hover:border-black/20 active:scale-[0.98] transition"
          >
            <span className="block h-[2px] w-6 bg-black rounded"></span>
            <span className="block h-[2px] w-6 bg-black rounded"></span>
          </button>
        </div>
      </header>

      {/* backdrop */}
      <button
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* PAINEL FULLSCREEN abrindo da DIREITA
          layout: [IMAGEM à ESQUERDA] | [LINKS à DIREITA] (em todas as telas) */}
      <nav
        id={panelId}
        className={`fixed z-50 inset-y-0 right-0 w-full bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col lg:flex-row`}
        role="dialog"
        aria-modal="true"
      >
        {/* coluna da IMAGEM (esquerda) */}
        <div className="relative flex-1 min-h-[40vh]">
          {navItems.map((n) => {
            const v = previews[n.key];
            return (
              <div
                key={n.key}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  current === n.key
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={current !== n.key}
              >
                <Image src={v.img} alt={v.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* coluna dos LINKS (direita) */}
        <div className="w-full lg:w-[420px] shrink-0 border-l border-black/10 bg-white">
          {/* cabeçalho do painel */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-black/5">
            <span className="font-bold">Menu</span>
            <button
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg border border-black/10"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>
          </div>

          <div className="px-5 py-5">
            <ul className="flex flex-col gap-3">
              {navItems.map((n, i) => (
                <li key={n.key}>
                  <button
                    ref={i === 0 ? firstLinkRef : undefined}
                    onMouseEnter={() => setCurrent(n.key)}
                    onFocus={() => setCurrent(n.key)}
                    onClick={() => go(n.href)}
                    className={`w-full text-left px-2 py-2 rounded-lg font-semibold outline-none hover:bg-black/5 focus:bg-black/5 transition-colors ${
                      current === n.key ? "bg-black/5" : ""
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
