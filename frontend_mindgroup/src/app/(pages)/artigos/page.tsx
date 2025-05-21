"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Settings from "@/app/components/templates/Settings";
import { FiX } from "react-icons/fi";
import LogoDark from "@/app/components/LogoDark";

export default function Home() {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ name: string; avatar: string } | null>(null);

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) return;

  fetch("http://localhost:3000/users/me", {
    headers: {
      Authorization: `Bearer ${storedToken}`, // ESSENCIAL
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Não autorizado");
      return res.json();
    })
    .then((data) => {
      console.log("Usuário logado:", data);
      // Supondo que o endpoint retorne { name, avatar, email, ... }
      setUserData({
        name: data.name || data.email || "Usuário",
        avatar: data.avatar || "#", // ou uma url default
      });
    })
    .catch((err) => {
      console.error("Erro ao buscar dados do perfil:", err.message);
    });
}, []);



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
        <div className="flex items-center space-x-4">
          {userData && <span className="text-gray-800 font-medium">Olá, {userData.name}</span>}
          <button
            onClick={() => setSidebarAberta(true)}
            className="transition-transform duration-300 hover:scale-110"
          >
            <img
              src={userData?.avatar || "#"}
              alt="Profile"
              className="w-10 h-10 rounded-full bg-purple-500"
            />
          </button>
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
