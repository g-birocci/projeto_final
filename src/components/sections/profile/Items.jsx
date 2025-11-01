"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Items({ title, items }) {
  const ref = useRef(null);

  const handleScroll = (dir) => {
    if (!ref.current) return;
    const cardWidth = ref.current.firstChild?.offsetWidth || 320;
    const gap = 16; // mesmo valor do Tailwind gap-4 (4 = 1rem = 16px)
    const scrollAmount = cardWidth + gap;
    ref.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-8 relative">
      <h4 className="text-md font-semibold text-[var(--ecodoa-primary)] mb-3">
        {title}
      </h4>

      {/* Botão Esquerda */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-secondary)] text-white p-2 rounded-full shadow-lg transition-all duration-300 -translate-x-2"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Conteúdo Scrolling */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2 snap-x snap-mandatory"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex-none w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden border border-[var(--ecodoa-soft)] hover:border-[var(--ecodoa-accent)] transition-all duration-300 snap-center"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-2 left-3 right-3 text-white drop-shadow">
                <p className="text-sm font-semibold leading-tight">
                  {item.title}
                </p>
                <p className="text-[11px] opacity-90">
                  {item.category} • {item.date}
                </p>
              </div>
            </div>
            <div className="p-4">
              <span
                className={`px-2 py-[2px] rounded-full text-xs font-semibold ${
                  item.status === "Entregue"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Em recolha"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-[var(--ecodoa-accent)]/15 text-[var(--ecodoa-accent)]"
                }`}
              >
                {item.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botão Direita */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--ecodoa-primary)] hover:bg-[var(--ecodoa-secondary)] text-white p-2 rounded-full shadow-lg transition-all duration-300 translate-x-2"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
