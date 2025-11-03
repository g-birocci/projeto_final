'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchProductById, reserveProduct, unreserveProduct, donateProduct, createConversation } from "@/services/api";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/Button";
import toast from "@/lib/toast";
import BackButton from "@/components/ui/BackButton";

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
      toast({ type: "info", message: "Você precisa estar logado para reservar um produto" });
      return;
    }

    try {
      setActionLoading(true);
      const result = await reserveProduct(id);
      if (result.error) {
        toast({ type: "info", message: result.message || "Erro ao reservar produto" });
      } else {
        toast({ type: "info", message: "Produto reservado com sucesso!" });
        loadProduct(); // Recarregar dados
      }
    } catch (err) {
      toast({ type: "info", message: "Erro ao reservar produto" });
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
        toast({ type: "info", message: result.message || "Erro ao cancelar reserva" });
      } else {
        toast({ type: "info", message: "Reserva cancelada com sucesso!" });
        loadProduct(); // Recarregar dados
      }
    } catch (err) {
      toast({ type: "info", message: "Erro ao cancelar reserva" });
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDonate() {
    if (!user) {
      toast({ type: "info", message: "Você precisa estar logado para doar um produto" });
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
        toast({ type: "info", message: result.message || "Erro ao doar produto" });
      } else {
        toast({ type: "info", message: "Produto doado com sucesso!" });
        loadProduct(); // Recarregar dados
      }
    } catch (err) {
      toast({ type: "info", message: "Erro ao doar produto" });
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleChat() {
    if (!user) {
      toast({ type: "info", message: "Você precisa estar logado para conversar com o doador" });
      router.push("/app/auth/login");
      return;
    }
    try {
      setActionLoading(true);
      const conv = await createConversation(id);
      const convId = (conv && conv._id) || (conv && conv.data && conv.data._id) || conv?.id;
      if (!convId) {
        toast({ type: "info", message: "Não foi possível abrir a conversa" });
        return;
      }
      router.push(`/app/chat?conversa=${convId}`);
    } catch (err) {
      console.error(err);
      const msg = err?.status === 409 ? 'Produto indisponível para conversa' : (err?.message || 'Erro ao iniciar conversa');
      toast({ type: "info", message: msg });
    } finally {
      setActionLoading(false);
    }
  }

  const isOwner = user && product && product.ownerId?.toString() === user.id?.toString();
  const isReservedByMe = user && product && product.reservedBy?.toString() === user.id?.toString();
  const canReserve = user && product && !isOwner && product.status === "DISPONÃƒÂVEL";
  const canCancelReserve = user && product && (isReservedByMe || isOwner) && product.status === "RESERVADO";
  const canDonate = user && product && isOwner && (product.status === "DISPONÃƒÂVEL" || product.status === "RESERVADO");

  const canChat = user && product && !isOwner && product.status !== "DOADO";

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
          <BackButton className="mb-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-18 max-w-4xl">
      <BackButton className="mb-4" />

      <div className="bg-white rounded-sm overflow-hidden">
        {/* Imagens */}
        {product.images && product.images.length > 0 && (
          <div className="grid p-4">
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

        <div className="px-6">
          {/* TÃƒÂ­tulo e Status */}
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            </div>
            <div className="flex justify-between pb-4">
              <p className="font-light text-foreground">{product.district}, {product.city}</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.status === "DISPONÍVEL"
                  ? "bg-[var(--ecodoa-accent)] text-[var(--ecodoa-primary)]"
                  : product.status === "RESERVADO"
                  ? "bg-[var(--ecodoa-accent)] text-[var(--ecodoa-primary)]"
                  : product.status === "DOADO"
                  ? "bg-[var(--ecodoa-accent)] text-[var(--ecodoa-secondary)]"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {product.status}
            </span>
          </div>

          {/* DescriÃ§Ã£o */}
          {product.description && (
            <p className="text-foreground mb-2">{product.description}</p>
          )}
          {/* InformaÃƒÂ§ÃƒÂµes */}
          <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
            <div>
              <p className="text-sm text-muted-foreground">{product.condition}</p>
            </div>
            <div>
              <p className="text-sm text-right text-muted-foreground">
              {new Date(product.createdAt).toLocaleDateString("pt-PT")}
            </p>
            </div>
            <div>
            </div>
            {product.status === "RESERVADO" && product.reservedUntil && (
              <div>
                <p className="text-sm text-muted-foreground">Reserva atÃ©Â©</p>
                <p className="font-semibold text-foreground">
                  {new Date(product.reservedUntil).toLocaleDateString("pt-PT")}
                </p>
              </div>
            )}
          </div>

          {/* AÃƒÂ§ÃƒÂµes */}
          {user && (
            <div className="flex gap-4 flex-wrap justify-self-center">
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

              {canChat && (
                <Button
                className={`bg-[var(--ecodoa-accent)] text-center text-[var(--ecodoa-primary)] rounded-3xl`}
                  onClick={handleChat}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Abrindo..." : "Conversar com doador"}
                </Button>
              )}              {isOwner && (
                <Button
                className={`bg-[var(--ecodoa-accent)] text-[var(--ecodoa-primary)]`}
                  onClick={() => router.push(`/app/products/edit/${id}`)}
                >
                  Editar Produto
                </Button>
              )}
            </div>
          )}

          {!user && (
            <p className="text-muted-foreground italic">
              FaÃ§a o login para reservar ou doar produtos
            </p>
          )}
        </div>
      </div>
    </div>
  );
}




