import Navbar from "@/components/layout/Navbar";
import NavbarScroll from "@/components/layout/NavbarScroll";
import Sidebar from "@/components/layout/SideBarMenu";

export default function Perfil() {
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="perfil" />
      <main className="flex-1 p-8 lg:ml-60">
        <h1 className="text-3xl font-bold text-green-700">Meu Perfil</h1>
        <Navbar/>
        <NavbarScroll/>
      </main>
    </div>
  );
}
