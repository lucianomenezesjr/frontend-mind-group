"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import Settings from "@/app/components/templates/Settings";
import LogoDark from "@/app/components/LogoDark";
import BotaoSubmit from "@/app/components/BotaoSubmit";
import { toast } from "sonner";

export default function EditarArtigo() {
  const { id } = useParams(); // Pega o ID da URL
  const router = useRouter();
  
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({ avatar: "", name: "" });
  const [formData, setFormData] = useState({
    banner: "",
    titulo: "",
    conteudo: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      fetch("http://localhost:3000/users/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData({
            avatar: data.imagemPerfil || "",
            name: `${data.nome} ${data.sobrenome}`,
          });
        });

      // Buscar dados do artigo atual
      fetch(`http://localhost:3000/artigos/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            banner: data.imagemBanner || "",
            titulo: data.titulo || "",
            conteudo: data.conteudo || "",
          });
        })
        .catch(() => toast.error("Erro ao carregar artigo."));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Usuário não autenticado.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/artigos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          conteudo: formData.conteudo,
          imagemBanner: formData.banner,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao atualizar artigo.");
      }

      toast.success("Artigo atualizado com sucesso!");
      router.push("/artigos");

    } catch (err: any) {
      toast.error(err.message || "Erro ao atualizar artigo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between p-6">
        <div className="flex space-x-6">
          <Link href="/Home" className="text-gray-800 hover:text-gray-600 font-medium pr-5">Home</Link>
          <Link href="/artigos" className="text-gray-800 hover:text-gray-600 font-medium">Artigos</Link>
        </div>
        <button onClick={() => setSidebarAberta(true)} className="transition-transform duration-300 hover:scale-110">
          <img src={userData.avatar || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full bg-purple-500" />
        </button>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-xl pb-6 text-left">Editar artigo</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src={formData.banner || "/file.svg"}
                alt="Banner preview"
                className="w-32 h-32 rounded-lg bg-purple-500 object-cover"
              />
            </div>
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL do banner</label>
              <input
                type="text"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 rounded text-gray-600"
                placeholder="Insira a URL do banner"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 rounded text-gray-600"
                placeholder="Título do artigo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
              <textarea
                name="conteudo"
                value={formData.conteudo}
                onChange={handleChange}
                rows={8}
                className="w-full p-3 border border-gray-400 rounded text-gray-600"
                placeholder="Escreva seu artigo aqui..."
                required
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <BotaoSubmit className="w-full md:w-64" label={loading ? "Salvando..." : "Salvar alterações"} />
          </div>
        </form>
      </main>

      <div className={`fixed top-0 right-0 h-full w-64 bg-white transform ${
        sidebarAberta ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 shadow-xl`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-end mb-6">
            <div className="flex justify-between items-center w-full">
              <LogoDark />
              <button
                onClick={() => setSidebarAberta(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FiX className="text-xl text-black" />
              </button>
            </div>
          </div>
          <Settings />
        </div>
      </div>

      {sidebarAberta && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarAberta(false)}
        />
      )}
    </>
  );
}
