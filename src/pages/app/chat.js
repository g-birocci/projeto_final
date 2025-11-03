"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";
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
  const [conversaAtiva, setConversaAtiva] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const socketRef = useRef(null);
  const prevConvRef = useRef(null);
  const [socketReady, setSocketReady] = useState(false);
  const [conversas, setConversas] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const fimDasMensagensRef = useRef(null);

  const meuId = useMemo(() => (user?.id || user?._id || ""), [user]);

  useEffect(() => {
    if (router.query.conversa) {
      setConversaAtiva(String(router.query.conversa));
    }
  }, [router.query.conversa]);

  // Carrega lista de conversas quando autenticação estiver pronta
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
    if (socketRef.current) return;
    const s = io({ withCredentials: true });
    socketRef.current = s;
    s.on("connect", () => setSocketReady(true));
    s.on("connect_error", (err) => console.error("socket connect_error", err?.message || err));
    s.on("message:new", (msg) => {
      if (conversaAtiva && String(msg.conversationId) === String(conversaAtiva)) {
        setMensagens((prev) => [...prev, msg]);
      }
      // Atualizar lista de conversas quando nova mensagem chega
      setConversas((prev) => {
        const index = prev.findIndex((c) => String(c._id) === String(msg.conversationId));
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = { ...updated[index], lastMessage: msg, lastMessageAt: msg.createdAt };
          return updated.sort((a, b) => new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0));
        }
        return prev;
      });
    });
    return () => {
      try {
        s.disconnect();
      } catch {}
      socketRef.current = null;
      setSocketReady(false);
    };
  }, [authLoading, user, conversaAtiva]);

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

  // Auto-scroll para a última mensagem quando a lista muda
  useEffect(() => {
    if (fimDasMensagensRef.current) {
      fimDasMensagensRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [mensagens, conversaAtiva]);

  const enviarMensagem = async () => {
    const text = mensagem.trim();
    if (!text || !conversaAtiva) return;
    try {
      setCarregando(true);
      const msg = await sendMessageApi(conversaAtiva, text);
      setMensagens((prev) => [...prev, msg]);
      setMensagem("");
      setErro("");
    } catch (e) {
      console.error(e);
      setErro(e.message || "Erro ao enviar mensagem");
    } finally {
      setCarregando(false);
    }
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
      const titulo = c?.itemId?.title?.toLowerCase?.() || "";
      return body.includes(q) || idStr.includes(q) || titulo.includes(q);
    });
  }, [busca, conversas]);

  const conversaSelecionada = useMemo(
    () => conversas.find((c) => String(c._id) === String(conversaAtiva)) || null,
    [conversas, conversaAtiva]
  );

  if (!user && !authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center p-4">
        <p className="text-ecodoa-primary mb-4">Você precisa estar logado para acessar o chat.</p>
        <Button variant="default" onClick={() => router.push("/app/auth/login")}>
          Fazer Login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="grow pt-16 px-4 pb-24">
        {erro && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{erro}</div>
        )}
        {!conversaAtiva ? (
          <div>
            <h1 className="text-xl font-bold mb-4 text-[var(--ecodoa-primary)]">Conversas</h1>
            <Input
              placeholder="Pesquisar conversas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="mb-4 bg-white text-ecodoa-primary placeholder-ecodoa-olive border border-ecodoa-accent rounded-md"
            />

            {carregando && !conversas.length ? (
              <p className="text-sm text-muted-foreground text-center py-8">Carregando...</p>
            ) : listaFiltrada.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Nenhuma conversa encontrada.</p>
            ) : (
              <ul className="space-y-2">
                {listaFiltrada.map((c) => {
                  const last = c?.lastMessage;
                  const titulo = c?.itemId?.title || "Conversa";
                  const preview = last?.body || "";
                  const quando = new Date(c?.lastMessageAt || last?.createdAt || Date.now())
                    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                  return (
                    <li
                      key={String(c._id)}
                      onClick={() => setConversaAtiva(String(c._id))}
                      className="cursor-pointer flex items-center justify-between bg-white rounded-lg shadow-sm p-3 hover:bg-ecodoa-soft transition"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-full bg-ecodoa-accent flex-shrink-0 flex items-center justify-center">
                          <span className="text-ecodoa-primary font-semibold text-sm">
                            {titulo.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-ecodoa-primary text-sm truncate">{titulo}</p>
                          <p className="text-xs text-muted-foreground truncate">{preview}</p>
                        </div>
                      </div>
                      <span className="text-xs text-ecodoa-olive ml-2">{quando}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setConversaAtiva(null)}
                className="text-ecodoa-primary"
              >
                ←
              </Button>
              <h2 className="text-lg font-semibold text-ecodoa-primary flex-1">
                {conversaSelecionada?.itemId?.title || "Conversa"}
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-ecodoa-accent flex flex-col h-[calc(100vh-200px)]">
              <div className="flex flex-col gap-3 mb-4 overflow-y-auto flex-1 pr-2">
                {carregando && mensagens.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-8">Carregando mensagens...</div>
                ) : mensagens.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-8">Nenhuma mensagem ainda. Diga oi!</div>
                ) : (
                  mensagens.map((msg) => {
                    const souAutor = String(msg.senderId) === String(meuId);
                    return (
                      <div
                        key={String(msg._id)}
                        className={`max-w-[75%] p-2.5 rounded-lg ${
                          souAutor
                            ? "bg-ecodoa-accent text-ecodoa-secondary self-end ml-auto"
                            : "bg-ecodoa-soft text-ecodoa-primary"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.body}</p>
                        <div className={`mt-1 text-[10px] ${souAutor ? "text-ecodoa-secondary/70" : "text-ecodoa-olive"}`}>
                          {formatHora(msg.createdAt)}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={fimDasMensagensRef} />
              </div>

              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-ecodoa-accent/30">
                <input
                  type="text"
                  placeholder="Escreva uma mensagem..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  onKeyDown={onKeyDownInput}
                  aria-label="Campo para escrever mensagem"
                  className="flex-1 h-9 text-sm bg-white text-ecodoa-text placeholder-ecodoa-olive border border-ecodoa-accent rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary"
                />
                <Button
                  variant="default"
                  size="sm"
                  onClick={enviarMensagem}
                  disabled={carregando || !mensagem.trim()}
                >
                  {carregando ? "..." : "Enviar"}
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}



