"use client";

import React, { useEffect, useState } from "react";
import CardProduto from "../components/ui/CardProduto";
import CardProdutoSkeleton from "../components/ui/CardProdutoSkeleton";
import { Button } from "@/components/ui/Button";
import toast from "@/lib/toast";

export default function PaginaUsuario() {
  const [itens, setItens] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock inicial — substituir por fetch real do usuário e seus itens
    const mockItens = [
      {
        id: 1,
        nome: "Casaco de inverno",
        imagem:
          "https://images.unsplash.com/photo-1520975867597-0f6f44d2ãf5?auto=format&fit=crop&q=80&w=1074",
        Descrição: "Quentinho e pouco usado",
        estado: "Usado",
        categoria: "Roupas",
      },
      {
        id: 2,
        nome: "Livro de receitas",
        imagem:
          "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=1074",
        Descrição: "Receitas vegetarianas",
        estado: "Usado",
        categoria: "Livros",
      },
    ];

    const mockAvaliacoes = [
      { id: 1, nome: "Joana", nota: 5, comentario: "Super simpática e rápida na entrega!" },
      { id: 2, nome: "Carlos", nota: 4, comentario: "Item em ótimo estado. Recomendo!" },
    ];

    setTimeout(() => {
      setItens(mockItens);
      setAvaliacoes(mockAvaliacoes);
      setLoading(false);
    }, 500);
  }, []);

  const falarComDoador = (item) => {
    toast({ type: "info", message: `Abra o item "${item.nome}" para iniciar uma conversa.` });
  };

  return (
    <div className="min-h-screen bg-white text-[var(--ecodoa-text)]">
      <section className="max-w-5xl mx-auto px-4 pt-24 pb-24">
        {/* Perfil */}
        <div className="flex flex-col items-center text-center space-y-3 border-b border-[var(--ecodoa-accent)]/40 pb-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border border-[var(--ecodoa-accent)]">
            <img
              src="https://i.imgur.com/your-profile-image.png"
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--ecodoa-primary)]">Julia Costa</h2>
          <p className="text-sm opacity-80">Porto, Portugal</p>
          <div className="text-sm opacity-70">
            <strong className="text-[var(--ecodoa-primary)]">226</strong> seguidores ·
            <strong className="text-[var(--ecodoa-primary)] ml-1">22</strong> seguindo
          </div>
          <div className="mt-2">
            <Button variant="default" size="sm" className="bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-primary)]/90">
              Editar perfil
            </Button>
          </div>
        </div>

        {/* Itens disponíveis */}
        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-semibold text-[var(--ecodoa-primary)]">Doações disponíveis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <CardProdutoSkeleton key={i} />)
              : itens.map((item) => (
                  <div key={item.id} className="relative">
                    <CardProduto produto={item} />
                    <div className="absolute bottom-4 left-4">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => falarComDoador(item)}
                        className="bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-primary)]/90"
                      >
                        Falar com o doador
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
          {!loading && itens.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum item no momento.</p>
          )}
        </div>

        {/* Avaliações */}
        <div className="space-y-4 mt-10">
          <h3 className="text-xl font-semibold text-[var(--ecodoa-primary)]">Avaliações</h3>
          <div className="space-y-3">
            {avaliacoes.map((av) => (
              <div key={av.id} className="border p-4 rounded-md bg-white shadow-sm">
                <p className="font-semibold text-foreground">{av.nome}</p>
                <p className="text-yellow-500 text-sm" aria-label={`Nota ${av.nota} de 5`}>
                  {"★".repeat(av.nota)}
                  {"☆".repeat(5 - av.nota)}
                </p>
                <p className="text-muted-foreground">{av.comentario}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


