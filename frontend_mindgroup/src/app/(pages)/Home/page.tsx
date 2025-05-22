'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/app/components/templates/navbar'
import { FaHeart } from 'react-icons/fa'

interface Artigo {
  id: number
  titulo: string
  conteudo: string
  imagemBanner: string | null
  autor: {
    nome: string | null
    sobrenome: string | null
    imagemPerfil: string | null
  }
  createdAt: string
}

export default function ArtigosHome() {
  const [artigos, setArtigos] = useState<Artigo[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/artigos')
      .then(res => res.json())
      .then(data => setArtigos(data))
      .catch(err => console.error('Erro ao buscar artigos:', err))
  }, [])

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Últimos Artigos</h1>

        <div className="flex flex-col gap-10">
          {artigos.slice(0, 3).map(artigo => (
            <Link
              href={`/artigos/${artigo.id}`}
              key={artigo.id}
              className="hover:shadow-lg transition-shadow duration-200 rounded-2xl overflow-hidden bg-white"
            >
              <div className="bg-purple-500 h-30">
                {artigo.imagemBanner && (
                  <img
                    src={artigo.imagemBanner}
                    alt={`Imagem de ${artigo.titulo}`}
                    className="w-full h-64 object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{artigo.titulo}</h2>
                

                <div className="mt-4 text-sm text-gray-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={artigo.autor.imagemPerfil || '/default-avatar.png'}
                        className="w-10 h-10 rounded-full"
                        alt="Avatar do autor"
                      />
                      <p>
                        {artigo.autor.nome} {artigo.autor.sobrenome} {' - '}
                        {new Date(artigo.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>

                    <FaHeart className="text-red-600 text-xl" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Link para ver todos os artigos */}
        {artigos.length > 3 && (
          <div className="mt-10 text-center">
            <Link
              href="/artigos"
              className="inline-block text-purple-600 font-medium hover:underline"
            >
              Ver todos os artigos →
            </Link>
          </div>
        )}
      </main>
    </>
  )
}
