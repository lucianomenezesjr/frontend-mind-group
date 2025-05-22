'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import Settings from "@/app/components/templates/Settings";
import LogoDark from "@/app/components/LogoDark";
import { FaHeart } from "react-icons/fa";
import Navbar from "@/app/components/templates/Navbar";
import NavbarDesktop from "@/app/components/templates/NavbarDesktop";

interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  banner: string;
  autor: {
    nome: string;
    sobrenome: string;
    imagemPerfil: string;
  };
  createdAt: string;
}

export default function ArtigoPage() {
  const { id } = useParams();
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Function to check screen size
  const checkScreenSize = () => {
    setIsDesktop(window.innerWidth >= 1024); // Assuming 1024px as the desktop breakpoint
  };

  useEffect(() => {
    checkScreenSize(); // Check on initial render
    window.addEventListener('resize', checkScreenSize); // Add resize listener

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/artigos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar o artigo");
        return res.json();
      })
      .then(setArtigo)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 text-red-600 font-semibold text-center">{error}</div>
      </div>
    );
  }

  if (!artigo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 text-gray-600 text-center">Carregando artigo...</div>
      </div>
    );
  }

  return (
    <>
      {/* Conditionally render Navbar or NavbarDesktop */}
      {isDesktop ? <NavbarDesktop /> : <Navbar />}

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Author Section and Title */}
        <div className="mb-8">
          <div className="flex justify-between items-center w-full mb-4">
            <div className="flex items-center">
              <img
                src={artigo.autor.imagemPerfil || "/default-avatar.png"}
                alt={artigo.autor.nome}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm text-gray-500">
                  {artigo.autor.nome} {artigo.autor.sobrenome}
                  {' - '}
                  {new Date(artigo.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <FaHeart className="text-red-600 text-xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{artigo.titulo}</h1>
        </div>
        
        {/* Divider Line */}
        <hr className="border-t border-gray-300 my-8" />
        {/* Banner */}
        <div className="w-full h-150 mb-8">
          <img
            src={artigo.banner || '/artigoTsBanner.png'}
            alt={`Imagem de ${artigo.titulo}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg text-gray-800 mx-auto text-left">
          {artigo.conteudo.split("\n").map((paragrafo, index) => (
            <p key={index} className="text-left">{paragrafo}</p>
          ))}
        </article>

        
      </main>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white transform ${
        sidebarAberta ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 shadow-xl`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <LogoDark />
            <button
              onClick={() => setSidebarAberta(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiX className="text-xl text-black" />
            </button>
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