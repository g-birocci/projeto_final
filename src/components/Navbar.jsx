"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SideBarMenu from "./SideBarMenu";

const navItems = [
  { href: "/doacoes", label: "Doações" },
  { href: "/ajuda", label: "Pontos de Ajuda" },
  { href: "/viver", label: "Vida Sustentável" },
  { href: "/sobre", label: "Quem Somos" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
<<<<<<< HEAD
<<<<<<< Updated upstream
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#9FC131]/30 bg-[#005C53]/95 backdrop-blur-sm shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-[#D6D58E]">
=======
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--ecodoa-light-olive)]/30 bg-[var(--ecodoa-primary)]/95 backdrop-blur-md shadow-md transition-all duration-300">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 text-[var(--ecodoa-soft)] sm:px-8">
          {/* === PERFIL E MENU MOBILE === */}
          <div className="flex items-center gap-3">
            <Image
              src="/img/profile.jpg"
              alt="Perfil"
              width={40}
              height={40}
              onClick={() => setShowSidebar(true)} // abre sidebar ao clicar
              className="rounded-full border-2 border-[var(--ecodoa-light-olive)] shadow-md hover:scale-105 transition-transform cursor-pointer"
            />
>>>>>>> main

            {/* Botão hamburguer (mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--ecodoa-light-olive)]/40 bg-[var(--ecodoa-primary)]/90 text-2xl text-[var(--ecodoa-accent)] hover:bg-[var(--ecodoa-olive)]/30 lg:hidden"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>

          {/* === LOGO CENTRAL === */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/ecodoa-logo-folha.svg"
              alt="EcoDoa"
              width={60}
              height={60}
              className="drop-shadow-md hover:opacity-90 transition"
            />
            <span className="hidden sm:inline text-xl font-bold tracking-tight text-[var(--ecodoa-accent)]">
              EcoDoa
            </span>
          </Link>

          <div className="w-12 lg:w-auto"></div>

          {/* === MENU PRINCIPAL === */}
          <div
            className={`absolute left-0 right-0 top-full origin-top bg-[var(--ecodoa-primary)]/98 px-4 pb-6 pt-3 shadow-lg transition-all lg:static lg:flex lg:w-auto lg:translate-y-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
              menuOpen
                ? "pointer-events-auto scale-y-100 opacity-100"
                : "pointer-events-none scale-y-75 opacity-0 lg:pointer-events-auto lg:scale-y-100 lg:opacity-100"
            }`}
          >
<<<<<<< HEAD
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
=======
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--ecodoa-light-olive)]/30 bg-[var(--ecodoa-primary)]/95 backdrop-blur-md shadow-md transition-all duration-300">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 text-[var(--ecodoa-soft)]">
          {/* === PERFIL E MENU MOBILE === */}
          <div className="flex items-center gap-3">
            <Image
              src="/img/profile.jpg"
              alt="Perfil"
              width={40}
              height={40}
              onClick={() => setShowSidebar(true)} // abre sidebar ao clicar
              className="rounded-full border-2 border-[var(--ecodoa-light-olive)] shadow-md hover:scale-105 transition-transform cursor-pointer"
            />

            {/* Botão hamburguer (mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--ecodoa-light-olive)]/40 bg-[var(--ecodoa-primary)]/90 text-2xl text-[var(--ecodoa-accent)] hover:bg-[var(--ecodoa-olive)]/30"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>

          {/* === LOGO CENTRAL === */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/ecodoa-logo-folha.svg"
              alt="EcoDoa"
              width={60}
              height={60}
              className="drop-shadow-md hover:opacity-90 transition"
            />
            <span className="text-xl font-bold tracking-tight text-[var(--ecodoa-accent)]">
              EcoDoa
            </span>
          </Link>

          <div className="w-12"></div>

          {/* === MENU PRINCIPAL === */}
          <div
            className={`absolute left-0 right-0 top-full origin-top bg-[var(--ecodoa-primary)]/98 px-4 pb-6 pt-3 shadow-lg transition-all ${
              menuOpen
                ? "pointer-events-auto scale-y-100 opacity-100"
                : "pointer-events-none scale-y-75 opacity-0"
            }`}
          >
            <ul className="flex flex-col gap-2">
=======
            <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
>>>>>>> main
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition border border-[var(--ecodoa-light-olive)]/40 bg-[var(--ecodoa-primary)]/80 text-[var(--ecodoa-soft)] hover:text-[var(--ecodoa-accent)] hover:border-[var(--ecodoa-accent)]/60 hover:bg-[var(--ecodoa-secondary)]/30`}
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> main
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* === SIDEBAR (abre ao clicar no perfil) === */}
      <SideBarMenu open={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
}
