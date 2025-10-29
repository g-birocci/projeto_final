import { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Droplets,
  Recycle,
  PlugZap,
  HeartHandshake,
  BookOpen,
  Car,
  Flame,
  ShowerHead,
  UtensilsCrossed,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ViverSustentavel() {
  // ===== CALCULADORA =====
  const [data, setData] = useState({
    kmCarro: 10,
    carneSemana: 3,
    banhoMin: 10,
    energia: 5,
  });

  const totalImpact = Math.round(
    data.kmCarro * 0.2 + data.carneSemana * 2 + data.banhoMin * 0.5 + data.energia * 1.5
  );

  const ecoNivel =
    totalImpact < 10
      ? "Impacto Baixo — Estás a viver de forma exemplar."
      : totalImpact < 25
      ? "Impacto Moderado — Há espaço para melhorias."
      : "Impacto Alto — Pequenas mudanças farão uma grande diferença.";

  return (
    <div className="min-h-screen bg-white text-[#1E2D2F] overflow-x-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="px-6 py-28 max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-green-700 mb-6"
        >
          Viver Sustentável
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg text-[#1E2D2F]/80 max-w-2xl mx-auto leading-relaxed"
        >
          Ser sustentável é pensar no amanhã com as ações de hoje.  
          Este espaço foi criado para inspirar hábitos conscientes e mostrar como  
          cada pequena escolha pode gerar um grande impacto positivo.
        </motion.p>
      </section>

      {/* ===== CALCULA O TEU IMPACTO ===== */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">
          Calcula o teu impacto
        </h2>

        <div className="flex flex-col gap-10">
          {[
            { icon: Car, key: "kmCarro", label: "Km de carro por dia", min: 0, max: 50 },
            { icon: UtensilsCrossed, key: "carneSemana", label: "Refeições com carne por semana", min: 0, max: 14 },
            { icon: ShowerHead, key: "banhoMin", label: "Minutos de banho por dia", min: 1, max: 20 },
            { icon: Flame, key: "energia", label: "Horas de eletricidade por dia", min: 1, max: 24 },
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-3 w-64">
                <item.icon className="w-6 h-6 text-green-600" />
                <span className="font-medium text-[#1E2D2F]">{item.label}</span>
              </div>
              <input
                type="range"
                min={item.min}
                max={item.max}
                value={data[item.key]}
                onChange={(e) => setData({ ...data, [item.key]: parseInt(e.target.value) })}
                className="w-full accent-green-600 cursor-pointer"
              />
              <span className="text-green-700 font-semibold">{data[item.key]}</span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mt-16"
        >
          <p className="text-6xl font-extrabold text-green-700 mb-3">{totalImpact}</p>
          <p className="text-lg text-[#1E2D2F]/80 mb-8">{ecoNivel}</p>

          {/* barra de progresso orgânica */}
          <div className="relative w-full max-w-xl mx-auto h-3 bg-green-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalImpact / 30) * 100, 100)}%` }}
              transition={{ duration: 1 }}
              className="absolute left-0 top-0 h-full bg-green-600"
            ></motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* ===== DICAS ===== */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-24"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">Dicas sustentáveis</h2>

        <div className="space-y-8 max-w-4xl mx-auto text-lg leading-relaxed text-[#1E2D2F]/85">
          <div className="flex items-start gap-4">
            <Recycle className="w-6 h-6 text-green-600 mt-1" />
            <p><strong>Recicla sempre:</strong> o que hoje é lixo pode ser matéria-prima amanhã.</p>
          </div>

          <div className="flex items-start gap-4">
            <Droplets className="w-6 h-6 text-green-600 mt-1" />
            <p><strong>Poupa água:</strong> banhos curtos e torneiras fechadas fazem diferença.</p>
          </div>

          <div className="flex items-start gap-4">
            <PlugZap className="w-6 h-6 text-green-600 mt-1" />
            <p><strong>Usa energia consciente:</strong> desliga luzes e aparelhos quando não estiverem em uso.</p>
          </div>

          <div className="flex items-start gap-4">
            <HeartHandshake className="w-6 h-6 text-green-600 mt-1" />
            <p><strong>Compra local:</strong> apoia quem está perto e reduz o impacto do transporte.</p>
          </div>

          <div className="flex items-start gap-4">
            <Leaf className="w-6 h-6 text-green-600 mt-1" />
            <p><strong>Reutiliza:</strong> dá nova vida a frascos, roupas, objetos e ideias.</p>
          </div>

          <div className="flex items-start gap-4">
            <BookOpen className="w-6 h-6 text-green-600 mt-1" />
            <p><strong>Aprende e partilha:</strong> informação é poder — e partilhar é multiplicar impacto.</p>
          </div>
        </div>
      </motion.section>

      {/* ===== RECURSOS EDUCACIONAIS ===== */}
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
            <a href="https://www.ted.com/talks/rahwa_ghirmatzion_and_zelalem_adefris_community_powered_solutions_to_the_climate_crisis" target="_blank" className="block hover:text-green-700 transition">
              • TED Talks: o poder da comunidade
            </a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
