"use client";

import { Book, Video, ExternalLink, Clock } from "lucide-react";
<PartnersSection scrollFn={handleScroll} refProp={partnersRef} />

const handleScroll = (ref, direction) => {
  const container = ref.current;
  if (!container) return;
  const scrollAmount = 400;
  container.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};


export default function Educacionais({ scroll, refProp }) {
  const educationalResources = [
    {
      category: "Leituras Recomendadas",
      icon: <Book className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      items: [
        {
          title: "Guia da ONU sobre os ODS",
          url: "https://ods.pt/",
          description: "Objetivos de Desenvolvimento Sustentável para transformar o mundo",
          time: "15 min",
        },
        {
          title: "Economia Circular",
          url: "https://ellenmacarthurfoundation.org/",
          description: "O futuro da produção sustentável e regenerativa",
          time: "20 min",
        },
        {
          title: "Igualdade e Justiça Climática",
          url: "https://www.oxfam.org/en",
          description: "Como combater as desigualdades ambientais globais",
          time: "18 min",
        },
      ],
    },
    {
      category: "Inspiração Multimédia",
      icon: <Video className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop",
      items: [
        {
          title: 'Documentário "Nosso Planeta"',
          url: "https://www.netflix.com/title/80049832",
          description: "Série impressionante sobre a beleza e fragilidade da Terra",
          time: "8 episódios",
        },
        {
          title: 'Podcast "Sustentabilidade"',
          url: "https://open.spotify.com/show/22a2vUF8kA7I7Rio9Egyrh",
          description: "Conversas inspiradoras sobre práticas sustentáveis",
          time: "30-45 min",
        },
        {
          title: "TED Talk: O Poder da Comunidade",
          url: "https://www.ted.com/talks/rahwa_ghirmatzion_and_zelalem_adefris_community_powered_solutions_to_the_climate_crisis",
          description: "Soluções climáticas baseadas na força coletiva",
          time: "12 min",
        },
      ],
    },
  ];

  return (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-[var(--ecodoa-primary)] mb-3">
          Recursos Educacionais
        </h2>
        <p className="text-[var(--ecodoa-text)]/70 text-lg">
          Aprenda mais sobre sustentabilidade e impacto social
        </p>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll(refProp, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-secondary)] text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        >
          ‹
        </button>

        <div ref={refProp} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {educationalResources.map((resource, idx) => (
            <div key={idx} className="flex-none w-[450px]">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[var(--ecodoa-soft)] hover:border-[var(--ecodoa-accent)] transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.category}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ecodoa-primary)]/90 to-transparent flex items-end p-6">
                    <div className="flex items-center gap-3 text-white">
                      <div className="bg-[var(--ecodoa-accent)] text-[var(--ecodoa-text)] p-2 rounded-lg">
                        {resource.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{resource.category}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {resource.items.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl bg-[var(--ecodoa-green)]/20 hover:bg-[var(--ecodoa-accent)]/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold text-[var(--ecodoa-primary)] flex-1">
                          {item.title}
                        </h4>
                        <ExternalLink className="w-5 h-5 text-[var(--ecodoa-olive)] flex-shrink-0" />
                      </div>
                      <p className="text-sm text-[var(--ecodoa-text)]/70 mb-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[var(--ecodoa-olive)] font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(refProp, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-secondary)] text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        >
          ›
        </button>
      </div>
    </section>
  );
}
