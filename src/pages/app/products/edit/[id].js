"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { fetchProductById, updateProduct, fetchCategories, fetchSubcategories } from "@/services/api";
import { Button } from "@/components/ui/Button";
import toast from "@/lib/toast";

const DISTRICTS_PT = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora",
  "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto", "Santarém",
  "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Regiões Autónomas"
];

const CONDITIONS = ["NOVO", "BOM", "USADO"];

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "BOM",
    district: "",
    city: "",
    categoryId: "",
    subcategoryId: "",
    images: [],
  });

  useEffect(() => {
    if (id && user) {
      loadProduct();
      loadCategories();
    }
  }, [id, user]);

  useEffect(() => {
    if (formData.categoryId) {
      loadSubcategories(formData.categoryId);
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId]);

  async function loadProduct() {
    try {
      setLoading(true);
      const result = await fetchProductById(id);
      if (result.error) {
        toast({ type: "error", message: result.message || "Erro ao carregar produto" });
        router.push("/app/products/my");
        return;
      }

      const product = result.data;

      if (user && product.ownerId?.toString() !== (user._id || user.id)?.toString()) {
        toast({ type: "error", message: "Você não tem permissão para editar este produto" });
        router.push(`/app/products/${id}`);
        return;
      }

      setFormData({
        title: product.title || "",
        description: product.description || "",
        condition: product.condition || "BOM",
        district: product.district || "",
        city: product.city || "",
        categoryId: product.categoryId?.toString() || "",
        subcategoryId: product.subcategoryId?.toString() || "",
        images: product.images || [],
      });

      if (product.categoryId) {
        await loadSubcategories(product.categoryId.toString());
      }
    } catch (err) {
      console.error(err);
      toast({ type: "error", message: "Erro ao carregar produto" });
      router.push("/app/products/my");
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const result = await fetchCategories();
      if (!result.error && result.data) {
        setCategories(result.data);
      }
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
    }
  }

  async function loadSubcategories(categoryId) {
    try {
      const result = await fetchSubcategories(categoryId);
      if (!result.error && result.data) {
        setSubcategories(result.data);
      }
    } catch (err) {
      console.error("Erro ao carregar subcategorias:", err);
    }
  }

  function handleInputChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({ type: "error", message: "Título é obrigatório" });
      return;
    }

    if (!formData.condition) {
      toast({ type: "error", message: "Condição é obrigatória" });
      return;
    }

    if (!formData.district) {
      toast({ type: "error", message: "Distrito é obrigatório" });
      return;
    }

    if (!formData.city.trim()) {
      toast({ type: "error", message: "Cidade é obrigatória" });
      return;
    }

    try {
      setSubmitting(true);
      const result = await updateProduct(id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        condition: formData.condition,
        district: formData.district,
        city: formData.city.trim(),
        categoryId: formData.categoryId || null,
        subcategoryId: formData.subcategoryId || null,
        images: formData.images,
      });

      if (result.error) {
        toast({ type: "error", message: result.message || "Erro ao atualizar produto" });
      } else {
        toast({ type: "success", message: "Produto atualizado com sucesso!" });
        router.push(`/app/products/${id}`);
      }
    } catch (err) {
      console.error(err);
      toast({ type: "error", message: "Erro ao atualizar produto" });
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ecodoa-primary mx-auto mb-3"></div>
          <p className="text-sm text-ecodoa-primary">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="px-4 pt-20">
        <h1 className="text-lg font-bold text-ecodoa-primary mb-4">Editar Produto</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 border border-ecodoa-accent space-y-4">
          <div>
            <label className="block text-xs font-medium text-ecodoa-primary mb-1">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ecodoa-primary mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-md border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ecodoa-primary mb-1">
              Condição *
            </label>
            <select
              value={formData.condition}
              onChange={(e) => handleInputChange("condition", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary"
              required
            >
              {CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ecodoa-primary mb-1">
                Cidade *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ecodoa-primary mb-1">
                Distrito *
              </label>
              <select
                value={formData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary"
                required
              >
                <option value="">Selecione</option>
                {DISTRICTS_PT.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ecodoa-primary mb-1">
              Categoria
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {formData.categoryId && subcategories.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-ecodoa-primary mb-1">
                Subcategoria
              </label>
              <select
                value={formData.subcategoryId}
                onChange={(e) => handleInputChange("subcategoryId", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary"
              >
                <option value="">Selecione uma subcategoria</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={submitting}
              className="flex-1"
            >
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

