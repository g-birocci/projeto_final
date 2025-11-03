'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [query, setQuery] = useState({});
  const { products, meta, loading } = useProducts(query);

  // Sincronizar query string da URL
  useEffect(() => {
    const urlQuery = {};
    if (router.query.page) urlQuery.page = router.query.page;
    if (router.query.q) urlQuery.q = router.query.q;
    if (router.query.categoryId) urlQuery.categoryId = router.query.categoryId;
    if (router.query.district) urlQuery.district = router.query.district;
    if (router.query.city) urlQuery.city = router.query.city;
    if (router.query.condition) urlQuery.condition = router.query.condition;
    setQuery(urlQuery);
  }, [router.query]);

  const handleProductClick = (productId) => {
    router.push(`/app/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between mt-12 items-center mb-6">
        {user && (
          <Button
            onClick={() => router.push("/app")}
            variant="default"
            className="right-0 bg-ecodoa-accent text-ecodoa-secondary font-medium">
            Publicar Doações
          </Button>
        )}
      </div>

      {/* Filtros básicos */}
      <div className="mb-6 p-4 bg-muted rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Buscar</label>
            <input
              type="text"
              placeholder="Digite para buscar..."
              className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
              onChange={(e) => {
                const newQuery = { ...query };
                if (e.target.value) {
                  newQuery.q = e.target.value;
                } else {
                  delete newQuery.q;
                }
                setQuery(newQuery);
                router.push({ query: newQuery });
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Distrito</label>
            <input
              type="text"
              placeholder="Filtrar por distrito..."
              className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
              onChange={(e) => {
                const newQuery = { ...query };
                if (e.target.value) {
                  newQuery.district = e.target.value;
                } else {
                  delete newQuery.district;
                }
                setQuery(newQuery);
                router.push({ query: newQuery });
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Cidade</label>
            <input
              type="text"
              placeholder="Filtrar por cidade..."
              className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground"
              onChange={(e) => {
                const newQuery = { ...query };
                if (e.target.value) {
                  newQuery.city = e.target.value;
                } else {
                  delete newQuery.city;
                }
                setQuery(newQuery);
                router.push({ query: newQuery });
              }}
            />
          </div>
        </div>
      </div>

      {/* Lista de produtos */}
      {products && products.length > 0 ? (
        <>
    <div className="grid grid-cols-2 gap-6 mb-8">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="bg-white rounded-sm overflow-hidden hover:cursor-pointer"
              >
                {/* Imagem */}
                {product.images && product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold truncate">{product.title}</h2>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${
                        product.status === "DISPONÃVEL"
                          ? "bg-[var(--ecodoa-accent)] text-[var(--ecodoa-primary)]"
                          : product.status === "RESERVADO"
                          ? "bg-[var(--ecodoa-accent)] text-[var(--ecodoa-primary)]"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  {product.description && (
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div>
                      <p className="font-semibold">{product.condition}</p>
                      <p>{product.city}, {product.district}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PaginaÃ§Ã£o */}
          {meta && meta.pages > 1 && (
            <div className="flex justify-center gap-2 items-center">
              <Button
                onClick={() => {
                  const newQuery = { ...query, page: (meta.page || 1) - 1 };
                  setQuery(newQuery);
                  router.push({ query: newQuery });
                }}
                disabled={meta.page <= 1}
                variant="outline"
                size="sm"
              >
                Anterior
              </Button>
              <span className="px-4 py-2 text-foreground">
                PÃ¡gina {meta.page} de {meta.pages}
              </span>
              <Button
                onClick={() => {
                  const newQuery = { ...query, page: (meta.page || 1) + 1 };
                  setQuery(newQuery);
                  router.push({ query: newQuery });
                }}
                disabled={meta.page >= meta.pages}
                variant="outline"
                size="sm"
              >
                PrÃ³xima
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
          {user && (
            <Button
              onClick={() => router.push("/")}
              variant="default"
              className="mt-4 bg-[var(--ecodoa-primary)] text-white hover:bg-[var(--ecodoa-olive)]"
            >
              Seja o primeiro a publicar!
            </Button>
          )}
        </div>
      )}
    </div>
  );
}


