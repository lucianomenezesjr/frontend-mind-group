'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Logo from '@/app/components/Logo'

export default function Carregando(){

    const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
    return(
        <div className="bg-[#090909]">
      <div className="flex flex-col items-center justify-center h-screen">
        <Logo />
        <h1>Conteúdo que inspira</h1>
      </div>
    </div>
    )
}