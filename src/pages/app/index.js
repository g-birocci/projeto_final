"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { createProduct, uploadImagesToCloudinary } from "@/services/api";
import CardProduto from "@/components/ui/CardProduto";
import ModalDoacao from "@/components/ui/ModalDoacao";
import { Input } from "@/components/ui/Pesquisa";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";
import ModalFiltros from "@/components/ui/ModalFiltros";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

export default function Index() {
  const router = useRouter();
  const { user } = useAuth();
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalFiltrosAberto, setModalFiltrosAberto] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const { products, loading, error, reload } = useProducts({
    categoria: categoriaSelecionada,
    busca: busca,
  });
  const {selectedCategory, selectedSubcategory} = useCategories();
  
  // modal
  const [fotos, setFotos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("BOM");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [confirmado, setConfirmado] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const handleFotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newImages = [];

    files.forEach(file => {
      if (file.type.startsWith("image/") && fotos.length + newImages.length < 4) {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          if (newImages.length === Math.min(files.length, 4 - fotos.length)) {
            setFotos(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleConfirmarDoacao = async () => {
    if (!title.trim()) return alert("Título é obrigatório");
    if (!condition) return alert("Condição é obrigatória");
    if (!district) return alert("Distrito é obrigatório");
    if (!city.trim()) return alert("Cidade é obrigatória");
    if (!user) {
      alert("Você precisa estar logado para publicar uma doação");
      router.push("/app/auth/login");
      return;
    }
  
    try {
      setSubmitting(true);
  
      const fileInput = document.querySelector('#fileInputDoacao');
      const files = fileInput?.files ? Array.from(fileInput.files) : [];
  
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", descricao.trim());
      formData.append("condition", condition);
      formData.append("district", district);
      formData.append("city", city.trim());
      formData.append("categoryId", categoryId);
      formData.append("subcategoryId", subcategoryId);
  
      files.forEach((file, idx) => formData.append("images", file));
  
      const result = await createProduct(formData);
  
      if (result.error) return alert(result.message || "Erro ao criar produto");
  
      setConfirmado(true);
      reload();
      setTimeout(() => {
        setModalAberto(false);
        resetForm();
        router.push("/app");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert(err.message || "Erro ao criar produto");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmado(false);
    setFotos([]);
    setDescricao("");
    setCategoria("");
    setTitle("");
    setCondition("BOM");
    setDistrict("");
    setCity("");
    setCategoryId("");
    setSubcategoryId("");
  };


  return (
    <div>
      <div className="z-8 px-4 pt-20">

        <div className="flex flex-col items-center justify-center align-middle gap-4 max-w-2xl mx-auto mt-8 px-4">
          <div className="relative w-full flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-ecodoa-olive" />
            <Input
              placeholder="Pesquisar doações..."
              className="pl-10 py-2 w-full --ecodoa-bg text-ecodoa-text placeholder-ecodoa-olive border border-ecodoa-accent focus:outline-none focus:ring-2 focus:ring-ecodoa-primary focus:border-ecodoa-primary"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="default"
            className="w-full hover:cursor-pointer"
            onClick={() => setModalFiltrosAberto(true)}
          >
            Filtros
          </Button>
        </div>

        {/* Header ajustado para layout mobile fixo */}
        <header
          className="bg-cover bg-center flex flex-col items-center justify-center text-center px-4 py-8 mt-6"
          style={{
            backgroundImage: 'url("")',
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          <Button
            variant="default"
            size="default"
            className="inline-flex items-center gap-3 py-3 px-6 rounded-full font-bold transition-all duration-300"
            onClick={() => setModalAberto(true)}
          >
            Publicar Doação
          </Button>
        </header>

            <main className="px-4 py-8 grid grid-cols-2 gap-4">
      {loading ? (
        <p className="text-center text-gray-600 col-span-full">Carregando...</p>
      ) : error ? (
        <p className="text-center text-red-500 col-span-full">{error}</p>
      ) : products.length > 0 ? (
        products
          .filter(
            (produto) =>
              produto.title?.toLowerCase().includes(busca.toLowerCase()) &&
              (categoriaSelecionada === "" ||
                produto.category?.toLowerCase() === categoriaSelecionada.toLowerCase())
          )
          .map((produto) => <CardProduto key={produto._id} produto={produto} />)
      ) : (
        <p className="text-center text-gray-600 col-span-full">
          Nenhum item disponível no momento.
        </p>
      )}
    </main>


        {modalAberto && (
          <ModalDoacao
            onClose={() => {
              setModalAberto(false);
              resetForm();
            }}
            fotos={fotos}
            setFotos={setFotos}
            descricao={descricao}
            setDescricao={setDescricao}
            categoria={categoria}
            setCategoria={setCategoria}
            confirmado={confirmado}
            setConfirmado={setConfirmado}
            handleFotoUpload={handleFotoUpload}
            handleConfirmarDoacao={handleConfirmarDoacao}
            title={title}
            setTitle={setTitle}
            condition={condition}
            setCondition={setCondition}
            district={district}
            setDistrict={setDistrict}
            city={city}
            setCity={setCity}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            subcategoryId={subcategoryId}
            setSubcategoryId={setSubcategoryId}
            submitting={submitting}
          />
        )}
        {modalFiltrosAberto && (
          <ModalFiltros
            onClose={() => setModalFiltrosAberto(false)}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
          />
        )}
      </div>
    </div>
  );
}
