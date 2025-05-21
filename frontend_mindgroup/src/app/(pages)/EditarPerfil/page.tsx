"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import Settings from "@/app/components/templates/Settings";
import { FiX } from "react-icons/fi";
import LogoDark from "@/app/components/LogoDark";
import BotaoSubmit from "@/app/components/BotaoSubmit";

export default function EditProfilePage() {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    
    // Simulação de dados do usuário
    if (storedToken) {
      setUserData({
        avatar: "#",
        name: "Nome",
        surname: "Sobrenome",
        password: "",
        confirmPassword: ""
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados atualizados:", userData);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <>
      <nav className="flex items-center justify-between p-6">
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-800 hover:text-gray-600 font-medium pr-5">
            Home
          </Link>
          <Link href="/artigos" className="text-gray-800 hover:text-gray-600 font-medium">
            Artigos
          </Link>
        </div>
        <div>
          <button 
            onClick={() => setSidebarAberta(true)}
            className="transition-transform duration-300 hover:scale-110"
          >
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full bg-purple-500"
            />
          </button>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-xl pb-6 text-center">Perfil</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção Avatar */}
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src={userData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full bg-purple-500 object-cover"
              />
            </div>
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={userData.avatar}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded text-gray-600"
                placeholder="Insira a URL do seu avatar"
              />
            </div>
          </div>
          
          {/* Campos do formulário */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded text-gray-600"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
              <input
                type="text"
                name="surname"
                value={userData.surname}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded text-gray-600"
                placeholder="Seu sobrenome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded text-gray-600"
                placeholder="Nova senha"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-400 rounded text-gray-600"
                placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <BotaoSubmit className="w-full md:w-64" label="Salvar"/>
          </div>
        </form>
      </main>

      {/* Sidebar Settings */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white transform ${
          sidebarAberta ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-xl`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-end mb-6">
            <div className='flex justify-between items-center w-full'>
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
      
      {/* Overlay quando sidebar aberta */}
      {sidebarAberta && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarAberta(false)}
        />
      )}
    </>
  );
}