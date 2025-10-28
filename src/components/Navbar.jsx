import { useState } from "react";
import Image from "next/image";

// Itens da navbar
const navItems = [
  { view: "doacoes", label: "Doações" },
  { view: "pontos", label: "Pontos de Ajuda" },
  { view: "vida", label: "Vida Sustentável" },
  { view: "sobre", label: "Quem Somos" },
];

export default function Navbar({ currentView = "home", onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (view) => {
    if (onNavigate) onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#9FC131]/30 bg-[#005C53]/95 backdrop-blur-sm shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-[#D6D58E]">

        {/* Área esquerda → Perfil no mobile */}
        <div className="flex items-center gap-3">
          {/* Foto de perfil (visível no mobile e desktop) */}
          <Image
            src="/img/profile.jpg"
            alt="Perfil"
            width={40}
            height={40}
            className="rounded-full border-2 border-[#9FC131] shadow-md hover:scale-105 transition-transform order-1 lg:order-2"
          />

          {/* Menu hamburguer no mobile (vai para direita com flex-row-reverse) */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#9FC131]/40 bg-[#005C53]/90 text-2xl text-[#DBF227] transition hover:bg-[#77850B]/40 lg:hidden order-2 lg:order-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Logo centralizada */}
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className="flex items-center gap-2"
        >
          <Image
            src="/img/ecodoa-logo-folha.svg"
            alt="EcoDoa"
            width={60}
            height={60}
            className="drop-shadow-md hover:opacity-90 transition"
          />
          <span className="hidden text-xl font-bold tracking-tight text-[#DBF227] sm:inline">
            EcoDoa
          </span>
        </button>

        {/* Espaçador invisível para equilibrar layout central da logo */}
        <div className="w-12 lg:w-auto"></div>

        {/* Menu de navegação */}
        <div
          className={`absolute left-0 right-0 top-full origin-top bg-[#005C53]/98 px-4 pb-6 pt-3 shadow-lg transition-all lg:static lg:flex lg:w-auto lg:translate-y-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            menuOpen
              ? "pointer-events-auto scale-y-100 opacity-100"
              : "pointer-events-none scale-y-75 opacity-0 lg:pointer-events-auto lg:scale-y-100 lg:opacity-100"
          }`}
        >
          <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
            {navItems.map((item) => {
              const active = currentView === item.view;
              const base =
                "flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition";
              const activeStyles =
                "bg-gradient-to-r from-[#9FC131]/90 via-[#DBF227]/90 to-[#77850B]/80 text-[#005C53] shadow-md";
              const idleStyles =
                "border border-[#9FC131]/40 bg-[#005C53]/80 text-[#D6D58E] hover:text-[#DBF227] hover:border-[#DBF227]/60";

              return (
                <li key={item.view}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.view)}
                    className={`${base} ${active ? activeStyles : idleStyles}`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
