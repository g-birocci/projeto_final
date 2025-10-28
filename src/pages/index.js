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
        imagem: "https://via.placeholder.com/400x300?text=Mesa+com+Cadeiras",
      },
      {
        id: 2,
        nome: "Tênis Branco",
        descricao: "Pouco uso, confortável e limpo.",
        estado: "Usado",
        imagem: "https://via.placeholder.com/400x300?text=T%C3%AAnis+Branco",
      },
      {
        id: 3,
        nome: "Camisa Floral",
        descricao: "Camisa leve e colorida para o verão.",
        estado: "Usado",
        imagem: "https://via.placeholder.com/400x300?text=Camisa+Floral",
      },
      {
        id: 4,
        nome: "Mochila Ecológica",
        descricao: "Feita com material reciclado e durável.",
        estado: "Usado",
        imagem: "https://via.placeholder.com/400x300?text=Mochila+Eco",
      },
      {
        id: 5,
        nome: "Calça Cargo",
        descricao: "Super estilosa, com bolsos amplos.",
        estado: "Usado",
        imagem: "https://via.placeholder.com/400x300?text=Cal%C3%A7a+Cargo",
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

      {/* Botão de voltar */}
      <div className="z-8 px-4 pt-20">
        <a
          href="/voltar"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-gray-100 transition-all shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </a>
      </div>



      {/* Campo de pesquisa + botão de filtro */}
      <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto mt-8 px-4">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Pesquisar item..."
            className="pl-10 py-2 w-full"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <Button variant="outline" size="default" className="w-full sm:w-auto">
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
        <h1 className="text-3xl sm:text-5xl font-bold text-[#265c14ad] m-0">
          Está na hora do desapego.
        </h1>
        <p className="text-lg sm:text-xl mt-4 text-[#090871ff]">
          Doe seus itens, receba doações, reutilizar é viver!
        </p>
        <Button variant="default" size="lg" className="mt-6">
          Publicar Doação
        </Button>
      </header>

      {/* Cards */}
      <main className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
