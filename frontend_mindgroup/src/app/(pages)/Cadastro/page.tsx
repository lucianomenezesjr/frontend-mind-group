"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BotaoSubmit from "@/app/components/BotaoSubmit";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { toast, Toaster } from "sonner";

export default function Cadastro() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

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
    <div className="bg-white min-h-screen w-full flex flex-col items-center text-[#1B1B1B] px-4">
      {/* Toaster para exibir os toasts */}
      <Toaster position="top-center" richColors />

      {/* Cabeçalho */}
      <div className="w-full max-w-[500px] gap-6 pt-8 md:pt-24 p-4 md:p-6">
        <div className="flex items-center">
          <Link href={"/Login"}>
            <FiArrowLeft className="text-2xl md:text-3xl hover:text-black cursor-pointer" />
          </Link>
          <h1 className="font-bold text-2xl md:text-3xl text-[#1B1B1B] pl-3 md:pl-5">
            Registrar
          </h1>
        </div>
        <p className="pt-4 md:pt-8 text-[#1B1B1B] text-sm md:text-base">
          Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:gap-6 w-full max-w-[500px] p-4 md:p-6"
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600"
          placeholder="Senha"
          required
        />
        <input
          type="password"
          value={confirmacaoSenha}
          onChange={(e) => setConfirmacaoSenha(e.target.value)}
          className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600"
          placeholder="Confirmar senha"
          required
        />

        <BotaoSubmit label={`Criar conta`} />
      </form>
    </div>
  );
}
