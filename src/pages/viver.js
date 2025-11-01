"use client";

<<<<<<< HEAD
import Sustentavel from "@/components/Sustentavel";
import Calculadora from "@/components/Calculadora";
import Dicas from "@/components/Dicas";
import Educacionais from "@/components/Educacionais";
import SidebarMenu from "@/components/SideBarMenu";
=======
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sustentavel from "@/components/sections/viver/Sustentavel"; 
import Calculadora from "@/components/sections/viver/Calculadora"; 
import Dicas from "@/components/sections/viver/Dicas"; 
import Educacionais from "@/components/sections/viver/Educacionais"; 
import NavbarScroll from "@/components/layout/NavbarScroll";
>>>>>>> main

export default function Viver() {
  // Layout ajustado para ser fixo em escala mobile.
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-white text-[#1E2D2F] overflow-x-hidden">
      <SidebarMenu />
=======
    <div className="min-h-screen bg-white text-[#1E2D2F]">
      <Navbar />
      <NavbarScroll />
>>>>>>> main
      <Sustentavel />
      <Calculadora />
      <Dicas />
      <Educacionais />
    </div>
  );
}
