import { Home, Utensils, BookOpen, Briefcase, HeartHandshake, Shirt } from "lucide-react";

export default function FilterBar({ filters, toggleFilter }) {
  const filterList = [
    { key: "shelter", label: "Albergues", icon: <Home className="w-4 h-4" /> },
    { key: "meal", label: "Refeições", icon: <Utensils className="w-4 h-4" /> },
    { key: "job", label: "Emprego", icon: <Briefcase className="w-4 h-4" /> },
    { key: "course", label: "Cursos", icon: <BookOpen className="w-4 h-4" /> },
    { key: "support", label: "Apoio Psicológico", icon: <HeartHandshake className="w-4 h-4" /> },
    { key: "clothes", label: "Roupas", icon: <Shirt className="w-4 h-4" /> },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 pb-6">
      <div className="flex flex-wrap justify-center gap-3">
        {filterList.map((f) => (
          <button
            key={f.key}
            onClick={() => toggleFilter(f.key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition ${
              filters[f.key]
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-700 border-green-300 hover:bg-green-50"
            }`}
          >
            {f.icon}
            {f.label}
          </button>
        ))}
      </div>
    </section>
  );
}
