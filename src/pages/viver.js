"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sustentavel from "@/components/sections/viver/Sustentavel"; 
import Calculadora from "@/components/sections/viver/Calculadora"; 
import Dicas from "@/components/sections/viver/Dicas"; 
import Educacionais from "@/components/sections/viver/Educacionais"; 
import NavbarScroll from "@/components/layout/NavbarScroll";
import SidebarMenu from "@/components/layout/SideBarMenu";

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
