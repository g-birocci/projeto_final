import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#042940] p-4">
      <div className="w-full max-w-lg bg-[#FFFF] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#042940] text-center mb-6">Registrar</h2>
        <form className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nome"
              className="flex-1 p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
            />
            <input
              type="text"
              placeholder="Sobrenome"
              className="flex-1 p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
          />
          <input
            type="password"
            placeholder="Senha"
            className="p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Cidade"
              className="flex-1 p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
            />
            <input
              type="text"
              placeholder="Bairro"
              className="flex-1 p-3 rounded-md border border-[#cbe8e5] focus:outline-none focus:ring-2 focus:ring-[#9FC131]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#9FC131] hover:bg-[#DBF227] text-[#042940] font-bold py-3 rounded-md transition"
          >
            Registrar
          </button>
        </form>
        <p className="text-[#042940] text-center mt-4">
          Já tem conta?{" "}
          <Link href="/auth/login" className="text-[#042940] font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
