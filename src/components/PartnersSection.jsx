"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Heart, Users, ExternalLink } from "lucide-react";

export default function PartnersSection() {
  const sectionRef = useRef(null);

  const handleScroll = (ref, direction) => {
    if (!ref.current) return;
    const scrollAmount = 400;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const partners = [
        {
      name: "Bytes4Future",
      city: "Portugal",
      desc: "Programa educativo que transforma jovens através da formação tecnológica e inclusão digital.",
      site: "https://bytes4future.pt/",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      impact: "+500 jovens formados",
      volunteers: "50+ mentores e parceiros",
    },
    {
      name: "Banco Alimentar do Porto",
      city: "Porto",
      desc: "Recolhe e distribui alimentos para famílias e instituições sociais em situação de vulnerabilidade.",
      site: "https://www.bancoalimentar.pt/",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop",
      impact: "5M+ refeições/ano",
      volunteers: "2000+ voluntários",
    },
    {
      name: "Cáritas Portuguesa",
      city: "Lisboa",
      desc: "Rede nacional de solidariedade que apoia quem mais precisa com alimentação, habitação e integração social.",
      site: "https://www.caritas.pt/",
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
      impact: "100K+ pessoas apoiadas",
      volunteers: "5000+ voluntários",
    },
    {
      name: "Comunidade Vida e Paz",
      city: "Lisboa",
      desc: "Apoia pessoas em situação de sem-abrigo com alimentação, apoio psicológico e programas de reinserção social.",
      site: "https://www.cvidaepaz.pt/",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
      impact: "300+ pessoas/dia",
      volunteers: "150+ voluntários",
    },
    {
      name: "Associação Crescer",
      city: "Lisboa",
      desc: "Promove inclusão social e apoio a migrantes e pessoas vulneráveis através de programas integrados.",
      site: "https://crescer.org/",
      image:
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop",
      impact: "1000+ famílias apoiadas",
      volunteers: "200+ voluntários",
    },
    {
      name: "Serve the City Portugal",
      city: "Porto",
      desc: "Movimento de voluntariado urbano e comunitário que promove ações práticas de solidariedade.",
      site: "https://servethecity.pt/",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
      impact: "20K+ horas voluntariado",
      volunteers: "800+ voluntários",
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-[var(--ecodoa-bg)]">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-[var(--ecodoa-primary)] mb-3">
          Parceiros que Fazem a Diferença
        </h2>
        <p className="text-[var(--ecodoa-text)]/70 text-lg">
          Organizações que acreditam num futuro mais solidário e sustentável
        </p>
      </div>

      {/* Wrapper principal */}
      <div className="relative group">
        {/* Botão Esquerda */}
        <button
          onClick={() => handleScroll(sectionRef, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-secondary)] text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
          aria-label="Scroll esquerda"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Conteúdo Scrolling */}
        <div
          ref={sectionRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
<<<<<<< HEAD
              className="flex-none w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-[var(--ecodoa-light-olive)] hover:border-[var(--ecodoa-accent)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
=======
              className="flex-none w-[380px] bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-[var(--ecodoa-light-olive)] hover:border-[var(--ecodoa-accent)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
>>>>>>> main
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[var(--ecodoa-accent)] text-[var(--ecodoa-text)] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {partner.city}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-[var(--ecodoa-primary)] mb-3">
                  {partner.name}
                </h3>

                <p className="text-[var(--ecodoa-text)]/80 leading-relaxed mb-4 flex-1">
                  {partner.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-[var(--ecodoa-green)]/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[var(--ecodoa-alert)]" />
                    <div>
                      <p className="text-xs text-[var(--ecodoa-text)]/60">
                        Impacto
                      </p>
                      <p className="text-sm font-bold text-[var(--ecodoa-primary)]">
                        {partner.impact}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[var(--ecodoa-olive)]" />
                    <div>
                      <p className="text-xs text-[var(--ecodoa-text)]/60">
                        Equipa
                      </p>
                      <p className="text-sm font-bold text-[var(--ecodoa-primary)]">
                        {partner.volunteers}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={partner.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-secondary)] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  <span>Visitar Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botão Direita */}
        <button
          onClick={() => handleScroll(sectionRef, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-secondary)] text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          aria-label="Scroll direita"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
