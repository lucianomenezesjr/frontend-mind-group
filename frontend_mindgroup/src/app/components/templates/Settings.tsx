import Link from 'next/link';
import LogoDark from '@/app/components/LogoDark';
import { FiX } from "react-icons/fi";
import { useRouter } from 'next/navigation';

export default function Settings() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove o token JWT do localStorage
    localStorage.removeItem('token'); // ou o nome da chave que você usa
    // Se estiver usando cookies, você precisaria de uma função para removê-los
    
    // Opcional: Chamar API de logout no backend para invalidar o token
    // await fetch('/api/auth/logout', { method: 'POST' });
    
    // Redireciona para a página inicial
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col space-y-6 flex-grow items-end">
        <Link href="/EditarPerfil" className="text-gray-800 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition text-right w-full">
          Perfil
        </Link>
        <Link href="/artigos/meus-artigos" className="text-gray-800 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition text-right w-full">
          Meus Artigos
        </Link>
        <Link href="/artigos/novo" className="text-gray-800 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition text-right w-full">
          Criar novo Artigo
        </Link>
      </nav>
      <button 
        onClick={handleLogout}
        className="mt-auto text-gray-800 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition text-right w-full"
      >
        Sair
      </button>
    </div>
  );
}