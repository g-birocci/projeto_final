import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../services/api";

export function useProducts(query = {}) {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchProducts(query);
      setProducts(res.data || []);
      setMeta(res.meta || {});
    } catch (err) {
      console.error("Erro no useProducts:", err);
      setError(err.message || "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(query)]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, meta, loading, error, reload: load };
}
