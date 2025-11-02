"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";

import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import {
  listConversations,
  getMessages,
  sendMessage as sendMessageApi,
  markRead,
} from "@/services/api";\nimport { io } from "socket.io-client";

export default function ChatPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [busca, setBusca] = useState("");
  const [conversaAtiva, setConversaAtiva] = useState(null); // _id da conversa
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");\n  const socketRef = useRef(null);\n  const prevConvRef = useRef(null);\n  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    if (router.query.conversa) {
      setConversaAtiva(String(router.query.conversa));
    }
  }, [router.query.conversa]);

  const [conversas, setConversas] = useState([]); // conversas do backend
  const [mensagens, setMensagens] = useState([]); // mensagens da conversa ativa
  const fimDasMensagensRef = useRef(null);

  const meuId = useMemo(() => (user?.id || user?._id || ""), [user]);

  // Carrega lista de conversas quando autenticaÃ§Ã£o estiver pronta
  useEffect(() => {
    async function carregarConversas() {
      if (authLoading) return;
      if (!user) return;
      try {
        setCarregando(true);
        const data = await listConversations();
        setConversas(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErro(e.message || "Erro ao carregar conversas");
      } finally {
        setCarregando(false);
      }
    }
    carregarConversas();
  }, [user, authLoading]);

  // Carrega mensagens quando a conversa ativa mudar
  useEffect(() => {
    async function carregarMensagens() {
      if (!conversaAtiva) return;
      try {
        setCarregando(true);
        const msgs = await getMessages(conversaAtiva, { limit: 50 });
        setMensagens(Array.isArray(msgs) ? msgs : []);
        await markRead(conversaAtiva);
      } catch (e) {
        console.error(e);
        setErro(e.message || "Erro ao carregar mensagens");
      } finally {
        setCarregando(false);
      }
    }
    carregarMensagens();
  }, [conversaAtiva]);

  // Auto-scroll para a Ãºltima mensagem quando a lista muda
  useEffect(() => {
    if (fimDasMensagensRef.current) {
      fimDasMensagensRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [mensagens, conversaAtiva]);

  const enviarMensagem = () => {
    (async () => {
      const text = mensagem.trim();
      if (!text || !conversaAtiva) return;
      try {
        setCarregando(true);
        const msg = await sendMessageApi(conversaAtiva, text);
        setMensagens((prev) => [...prev, msg]);
        setMensagem("");
      } catch (e) {
        console.error(e);
        setErro(e.message || "Erro ao enviar mensagem");
      } finally {
        setCarregando(false);
      }
    })();
  };

  const onKeyDownInput = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (mensagem.trim()) enviarMensagem();
    }
  };

  const formatHora = (iso) => {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  const listaFiltrada = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return conversas;
    return conversas.filter((c) => {
      const body = c?.lastMessage?.body?.toLowerCase?.() || "";
      const idStr = String(c?._id || "").toLowerCase();
      return body.includes(q) || idStr.includes(q);
    });
  }, [busca, conversas]);

  const conversaSelecionada = useMemo(
    () => conversas.find((c) => String(c._id) === String(conversaAtiva)) || null,
    [conversas, conversaAtiva]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow pt-24 px-4 pb-32 max-w-6xl mx-auto">
        {erro && (
          <div className="mb-4 text-sm text-red-600">{erro}</div>
        )}
        {!conversaAtiva ? (
          <div>
            <div className="mb-4">
              <button
                onClick={() => router.back()}
                className="text-[var(--ecodoa-accent)] text-sm hover:underline"
              >
                â† Voltar
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
              {listaFiltrada.length === 0 && (
                <li className="text-sm text-muted-foreground">Nenhuma conversa encontrada.</li>
              )}
              {listaFiltrada.map((c) => {
                const last = c?.lastMessage;
                const titulo = "Conversa";
                const preview = last?.body || "";
                const quando = new Date(c?.lastMessageAt || last?.createdAt || Date.now())
                  .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                return (
                  <li
                    key={String(c._id)}
                    onClick={() => setConversaAtiva(String(c._id))}
                    className="cursor-pointer flex items-center justify-between bg-white rounded-lg shadow-md p-3 hover:bg-ecodoa-soft transition"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={"https://picsum.photos/seed/ecodoa/80/80"}
                        alt={titulo}
                        width={48}
                        height={48}
                        className="rounded-full border border-ecodoa-accent"
                      />
                      <div>
                        <p className="font-semibold text-ecodoa-primary">{titulo}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[220px]">{preview}</p>
                      </div>
                    </div>
                    <span className="text-xs text-ecodoa-olive">{quando}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <button
                onClick={() => setConversaAtiva(null)}
                className="text-[var(--ecodoa-accent)] text-sm hover:underline"
              >
                â† Voltar para lista
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-ecodoa-accent flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={"https://picsum.photos/seed/ecodoa2/80/80"}
                  alt={"Conversa"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <p className="font-semibold text-ecodoa-primary">Conversa</p>
              </div>

              <div className="flex flex-col gap-3 mb-6 overflow-y-auto max-h-[55vh] pr-1">
                {mensagens.length === 0 && !carregando && (
                  <div className="text-sm text-muted-foreground">Nenhuma mensagem ainda. Diga oi!</div>
                )}
                {mensagens.map((msg) => {
                  const souAutor = String(msg.senderId) === String(meuId);
                  return (
                    <div
                      key={String(msg._id)}
                      className={`max-w-[80%] p-3 rounded-lg shadow ${
                        souAutor
                          ? "bg-ecodoa-accent text-white self-end ml-auto"
                          : "bg-ecodoa-soft text-ecodoa-primary"
                        }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.body}</p>
                      <div className={`mt-1 text-[10px] ${souAutor ? "text-ecodoa-light-olive/90" : "text-ecodoa-olive"}`}>
                        {formatHora(msg.createdAt)}
                      </div>
                    </div>
                  );
                })}
                <div ref={fimDasMensagensRef} />
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <input
                  type="text"
                  placeholder="Escreva uma mensagem..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  onKeyDown={onKeyDownInput}
                  aria-label="Campo para escrever mensagem"
                  className="flex-1 h-10 bg-ecodoa-light-olive text-ecodoa-text placeholder-ecodoa-olive border border-ecodoa-accent rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary"
                />
                <Button variant="default" onClick={enviarMensagem} disabled={carregando || !mensagem.trim()}>
                  {carregando ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}




"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";

import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import {
  listConversations,
  getMessages,
  sendMessage as sendMessageApi,
  markRead,
} from "@/services/api";
import { io } from "socket.io-client";

export default function ChatPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [busca, setBusca] = useState("");
  const [conversaAtiva, setConversaAtiva] = useState(null); // _id da conversa
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const socketRef = useRef(null);
  const prevConvRef = useRef(null);
  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    if (router.query.conversa) {
      setConversaAtiva(String(router.query.conversa));
    }
  }, [router.query.conversa]);

  const [conversas, setConversas] = useState([]); // conversas do backend
  const [mensagens, setMensagens] = useState([]); // mensagens da conversa ativa

  const meuId = useMemo(() => (user?.id || user?._id || ""), [user]);

  // Carrega lista de conversas quando autenticaÃ§Ã£o estiver pronta
  useEffect(() => {
    async function carregarConversas() {
      if (authLoading) return;
      if (!user) return;
      try {
        setCarregando(true);
        const data = await listConversations();
        setConversas(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErro(e.message || "Erro ao carregar conversas");
      } finally {
        setCarregando(false);
      }
    }
    carregarConversas();
  }, [user, authLoading]);

  // Conectar Socket.IO quando autenticado
  useEffect(() => {
    if (authLoading || !user) return;
    if (socketRef.current) return; // jÃ¡ conectado
    const s = io({ withCredentials: true });
    socketRef.current = s;
    s.on("connect", () => setSocketReady(true));
    s.on("connect_error", (err) => console.error("socket connect_error", err?.message || err));
    s.on("message:new", (msg) => {
      if (conversaAtiva) {
        setMensagens((prev) => [...prev, msg]);
      }
    });
    return () => {
      try { s.disconnect(); } catch {}
      socketRef.current = null;
      setSocketReady(false);
    };
  }, [authLoading, user]);

  // Entrar/sair da sala da conversa ativa
  useEffect(() => {
    const s = socketRef.current;
    if (!s || !socketReady) return;
    const prev = prevConvRef.current;
    if (prev && prev !== conversaAtiva) {
      s.emit("conv:leave", prev);
    }
    if (conversaAtiva) {
      s.emit("conv:join", conversaAtiva);
    }
    prevConvRef.current = conversaAtiva;
  }, [conversaAtiva, socketReady]);

  // Carrega mensagens quando a conversa ativa mudar
  useEffect(() => {
    async function carregarMensagens() {
      if (!conversaAtiva) return;
      try {
        setCarregando(true);
        const msgs = await getMessages(conversaAtiva, { limit: 50 });
        setMensagens(Array.isArray(msgs) ? msgs : []);
        await markRead(conversaAtiva);
      } catch (e) {
        console.error(e);
        setErro(e.message || "Erro ao carregar mensagens");
      } finally {
        setCarregando(false);
      }
    }
    carregarMensagens();
  }, [conversaAtiva]);

  const enviarMensagem = () => {
    (async () => {
      const text = mensagem.trim();
      if (!text || !conversaAtiva) return;
      try {
        setCarregando(true);
        const msg = await sendMessageApi(conversaAtiva, text);
        setMensagens((prev) => [...prev, msg]);
        setMensagem("");
      } catch (e) {
        console.error(e);
        setErro(e.message || "Erro ao enviar mensagem");
      } finally {
        setCarregando(false);
      }
    })();
  };

  const listaFiltrada = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return conversas;
    return conversas.filter((c) => {
      const body = c?.lastMessage?.body?.toLowerCase?.() || "";
      const idStr = String(c?._id || "").toLowerCase();
      return body.includes(q) || idStr.includes(q);
    });
  }, [busca, conversas]);

  const conversaSelecionada = useMemo(
    () => conversas.find((c) => String(c._id) === String(conversaAtiva)) || null,
    [conversas, conversaAtiva]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow pt-24 px-4 pb-32 max-w-6xl mx-auto">
        {erro && (
          <div className="mb-4 text-sm text-red-600">{erro}</div>
        )}
        {!conversaAtiva ? (
          <div>
            <div className="mb-4">
              <button
                onClick={() => router.back()}
                className="text-[var(--ecodoa-accent)] text-sm hover:underline"
              >
                â† Voltar
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
              {listaFiltrada.map((c) => {
                const last = c?.lastMessage;
                const titulo = "Conversa";
                const preview = last?.body || "";
                const quando = new Date(c?.lastMessageAt || last?.createdAt || Date.now())
                  .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                return (
                  <li
                    key={String(c._id)}
                    onClick={() => setConversaAtiva(String(c._id))}
                    className="cursor-pointer flex items-center justify-between bg-white rounded-lg shadow-md p-3 hover:bg-ecodoa-soft transition"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={"https://picsum.photos/seed/ecodoa/80/80"}
                        alt={titulo}
                        width={48}
                        height={48}
                        className="rounded-full border border-ecodoa-accent"
                      />
                      <div>
                        <p className="font-semibold text-ecodoa-primary">{titulo}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[220px]">{preview}</p>
                      </div>
                    </div>
                    <span className="text-xs text-ecodoa-olive">{quando}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <button
                onClick={() => setConversaAtiva(null)}
                className="text-[var(--ecodoa-accent)] text-sm hover:underline"
              >
                â† Voltar para lista
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-ecodoa-accent flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={"https://picsum.photos/seed/ecodoa2/80/80"}
                  alt={"Conversa"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <p className="font-semibold text-ecodoa-primary">Conversa</p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {mensagens.map((msg) => {
                  const souAutor = String(msg.senderId) === String(meuId);
                  return (
                    <div
                      key={String(msg._id)}
                      className={`max-w-[80%] p-3 rounded-lg shadow ${
                        souAutor
                          ? "bg-ecodoa-accent text-white self-end ml-auto"
                          : "bg-ecodoa-soft text-ecodoa-primary"
                      }`}
                    >
                      <p className="text-sm">{msg.body}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <input
                  type="text"
                  placeholder="Escreva uma mensagem..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="flex-1 h-10 bg-ecodoa-light-olive text-ecodoa-text placeholder-ecodoa-olive border border-ecodoa-accent rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary"
                />
                <Button variant="default" onClick={enviarMensagem} disabled={carregando || !mensagem.trim()}>
                  {carregando ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

