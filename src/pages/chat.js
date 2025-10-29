import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";

export default function ChatPage() {
  const [busca, setBusca] = useState("");
  const [conversaAtiva, setConversaAtiva] = useState(1); // conversa aberta por padrão
  const [mensagem, setMensagem] = useState("");


  const [conversas, setConversas] = useState([
    {
      id: 1,
      nome: "Mario",
      mensagem: "Oi! Ainda está disponível?",
      hora: "2:38 AM",
      foto: "https://images.unsplash.com/photo-1601758123927-1961c6c8e0c5?auto=format&fit=crop&w=80&q=80",
      notificacoes: 2,
      historico: [
        { autor: "Mario", texto: "Oi! Ainda está disponível?" },
        { autor: "Você", texto: "Sim! Está novinho." },
      ],
    },
    {
      id: 2,
      nome: "Gabriel",
      mensagem: "Tenho interesse no casaco!",
      hora: "2:38 AM",
      foto: "https://images.unsplash.com/photo-1601758123927-1961c6c8e0c5?auto=format&fit=crop&w=80&q=80",
      notificacoes: 2,
      historico: [
        { autor: "Gabriel", texto: "Tenho interesse no casaco!" },
        { autor: "Você", texto: "Claro! Posso enviar amanhã." },
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
      <Navbar />

      <main className="flex-grow pt-24 px-4 pb-32 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lista de conversas */}
        <div>
          <h1 className="text-2xl font-bold mb-6 text-foreground">Minhas conversas</h1>

        

          <ul className="space-y-4">
            {conversas
              .filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()))
              .map((c) => (
                <li
                  key={c.id}
                  onClick={() => setConversaAtiva(c.id)}
                  className={`cursor-pointer flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:bg-ecodoa-soft transition ${
                    conversaAtiva === c.id ? "border-2 border-ecodoa-accent" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={c.foto}
                      alt={c.nome}
                      className="w-12 h-12 rounded-full border border-ecodoa-accent"
                    />
                    <div>
                      <p className="font-semibold text-ecodoa-primary</p>
                      <p className="text-sm text-muted-foreground">{c.mensagem}</p>
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
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={conversaSelecionada.foto}
                alt={conversaSelecionada.nome}
                className="w-10 h-10 rounded-full object-cover"
              />
                <p className="font-semibold text-ecodoa-primary">{conversaSelecionada.nome}</p>
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

          <div className="flex items-center gap-2 mt-auto">
            <Input
              placeholder="Escreva uma mensagem..."
              className="flex-1 bg-ecodoa-accent text-ecodoa-text placeholder-ecodoa-olive border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary rounded-md"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
            <Button variant="default" onClick={enviarMensagem}>
              Enviar
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
