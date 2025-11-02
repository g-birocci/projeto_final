import React, { useEffect, useState } from "react";
import { onToast } from "@/lib/toast";

const COLORS = {
  info: "bg-ecodoa-soft text-ecodoa-primary border-ecodoa-accent",
  success: "bg-green-50 text-green-800 border-green-300",
  error: "bg-red-50 text-red-700 border-red-300",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-300",
};

export default function ToastContainer() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    return onToast((t) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id));
      }, t.duration || 3000);
    });
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={`min-w-[240px] max-w-[320px] border rounded-md shadow-md px-3 py-2 ${
            COLORS[t.type] || COLORS.info
          }`}
        >
          {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
          {t.message && <div className="text-sm opacity-90">{t.message}</div>}
        </div>
      ))}
    </div>
  );
}

