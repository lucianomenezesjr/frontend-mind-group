'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Settings from "@/app/components/templates/Settings";
import { FiX } from "react-icons/fi";
import Logo from "@/app/components/LogoDark"

export default function Navbar() {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [userData, setUserData] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    fetch("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Não autorizado");
        return res.json();
      })
      .then((data) => {
        setUserData({
          name: data.nome || data.email || "Usuário",
          avatar: data.imagemPerfil || "/default-avatar.png",
        });
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do perfil:", err.message);
      });
  }, []);

  return (
    <>
      <nav className="flex items-end justify-between px-6 py-4 border-b border-gray-200">
        {/* Logo on the Left */}
        <div className="text-2xl font-bold text-gray-800">
          <Logo />
        </div>

        {/* Right-Aligned Elements */}
        <div className="flex items-center space-x-4">
          <Link href="/Home" className="text-gray-800 hover:text-gray-600 font-medium">
            Home
          </Link>
          <Link href="/artigos" className="text-gray-800 hover:text-gray-600 font-medium">
            Artigos
          </Link>
          <span>|</span>
          <Link href="/artigos/novo" className="text-gray-800 hover:text-gray-600 font-medium">
            Publicar
          </Link>
          {userData ? (
            <button
              onClick={() => setSidebarAberta(true)}
              className="transition-transform duration-300 hover:scale-110"
            >
              <img
                src={userData.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full bg-purple-500"
              />
            </button>
          ) : (
            <>
              <Link href="/login" className="text-gray-800 hover:text-gray-600 font-medium">
                Entrar
              </Link>
              <Link
                href="/register"
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-medium"
              >
                Registrar
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar Settings */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white transform ${
          sidebarAberta ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-xl`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-end mb-6">
            <div className="flex justify-between items-center w-full">
              <div className="text-2xl font-bold text-gray-800">M.</div>
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

      {/* Overlay */}
      {sidebarAberta && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarAberta(false)}
        />
      )}
    </>
  );
}