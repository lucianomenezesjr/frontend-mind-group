import BotaoSubmit from "@/app/components/BotaoSubmit";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function Cadastro() {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center text-[#1B1B1B] px-4">
      <div className="w-full max-w-[500px] gap-6 pt-12 md:pt-24 p-4 md:p-6">
        <h1 className="font-bold text-2xl md:text-3xl text-[#1B1B1B]">Bem-vindo de volta!</h1>
        <p className="pt-6 md:pt-8 text-[#1B1B1B]">
            Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.        </p>
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
        <Link 
          className="text-[#1B1B1B] text-right hover:text-black hover:underline text-sm md:text-base" 
          href={'#'}
        >
          Esqueceu a senha?
        </Link>
        <BotaoSubmit label={`Login`} />
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