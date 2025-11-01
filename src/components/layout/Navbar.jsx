"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const navItems = [
  { href: "/", label: "Doações" },
  { href: "/ajuda", label: "Pontos de Ajuda" },
  { href: "/viver", label: "Vida Sustentável" },
  { href: "/sobre", label: "Quem Somos" },
  { href: "/profile", label: "Meu Perfil" }, // Perfil do user logado

];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Botão do Menu Fixo no Canto Superior Direito */}
      <button
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menu"
        className="absolute top-6 right-6 z-50 w-14 h-14 bg-[var(--ecodoa-accent)] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--ecodoa-olive)] transition-all duration-300 hover:scale-110">
        <span className="text-2xl">☰</span>
      </button>

      {/* Logo relativo ao app viewport (canto superior esquerdo) */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Image
          src="/img/EcoDoa.svg"
          alt="EcoDoa"
          width={50}
          height={50}
          className="drop-shadow-md"
        />
        <span className="text-xl font-bold tracking-tight text-[var(--ecodoa-accent)]">
          EcoDoa
        </span>
      </Link>

      {/* Overlay dentro do app viewport */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 z-40 ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar ancorada ao app viewport */}
      <div
        className={`absolute top-0 right-0 h-full w-80 sm:w-96 bg-[var(--ecodoa-primary)] shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full p-8 pt-8">
          {/* Botão Fechar */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--ecodoa-secondary)]/50 hover:bg-[var(--ecodoa-olive)]/30 transition-all duration-300"
            aria-label="Fechar menu"
          >
            <X size={24} className="text-[var(--ecodoa-accent)]" />
          </button>

          {/* Perfil e Título */}
          <div className="mb-12 mt-4">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/profile" onClick={() => setSidebarOpen(false)}>
                <Image
                  src="/img/profile.jpg"
                  alt="Perfil"
                  width={60}
                  height={60}
                  className="rounded-full border-3 border-[var(--ecodoa-accent)] shadow-lg"
                />
              </Link>
              <div>
                <h2 className="text-2xl font-bold text-[var(--ecodoa-accent)]">Olá, Gretta.</h2>
                <p className="text-sm text-[var(--ecodoa-soft)]">Portugal</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="block py-4 px-5 text-lg font-semibold text-[var(--ecodoa-soft)] hover:text-[var(--ecodoa-accent)] hover:bg-[var(--ecodoa-secondary)]/30 rounded-xl transition-all duration-200 hover:translate-x-2 border border-transparent hover:border-[var(--ecodoa-light-olive)]/40"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/doacoes"
              onClick={() => setSidebarOpen(false)}
            >
              <button className="w-full bg-[var(--ecodoa-accent)] text-white py-4 rounded-full font-semibold hover:bg-[var(--ecodoa-olive)] transition-all duration-300 hover:scale-105 shadow-lg">
                Log in ou Log out
              </button>
            </Link>
          </div>

          {/* Info Adicional */}
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
    </>
  );
}