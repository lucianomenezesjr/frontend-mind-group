'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Settings from '@/app/components/templates/Settings'
import LogoDark from '@/app/components/LogoDark'
import { FiX } from 'react-icons/fi'
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

export default function ArtigosPage() {
  const [artigos, setArtigos] = useState<Artigo[]>([])
  const [sidebarAberta, setSidebarAberta] = useState(false)
  const [userData, setUserData] = useState<{ name: string; avatar: string } | null>(null)

  useEffect(() => {
    // Buscar artigos
    fetch('http://localhost:3000/artigos')
      .then(res => res.json())
      .then(data => setArtigos(data))
      .catch(err => console.error('Erro ao buscar artigos:', err))
  }, [])

  useEffect(() => {
    // Buscar dados do usuário
    const storedToken = localStorage.getItem('token')
    if (!storedToken) return

    fetch('http://localhost:3000/users/me', {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Não autorizado')
        return res.json()
      })
      .then(data => {
        setUserData({
          name: data.nome || data.email || 'Usuário',
          avatar: data.imagemPerfil || '/default-avatar.png',
        })
      })
      .catch(err => console.error('Erro ao buscar dados do perfil:', err.message))
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex space-x-6">
          <Link href="/Home" className="text-gray-800 hover:text-gray-600 font-medium pr-5">
            Home
          </Link>
          <Link href="/artigos" className="text-gray-800 hover:text-gray-600 font-medium">
            Artigos
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {userData && <span className="text-gray-800 font-medium">Olá, {userData.name}</span>}
          <button
            onClick={() => setSidebarAberta(true)}
            className="transition-transform duration-300 hover:scale-110"
          >
            <img
              src={userData?.avatar || '/default-avatar.png'}
              alt="avatar"
              className="w-10 h-10 rounded-full bg-purple-500"
            />
          </button>
        </div>
      </nav>

      {/* SIDEBAR Settings */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white transform ${
          sidebarAberta ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 shadow-xl`}
      >
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

      {/* OVERLAY */}
      {sidebarAberta && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarAberta(false)}
        />
      )}

      {/* LISTA DE ARTIGOS */}
      <main className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Todos os Artigos</h1>

        <div className="flex flex-col gap-10">
          {artigos.map(artigo => (
            <div key={artigo.id} className="bg-white rounded-2xl overflow-hidden shadow-md">
              {artigo.imagemBanner && artigo.imagemBanner !== '' && (
                <img
                  src={artigo.imagemBanner}
                  alt={`Imagem de ${artigo.titulo}`}
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{artigo.titulo}</h2>
                <p className="text-gray-700 whitespace-pre-line">{artigo.conteudo}</p>

                <div className="mt-4 text-sm text-gray-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={artigo.autor.imagemPerfil || '/default-avatar.png'}
                        className="w-10 h-10 rounded-full"
                        alt="Autor"
                      />
                      <p>
                        {artigo.autor.nome} {artigo.autor.sobrenome} –{' '}
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
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
