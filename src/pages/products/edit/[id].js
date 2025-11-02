import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { fetchProductById, updateProduct, fetchCategories, fetchSubcategories } from "@/services/api";
import { Button } from "@/components/ui/Button";

const DISTRICTS_PT = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora",
  "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto", "Santarém",
  "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Regiões Autónomas"
];

const CONDITIONS = ["NOVO", "BOM", "USADO", "PECAS"];

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
    if (id) {
      loadProduct();
    }
    loadCategories();
  }, [id]);

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
        alert(result.message || "Erro ao carregar produto");
        router.push("/products");
        return;
      }

      const product = result.data;

      // Verificar se usuário é o dono
      if (user && product.ownerId?.toString() !== user.id?.toString()) {
        alert("Você não tem permissão para editar este produto");
        router.push(`/products/${id}`);
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
      alert("Erro ao carregar produto");
      router.push("/products");
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
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files || []);
    const newImages = [];

    files.forEach(file => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          if (newImages.length === files.length) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, ...newImages].slice(0, 4)
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function removeImage(index) {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert("Título é obrigatório");
      return;
    }

    if (!formData.condition) {
      alert("Condição é obrigatória");
      return;
    }

    if (!formData.district) {
      alert("Distrito é obrigatório");
      return;
    }

    if (!formData.city.trim()) {
      alert("Cidade é obrigatória");
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
        alert(result.message || "Erro ao atualizar produto");
      } else {
        alert("Produto atualizado com sucesso!");
        router.push(`/products/${id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar produto");
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button
        onClick={() => router.push(`/products/${id}`)}
        variant="ghost"
        className="mb-6 text-[var(--ecodoa-primary)] hover:text-[var(--ecodoa-secondary)]"
      >
        ← Voltar
      </Button>

      <div className="bg-white rounded-sm shadow-lg p-6">
        <h1 className="text-3xl font-bold text-[var(--ecodoa-primary)] mb-6">
          Editar doação
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Título */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
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
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
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
              value={formData.condition}
              onChange={(e) => handleInputChange("condition", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
              required
            >
              {CONDITIONS.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>

          {/* Categoria */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Categoria
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Subcategoria */}
          {formData.categoryId && subcategories.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Subcategoria
              </label>
              <select
                value={formData.subcategoryId}
                onChange={(e) => handleInputChange("subcategoryId", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="">Selecione uma subcategoria</option>
                {subcategories.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Distrito */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Distrito *
            </label>
            <select
              value={formData.district}
              onChange={(e) => handleInputChange("district", e.target.value)}
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
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
              placeholder="Ex: Lisboa"
              required
            />
          </div>

          {/* Upload de fotos */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Fotos do produto (máximo 4)
            </label>
            <div className="relative inline-block">
              <Button asChild variant="outline" size="sm" type="button">
                <label className="cursor-pointer">
                  Adicionar fotos
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={formData.images.length >= 4}
                  />
                </label>
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Foto ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {formData.images.length >= 4 && (
              <p className="text-sm text-muted-foreground mt-2">
                Máximo de 4 fotos atingido
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/products/${id}`)}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              className="bg-[var(--ecodoa-primary)] text-white hover:bg-[var(--ecodoa-olive)]"
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

