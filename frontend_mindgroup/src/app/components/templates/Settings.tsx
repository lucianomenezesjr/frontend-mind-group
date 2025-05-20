import Link from 'next/link';
import LogoDark from '@/app/components/LogoDark';
import { FiX } from "react-icons/fi";

export default function Settings() {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col space-y-6 flex-grow items-end"> {/* Adicionei items-end aqui */}
        <Link href="/perfil" className="text-gray-800 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition text-right w-full">
          Perfil
        </Link>
        <Link href="/meus-artigos" className="text-gray-800 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition text-right w-full">
          Meus Artigos
        </Link>
        <Link href="/criar-artigo" className="text-gray-800 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition text-right w-full">
          Criar novo Artigo
        </Link>
      </nav>
      <Link href='/' className="mt-auto text-gray-800 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition text-right w-full">
        Sair
      </Link>
    </div>
  );
}