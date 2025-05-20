import BotaoSubmit from "@/app/components/BotaoSubmit";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function Cadastro() {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center text-[#1B1B1B] px-4">
      {/* Cabeçalho */}
      <div className="w-full max-w-[500px] gap-6 pt-8 md:pt-24 p-4 md:p-6">
        <div className="flex items-center">
          <Link href={'/Login'}>
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
        
        <Link 
          className="text-[#1B1B1B] text-right hover:text-black hover:underline text-sm md:text-base" 
          href={'/EsqueciSenha'}
        >
          Esqueceu a senha?
        </Link>
        
        <BotaoSubmit label={`Criar conta`} />

        <div className="flex flex-row items-center">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-[#9E9E9E] text-[#1B1B1B] focus:ring-[#1B1B1B]"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-[#1B1B1B]">
              Li e concordo com os Termos de Uso e a Política de Privacidade
            </label>
          </div>
        </div>
        
        <div className="text-center text-sm md:text-base">
          <p>Já tem cadastro? <Link 
            className="text-[#1B1B1B] hover:text-black hover:underline" 
            href={'/Login'}
          >
            Clique aqui
          </Link></p>
        </div>
      </div>
    </div>
  );
}