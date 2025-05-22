'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiX, FiEdit2, FiTrash2 } from "react-icons/fi";
import Settings from "@/app/components/templates/Settings";
import LogoDark from "@/app/components/LogoDark";
import { FaHeart } from "react-icons/fa";

interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  imagemBanner: string;
  createdAt: string;
}

export default function MeusArtigos() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState({ avatar: "", name: "" });
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [artigoSelecionado, setArtigoSelecionado] = useState<Artigo | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      fetch("http://localhost:3000/users/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData({
            avatar: data.imagemPerfil || "",
            name: `${data.nome} ${data.sobrenome}`,
          });
        });

      fetch("http://localhost:3000/artigos/meus", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setArtigos(data);
          } else if (Array.isArray(data.artigos)) {
            setArtigos(data.artigos);
          } else {
            console.error("Resposta inesperada:", data);
            setArtigos([]);
            setError("Erro ao carregar seus artigos.");
          }
        })
        .catch(() => setError("Erro ao carregar seus artigos"));
    }
  }, []);

  const handleEditar = (id: number) => {
    window.location.href = `/artigos/editar/${id}`;
  };

  const handleDeletar = async () => {
    if (!token || !artigoSelecionado) return;

    try {
      const res = await fetch(`http://localhost:3000/artigos/${artigoSelecionado.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setArtigos((prev) => prev.filter((a) => a.id !== artigoSelecionado.id));
        setArtigoSelecionado(null);
      } else {
        alert("Erro ao deletar artigo.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar artigo.");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between p-4 md:p-6">
        <div className="flex space-x-4 md:space-x-6">
          <Link href="/" className="text-gray-800 hover:text-gray-600 font-medium text-sm md:text-base pr-3 md:pr-5">Home</Link>
          <Link href="/artigos" className="text-gray-800 hover:text-gray-600 font-medium text-sm md:text-base">Artigos</Link>
        </div>
        <button onClick={() => setSidebarAberta(true)} className="transition-transform duration-300 hover:scale-110">
          <img src={userData.avatar || "/default-avatar.png"} alt="Profile" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-500" />
        </button>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-3xl">
        <h1 className="text-lg md:text-xl pb-4 md:pb-6 text-left font-bold">Meus Artigos</h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {artigos.length === 0 ? (
          <p className="text-center text-gray-600">Você ainda não escreveu nenhum artigo.</p>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {artigos.map((artigo) => (
              <div
                key={artigo.id}
                className="flex flex-col md:flex-row p-4 md:p-6 rounded-lg shadow hover:shadow-md transition justify-between"
              >
                <Link href={`/artigos/${artigo.id}`} className="flex flex-col md:flex-row gap-4 md:gap-6 flex-grow">
                  <div className="w-full h-32 md:w-40 md:h-40 bg-purple-500 overflow-hidden rounded">
                    {artigo.imagemBanner && (
                      <img src={artigo.imagemBanner} alt="Banner" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-col justify-between">
                    <h2 className="text-base md:text-xl font-semibold line-clamp-2">{artigo.titulo}</h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-0">
                      Criado em: {new Date(artigo.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </Link>

                <div className="flex justify-end md:items-end gap-2 md:gap-3 mt-4 md:mt-0">
                  <FaHeart className="text-red-600 text-xl md:text-2xl flex items-center w-7 h-7 md:w-9 md:h-9 justify-center p-1 md:p-2" />
                  <button
                    onClick={() => handleEditar(artigo.id)}
                    className="text-white hover:text-red-800 bg-black p-1 md:p-2 rounded-md w-12 h-6 md:w-16 md:h-8 flex items-center justify-center"
                    title="Editar"
                  >
                    <FiEdit2 size={16} className="md:size-5" />
                  </button>
                  <button
                    onClick={() => setArtigoSelecionado(artigo)}
                    className="text-white hover:text-red-800 bg-[#FF3B30] p-1 md:p-2 rounded-md w-6 h-6 md:w-8 md:h-8 flex items-center justify-center"
                    title="Deletar"
                  >
                    <FiTrash2 size={16} className="md:size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* POPUP DE CONFIRMAÇÃO */}
      {artigoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4">EXCLUIR ARTIGO?</h2>
            <div className="bg-gray-100 p-3 mb-4 border border-gray-300 rounded">
              <p className="font-semibold">{artigoSelecionado.titulo}</p>
              <p>
                CRIADO EM: {new Date(artigoSelecionado.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <p className="mb-6">Tem certeza de que deseja excluir este artigo? Esta ação não poderá ser desfeita.</p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setArtigoSelecionado(null)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                Cancelar
              </button>
              <button onClick={handleDeletar} className="px-4 py-2 bg-[#FF3B30] text-white rounded hover:bg-red-600">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-64 bg-white transform ${
          sidebarAberta ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-xl`}
      >
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
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setSidebarAberta(false)} />
      )}
    </>
  );
}
