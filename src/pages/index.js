import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardProduto from "../components/CardProduto";
import { ArrowLeft } from "lucide-react";

export default function Index() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mockProdutos = [
      {
        id: 1,
        nome: "Mesa com 4 Cadeiras",
        descricao: "Bom estado de conservação.",
        estado: "Usado",
        imagem: "https://via.placeholder.com/400x300?text=Casaco+Jeans",
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
      {
        id: 5,
        nome: "Calça Cargo",
        descricao: "Super estilosa, com bolsos amplos.",
        estado: "Usado",
        imagem: "https://via.placeholder.com/400x300?text=Cal%C3%A7a+Cargo",
      },
      {
        id: 5,
        nome: "Calça Cargo",
        descricao: "Super estilosa, com bolsos amplos.",
        estado: "Usado",
        imagem: "https://via.placeholder.com/400x300?text=Cal%C3%A7a+Cargo",
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

  const heroStyle = { // botão de doar agora
    height: "400px",
    backgroundImage:
      'url("https://via.placeholder.com/1200x400?text=Doe+o+que+n%C3%A3o+usa+mais")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    padding: "2rem",
    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
  };

  return (
    <div>
      <Navbar />

      <div className="relative z-50 p-6">
        <a
          href="/bruna"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-gray-100 transition-all shadow-md fixed left-6 top-6"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </a>
      </div>

      <header style={heroStyle}>
        <h1 style={{ fontSize: "3rem", margin: "0", color: "#265c14ad"}}>Está na hora do desapego.</h1>
        <p style={{ fontSize: "1.25rem", margin: "1rem 0", color: "#090871ff"}}>
          Doe seus itens, receba doações, reutilizar é viver!
        </p>
        <button
          className="bg-yellow-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all"
          style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}
        > 
          Publicar Doação 
        </button>
      </header>

      <main className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center text-gray-600 col-span-full">Carregando...</p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        ) : produtos.length > 0 ? (
          produtos.map((produto) => <CardProduto key={produto.id} produto={produto} />)
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
