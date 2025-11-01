"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CardProduto from "../components/ui/CardProduto";
import { Button } from "@/components/ui/Button";
import CardAvaliacao from "@/components/ui/CardAvaliacao";

export default function PaginaUsuario() {
    const [itens, setItens] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [novaAvaliacao, setNovaAvaliacao] = useState({
        nome: "",
        nota: 5,
        comentario: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const nova = {
            ...novaAvaliacao,
            id: Date.now(),
        };
        setAvaliacoes((prev) => [nova, ...prev]);
        setNovaAvaliacao({ nome: "", nota: 5, comentario: "" });
    };

    useEffect(() => {
        const mockItens = [
            {
                id: 1,
                nome: "Casaco de inverno",
                imagem:
                    "https://images.unsplash.com/photo-1659523466126-122c4a54dbb5?auto=format&fit=crop&q=80&w=1074",
                descricao: "Quentinho e pouco usado",
                estado: "Usado",
                categoria: "Roupas",
            },
            {
                id: 2,
                nome: "Livro de receitas",
                imagem:
                    "https://images.unsplash.com/photo-1659523466126-122c4a54dbb5?auto=format&fit=crop&q=80&w=1074",
                descricao: "Receitas vegetarianas",
                estado: "Usado",
                categoria: "Livros",
            },
        ];

        const mockAvaliacoes = [
            {
                id: 1,
                nome: "Joana",
                nota: 5,
                comentario: "Super simpática e rápida na entrega!",
            },
            {
                id: 2,
                nome: "Carlos",
                nota: 4,
                comentario: "Item em ótimo estado. Recomendo!",
            },
        ];

        setItens(mockItens);
        setAvaliacoes(mockAvaliacoes);
    }, []);

    return (
        <div className="min-h-screen bg-white relative text-[var(--ecodoa-text)] flex flex-col">
            <Navbar />
            <div className="px-5 py-24 sm:py-20 sm:px-8">
                {/* Perfil do usuário */}
                <section className="max-w-4xl mx-auto w-full space-y-10 flex-grow">
                    <div className="flex flex-col items-center text-center space-y-4 border-b border-[var(--ecodoa-accent)]/40 pb-6">
                        {/* Foto de perfil */}
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border border-[var(--ecodoa-accent)]">
                            <img
                                src="https://i.imgur.com/your-profile-image.png" // colocar imagem real
                                alt="Foto de perfil"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Informações do perfil */}
                        <div className="flex flex-col items-center text-center space-y-2">
                            <h2 className="text-2xl font-semibold text-[var(--ecodoa-primary)]">
                                Julia Costa
                            </h2>
                            <p className="text-sm opacity-80">Porto, Portugal</p>

                            {/* Seguidores */}
                            <div className="text-sm opacity-70">
                                <strong className="text-[var(--ecodoa-primary)]">226</strong> seguidores · Seguindo <strong className="text-[var(--ecodoa-primary)]">22</strong>
                            </div>

                            {/* Bio */}
                            <p className="text-[var(--ecodoa-primary)] text-base leading-snug mt-2">
                                Olá, sou Julia! Para entrar em contato comigo, basta enviar mensagem, aqui estão os itens disponíveis em meu perfil.
                            </p>

                            {/* Botão de editar perfil */}
                            <div className="mt-4">
                                <Button variant="default" size="sm" className="bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-primary)]/90">Editar perfil</Button>
                            </div>
                        </div>
                    </div>

                    {/* Itens disponíveis */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-[var(--ecodoa-primary)]">Doações disponíveis</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {itens.map((item) => (
                                <div key={item.id} className="relative">
                                    <CardProduto produto={item} />
                                    <div className="absolute bottom-4 left-4">
                                        <Button
                                            size="sm"
                                            variant="default"
                                            onClick={() => alert(`Mensagem para item: ${item.nome}`)}
                                            className="bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-primary)]/90"
                                        >
                                            Falar com o doador
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>
           </div>
           <Footer />
       </div>
   );
}
