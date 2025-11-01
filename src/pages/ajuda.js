"use client"; // pra que serve isso ?

import dynamic from "next/dynamic";
<<<<<<< HEAD
import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import DonateSection from "@/components/DonateSection";
import PartnersSection from "@/components/PartnersSection";
import NavbarScroll from "@/components/Navmobile";
import SideBarMenu from "@/components/SideBarMenu";
=======
import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterBar from "@/components/sections/ajuda/FilterBar";
import DonateSection from "@/components/sections/ajuda/DonateSection";
import PartnersSection from "@/components/sections/ajuda/PartnersSection";
import NavbarScroll from "@/components/layout/NavbarScroll";
import { locaisData } from "@/data/locaisData"; 
>>>>>>> main

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

<<<<<<< HEAD
  // dados de teste do mapa
  useEffect(() => {
    setPlaces([
      {
        id: 1,
        name: "Albergue Noite Segura",
        type: "shelter",
        city: "Porto",
        info: "Acolhimento 24h.",
        lat: 41.1496,
        lng: -8.61,
      },
      {
        id: 2,
        name: "Cantina Solidária Bonfim",
        type: "meal",
        city: "Porto",
        info: "Refeições gratuitas às 12h30.",
        lat: 41.147,
        lng: -8.59,
      },
      {
        id: 3,
        name: "Centro de Emprego de Coimbra",
        type: "job",
        city: "Coimbra",
        info: "Apoio à recolocação profissional.",
        lat: 40.2,
        lng: -8.41,
      },
      {
        id: 4,
        name: "Escola Popular Gaia",
        type: "course",
        city: "Vila Nova de Gaia",
        info: "Cursos gratuitos de inclusão digital.",
        lat: 41.12,
        lng: -8.62,
      },
      {
        id: 5,
        name: "Espaço Mente Aberta",
        type: "support",
        city: "Leiria",
        info: "Apoio psicológico gratuito.",
        lat: 39.75,
        lng: -8.81,
      },
      {
        id: 6,
        name: "Banco de Roupas Solidário",
        type: "clothes",
        city: "Aveiro",
        info: "Distribuição de roupas e calçados.",
        lat: 40.64,
        lng: -8.65,
      },
    ]);
  }, []);

=======
  // aplica filtros diretamente sobre os dados da pasta /data
>>>>>>> main
  const visiblePlaces = useMemo(
    () => locaisData.filter((p) => filters[p.type]),
    [filters]
  );

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-[var(--ecodoa-bg)] text-[var(--ecodoa-text)]">
<<<<<<< HEAD
      <Navbar />
      <NavbarScroll />
      <SideBarMenu />

      <section className="px-6 pt-24 pb-6 text-center max-w-4xl mx-auto">
=======
      {/* Título da página */}
      <section className="px-4 pt-24 pb-8 text-center max-w-4xl mx-auto">
>>>>>>> main
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
<<<<<<< HEAD
=======
      <Navbar />
      <NavbarScroll />
      <Footer />
>>>>>>> main
    </div>
  );
}
