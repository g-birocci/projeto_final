"use client";

import { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import MapaEcoDoa from "./MapaEcoDoa";

export default function MapWithFilters() {
  const [filters, setFilters] = useState({
    shelter: true,
    meal: true,
    course: true,
    support: true,
  });

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  const activeTypes = useMemo(() => {
    const on = Object.entries(filters)
      .filter(([, v]) => v)
      .map(([k]) => k);
    return on.length ? on : ["shelter", "meal", "course", "support"];
  }, [filters]);

  return (
    <div className="space-y-3">
      <FilterBar filters={filters} toggleFilter={toggleFilter} />
      <MapaEcoDoa activeTypes={activeTypes} />
    </div>
  );
}
