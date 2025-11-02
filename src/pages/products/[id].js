import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchProductById, reserveProduct, unreserveProduct, donateProduct } from "@/services/api";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/Button";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchProductById(id);
      if (result.error) {
        setError(result.message || "Erro ao carregar produto");
      } else {
        setProduct(result.data);
      }
    } catch (err) {
      setError("Erro ao carregar produto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleReserve() {
    if (!user) {
      alert("Você precisa estar logado para reservar um produto");
      return;
    }

    try {
      setActionLoading(true);
      const result = await reserveProduct(id);
      if (result.error) {
        alert(result.message || "Erro ao reservar produto");
      } else {
        alert("Produto reservado com sucesso!");
        loadProduct(); // Recarregar dados
      }
    } catch (err) {
      alert("Erro ao reservar produto");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleUnreserve() {
    try {
      setActionLoading(true);
      const result = await unreserveProduct(id);
      if (result.error) {
        alert(result.message || "Erro ao cancelar reserva");
      } else {
        alert("Reserva cancelada com sucesso!");
        loadProduct(); // Recarregar dados
      }
    } catch (err) {
      alert("Erro ao cancelar reserva");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDonate() {
    if (!user) {
      alert("Você precisa estar logado para doar um produto");
      return;
    }

    if (!confirm("Tem certeza que deseja doar este produto?")) {
      return;
    }

    try {
      setActionLoading(true);
      const receiverId = product.reservedBy || null;
      const result = await donateProduct(id, receiverId);
      if (result.error) {
        alert(result.message || "Erro ao doar produto");
      } else {
        alert("Produto doado com sucesso!");
        loadProduct(); // Recarregar dados
      }
    } catch (err) {
      alert("Erro ao doar produto");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  }

  const isOwner = user && product && product.ownerId?.toString() === user.id?.toString();
  const isReservedByMe = user && product && product.reservedBy?.toString() === user.id?.toString();
  const canReserve = user && product && !isOwner && product.status === "DISPONÍVEL";
  const canCancelReserve = user && product && (isReservedByMe || isOwner) && product.status === "RESERVADO";
  const canDonate = user && product && isOwner && (product.status === "DISPONÍVEL" || product.status === "RESERVADO");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-[var(--ecodoa-alert)] mb-4">{error || "Produto não encontrado"}</p>
          <Button
            onClick={() => router.push("/products")}
            variant="default"
          >
            Voltar para lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-4 text-[var(--ecodoa-primary)] hover:text-[var(--ecodoa-secondary)]"
      >
        ← Voltar
      </Button>

      <div className="bg-white rounded-sm shadow-lg overflow-hidden">
        {/* Imagens */}
        {product.images && product.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 p-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} - Imagem ${index + 1}`}
                className="w-full h-48 object-cover rounded"
              />
            ))}
          </div>
        )}

        <div className="p-6">
          {/* Título e Status */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                product.status === "DISPONÍVEL"
                  ? "bg-[var(--ecodoa-green)] text-[var(--ecodoa-primary)]"
                  : product.status === "RESERVADO"
                  ? "bg-[var(--ecodoa-accent)] text-[var(--ecodoa-primary)]"
                  : product.status === "DOADO"
                  ? "bg-[var(--ecodoa-soft)] text-[var(--ecodoa-secondary)]"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {product.status}
            </span>
          </div>

          {/* Descrição */}
          {product.description && (
            <p className="text-foreground mb-4">{product.description}</p>
          )}

          {/* Informações */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Condição</p>
              <p className="font-semibold text-foreground">{product.condition}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Distrito</p>
              <p className="font-semibold text-foreground">{product.district}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cidade</p>
              <p className="font-semibold text-foreground">{product.city}</p>
            </div>
            {product.status === "RESERVADO" && product.reservedUntil && (
              <div>
                <p className="text-sm text-muted-foreground">Reserva até</p>
                <p className="font-semibold text-foreground">
                  {new Date(product.reservedUntil).toLocaleDateString("pt-PT")}
                </p>
              </div>
            )}
          </div>

          {/* Ações */}
          {user && (
            <div className="flex gap-4 flex-wrap">
              {canReserve && (
                <Button
                  onClick={handleReserve}
                  disabled={actionLoading}
                  variant="default"
                >
                  {actionLoading ? "Reservando..." : "Reservar Produto"}
                </Button>
              )}

              {canCancelReserve && (
                <Button
                  onClick={handleUnreserve}
                  disabled={actionLoading}
                  variant="outline"
                >
                  {actionLoading ? "Cancelando..." : "Cancelar Reserva"}
                </Button>
              )}

              {canDonate && (
                <Button
                  onClick={handleDonate}
                  disabled={actionLoading}
                  variant="default"
                  className="bg-[var(--ecodoa-primary)] text-white hover:bg-[var(--ecodoa-olive)]"
                >
                  {actionLoading ? "Doando..." : "Doar Produto"}
                </Button>
              )}

              {isOwner && (
                <Button
                  onClick={() => router.push(`/products/edit/${id}`)}
                  variant="outline"
                >
                  Editar Produto
                </Button>
              )}
            </div>
          )}

          {!user && (
            <p className="text-muted-foreground italic">
              Faça login para reservar ou doar produtos
            </p>
          )}

          {/* Data de criação */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Publicado em {new Date(product.createdAt).toLocaleDateString("pt-PT")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

