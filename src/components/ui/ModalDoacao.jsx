import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { fetchCategories, fetchSubcategories } from "@/services/api";
import { useCategories } from "@/hooks/useCategories";
const DISTRICTS_PT = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora",
  "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto", "Santarém",
  "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Regiões Autónomas"
];

const CONDITIONS = ["NOVO", "BOM", "USADO", "PECAS"];


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
  title = "",
  setTitle = () => { },
  condition = "BOM",
  setCondition = () => { },
  district = "",
  setDistrict = () => { },
  city = "",
  setCity = () => { },
  categoryId = "",
  setCategoryId = () => { },
  subcategoryId = "",
  setSubcategoryId = () => { },
  submitting = false,
}) {


  const {
    categories,
    subcategories,
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory
  } = useCategories();


  const resetForm = () => {
    setConfirmado(false);
    setFotos([]);
    setDescricao("");
    setCategoria("");
    if (setTitle) setTitle("");
    if (setCondition) setCondition("BOM");
    if (setDistrict) setDistrict("");
    if (setCity) setCity("");
    setSelectedCategory("");
    setSelectedSubcategory("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-sm shadow-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Botão X */}
        <button
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl z-10"
          aria-label="Fechar modal"
        >
          &times;
        </button>

        {!confirmado ? (
          <>
            <h3 className="text-xl font-bold text-[var(--ecodoa-primary)] mb-4">
              Publicar nova doação
            </h3>

            {/* Título */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Título *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle && setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Ex: Mesa com 4 cadeiras"
                maxLength={50}
                required
              />
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
                maxLength={800}
              />
            </div>

            {/* Condição */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Condição *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition && setCondition(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
                required
              >
                {CONDITIONS.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>

            {/* Categoria */}
            <select value={selectedCategory} onChange={(e) => {
              setSelectedCategory(e.target.value)
              setCategoryId && setCategoryId(e.target.value);
            }
            }>
              <option value="">Selecione uma categoria</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            {/* Subcategoria */}
{selectedCategory && subcategories.length > 0 && (
  <select value={selectedSubcategory} onChange={(e) => {
    setSelectedSubcategory(e.target.value)
    setSubcategoryId && setSubcategoryId(e.target.value)

  }}>
    <option value="">Selecione uma subcategoria</option>
    {subcategories.map(sub => (
      <option key={sub._id} value={sub._id}>{sub.name}</option>
    ))}
  </select>
)}



            {/* Distrito */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Distrito *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict && setDistrict(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
                required
              >
                <option value="">Selecione um distrito</option>
                {DISTRICTS_PT.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Cidade */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Cidade *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity && setCity(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Ex: Lisboa"
                required
              />
            </div>

            {/* Upload de fotos */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Fotos do produto (máximo 4)
              </label>
              <div className="relative inline-block">
                <Button asChild variant="outline" size="sm">
                  <label className="cursor-pointer">
                    Carregar fotos
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      id="fileInputDoacao"
                      onChange={handleFotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={fotos.length >= 4}
                    />
                  </label>
                </Button>
              </div>
              {fotos.length > 0 && (
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
              )}
              {fotos.length >= 4 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Máximo de 4 fotos atingido
                </p>
              )}
            </div>

            {/* Botão confirmar */}
            <div className="text-right">
              <Button
                variant="default"
                className="bg-ecodoa-accent text-[var(--ecodoa-primary)]"
                size="sm"
                onClick={handleConfirmarDoacao}
                disabled={submitting}
              >
                {submitting ? "Publicando..." : "Confirmar publicação"}
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
                  resetForm();
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
