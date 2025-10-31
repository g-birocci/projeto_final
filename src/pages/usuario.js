import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardProduto from "../components/CardProduto";
import { Button } from "@/components/ui/Button";

export default function PaginaUsuario() {
    const [itens, setItens] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);

    useEffect(() => {
        const mockItens = [
            {
                id: 1,
                nome: "Casaco de inverno",
                imagem: "https://images.unsplash.com/photo-1659523466126-122c4a54dbb5?auto=format&fit=crop&q=80&w=1074",
                descricao: "Quentinho e pouco usado",
                estado: "Usado",
                categoria: "Roupas",
            },
            {
                id: 2,
                nome: "Livro de receitas",
                imagem: "https://images.unsplash.com/photo-1659523466126-122c4a54dbb5?auto=format&fit=crop&q=80&w=1074",
                descricao: "Receitas vegetarianas",
                estado: "Usado",
                categoria: "Livros",
            },
            {
                id: 2,
                nome: "Livro de receitas",
                imagem: "https://images.unsplash.com/photo-1659523466126-122c4a54dbb5?auto=format&fit=crop&q=80&w=1074",
                descricao: "Receitas vegetarianas",
                estado: "Usado",
                categoria: "Livros",
            },
            {
                id: 2,
                nome: "Livro de receitas",
                imagem: "https://images.unsplash.com/photo-1659523466126-122c4a54dbb5?auto=format&fit=crop&q=80&w=1074",
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

            <section className="max-w-6xl mx-auto px-4 pt-24 pb-24">
                <h1 className="text-3xl font-bold mb-6 text-foreground">gabebruu</h1>

                {/* Itens doados */}
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Doações dispon</h2>
                <div className="grid grid-cols-1 gap-6">
                    {itens.map((item) => (
                        <div key={item.id} className="relative">
                            <CardProduto produto={item} />
                            <div className="absolute bottom-4 left-4">
                                <Button size="sm" onClick={() => alert(`Mensagem para item: ${item.nome}`)}>
                                    Falar com o doador
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Avaliações */}
                <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Avaliações</h2>
                <div className="space-y-4">
                    {avaliacoes.map((av) => (
                        <div key={av.id} className="border p-4 rounded-md bg-white shadow-sm">
                            <p className="font-semibold text-foreground">{av.nome}</p>
                            <p className="text-yellow-500 text-sm">
                                {"★".repeat(av.nota)}{"☆".repeat(5 - av.nota)}
                            </p>
                            <p className="text-muted-foreground">{av.comentario}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
