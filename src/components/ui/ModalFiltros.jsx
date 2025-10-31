import React from "react";
import { Button } from "@/components/ui/Button";

export default function ModalFiltros({ onClose, categoriaSelecionada, setCategoriaSelecionada }) {
    const categorias = ["Móveis", "Roupas", "Eletrônicos", "Livros", "Roupa infantil"];

    return (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative animate-fadeIn">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                    aria-label="Fechar modal"
                >
                    &times;
                </button>

                <h3 className="text-lg font-bold mb-4 text-[var(--ecodoa-primary)] opacity-70">Filtrar por categoria</h3>

                <select
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
                >
                    <option value="">Todas as categorias</option>
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <div className="text-right mt-6">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Aplicar
                    </Button>
                </div>
            </div>
        </div>
    );
}
