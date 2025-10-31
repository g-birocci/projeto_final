import Navbar from "@/components/Navbar";
import NavbarScroll from "@/components/NavbarScroll";
import Sidebar from "@/components/SideBarMenu";

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
