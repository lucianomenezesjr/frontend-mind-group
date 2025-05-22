'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Artigo {
  id: number
  titulo: string
  conteudo: string
}

export default function NewArticles() {
  const [artigos, setArtigos] = useState<Artigo[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/artigos')
      .then(res => res.json())
      .then(data => setArtigos(data))
      .catch(err => console.error('Erro ao buscar artigos:', err))
  }, [])

  // Função para truncar texto
  const truncate = (texto: string, limite: number) => {
    if (texto.length <= limite) return texto
    return texto.slice(0, limite).trim() + '...'
  }

  return (
    <section className="bg-zinc-900 text-white p-6 rounded-xl w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 font-serif">New</h2>

      <ul className="space-y-6">
        {artigos.slice(0, 4).map(artigo => (
          <li key={artigo.id}>
            <Link href={`/artigos/${artigo.id}`} className="block hover:text-purple-300">
              <h3 className="font-semibold text-lg mb-1">
                {artigo.titulo}
              </h3>
              <p className="text-sm text-zinc-300">
                {truncate(artigo.conteudo, 150)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
