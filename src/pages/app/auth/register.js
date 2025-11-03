"use client";

import { useState } from "react";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import { createUser } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    district: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await createUser(form);
      console.log("UsuÃ¡rio criado:", res);
      router.push("/app/auth/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#042940] p-4">
      <div className="w-full max-w-lg bg-[#FFFF] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#042940] text-center mb-6">Registrar</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Nome"
              value={form.firstName}
              onChange={handleChange}
              className="flex-1 min-w-0 p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Sobrenome"
              value={form.lastName}
              onChange={handleChange}
              className="flex-1 min-w-0 p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
            required
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              value={form.city}
              onChange={handleChange}
              className="flex-1 min-w-0 p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
              required
            />
            <input
              type="text"
              name="district"
              placeholder="Bairro"
              value={form.district}
              onChange={handleChange}
              className="flex-1 min-w-0 p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#9FC131] hover:bg-[#DBF227] text-[#042940] font-bold py-3 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
        <p className="text-[#042940] text-center mt-4">
          JÃ¡ tem conta?{" "}
          <Link href="/app/auth/login" className="text-[#042940] font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

