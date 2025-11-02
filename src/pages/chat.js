"use client";

<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
>>>>>>> main
import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ChatPage() {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  const [conversaAtiva, setConversaAtiva] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (router.query.conversa) {
      setConversaAtiva(parseInt(router.query.conversa));
    }
  }, [router.query.conversa]);

  const [conversas, setConversas] = useState([
    {
      id: 1,
      nome: "Mario",
      mensagem: "Oi! Ainda está disponível?",
      hora: "08:15 AM",
      foto: "https://images.unsplash.com/photo-1601758123927-1961c6c8e0c5?auto=format&fit=crop&w=80&q=80",
      historico: [
        { autor: "Mario", texto: "Oi! Ainda está disponível?" },
        { autor: "Você", texto: "Sim! Está novinho." },
      ],
    },
    {
      id: 2,
      nome: "Camila",
      mensagem: "Gostei muito da bicicleta!",
      hora: "09:42 AM",
      foto: "https://images.unsplash.com/photo-1502767089025-6572583495b4?auto=format&fit=crop&w=80&q=80",
      historico: [
        { autor: "Camila", texto: "Gostei muito da bicicleta!" },
        { autor: "Você", texto: "Legal! Posso reservar pra você." },
      ],
    },
    {
      id: 3,
      nome: "Rafael",
      mensagem: "Tem como entregar amanhã?",
      hora: "10:05 AM",
      foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
      historico: [
        { autor: "Rafael", texto: "Tem como entregar amanhã?" },
        { autor: "Você", texto: "Consigo sim, te aviso quando sair." },
      ],
    },
  ]);

  const conversaSelecionada = conversas.find((c) => c.id === conversaAtiva);

  const enviarMensagem = () => {
    if (mensagem.trim() === "") return;

    const novaMensagem = { autor: "Você", texto: mensagem };

    const novasConversas = conversas.map((c) =>
      c.id === conversaAtiva
        ? { ...c, historico: [...c.historico, novaMensagem] }
        : c
    );

    setConversas(novasConversas);
    setMensagem("");
  };

  return (
    <div className="flex flex-col min-h-screen">
<<<<<<< HEAD
      <div className="fixed top-5 right-5 z-50">
        <Notificacoes lista={notificacoes} />
      </div>
=======
      <Navbar />
>>>>>>> main

      <main className="grow pt-24 px-4 pb-32 max-w-6xl mx-auto">
        {!conversaAtiva ? (
          <div>
            <div className="mb-4">
              <button
                onClick={() => router.back()}
                className="text-[var(--ecodoa-accent)] text-sm hover:underline"
              >
                ← Voltar
              </button>
            </div>
            <h1 className="text-2xl font-bold mb-6 text-[var(--ecodoa-primary)]">Minhas conversas</h1>
            <Input
              placeholder="Pesquisar conversas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="mb-6 bg-ecodoa-light-olive text-ecodoa-primary placeholder-ecodoa-olive border border-ecodoa-accent rounded-md"
            />

            <ul className="space-y-4">
              {conversas
                .filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()))
                .map((c) => (
                  <li
                    key={c.id}
                    onClick={() => setConversaAtiva(c.id)}
                    className="cursor-pointer flex items-center justify-between bg-white rounded-lg shadow-md p-3 hover:bg-ecodoa-soft transition"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={c.foto}
                        alt={c.nome}
                        width={48}
                        height={48}
                        className="rounded-full border border-ecodoa-accent"
                      />
                      <div>
                        <p className="font-semibold text-ecodoa-primary">{c.nome}</p>
                        <p className="text-sm text-muted-foreground">{c.mensagem}</p>
                      </div>
                    </div>
                    <span className="text-xs text-ecodoa-olive">{c.hora}</span>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <>
            {/* Botão de voltar fora da caixa */}
            <div className="mb-4">
              <button
                onClick={() => setConversaAtiva(null)}
                className="text-[var(--ecodoa-accent)] text-sm hover:underline"
              >
                ← Voltar para lista
              </button>
            </div>

            {/* Caixa de conversa */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-ecodoa-accent flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={conversaSelecionada.foto}
                  alt={conversaSelecionada.nome}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <p className="font-semibold text-ecodoa-primary">{conversaSelecionada.nome}</p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {conversaSelecionada.historico.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[80%] p-3 rounded-lg shadow ${
                      msg.autor === "Você"
                        ? "bg-ecodoa-accent text-white self-end ml-auto"
                        : "bg-ecodoa-soft text-ecodoa-primary"
                    }`}
                  >
                    <p className="text-sm">{msg.texto}</p>
                  </div>
                ))}
              </div>

              {/* Campo de mensagem fixo e discreto */}
              <div className="flex items-center gap-4 mt-auto">
                <input
                  type="text"
                  placeholder="Escreva uma mensagem..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="flex-1 h-10 bg-ecodoa-light-olive text-ecodoa-text placeholder-ecodoa-olive border border-ecodoa-accent rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary"
                />
                <Button variant="default" onClick={enviarMensagem}>
                  Enviar
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
