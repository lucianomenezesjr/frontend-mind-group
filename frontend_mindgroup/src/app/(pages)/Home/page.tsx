'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'
import Navbar from '@/app/components/templates/Navbar'
import NavbarDesktop from '@/app/components/templates/NavbarDesktop'
import NewArticles from '@/app/components/templates/NewArticle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

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

  const truncate = (text: string, limit: number) =>
    text.length > limit ? text.slice(0, limit).trim() + '...' : text

  return (
    <>
      {/* Conditionally render Navbar or NavbarDesktop */}
      {isDesktop ? <NavbarDesktop /> : <Navbar />}

      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Últimos Artigos</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {artigos.slice(0, 1).map(artigo => (
              <Link
                href={`/artigos/${artigo.id}`}
                key={artigo.id}
                className="hover:shadow-lg transition-shadow duration-200 rounded-2xl overflow-hidden bg-white block"
              >
                <div>
                  <img
                    src={artigo.imagemBanner || '/artigoTsBanner.png'}
                    alt={`Imagem de ${artigo.titulo}`}
                    className="w-full h-96 object-cover"
                  />
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
          <div className="md:col-span-1">
            <NewArticles />
          </div>
        </div>

        <div className="mt-10">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="items-center justify-center"
          >
            {artigos.slice(1, 4).map(artigo => (
              <SwiperSlide key={artigo.id}>
                <Link
                  href={`/artigos/${artigo.id}`}
                  className="hover:shadow-lg transition-shadow duration-200 rounded-2xl overflow-hidden bg-white block"
                >
                  {artigo.imagemBanner && (
                    <img
                      src={artigo.imagemBanner}
                      alt={`Imagem de ${artigo.titulo}`}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{artigo.titulo}</h2>
                    <p className="text-gray-700 text-sm mb-4">
                      {truncate(artigo.conteudo, 120)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <img
                          src={artigo.autor.imagemPerfil || '/default-avatar.png'}
                          className="w-8 h-8 rounded-full"
                          alt="Avatar"
                        />
                        <p>
                          {artigo.autor.nome} {artigo.autor.sobrenome}
                        </p>
                      </div>
                      <FaHeart className="text-red-600 text-base" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>
    </>
  )
}