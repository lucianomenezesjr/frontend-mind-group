"use client";

import { useState } from "react";
import BotaoSubmit from "@/app/components/BotaoSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
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
    <div className="bg-white min-h-screen w-full flex flex-col items-center text-[#1B1B1B] px-4">
      <div className="w-full max-w-[500px] gap-6 pt-12 md:pt-24 p-4 md:p-6">
        <h1 className="font-bold text-2xl md:text-3xl text-[#1B1B1B]">Bem-vindo de volta!</h1>
        <p className="pt-6 md:pt-8 text-[#1B1B1B]">
          Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
        </p>
      </div>

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
        <Link
          className="text-[#1B1B1B] text-right hover:text-black hover:underline text-sm md:text-base"
          href={"/EsqueciSenha"}
        >
          Esqueceu a senha?
        </Link>
        <BotaoSubmit label={`Login`} />
        <div className="text-center text-sm md:text-base">
          <p>
            Novo usuário?{" "}
            <Link className="text-[#1B1B1B] hover:text-black hover:underline" href={"/Cadastro"}>
              Clique aqui
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
