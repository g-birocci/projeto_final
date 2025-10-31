"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";
import Notificacoes from "@/components/ui/Notificacoes"; //importei aqui o Notificaçao apenas para ficar visivel para configurar.
import Image from "next/image";

export default function ChatPage() {
  const [busca, setBusca] = useState("");
  const [conversaAtiva, setConversaAtiva] = useState(1); // conversa aberta por padrão
  const [mensagem, setMensagem] = useState("");

  const [conversas, setConversas] = useState([
    {
      id: 1,
      nome: "Mario",
      mensagem: "Oi! Ainda está disponível?",
      hora: "08:15 AM",
      foto: "https://images.unsplash.com/photo-1601758123927-1961c6c8e0c5?auto=format&fit=crop&w=80&q=80",
      notificacoes: 2,
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
      notificacoes: 1,
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
      notificacoes: 3,
      historico: [
        { autor: "Rafael", texto: "Tem como entregar amanhã?" },
        { autor: "Você", texto: "Consigo sim, te aviso quando sair." },
      ],
    },
    {
      id: 4,
      nome: "Juliana",
      mensagem: "Esse sofá tá lindo!",
      hora: "11:20 AM",
      foto: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=80&q=80",
      notificacoes: 0,
      historico: [
        { autor: "Juliana", texto: "Esse sofá tá lindo!" },
        { autor: "Você", texto: "Obrigada! Tá disponível ainda." },
      ],
    },
    {
      id: 5,
      nome: "Bruno",
      mensagem: "Pode me mandar mais fotos?",
      hora: "12:45 PM",
      foto: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=80&q=80",
      notificacoes: 1,
      historico: [
        { autor: "Bruno", texto: "Pode me mandar mais fotos?" },
        { autor: "Você", texto: "Claro! Te envio agora." },
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

  const notificacoes = [
    {
      titulo: "Novo like na sua doação",
      descricao: "João curtiu sua bicicleta",
      hora: "20:45",
      lida: false,
    },
    {
      titulo: "Nova mensagem",
      descricao: "Camila: Gostei muito da bicicleta!",
      hora: "20:30",
      lida: false,
    },
    {
      titulo: "Entrega marcada",
      descricao: "Rafael confirmou entrega amanhã",
      hora: "19:15",
      lida: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-5 right-5 z-50">
        <Notificacoes lista={notificacoes} />
      </div>

      <main className="grow pt-24 px-4 pb-32 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lista de conversas */}
        <div>
          <h1
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--ecodoa-primary)" }}
          >
            Minhas conversas
          </h1>
          <Input
            placeholder="Pesquisar conversas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="mb-6 bg-ecodoa-light-olive text-ecodoa-primary placeholder-ecodoa-olive border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary rounded-md"
          />

          <ul className="space-y-4"></ul>

          <ul className="space-y-4">
            {conversas
              .filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()))
              .map((c) => (
                <li
                  key={c.id}
                  onClick={() => setConversaAtiva(c.id)}
                  className={`cursor-pointer flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:bg-ecodoa-soft transition ${
                    conversaAtiva === c.id
                      ? "border-2 border-ecodoa-accent"
                      : ""
                  }`}
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
                      <p className="font-semibold text-ecodoa-primary">
                        {c.nome}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {c.mensagem}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-ecodoa-olive">{c.hora}</span>
                    {c.notificacoes > 0 && (
                      <span className="mt-1 bg-ecodoa-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                        {c.notificacoes}
                      </span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Conversa ativa */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-ecodoa-accent flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={conversaSelecionada.foto}
                alt={conversaSelecionada.nome}
                width={40} // w-10 = 10 * 4 = 40px
                height={40} // h-10 = 40px
                className="rounded-full object-cover"
              />
              <p className="font-semibold text-ecodoa-primary">
                {conversaSelecionada.nome}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {conversaSelecionada.historico.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.autor === "Você"
                      ? "bg-ecodoa-accent text-ecodoa-text self-end ml-auto"
                      : "bg-ecodoa-soft text-ecodoa-primary"
                  } shadow`}
                >
                  <p className="text-sm">{msg.texto}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 mt-auto">
            <Input
              placeholder="Escreva uma mensagem..."
              className="flex-1 bg-ecodoa-light-olive text-ecodoa-text placeholder-ecodoa-olive border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary rounded-md"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
            <Button variant="default" onClick={enviarMensagem}>
              Enviar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
