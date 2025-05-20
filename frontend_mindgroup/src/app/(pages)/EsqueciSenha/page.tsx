import BotaoSubmit from "@/app/components/BotaoSubmit";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function EsqueciSenha() {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center text-[#1B1B1B] px-4">
      {/* Cabeçalho */}
      <div className="w-full max-w-[500px] gap-6 pt-8 md:pt-24 p-4 md:p-6">
        <div className="flex items-center">
          <Link href={'/Login'}>
            <FiArrowLeft className="text-2xl md:text-3xl hover:text-black cursor-pointer" />
          </Link>
          <h1 className="font-bold text-2xl md:text-3xl text-[#1B1B1B] pl-3 md:pl-5">
            Esqueci a senha
          </h1>
        </div>
        <p className="pt-4 md:pt-8 text-[#1B1B1B] text-sm md:text-base">
          Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      {/* Formulário */}
      <div className="flex flex-col gap-4 md:gap-6 w-full max-w-[500px] p-4 md:p-6">
        <input
          type="text"
          className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600"
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600"
          placeholder="Senha"
        />
        <input
          type="password"
          className="w-full p-3 md:p-2 border border-gray-400 rounded text-gray-600"
          placeholder="Confirmar senha"
        />
        
        <BotaoSubmit label={`Alterar`} />
        
        <div className="text-center text-sm md:text-base">
          <p>Novo usuário? <Link 
            className="text-[#1B1B1B] hover:text-black hover:underline" 
            href={'/Cadastro'}
          >
            Clique aqui
          </Link></p>
        </div>
      </div>
    </div>
  );
}