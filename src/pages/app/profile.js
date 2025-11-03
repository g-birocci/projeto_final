"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { getUser, updateUser } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Edit3, LogOut, Package, HeartHandshake } from "lucide-react";
import toast from "@/lib/toast";
import EditModal from "@/components/sections/profile/EditModal";
import { fetchMyProducts } from "@/services/api";
import CardProduto from "@/components/ui/CardProduto";

import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, logout: logoutAuth, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(null);
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    if (authUser && !authLoading) {
      loadUserProfile();
      loadMyProducts();
    }
  }, [authUser, authLoading]);

  async function loadMyProducts() {
    try {
      const result = await fetchMyProducts();
      if (result?.data) {
        setMyProducts(result.data.slice(0, 5));
      }
    } catch (err) {
      console.error("Erro ao carregar produtos do usuário:", err);
    }
  }
  async function loadUserProfile() {
    try {
      setLoading(true);
      const result = await getUser();
      if (result && result.data) {
        const userData = result.data;
        const userProfile = {
          id: userData._id || userData.id,
          name: `${userData.firtName || userData.firstName || ""} ${userData.lastName || ""}`.trim() || userData.email,
          email: userData.email,
          city: userData.city || "",
          district: userData.district || "",
          donated: userData.donationsGiven || 0,
          received: userData.donationsRecived || userData.donationsReceived || 0,
          impacted: (userData.donationsGiven || 0) + (userData.donationsRecived || userData.donationsReceived || 0),
          firstName: userData.firtName || userData.firstName || "",
          lastName: userData.lastName || "",
        };
        setUser(userProfile);
        setForm(userProfile);
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setError("Erro ao carregar dados do perfil");
    } finally {
      setLoading(false);
    }
  }

  const handleEditToggle = () => setEditing(!editing);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = async () => {
    if (!validateEmail(form.email)) {
      setError("Por favor, insere um e-mail válido.");
      return;
    }
    if (!form.firstName || !form.lastName || !form.city || !form.district) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    try {
      setLoading(true);
      const result = await updateUser(form.id, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        city: form.city,
        district: form.district,
      });
      if (result && result.data) {
        const userData = result.data;
        const updatedProfile = {
          ...form,
          name: `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || userData.email,
          email: userData.email,
          city: userData.city || "",
          district: userData.district || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
        };
        setUser(updatedProfile);
        setForm(updatedProfile);
        setEditing(false);
        setError("");
        toast({ type: "success", message: "Perfil atualizado com sucesso!" });
      }
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setError(err.message || "Erro ao salvar alterações");
      toast({ type: "error", message: err.message || "Erro ao salvar alterações" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAuth();
      toast({ type: "success", message: "Logout realizado com sucesso!" });
      router.push("/");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      toast({ type: "error", message: "Erro ao fazer logout" });
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--ecodoa-primary)] mx-auto mb-4"></div>
          <p className="text-[var(--ecodoa-primary)]">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pb-20">
      <div className="px-4 pt-20">
        <div className="mb-4">
          <h1 className="text-lg font-bold text-ecodoa-primary">Perfil</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-ecodoa-accent">
          <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-ecodoa-accent/30">
            <div className="w-20 h-20 rounded-full bg-ecodoa-accent flex items-center justify-center">
              <span className="text-ecodoa-primary font-bold text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <h2 className="text-lg font-semibold text-ecodoa-primary">{user.name}</h2>
              <button
                onClick={handleEditToggle}
                className="text-ecodoa-accent hover:opacity-80"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs opacity-80">{user.email}</p>
            {(user.city || user.district) && (
              <p className="text-xs opacity-70">{user.city}{user.district ? `, ${user.district}` : ""}</p>
            )}

            <div className="grid grid-cols-3 gap-3 w-full mt-3">
              <div className="text-center">
                <p className="text-xl font-bold text-ecodoa-primary">{user.donated}</p>
                <p className="text-[10px] opacity-70 uppercase">Doados</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-ecodoa-accent">{user.received}</p>
                <p className="text-[10px] opacity-70 uppercase">Recebidos</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-ecodoa-olive">{user.impacted}</p>
                <p className="text-[10px] opacity-70 uppercase">Impactados</p>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">


            <Link href="/app/products/history">
              <Button
                variant="outline"
                className="w-full mb-4 justify-start gap-2 text-ecodoa-primary border-ecodoa-accent hover:bg-ecodoa-soft"
              >
                <HeartHandshake className="w-4 h-4" />
                Histórico de Doações
              </Button>
            </Link>

            {myProducts.length > 0 ? (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-ecodoa-primary mb-2">
                  Últimos produtos
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {myProducts.map((produto) => (
                    <Link key={produto._id} href={`/app/products/${produto._id}`}>
                      <div className="min-w-[150px]">
                        <CardProduto produto={produto} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground text-center mb-4">
                Você ainda não publicou nenhum produto.
              </div>
            )}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start gap-2 bg-red-700 text-ecodoa-bg font-bold"
            >
              <LogOut className="w-4 h-4" />
              Sair da conta
            </Button>
          </div>
        </div>

        {editing && (
          <EditModal
            form={form}
            onChange={handleChange}
            error={error}
            onSave={handleSave}
            onCancel={() => {
              setEditing(false);
              setError("");
            }}
          />
        )}
      </div>
    </div>
  );
}
