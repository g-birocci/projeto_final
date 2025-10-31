"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardProduto from "../components/CardProduto";
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
        <div>
            <Navbar />
            
            {/* Adicionado padding-bottom para garantir respiro no final da página */}
            <section className="max-w-6xl mx-auto px-4 pt-24 pb-16">
                <h1 className="text-3xl font-bold mb-6 text-foreground">gabebruu</h1>
                {/* Itens doados */}
                <h2 className="text-xl font-semibold mb-4 text-foreground">Doações disponíveis</h2>
                <div className="grid grid-cols-1 gap-6">
                    {itens.map((item) => (
                        <div key={item.id} className="relative">
                            <CardProduto produto={item} />
                            <div className="absolute bottom-4 left-4">
                                <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => alert(`Mensagem para item: ${item.nome}`)}
                                >
                                    Falar com o doador
                                </Button>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Formulário de avaliação */}
                <h2 className="text-xl font-semibold mt-10 mb-4 text-foreground">Avaliar doador</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Seu nome</label>
                        <input
                            type="text"
                            required
                            value={novaAvaliacao.nome}
                            onChange={(e) =>
                                setNovaAvaliacao({ ...novaAvaliacao, nome: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nota</label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => setNovaAvaliacao({ ...novaAvaliacao, nota: n })}
                                    className="focus:outline-none"
                                >
                                    <svg
                                        className={`w-6 h-6 ${n <= novaAvaliacao.nota ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Comentário</label>
                        <textarea
                            required
                            value={novaAvaliacao.comentario}
                            onChange={(e) =>
                                setNovaAvaliacao({ ...novaAvaliacao, comentario: e.target.value })
                            }
                            className="mt-1 block w-full h-32 border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-ecodoa-primary text-white px-4 py-2 rounded hover:bg-ecodoa-accent" //arrumar cor do hover.
                    >
                        Enviar avaliação
                    </button>
                </form>

                {/* Avaliações */}
                <h2 className="text-xl font-semibold mb-4 text-foreground">Avaliações</h2>
                <div className="space-y-6">
                    {avaliacoes.map((av) => (
                        <CardAvaliacao
                            key={av.id}
                            nome={av.nome}
                            nota={av.nota}
                            comentario={av.comentario}
                        />
                    ))}
                </div> 
                 */}
            </section>
            

            <Footer />
        </div>
    );
}
