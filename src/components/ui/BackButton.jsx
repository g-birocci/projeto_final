"use client";
import React from "react";
import { useRouter } from "next/router";

export default function BackButton({
  label = "Voltar",
  fallback = "/app",
  onClick,
  className = "",
}) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onClick === "function") {
      return onClick(e);
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 text-[var(--ecodoa-primary)] hover:text-[var(--ecodoa-secondary)] px-0 py-2 ${className}`}
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9.53 4.47a.75.75 0 0 1 0 1.06L4.81 10.25H21a.75.75 0 0 1 0 1.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-medium">{label}</span>
    </button>
  );
}
