import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

const CardProduto = ({ produto }) => {
  const [favorito, setFavorito] = useState(false);

  return (
    <Card className="relative hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-42 overflow-hidden rounded-t-lg bg-gray-50">
      <Image
        src={produto.images && produto.images.length > 0 ? produto.images[0] : "/img/sustentabilidade.jpg"}
        alt={produto.title ?? "Sustentabilidade"}
        fill
        className="object-cover rounded-lg"
      />
      </div>  
                   
      <CardHeader>
        <CardTitle className={`text-sm font-bold`}>
          <Link href={`products/${produto._id}`}>
          {produto.title}
          </Link>
          </CardTitle>
      </CardHeader>

      <CardContent>
        <p
  className="text-xs text-gray-500">
    {produto.description}
</p>


        <div className="mt-2 flex gap-5">
        <button
        onClick={() => setFavorito(!favorito)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-gray-100 transition-colors"
      >
        <Heart
          className={`w-4 h-4 ${
            favorito ? "fill-red-500 text-red-500" : "text-green-900"
          }`}
        />
        
      </button>

      <span
  className="px-2 py-1 mb-1 text-xs rounded-full float-right whitespace-nowrap" /* Adicionado whitespace-nowrap para evitar quebra de linha */
  style={{
    backgroundColor:
      produto.condition === "Novo"
        ? "var(--ecodoa-alert)"
        : produto.condition === "Usado"
        ? "var(--ecodoa-accent)"
        : "var(--ecodoa-soft)",
    color:
      produto.condition === "Novo"
        ? "#FFFFFF"
        : produto.condition === "Usado"
        ? "var(--ecodoa-text)"
        : "var(--ecodoa-primary)",
  }}
>
  {produto.condition}
</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProduto;
