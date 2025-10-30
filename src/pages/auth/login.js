import Link from 'next/link'

export default function Login()
{

    const handleLogin = () => {

    }

    const handleChange = () => {
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#042940] p-4">
      <div className="w-full max-w-md bg-[#FFFF] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#042940] text-center mb-6">Login</h2>
        <form className="flex flex-col gap-4">
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
          <button
            type="submit"
            className="bg-[#9FC131] hover:bg-[#DBF227] text-[#042940] font-bold py-3 rounded-md transition"
          >
            Entrar
          </button>
        </form>
        <p className="text-[#042940] text-center mt-4">
          Não tem conta?{" "}
          <Link href="/auth/register" className="text-[#042940] font-semibold hover:underline">
            Registrar
          </Link>
        </p>
      </div>
    </div>
    )
}