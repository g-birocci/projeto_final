"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardSobre from "@/components/sections/about/DashboardSobre";
import Feedbacks from "@/components/sections/about/Feedbacks";
import ChamadaDoacao from "@/components/sections/about/ChamadaDoacao";
import NavbarScroll from "@/components/layout/NavbarScroll";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-[var(--ecodoa-bg)] text-[var(--ecodoa-text)] overflow-hidden">
      <Navbar />
      <NavbarScroll />
      <section className="relative overflow-hidden pt-28 pb-16 px-5 text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-56 h-56 bg-[var(--ecodoa-accent)] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[var(--ecodoa-primary)] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-black text-[var(--ecodoa-primary)] mb-5 leading-tight"
          >
            Fazer o bem é contagiante
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base sm:text-lg text-[var(--ecodoa-secondary)]/80 leading-relaxed"
          >
            Acreditamos que cada gesto pode mudar o mundo.
            No <strong className="text-[var(--ecodoa-primary)]">EcoDoa</strong>,
            transformamos doações em conexões reais e impacto sustentável.
          </motion.p>
        </div>
      </section>

      {/* DASHBOARD SOBRE  */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-md sm:max-w-5xl mx-auto px-4 pb-16"
      >
        <div className="bg-white rounded-3xl shadow-lg border border-[var(--ecodoa-soft)]/20 overflow-hidden">
          <DashboardSobre />
        </div>
      </motion.div>

     {/* QUEM SOMOS */}
<motion.section
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="max-w-4xl mx-auto px-6 py-20 text-center bg-white"
>
  {/* Logo EcoDoa*/}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="flex justify-center mb-6"
  >
    <img
      src="/img/EcoDoa.svg"
      alt="Logo EcoDoa"
      className="w-20 h-20 object-contain opacity-90"
    />
  </motion.div>

  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    viewport={{ once: true }}
    className="text-3xl font-extrabold text-[var(--ecodoa-primary)] mb-6"
  >
    Quem Somos
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    viewport={{ once: true }}
    className="text-lg text-[var(--ecodoa-text)]/80 leading-relaxed max-w-3xl mx-auto"
  >
    O <strong className="text-[var(--ecodoa-primary)]">EcoDoa</strong> nasceu da vontade de provar que 
    <span className="text-[var(--ecodoa-accent)] font-semibold"> pequenas ações mudam o mundo</span>.
    Somos uma comunidade que acredita no poder de doar, partilhar e cuidar.
  </motion.p>

  <div className="relative mt-10 flex justify-center">
    <div className="absolute w-60 h-60 bg-[var(--ecodoa-accent)]/10 rounded-full blur-3xl -z-10 top-0" />
    <img
      src="/img/community-eco.jpg"
      alt="Comunidade EcoDoa"
      className="rounded-3xl shadow-xl object-cover border border-[var(--ecodoa-soft)]/30 w-full max-w-lg"
    />
  </div>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    viewport={{ once: true }}
    className="text-base text-[var(--ecodoa-secondary)]/70 leading-relaxed mt-8"
  >
    Cada doação é uma semente plantada. Cada gesto, um elo na corrente do bem.  
    <strong className="text-[var(--ecodoa-primary)]"> EcoDoa </strong> é mais do que um projeto, é um convite para fazermos juntos o futuro florescer.
  </motion.p>
</motion.section>

      {/* POR QUE DOAR */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-2 bg-[var(--ecodoa-accent)]/20 text-[var(--ecodoa-olive)] rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide">
              Nossa Missão
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-[var(--ecodoa-primary)]">
              Por que Doar?
            </h2>

            <p className="text-base sm:text-lg text-[var(--ecodoa-secondary)]/80 leading-relaxed">
              Doar é um ato de <strong className="text-[var(--ecodoa-primary)]">amor, empatia e sustentabilidade</strong>.
              Cada doação reduz o desperdício, inspira solidariedade e faz o bem circular.
            </p>

            <div className="bg-[var(--ecodoa-soft)]/20 border-l-4 border-[var(--ecodoa-accent)] p-4 rounded-r-xl">
              <p className="text-[var(--ecodoa-secondary)]/90 text-base leading-relaxed">
                O EcoDoa atua alinhado aos{" "}
                <strong className="text-[var(--ecodoa-primary)]">Objetivos de Desenvolvimento Sustentável (ODS)</strong> da ONU,
                promovendo a <strong>redução das desigualdades (ODS 10)</strong> e <strong>consumo responsável (ODS 12)</strong>.
              </p>
            </div>

            <motion.a
              href="https://ods.pt/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[var(--ecodoa-primary)] text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-[var(--ecodoa-secondary)] transition-all duration-300"
            >
              Conhecer os ODS →
            </motion.a>
          </div>
        </div>
      </motion.section>

      <Feedbacks />
      <ChamadaDoacao />
      <Footer />
    </div>
  );
}
