"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import PartnersSection from "@/components/PartnersSection";
import DonateSection from "@/components/DonateSection";

const MapaEcoDoa = dynamic(() => import("@/components/MapaEcoDoa"), {
  ssr: false,
  loading: () => <p className="text-center text-green-700 py-10">A carregar mapa...</p>,
});

export default function Ajuda() {
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState({
    shelter: true,
    meal: true,
    job: true,
    course: true,
    support: true,
    clothes: true,
  });

  useEffect(() => {
    setPlaces([
      { id: 1, name: "Albergue Noite Segura", type: "shelter", city: "Porto", info: "Acolhimento 24h.", lat: 41.1496, lng: -8.61 },
      { id: 2, name: "Cantina Solidária Bonfim", type: "meal", city: "Porto", info: "Refeições gratuitas às 12h30.", lat: 41.147, lng: -8.59 },
      { id: 3, name: "Centro de Emprego de Coimbra", type: "job", city: "Coimbra", info: "Apoio à recolocação profissional.", lat: 40.20, lng: -8.41 },
      { id: 4, name: "Escola Popular Gaia", type: "course", city: "Vila Nova de Gaia", info: "Cursos gratuitos de inclusão digital.", lat: 41.12, lng: -8.62 },
      { id: 5, name: "Espaço Mente Aberta", type: "support", city: "Leiria", info: "Apoio psicológico gratuito.", lat: 39.75, lng: -8.81 },
      { id: 6, name: "Banco de Roupas Solidário", type: "clothes", city: "Aveiro", info: "Distribuição de roupas e calçados.", lat: 40.64, lng: -8.65 },
    ]);
  }, []);

  const visiblePlaces = useMemo(() => places.filter((p) => filters[p.type]), [places, filters]);
  const toggleFilter = (key) => setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-white text-[#1E2D2F]">
      <Navbar />

      <section className="px-6 pt-20 pb-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Pontos de Ajuda</h1>
        <p className="text-[#1E2D2F]/80">
          Mapa de solidariedade: encontra locais em Portugal com refeições, abrigo, cursos e apoio.
        </p>
      </section>

      <FilterBar filters={filters} toggleFilter={toggleFilter} />

      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="rounded-2xl overflow-hidden border border-green-100 shadow-sm">
          <MapaEcoDoa places={visiblePlaces} />
        </div>
      </section>

      <PartnersSection />
      <DonateSection />
      <Footer />
    </div>
  );
}
