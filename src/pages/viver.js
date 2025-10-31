"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sustentavel from "@/components/Sustentavel"; // Importe o componente Sustentavel
import Calculadora from "@/components/Calculadora"; // Importe o componente Calculadora
import Dicas from "@/components/Dicas"; // Importe o componente Dicas
import Educacionais from "@/components/Educacionais"; // Importe o componente Educacionais
import NavbarScroll from "@/components/NavbarScroll";
import SidebarMenu from "@/components/SideBarMenu";

export default function Viver() {
  // Layout ajustado para ser fixo em escala mobile.
  return (
    <div className="min-h-screen bg-white text-[#1E2D2F]">
      <Navbar />
      <NavbarScroll />
      <SidebarMenu/>
      <Sustentavel />
      <Calculadora />
      <Dicas />
      <Educacionais />
      <Footer />
    </div>
  );
}
