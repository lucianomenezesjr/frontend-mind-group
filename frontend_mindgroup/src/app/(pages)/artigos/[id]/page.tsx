// app/artigos/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
  criadoEm: string;
}

export default function ArtigoPage() {
  const { id } = useParams(); // Pega o ID da URL
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    return <div className="p-8 text-red-600 font-semibold">{error}</div>;
  }

  if (!artigo) {
    return <div className="p-8 text-gray-600">Carregando artigo...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/artigos" className="text-purple-600 hover:underline">← Voltar para artigos</Link>
      </div>

      {artigo.banner && (
        <img
          src={artigo.banner}
          alt="Banner do artigo"
          className="w-full h-64 object-cover rounded-xl mb-6 shadow"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{artigo.titulo}</h1>

      <p className="text-gray-500 text-sm mb-6">
        Publicado em {new Date(artigo.criadoEm).toLocaleDateString()} por{" "}
        <span className="font-semibold">
          {artigo.autor.nome} {artigo.autor.sobrenome}
        </span>
      </p>

      <article className="prose prose-purple max-w-none">
        {artigo.conteudo}
      </article>
    </main>
  );
}
