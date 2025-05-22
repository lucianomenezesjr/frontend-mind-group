'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import NavbarDesktop from '@/app/components/templates/NavbarDesktop'
import { FaHeart } from "react-icons/fa"
import Navbar from '@/app/components/templates/Navbar'

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

export default function ArtigosPage() {
  const [artigos, setArtigos] = useState<Artigo[]>([])
  const [isDesktop, setIsDesktop] = useState(false)

  // Function to check screen size
  const checkScreenSize = () => {
    setIsDesktop(window.innerWidth >= 1024) // Assuming 1024px as the desktop breakpoint
  }

  // Effect to run on mount and on window resize
  useEffect(() => {
    checkScreenSize() // Check on initial render
    window.addEventListener('resize', checkScreenSize) // Add resize listener

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Fetch articles
  useEffect(() => {
    fetch('http://localhost:3000/artigos')
      .then(res => res.json())
      .then(data => setArtigos(data))
      .catch(err => console.error('Erro ao buscar artigos:', err))
  }, [])

  return (
    <>
      {/* Conditionally render Navbar or NavbarDesktop */}
      {isDesktop ? <NavbarDesktop /> : <Navbar />}

      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Todos os Artigos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {artigos.map(artigo => (
            <Link
              href={`/artigos/${artigo.id}`}
              key={artigo.id}
              className="hover:shadow-lg transition-shadow duration-200 rounded-2xl overflow-hidden bg-white border border-gray-200"
            >
              <div className="w-full h-64">
                <img
                  src={artigo.imagemBanner || '/artigoTsBanner.png'}
                  alt={`Imagem de ${artigo.titulo}`}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{artigo.titulo}</h2>
                <p className="text-gray-700 whitespace-pre-line line-clamp-3 text-sm">{artigo.conteudo}</p>

                <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={artigo.autor.imagemPerfil || "/default-avatar.png"}
                      className="w-8 h-8 rounded-full"
                      alt="Avatar do autor"
                    />
                    <p>
                      Por {artigo.autor.nome} {artigo.autor.sobrenome} -{' '}
                      {new Date(artigo.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <FaHeart className="text-red-600 text-lg" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}