"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sustentavel from "@/components/Sustentavel";
import Calculadora from "@/components/Calculadora";
import Dicas from "@/components/Dicas";
import Educacionais from "@/components/Educacionais";
import NavbarScroll from "@/components/NavbarScroll";
import SidebarMenu from "@/components/SideBarMenu";


export default function Viver() {
  return (
    <div className="min-h-screen bg-white text-[#1E2D2F] overflow-x-hidden">
      <SidebarMenu />
      <Sustentavel />
      <Calculadora />
      <Dicas />
      <Educacionais />
    </div>
  );
}
