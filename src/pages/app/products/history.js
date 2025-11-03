"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { fetchDonationHistory, fetchReservations } from "@/services/api";
import CardProduto from "@/components/ui/CardProduto";
import toast from "@/lib/toast";
import { HeartHandshake, Package, Calendar } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [donated, setDonated] = useState([]);
  const [received, setReceived] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("donated");

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/app/auth/login");
      } else {
        loadHistory();
      }
    }
  }, [user, authLoading]);

  async function loadHistory() {
    try {
      setLoading(true);
      setError("");

      const [donationsResult, reservationsResult] = await Promise.all([
        fetchDonationHistory(),
        fetchReservations(),
      ]);

      if (donationsResult.error) {
        setError(donationsResult.message || "Erro ao carregar histórico");
      } else {
        setDonated(donationsResult.data?.donated || []);
        setReceived(donationsResult.data?.received || []);
      }

      if (reservationsResult.error) {
        console.error("Erro ao carregar reservas:", reservationsResult.message);
      } else {
        setReservations(reservationsResult.data || []);
      }
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
      setError(err.message || "Erro ao carregar histórico");
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ecodoa-primary mx-auto mb-3"></div>
          <p className="text-sm text-ecodoa-primary">Carregando...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "donated", label: "Doados", icon: <HeartHandshake size={16} />, count: donated.length },
    { id: "received", label: "Recebidos", icon: <Package size={16} />, count: received.length },
    { id: "reservations", label: "Reservas", icon: <Calendar size={16} />, count: reservations.length },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="px-4 pt-20">
        <h1 className="text-lg font-semibold text-ecodoa-primary mb-4">Histórico</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-4 bg-white rounded-lg p-1 border border-ecodoa-accent/30 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-md text-xs font-medium transition ${
                activeTab === tab.id
                  ? "bg-ecodoa-accent text-ecodoa-secondary"
                  : "text-ecodoa-primary hover:bg-ecodoa-soft"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-ecodoa-secondary/20" : "bg-ecodoa-accent/20"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="space-y-4">
          {activeTab === "donated" && (
            <>
              {donated.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 border border-ecodoa-accent text-center">
                  <HeartHandshake className="w-12 h-12 mx-auto mb-3 text-ecodoa-olive opacity-50" />
                  <p className="text-sm text-ecodoa-primary">Você ainda não doou nenhum produto.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {donated.map((produto) => (
                    <Link key={produto._id} href={`/app/products/${produto._id}`}>
                      <div className="relative">
                        <CardProduto produto={produto} />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                            Doado
                          </span>
                        </div>
                        {produto.donatedTo && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-[10px] text-ecodoa-primary bg-white/90 backdrop-blur-sm px-2 py-1 rounded">
                              Para: {produto.donatedTo?.firstName || produto.donatedTo?.name || "Usuário"}
                            </p>
                          </div>
                        )}
                        {produto.updatedAt && (
                          <p className="text-[9px] text-ecodoa-olive mt-1 px-2">
                            {formatDate(produto.updatedAt)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "received" && (
            <>
              {received.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 border border-ecodoa-accent text-center">
                  <Package className="w-12 h-12 mx-auto mb-3 text-ecodoa-olive opacity-50" />
                  <p className="text-sm text-ecodoa-primary">Você ainda não recebeu nenhuma doação.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {received.map((produto) => (
                    <Link key={produto._id} href={`/app/products/${produto._id}`}>
                      <div className="relative">
                        <CardProduto produto={produto} />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                            Recebido
                          </span>
                        </div>
                        {produto.ownerId && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-[10px] text-ecodoa-primary bg-white/90 backdrop-blur-sm px-2 py-1 rounded">
                              De: {produto.ownerId?.firstName || produto.ownerId?.name || "Usuário"}
                            </p>
                          </div>
                        )}
                        {produto.updatedAt && (
                          <p className="text-[9px] text-ecodoa-olive mt-1 px-2">
                            {formatDate(produto.updatedAt)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "reservations" && (
            <>
              {reservations.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 border border-ecodoa-accent text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-ecodoa-olive opacity-50" />
                  <p className="text-sm text-ecodoa-primary">Você não tem produtos reservados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {reservations.map((produto) => (
                    <Link key={produto._id} href={`/app/products/${produto._id}`}>
                      <div className="relative">
                        <CardProduto produto={produto} />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-700">
                            Reservado
                          </span>
                        </div>
                        {produto.ownerId && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-[10px] text-ecodoa-primary bg-white/90 backdrop-blur-sm px-2 py-1 rounded">
                              De: {produto.ownerId?.firstName || produto.ownerId?.name || "Usuário"}
                            </p>
                          </div>
                        )}
                        {produto.reservedUntil && (
                          <p className="text-[9px] text-ecodoa-olive mt-1 px-2">
                            Válido até: {formatDate(produto.reservedUntil)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

