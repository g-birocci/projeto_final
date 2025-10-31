import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function DetalheDoacao() {
  const fotos = [
    "https://images.unsplash.com/photo-1663144256992-6b69263cc521?auto=format&fit=crop&q=80&w=736",
    "https://images.unsplash.com/photo-1651888947765-2e0ec570bc9d?auto=format&fit=crop&q=80&w=736",
    "https://images.unsplash.com/photo-1689402059849-02c1b5a7931b?auto=format&fit=crop&q=80&w=736",
  ];

  return (
    <div>
      <Navbar />

      {/* Botão voltar */}
      <div className="z-8 px-4 pt-20">
        <a
          href="/"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-gray-100 transition-all shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </a>
      </div>

     
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Galeria */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex-1">
            <img
              src={fotos[0]}
              alt="Foto principal"
              className="rounded-lg object-cover w-full h-[400px] shadow-md"
            />
          </div>
          <div className="flex flex-col gap-4 w-40">
            {fotos.slice(1).map((foto, index) => (
              <img
                key={index}
                src={foto}
                alt={`Foto ${index + 2}`}
                className="rounded-lg object-cover w-full h-20 shadow-sm hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Informações do item */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-[#265c14ad]">Mesa com 4 cadeiras</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Categoria: Móveis &nbsp;•&nbsp; Estado: Usado, bom estado &nbsp;•&nbsp; Cor: Branca
          </p>
          <p className="text-lg text-[#090871ff] mt-4 leading-relaxed">
            Mesa com 4 Cadeiras, bom estado de conservação, estou doando pois estou de mudança. Retirar em Matosinhos, enviar mensagem para combinar.
          </p>
        </section>

        {/* Perfil do doador */}
        <section className="mb-6">
          <p className="text-sm text-muted-foreground">
            Doado por{" "} 
            <a
              href="/perfil/gabriela.silva"
              className="text-green-800 hover:underline"
            >
              @gabriela.silva
            </a>
          </p>
        </section>

        {/* Botão de mensagem */}
        <div className="mb-12">
          <Button variant="default" size="sm">
            Enviar mensagem
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
