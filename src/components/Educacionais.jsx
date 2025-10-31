"use client";

import { Book, Video, ExternalLink, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Educacionais() {
  const educationalResources = [
    {
      category: "Leituras Recomendadas",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop",
      items: [
        {
          title: "Guia da ONU sobre os ODS",
          description:
            "Objetivos de Desenvolvimento Sustentável para transformar o mundo",
          time: "15 min",
          url: "https://ods.pt/",
        },
        {
          title: "Economia Circular",
          description:
            "O futuro da produção sustentável e regenerativa",
          time: "20 min",
          url: "https://ellenmacarthurfoundation.org/",
        },
        {
          title: "Igualdade e Justiça Climática",
          description:
            "Como combater as desigualdades ambientais globais",
          time: "18 min",
          url: "https://www.oxfam.org/en",
        },
      ],
    },
    {
      category: "Recursos Multimédia",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=800&fit=crop",
      items: [
        {
          title: 'Documentário "Nosso Planeta"',
          description:
            "Série impressionante sobre a beleza e fragilidade da Terra",
          time: "8 episódios",
          url: "https://www.netflix.com/title/80049832",
        },
        {
          title: 'Podcast "Sustentabilidade em Ação"',
          description:
            "Conversas inspiradoras sobre práticas sustentáveis",
          time: "30–45 min",
          url: "https://open.spotify.com/show/22a2vUF8kA7I7Rio9Egyrh",
        },
        {
          title: "TED Talk: O Poder da Comunidade",
          description:
            "Soluções climáticas baseadas na força coletiva",
          time: "12 min",
          url: "https://www.ted.com/talks/rahwa_ghirmatzion_and_zelalem_adefris_community_powered_solutions_to_the_climate_crisis",
        },
      ],
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 py-24 bg-[var(--ecodoa-bg)]"
    >
      {/* Cabeçalho */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-[var(--ecodoa-primary)] mb-3">
          Recursos Educacionais
        </h2>
        <p className="text-[var(--ecodoa-text)]/70 text-lg">
          Aprende mais sobre sustentabilidade e impacto social
        </p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 gap-10">
        {educationalResources.map((section, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative bg-white rounded-3xl shadow-lg overflow-hidden border border-[var(--ecodoa-soft)] hover:shadow-2xl transition-all duration-300"
          >
            {/* Imagem de topo */}
            <div className="relative h-48">
              <img
                src={section.image}
                alt={section.category}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ecodoa-primary)]/80 to-transparent flex items-end p-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="bg-[var(--ecodoa-accent)] p-2 rounded-lg">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{section.category}</h3>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6 space-y-5">
              {section.items.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group p-4 rounded-xl bg-[var(--ecodoa-green)]/20 hover:bg-[var(--ecodoa-green)]/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-[var(--ecodoa-primary)] group-hover:text-[var(--ecodoa-secondary)] transition-colors">
                      {item.title}
                    </h4>
                    <ExternalLink className="w-5 h-5 text-[var(--ecodoa-olive)] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-sm text-[var(--ecodoa-text)]/80 leading-relaxed mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--ecodoa-olive)] font-medium">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
