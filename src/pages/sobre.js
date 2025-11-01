"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardSobre from "@/components/sections/about/DashboardSobre";
import Feedbacks from "@/components/sections/about/Feedbacks";
import ChamadaDoacao from "@/components/sections/about/Doar";
import NavbarScroll from "@/components/layout/NavbarScroll";
import { HeartHandshake } from "lucide-react";

export default function Sobre() {
  // Layout ajustado para ser fixo em escala mobile, removendo classes responsivas e ajustando fontes.
  return (
    <div className="min-h-screen bg-white text-[#1E2D2F]">
      <Navbar />
      <NavbarScroll />
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--ecodoa-accent)] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--ecodoa-primary)] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-green-700 mb-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl font-black text-[var(--ecodoa-primary)] mb-6 leading-tight"
            >
              Fazer o bem é contagiante
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg text-[var(--ecodoa-secondary)]/70 max-w-3xl mx-auto leading-relaxed"
            >
              Acreditamos que cada gesto pode mudar o mundo.
              No <strong className="text-[var(--ecodoa-primary)]">EcoDoa</strong>,
              transformamos doações em conexões reais e impacto sustentável.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 gap-10 items-center">
        <div className="bg-white rounded-3xl shadow-2xl border border-[var(--ecodoa-soft)]/20 overflow-hidden">
          <DashboardSobre />
        </div>
      </motion.div>

      {/*QUEM SOMOS*/}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-16"
      >
        <div className="relative bg-gradient-to-br from-[var(--ecodoa-primary)] to-[var(--ecodoa-secondary)] rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--ecodoa-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

          <div className="relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-black text-white mb-6"
            >
              Quem Somos
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-base text-white/90 leading-relaxed max-w-3xl mx-auto"
            >
              O <strong className="text-[var(--ecodoa-accent)]">EcoDoa</strong> é um movimento que une pessoas dispostas a partilhar o que têm
              com quem mais precisa. Não somos só uma plataforma de doações — somos uma comunidade
              que acredita na força das pequenas ações e na responsabilidade coletiva por um futuro
              sustentável.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* POR QUE DOAR  */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-2 bg-[var(--ecodoa-accent)]/20 text-[var(--ecodoa-olive)] rounded-full text-sm font-bold uppercase tracking-wide">
              Nossa Missão
            </span>

            <h2 className="text-3xl font-black text-[var(--ecodoa-primary)] leading-tight">
              Por que Doar?
            </h2>

            <div className="space-y-4">
              <p className="text-lg text-[var(--ecodoa-secondary)]/80 leading-relaxed">
                Doar é um ato de <strong className="text-[var(--ecodoa-primary)]">amor, empatia e sustentabilidade</strong>.
                Cada doação reduz o desperdício, inspira solidariedade e faz o bem circular.
              </p>

              <div className="bg-[var(--ecodoa-soft)]/20 border-l-4 border-[var(--ecodoa-accent)] p-4 rounded-r-xl">
                <p className="text-[var(--ecodoa-secondary)]/90 text-lg leading-relaxed">
                  O EcoDoa atua alinhado aos{" "}
                  <strong className="text-[var(--ecodoa-primary)]">Objetivos de Desenvolvimento Sustentável (ODS)</strong> da ONU,
                  promovendo a <strong>redução das desigualdades (ODS 10)</strong> e <strong>consumo responsável (ODS 12)</strong>.
                </p>
              </div>
            </div>

            <motion.a
              href="https://ods.pt/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[var(--ecodoa-primary)] text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-[var(--ecodoa-secondary)] transition-all duration-300"
            >
              Conhecer os ODS
              <span className="text-xl">→</span>
            </motion.a>
          </motion.div>

          {/* Imagem com Decoração */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decoração Circular Atrás */}
            <div className="absolute -top-8 -right-8 w-full h-full bg-[var(--ecodoa-accent)]/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-full h-full bg-[var(--ecodoa-primary)]/10 rounded-3xl -z-10" />

            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
              <Image
                src="/img/sustentabilidade.jpg"
                alt="Sustentabilidade"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ecodoa-primary)]/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.section>
      <Feedbacks />
      <ChamadaDoacao/>
      <Footer />
    </div>
  );
}


