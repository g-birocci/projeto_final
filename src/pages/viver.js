"use client";

import Sustentavel from "@/components/sections/viver/Sustentavel"; 
import Calculadora from "@/components/sections/viver/Calculadora"; 
import Dicas from "@/components/sections/viver/Dicas"; 
import Educacionais from "@/components/sections/viver/Educacionais"; 

export default function Viver() {
  // Layout ajustado para ser fixo em escala mobile.
  return (
    <div className="min-h-screen bg-white text-[#1E2D2F]">
      <Sustentavel />
      <Calculadora />
      <Dicas />
      <Educacionais />
    </div>
  );
}
