"use client";

import { motion } from "framer-motion";

export default function Educacionais() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto px-6 py-24 border-t border-green-100"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-16 text-center">Recursos educacionais</h2>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#1E2D2F]">Leituras recomendadas</h3>
          <a href="https://ods.pt/" target="_blank" className="block hover:text-green-700 transition">
            • Guia da ONU sobre os Objetivos de Desenvolvimento Sustentável
          </a>
          <a href="https://ellenmacarthurfoundation.org/" target="_blank" className="block hover:text-green-700 transition">
            • Economia Circular e o futuro da produção
          </a>
          <a href="https://www.oxfam.org/en" target="_blank" className="block hover:text-green-700 transition">
            • Igualdade e justiça climática
          </a>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#1E2D2F]">Inspiração multimédia</h3>
          <a href="https://www.netflix.com/title/80049832" target="_blank" className="block hover:text-green-700 transition">
            • Documentário “Nosso Planeta” (Netflix)
          </a>
          <a href="https://open.spotify.com/show/22a2vUF8kA7I7Rio9Egyrh" target="_blank" className="block hover:text-green-700 transition">
            • Podcast “Sustentabilidade em Ação”
          </a>
          <a
            href="https://www.ted.com/talks/rahwa_ghirmatzion_and_zelalem_adefris_community_powered_solutions_to_the_climate_crisis"
            target="_blank"
            className="block hover:text-green-700 transition"
          >
            • TED Talk: o poder da comunidade
          </a>
        </div>
      </div>
    </motion.section>
  );
}
