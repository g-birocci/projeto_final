"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

export default function Login() {
  const router = useRouter()
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#042940] p-4">
      <div className="w-full max-w-md bg-[#FFFF] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#042940] text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#9FC131] hover:bg-[#DBF227] text-[#042940] font-bold py-3 rounded-md transition disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>

        <p className="text-[#042940] text-center mt-4">
          NÃ£o tem conta?{" "}
          <Link href="/auth/register" className="text-[#042940] font-semibold hover:underline">
            Registrar
          </Link>
        </p>
      </div>
    </div>
  );
}

