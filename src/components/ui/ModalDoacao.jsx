import React from "react";
import { Button } from "@/components/ui/Button";

export default function ModalDoacao({
  onClose,
  fotos,
  setFotos,
  descricao,
  setDescricao,
  categoria,
  setCategoria,
  confirmado,
  setConfirmado,
  handleFotoUpload,
  handleConfirmarDoacao,
}) {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        {/* Botão X */}
        <button
          onClick={() => {
            onClose();
            setConfirmado(false);
            setFotos([]);
            setDescricao("");
            setCategoria("");
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl z-10"
          aria-label="Fechar modal"
        >
          &times;
        </button>

        {!confirmado ? (
          <>
            <h3 className="text-xl font-bold text-[#265c14ad] mb-4">
              Publicar nova doação
            </h3>

            {/* Upload de fotos */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Fotos do produto
              </label>
              <div className="relative inline-block">
                <Button asChild variant="outline" size="sm">
                  <label className="cursor-pointer">
                    Carregar fotos
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {fotos.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* Descrição */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Descrição do produto
              </label>
              <textarea
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Ex: Mesa com 4 cadeiras, bom estado..."
              />
            </div>

            {/* Categoria */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Categoria
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="">Selecione uma categoria</option>
                <option value="móveis">Móveis</option>
                <option value="roupas">Roupas</option>
                <option value="livros">Livros</option>
                <option value="eletrônicos">Eletrônicos</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            {/* Botão confirmar */}
            <div className="text-right">
              <Button variant="default" size="sm" onClick={handleConfirmarDoacao}>
                Confirmar publicação
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-[#265c14ad] mb-4">
              Doação publicada com sucesso!
            </h3>
            <p className="text-[#090871ff] text-sm leading-relaxed mb-6">
              Sua doação foi registrada. Em breve ela estará visível para quem quiser receber!
            </p>
            <div className="text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  setConfirmado(false);
                  setFotos([]);
                  setDescricao("");
                  setCategoria("");
                }}
              >
                Fechar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
