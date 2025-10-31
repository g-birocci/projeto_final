import React from "react";

export default function CardAvaliacao({ nome, nota, comentario }) {
  return (
    <article className="border p-4 rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-4">
        <img
          className="w-10 h-10 me-4 rounded-full"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=random`}
          alt={`Foto de ${nome}`}
        />
        <div className="font-medium text-foreground">
          <p>{nome}</p>
          <time className="block text-sm text-gray-500">Avaliação recente</time>
        </div>
      </div>

      <div className="flex items-center mb-2 space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < nota ? "text-yellow-300" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 22 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
        <h3 className="ms-2 text-sm font-semibold text-gray-900">Comentário</h3>
      </div>

      <p className="text-gray-500">{comentario}</p>
    </article>
  );
}
