"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white/70 backdrop-blur-sm text-center py-6 border-t border-[var(--ecodoa-soft)]/40">
      {/* Ícones sociais */}
      <div className="flex justify-center gap-6 mb-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--ecodoa-primary)]/70 hover:text-[var(--ecodoa-accent)] transition"
          aria-label="Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--ecodoa-primary)]/70 hover:text-[var(--ecodoa-accent)] transition"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--ecodoa-primary)]/70 hover:text-[var(--ecodoa-accent)] transition"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>

      {/* Texto principal */}
      <p className="text-sm text-[var(--ecodoa-secondary)]/70 tracking-wide">
        © 2025 - Desenvolvido por <span className="font-medium text-[var(--ecodoa-primary)]">EcoDoa</span>.
      </p>

      {/* Espaço para a bottom bar */}
      <div className="pb-20"></div>
    </footer>
  );
}
