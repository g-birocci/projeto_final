import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardProduto from "../components/CardProduto";
import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";
import { Search, ArrowLeft } from "lucide-react";

export default function Index() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const mockProdutos = [
      {
        id: 1,
        nome: "Mesa com 4 Cadeiras",
        descricao: "Bom estado de conservação.",
        estado: "Usado",
        imagem: "https://images.unsplash.com/photo-1663144256992-6b69263cc521?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=736",
      },
      {
        id: 2,
        nome: "Tênis Nike Air",
        descricao: "Pouco uso, confortável, Tam: 38.",
        estado: "Usado",
        imagem: "https://images.unsplash.com/photo-1747063458940-e89647e3a106?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      },
      {
        id: 3,
        nome: "Camisa Floral",
        descricao: "Camisa leve e colorida para o verão.",
        estado: "Usado",
        imagem: "https://images.unsplash.com/photo-1651888947765-2e0ec570bc9d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      },
      {
        id: 4,
        nome: "Pack 3 livros",
        descricao: "Já lidos, repassando para quem quer.",
        estado: "Usado",
        imagem: "https://images.unsplash.com/photo-1616852246157-f095beb2aef9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1084",
      },
      {
        id: 5,
        nome: "Conjunto Chá",
        descricao: "Doando pois estou de mudança.",
        estado: "Usado",
        imagem: "https://images.unsplash.com/photo-1689402059849-02c1b5a7931b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
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
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-gray-100 transition-all shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </a>
      </div>



      <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto mt-8 px-4">
<<<<<<< Updated upstream
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
=======
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-ecodoa-olive" />
>>>>>>> Stashed changes
          <Input
            placeholder="Pesquisar item..."
            className="pl-10 py-2 w-full"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
<<<<<<< Updated upstream
        <Button variant="outline" size="default" className="w-full sm:w-auto">
=======
        <Button
          variant="outline"
          size="default"
          className="w-full"
          onClick={() => setModalFiltrosAberto(true)}
        >
>>>>>>> Stashed changes
          Filtros
        </Button>
      </div>

      {/* Hero */}
      <header
        className="h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-8 py-10"
        style={{
          backgroundImage:
            'url("https://via.placeholder.com/1200x400?text=Doe+o+que+n%C3%A3o+usa+mais")',
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <h1 className="text-3xl font-bold text-[#265c14ad] m-0">
          Está na hora do desapego.
        </h1>
        <p className="text-lg mt-4 text-[#090871ff]">
          Doe seus itens, receba doações, reutilizar é viver!
        </p>
        <Button variant="default"
        size="lg"
        className="mt-6 bg-[#DCE93A] text-[#0F4836]">
          Publicar Doação
        </Button>
      </header>


<<<<<<< Updated upstream
      <main className="container mx-auto px-6 py-10 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

=======
      <main className="container mx-auto px-6 py-10 pb-20 grid grid-cols-1 gap-6">
>>>>>>> Stashed changes
        {loading ? (
          <p className="text-center text-gray-600 col-span-full">Carregando...</p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        ) : produtos.length > 0 ? (
          produtos
            .filter((produto) =>
              produto.nome.toLowerCase().includes(busca.toLowerCase())
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

      <Footer />
    </div>
  );
}
