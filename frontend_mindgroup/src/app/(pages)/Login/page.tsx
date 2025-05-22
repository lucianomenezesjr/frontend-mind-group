'use client';

import { useEffect, useState } from "react";
import BotaoSubmit from "@/app/components/BotaoSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Logo from "@/app/components/Logo";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Armazena o token no localStorage
        localStorage.setItem("token", data.access_token);

        toast.success("Login realizado com sucesso!", { duration: 3000 });

        setTimeout(() => {
          router.push("/Home");
        }, 3000);
      } else {
        toast.error(data.message || "Erro ao fazer login", { duration: 3000 });
      }
    } catch (error) {
      toast.error("Erro na conexão com o servidor");
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

      {/* Right Section (Login Form) */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-[500px] space-y-6">
          <h1 className="font-bold text-2xl md:text-3xl text-[#1B1B1B] text-center md:text-left">
            Conectar
          </h1>
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
            <Link
              className="text-[#1B1B1B] text-right hover:text-black hover:underline text-sm md:text-base"
              href="/EsqueciSenha"
            >
              Esqueceu a senha?
            </Link>
            <BotaoSubmit label="Entrar" />
            <div className="text-center text-sm md:text-base">
              <p>
                Novo usuário?{" "}
                <Link className="text-[#1B1B1B] hover:text-black hover:underline" href="/Cadastro">
                  Clique aqui
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}