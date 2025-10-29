"use client";

import { motion } from "framer-motion";

export default function PartnersSection() {
  const partners = [
    { name: "Banco Alimentar do Porto", city: "Porto", desc: "Recolhe e distribui alimentos para famílias e instituições sociais.", site: "https://www.bancoalimentar.pt/" },
    { name: "Cáritas Portuguesa", city: "Lisboa", desc: "Rede nacional de solidariedade que apoia quem mais precisa.", site: "https://www.caritas.pt/" },
    { name: "Comunidade Vida e Paz", city: "Lisboa", desc: "Apoia pessoas em situação de sem-abrigo com alimentação e reinserção social.", site: "https://www.cvidaepaz.pt/" },
    { name: "Associação Crescer", city: "Lisboa", desc: "Promove inclusão social e apoio a migrantes e pessoas vulneráveis.", site: "https://crescer.org/" },
    { name: "Re-Food", city: "Coimbra", desc: "Reduz o desperdício alimentar e redistribui refeições locais.", site: "https://www.re-food.org/" },
    { name: "Serve the City Portugal", city: "Porto", desc: "Movimento de voluntariado urbano e comunitário.", site: "https://servethecity.pt/" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-10">Parceiros que fazem a diferença</h2>
      <p className="text-center text-[#1E2D2F]/70 max-w-2xl mx-auto mb-12">
        O EcoDoa só existe porque várias organizações e pessoas acreditam num futuro mais solidário.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {partners.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md hover:scale-[1.02] transition-all"
          >
            <h3 className="text-lg font-bold text-green-700 mb-1">{p.name}</h3>
            <p className="text-sm text-[#1E2D2F]/70 mb-3">{p.city}</p>
            <p className="text-sm text-[#1E2D2F]/80 mb-4 leading-relaxed">{p.desc}</p>
            <a href={p.site} target="_blank" rel="noopener noreferrer" className="text-green-700 text-sm font-semibold hover:underline">
              Visitar site →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
