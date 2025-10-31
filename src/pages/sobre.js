"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardSobre from "@/components/DashboardSobre";
import Feedbacks from "@/components/Feedbacks";
import ChamadaDoacao from "@/components/Doar";
import NavbarScroll from "@/components/NavbarScroll";
import BottomPages from "@/components/BottomPages";

export default function Sobre() {
    return (
        <div className="min-h-screen bg-white text-[#1E2D2F]">
            <Navbar />
            <NavbarScroll />

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[url('/img/leaves-bg.svg')] bg-cover bg-center"
                />
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-extrabold text-green-700 mb-6"
                    >
                        Fazer o bem é contagiante
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-lg text-[#1E2D2F]/80 max-w-2xl mx-auto"
                    >
                        Acreditamos que cada gesto pode mudar o mundo.
                        No EcoDoa, transformamos doações em conexões reais e impacto sustentável.
                    </motion.p>
                </div>
            </section>

            {/* ===== DASHBOARD ===== */}
            <DashboardSobre />

            {/* ===== QUEM SOMOS ===== */}
            <motion.section
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-6 py-20 text-center"
            >
                <h2 className="text-3xl font-bold text-green-700 mb-6">Quem Somos</h2>
                <p className="text-[#1E2D2F]/80 leading-relaxed text-lg">
                    O <strong>EcoDoa</strong> é um movimento que une pessoas dispostas a partilhar o que têm
                    com quem mais precisa.
                    Não somos só uma plataforma de doações — somos uma comunidade que acredita na força das
                    pequenas ações e na responsabilidade coletiva por um futuro sustentável.
                </p>
            </motion.section>

            {/* ===== POR QUE DOAR ===== */}
            <motion.section
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 gap-10 items-center"
            >
                <div>
                    <h2 className="text-3xl font-bold text-green-700 mb-6">Por que Doar?</h2>
                    <p className="text-[#1E2D2F]/80 mb-4 text-lg">
                        Doar é um ato de amor, empatia e sustentabilidade.
                        Cada doação reduz o desperdício, inspira solidariedade e faz o bem circular
                    </p>
                    <p className="text-[#1E2D2F]/80 mb-8 text-lg">
                        O EcoDoa atua alinhado aos{" "}
                        <strong>Objetivos de Desenvolvimento Sustentável (ODS)</strong> da ONU,
                        promovendo a redução das desigualdades (ODS 10) e consumo responsável (ODS 12).
                    </p>
                    <a
                        href="https://ods.pt/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all"
                    >
                        Conhecer os ODS
                    </a>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Image
                        src="/img/sustentabilidade.jpg"
                        alt="Sustentabilidade"
                        width={420}
                        height={420}
                        className="rounded-3xl shadow-xl"
                    />
                </motion.div>
            </motion.section>
            <Feedbacks />
            <ChamadaDoacao />
            <BottomPages />
            <Footer />
        </div>
    );
}
