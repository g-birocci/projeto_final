"use client";

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardProduto from "../components/CardProduto";
import ModalDoacao from "../components/ui/ModalDoacao";
import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";
import { Search, ArrowLeft } from "lucide-react";
import ModalFiltros from "../components/ui/ModalFiltros";

export default function Index() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalFiltrosAberto, setModalFiltrosAberto] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  // modal
  const [fotos, setFotos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const handleFotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFotos(urls);
  };

  const handleConfirmarDoacao = () => {
    setConfirmado(true);
  };

  useEffect(() => {
    const mockProdutos = [
      {
        id: 1,
        nome: "Mesa com 4 Cadeiras",
        descricao: "Bom estado de conservação.",
        estado: "Usado",
        categoria: "Móveis",
        imagem:
          "https://images.unsplash.com/photo-1663144256992-6b69263cc521?auto=format&fit=crop&q=80&w=736",
      },
      {
        id: 2,
        nome: "Tênis Nike Air",
        descricao: "Pouco uso, confortável, Tam: 38.",
        estado: "Usado",
        categoria: "Roupas",
        imagem:
          "https://images.unsplash.com/photo-1747063458940-e89647e3a106?auto=format&fit=crop&q=80&w=1170",
      },
      {
        id: 3,
        nome: "Camisa Floral",
        descricao: "Camisa leve e colorida para o verão.",
        estado: "Usado",
        categoria: "Roupas",
        imagem:
          "https://images.unsplash.com/photo-1651888947765-2e0ec570bc9d?auto=format&fit=crop&q=80&w=687",
      },
      {
        id: 4,
        nome: "Pack 3 livros",
        descricao: "Já lidos, repassando para quem quer.",
        estado: "Usado",
        categoria: "Livros",
        imagem:
          "https://images.unsplash.com/photo-1616852246157-f095beb2aef9?auto=format&fit=crop&q=80&w=1084",
      },
      {
        id: 5,
        nome: "Conjunto Chá",
        descricao: "Doando pois estou de mudança.",
        estado: "Usado",
        categoria: "Eletrônicos",
        imagem:
          "https://images.unsplash.com/photo-1689402059849-02c1b5a7931b?auto=format&fit=crop&q=80&w=735",
      },
    ];

    setTimeout(() => {
      setProdutos(mockProdutos);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="z-8 px-4 pt-20">
        <a
          href="/voltar"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ecodoa-soft hover:bg-ecodoa-accent transition-all shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-ecodoa-text" />
        </a>
      </div>

      {/* Campo de pesquisa e botão de filtro */}
      <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto mt-8 px-4">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-ecodoa-olive" />
          <Input
            placeholder="Pesquisar doações..."
            className="pl-10 py-2 w-full --ecodoa-bg text-ecodoa-text placeholder-ecodoa-olive border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="default"
          className="w-full sm:w-auto"
          onClick={() => setModalFiltrosAberto(true)}
        >
          Filtros
        </Button>
      </div>

      <header
        className="h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-8 py-10"
        style={{
          backgroundImage:
            'url("https://via.placeholder.com/1200x400?text=Doe+o+que+n%C3%A3o+usa+mais")',
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-[#265c14ad] m-0">
          Está na hora do desapego.
        </h1>
        <p className="text-lg sm:text-xl mt-4 text-[#090871ff]">
          Doe seus itens, receba doações, reutilizar é viver!
        </p>
        <Button
          variant="default"
          size="lg"
          className="mt-6 bg-yellow-600 hover:bg-green-800"
          onClick={() => setModalAberto(true)}
        >
          Publicar Doação
        </Button>
      </header>

      <main className="container mx-auto px-6 py-10 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center text-gray-600 col-span-full">
            Carregando...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        ) : produtos.length > 0 ? (
          produtos
            .filter(
              (produto) =>
                produto.nome.toLowerCase().includes(busca.toLowerCase()) &&
                (categoriaSelecionada === "" ||
                  produto.categoria?.toLowerCase() ===
                    categoriaSelecionada.toLowerCase())
            )

            .map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            Nenhum item disponível no momento.
          </p>
        )}
      </main>

      {/* Modal separado */}
      {modalAberto && (
        <ModalDoacao
          onClose={() => setModalAberto(false)}
          fotos={fotos}
          setFotos={setFotos}
          descricao={descricao}
          setDescricao={setDescricao}
          categoria={categoria}
          setCategoria={setCategoria}
          confirmado={confirmado}
          setConfirmado={setConfirmado}
          handleFotoUpload={handleFotoUpload}
          handleConfirmarDoacao={handleConfirmarDoacao}
        />
      )}
      {modalFiltrosAberto && (
        <ModalFiltros
          onClose={() => setModalFiltrosAberto(false)}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />
      )}
    </div>
  );
}
