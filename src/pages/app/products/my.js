"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { fetchMyProducts, deleteProduct } from "@/services/api";
import CardProduto from "@/components/ui/CardProduto";
import { Button } from "@/components/ui/Button";
import toast from "@/lib/toast";
import { Edit2, Trash2, Package } from "lucide-react";
import Link from "next/link";

export default function MyProductsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/app/auth/login");
      } else {
        loadProducts();
      }
    }
  }, [user, authLoading]);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");
      const result = await fetchMyProducts();
      if (result.error) {
        setError(result.message || "Erro ao carregar produtos");
      } else {
        setProducts(result.data || []);
      }
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setError(err.message || "Erro ao carregar seus produtos");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId, productTitle) {
    if (!confirm(`Tem certeza que deseja excluir "${productTitle}"?`)) {
      return;
    }

    try {
      const result = await deleteProduct(productId);
      if (result.error) {
        toast({ type: "error", message: result.message || "Erro ao excluir produto" });
      } else {
        toast({ type: "success", message: "Produto excluído com sucesso!" });
        loadProducts();
      }
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      toast({ type: "error", message: "Erro ao excluir produto" });
    }
  }

  const getStatusColor = (status, reservedBy) => {
    if (status === "DOADO") return "bg-green-100 text-green-700";
    if (status === "RESERVADO") return "bg-yellow-100 text-yellow-700";
    if (reservedBy) return "bg-orange-100 text-orange-700";
    return "bg-ecodoa-soft text-ecodoa-primary";
  };

  const getStatusText = (status, reservedBy) => {
    if (status === "DOADO") return "Doado";
    if (status === "RESERVADO") return "Reservado";
    if (reservedBy) return "Reservado";
    return "Disponível";
  };

  if (loading) {
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
    <div className="min-h-screen  pb-20">
      <div className="px-4 pt-20">
        <h1 className="text-lg font-bold text-ecodoa-primary mb-4">Meus Produtos</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 border border-ecodoa-accent text-center">
            <Package className="w-12 h-12 mx-auto mb-3 text-ecodoa-olive opacity-50" />
            <p className="text-sm text-ecodoa-primary mb-4">Você ainda não publicou nenhum produto.</p>
            <Link href="/app">
              <Button variant="default" size="sm">
                Publicar Primeiro Produto
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((produto) => (
              <div key={produto._id} className="relative">
                <Link href={`/app/products/${produto._id}`}>
                  <CardProduto produto={produto} />
                </Link>
                <div className="absolute top-2 left-2 right-2 flex gap-1 justify-between items-start">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                      produto.status,
                      produto.reservedBy
                    )}`}
                  >
                    {getStatusText(produto.status, produto.reservedBy)}
                  </span>
                  <div className="flex gap-1">
                    {produto.status !== "DOADO" && (
                      <Link href={`/app/products/edit/${produto._id}`}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(`/app/products/edit/${produto._id}`);
                          }}
                          className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center shadow-sm hover:bg-ecodoa-accent/20 transition"
                          aria-label="Editar produto"
                        >
                          <Edit2 size={14} className="text-ecodoa-primary" />
                        </button>
                      </Link>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(produto._id, produto.title);
                      }}
                      className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center shadow-sm hover:bg-red-100 transition"
                      aria-label="Excluir produto"
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

