"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-[var(--ecodoa-text)]">
      {/* Hero */}
      <section className="relative">
        <div
          className="h-[60vh] min-h-[520px] w-full bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400&auto=format&fit=crop")',
          }}
        >
          <div className="max-w-screen-lg mx-auto px-8">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-md">EcoDoa</h1>
            <p className="mt-4 text-xl text-white/95 max-w-2xl drop-shadow">
              Conectamos quem quer doar com quem mais precisa — com simplicidade,
              transparência e impacto real.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/app">
                <Button variant="default" className="bg-[var(--ecodoa-primary)] text-white">
                  Entrar no App
                </Button>
              </Link>
              <Link href="/sobre">
                <Button variant="outline">Conheça a iniciativa</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="max-w-screen-lg mx-auto px-8 py-16 grid grid-cols-3 gap-8">
        <div className="bg-white rounded-lg border border-[var(--ecodoa-accent)]/40 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--ecodoa-primary)]">Doe com facilidade</h3>
          <p className="text-sm opacity-80 mt-2">
            Publique itens em poucos cliques e ajude sua comunidade local.
          </p>
        </div>
        <div className="bg-white rounded-lg border border-[var(--ecodoa-accent)]/40 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--ecodoa-primary)]">Transparência</h3>
          <p className="text-sm opacity-80 mt-2">
            Acompanhe conversas e doações diretamente no aplicativo.
          </p>
        </div>
        <div className="bg-white rounded-lg border border-[var(--ecodoa-accent)]/40 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--ecodoa-primary)]">Impacto real</h3>
          <p className="text-sm opacity-80 mt-2">
            Conecte pessoas e reduza o desperdício, promovendo economia circular.
          </p>
        </div>
      </section>

      {/* Institucional */}
      <section className="max-w-screen-lg mx-auto px-8 pb-20">
        <div className="bg-[var(--ecodoa-soft)]/60 rounded-lg p-8 border border-[var(--ecodoa-accent)]/30">
          <h2 className="text-2xl font-bold text-[var(--ecodoa-primary)]">Nossa cultura</h2>
          <p className="mt-2 opacity-80 max-w-3xl">
            Conheça mais sobre nossos valores, como viver a sustentabilidade e a história por trás do projeto.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/viver">
              <Button variant="default">Viver sustentável</Button>
            </Link>
            <Link href="/sobre">
              <Button variant="outline">Sobre a EcoDoa</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
