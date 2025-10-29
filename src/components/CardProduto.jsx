import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";


const CardProduto = ({ produto }) => {
  const [favorito, setFavorito] = useState(false);

  return (
    <Card className="relative hover:shadow-lg transition-all duration-300">
      <button
        onClick={() => setFavorito(!favorito)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-gray-100 transition-colors"
      >
        <Heart
          className={`w-5 h-5 ${favorito ? "fill-red-500 text-red-500" : "text-green-900"}`}
        />
      </button>

      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-48 object-cover"
      />

      <CardHeader>
        <CardTitle>{produto.nome}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-700 mb-2">{produto.descricao}</p>
        <span
          className={`text-xs px-2 py-1 rounded-full ${produto.estado === "Novo"
              ? "bg-green-100 text-green-700"
              : produto.estado === "Usado"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
        >
          {produto.estado}
        </span>
        <div className="mt-4 flex gap-12"> 
          <Button variant="default" size="sm" >
            Enviar mensagem
          </Button>
          <Button variant="default" size="sm" >
            Quero este item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProduto;
