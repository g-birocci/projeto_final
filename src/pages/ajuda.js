"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterBar from "@/components/sections/ajuda/FilterBar";
import DonateSection from "@/components/sections/ajuda/DonateSection";
import PartnersSection from "@/components/sections/ajuda/PartnersSection";
import NavbarScroll from "@/components/layout/NavbarScroll";
import { locaisData } from "@/data/locaisData"; 

// importação dinâmica do mapa (sem SSR)
const MapaEcoDoa = dynamic(() => import("@/components/sections/ajuda/MapaEcoDoa"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-[var(--ecodoa-primary)] py-10">
      A carregar mapa...
    </p>
  ),
});

export default function Ajuda() {
  const [filters, setFilters] = useState({
    shelter: true,
    meal: true,
    job: true,
    course: true,
    support: true,
    clothes: true,
  });

  // aplica filtros diretamente sobre os dados da pasta /data
  const visiblePlaces = useMemo(
    () => locaisData.filter((p) => filters[p.type]),
    [filters]
  );

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-[var(--ecodoa-bg)] text-[var(--ecodoa-text)]">
      {/* Título da página */}
      <section className="px-4 pt-24 pb-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--ecodoa-primary)] mb-4">
          Pontos de Ajuda
        </h1>
        <p className="text-[var(--ecodoa-text)]/80">
          Esses locais em Portugal podem te ajudar.
        </p>
      </section>

      {/* Barra de filtros */}
      <div className="relative z-10 mb-8">
        <FilterBar filters={filters} toggleFilter={toggleFilter} />
      </div>

      {/* Mapa */}
      <section className="relative max-w-5xl mx-auto px-4 pb-16 z-0">
        <div className="relative rounded-2xl overflow-hidden border border-[var(--ecodoa-soft)] shadow-sm z-0">
          <MapaEcoDoa places={visiblePlaces} />
        </div>
      </section>

      <PartnersSection />
      <DonateSection />
      <Navbar />
      <NavbarScroll />
      <Footer />
    </div>
  );
}
