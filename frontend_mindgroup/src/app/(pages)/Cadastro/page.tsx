'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BotaoSubmit from "@/app/components/BotaoSubmit";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { toast, Toaster } from "sonner";
import Logo from '@/app/components/Logo'

export default function Cadastro() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  // Function to check screen size
  const checkScreenSize = () => {
    setIsDesktop(window.innerWidth >= 1024); // Assuming 1024px as the desktop breakpoint
  };

  useEffect(() => {
    checkScreenSize(); // Check on initial render
    window.addEventListener('resize', checkScreenSize); // Add resize listener

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmacaoSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Usuário cadastrado com sucesso!", {
          duration: 3000,
        });

        // Espera 3 segundos antes de redirecionar
        setTimeout(() => {
          router.push("/Login");
        }, 3000);
      } else {
        toast.error(data.message || "Erro ao cadastrar!", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Erro na comunicação com o servidor.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section (Logo and Tagline) - Hidden on mobile, visible on desktop */}
      {isDesktop && (
        <div className="hidden md:flex md:w-1/2 bg-black text-white items-center justify-center p-6">
          <div className="text-center">
            <Logo />
            <p className="text-lg">Inovação ao Seu Alcance.</p>
          </div>
        </div>
      )}

      {/* Right Section (Registration Form) */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-[500px] space-y-6">
          {/* Header with Back Arrow */}
          <div className="flex items-center mb-4">
            <Link href="/Login">
              <FiArrowLeft className="text-2xl md:text-3xl hover:text-black cursor-pointer" />
            </Link>
            <h1 className="font-bold text-2xl md:text-3xl text-[#1B1B1B] pl-3 md:pl-5">
              Registrar
            </h1>
          </div>
          <p className="pt-4 md:pt-8 text-[#1B1B1B] text-sm md:text-base">
            Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600 placeholder-gray-400"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600 placeholder-gray-400"
              placeholder="Senha"
              required
            />
            <input
              type="password"
              value={confirmacaoSenha}
              onChange={(e) => setConfirmacaoSenha(e.target.value)}
              className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600 placeholder-gray-400"
              placeholder="Confirmar senha"
              required
            />
            <BotaoSubmit label="Criar conta" />
          </form>
          <div className="text-center text-sm md:text-base">
            <p>
              Já tem cadastro?{" "}
              <Link className="text-[#1B1B1B] hover:text-black hover:underline" href="/Login">
                Clique aqui
              </Link>
            </p>
          </div>
          <Toaster position="top-center" richColors />
        </div>
      </div>
    </div>
  );
}