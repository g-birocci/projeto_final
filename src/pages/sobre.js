import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TreePine, Users, Recycle, Globe, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Sobre() {
  // ==== DASHBOARD COUNTER ====
  const [counts, setCounts] = useState({ itens: 0, doadores: 0, residuos: 0, projetos: 0 });

  useEffect(() => {
    const targets = { itens: 1247, doadores: 342, residuos: 1850, projetos: 12 };
    const duration = 1800;
    const start = Date.now();

    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setCounts({
        itens: Math.floor(progress * targets.itens),
        doadores: Math.floor(progress * targets.doadores),
        residuos: Math.floor(progress * targets.residuos),
        projetos: Math.floor(progress * targets.projetos),
      });
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, []);

  // ==== FEEDBACKS ====
  const feedbacks = [
    { nome: "Carla, 32 anos", texto: "Recebi roupas e brinquedos pelo EcoDoa. Foi mais do que uma doação — foi um gesto de esperança." },
    { nome: "Rui, 47 anos", texto: "Doei ferramentas antigas que estavam guardadas há anos. Hoje, elas ajudam uma oficina comunitária!" },
    { nome: "Inês, 24 anos", texto: "Ver o impacto direto das doações me fez acreditar no poder das pequenas ações." },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1E2D2F]">
      <Navbar />

      {/* ===== HERO + DASHBOARD ===== */}
      <section className="relative overflow-hidden py-20">
        {/* Fundo orgânico com Leaf e shapes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/img/leaves-bg.svg')] bg-cover bg-center"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6 text-center"
          >
            Fazer o bem é contagiante 
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg text-center text-[#1E2D2F]/80 max-w-2xl mx-auto mb-12"
          >
            Acreditamos que cada gesto pode mudar o mundo.  
            No EcoDoa, transformamos doações em conexões reais e impacto sustentável.
          </motion.p>

          {/* DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { icon: TreePine, value: counts.itens, label: "Itens Reutilizados" },
              { icon: Users, value: counts.doadores, label: "Doadores Ativos" },
              { icon: Recycle, value: counts.residuos, label: "Kg de Resíduos Evitados" },
              { icon: Globe, value: counts.projetos, label: "Projetos Sustentáveis" },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center"
              >
                <s.icon className="w-10 h-10 text-green-600 mb-3" />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-extrabold text-green-700"
                >
                  {s.value}
                </motion.p>
                <p className="text-sm text-[#1E2D2F]/70">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
  className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center"
>
  <div>
    <h2 className="text-3xl font-bold text-green-700 mb-6">Por que Doar?</h2>
    <p className="text-[#1E2D2F]/80 mb-4 text-lg">
      Doar é um ato de amor, de empatia e também de sustentabilidade.  
      Reutilizar é cuidar das pessoas e do planeta.  
      Cada doação reduz o desperdício, inspira solidariedade e faz o bem circular.
    </p>
    <p className="text-[#1E2D2F]/80 mb-8 text-lg">
      O EcoDoa atua alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU,
      principalmente ao promover a redução das desigualdades (ODS 10) e consumo consciente (ODS 12).
    </p>

    {/* botão + imagem lado a lado */}
    <div className="flex items-center gap-4 mt-4">
      <a
        href="https://ods.pt/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all"
      >
        Conhecer os ODS
      </a>
    </div>
  </div>

  {/* imagem principal da secao */}
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

      {/* ===== FEEDBACKS ===== */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-green-50"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          Vozes que Inspiram 
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {feedbacks.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-3xl shadow-md p-8"
            >
              <p className="text-[#1E2D2F]/80 italic mb-6 text-lg leading-relaxed">“{f.texto}”</p>
              <p className="text-green-700 font-semibold">{f.nome}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== BOTÃO "QUERO DOAR" ===== */}
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="py-24 flex flex-col items-center justify-center text-center bg-white"
>
  <h2 className="text-3xl font-bold text-green-700 mb-6">
    Pronto para fazer parte dessa corrente do bem?
  </h2>
  <p className="text-[#1E2D2F]/80 mb-10 max-w-xl">
    Cada doação transforma não só quem recebe, mas também quem doa. 
    Juntos, criamos um ciclo de empatia e sustentabilidade.
  </p>

  <motion.a
    href="/doacao" // <- muda aqui se tua página tiver outro nome
    whileHover={{ scale: 1.08, backgroundColor: "#16a34a" }}
    whileTap={{ scale: 0.95 }}
    className="bg-green-600 text-white font-semibold px-10 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
  >
    Quero Doar 
  </motion.a>
</motion.section>

      <Footer />
    </div>
  );
}
