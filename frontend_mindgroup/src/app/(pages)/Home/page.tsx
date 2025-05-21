"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // Exemplo: você poderia buscar dados protegidos aqui usando o token
    // fetch("http://localhost:3000/protected", {
    //   headers: { Authorization: `Bearer ${storedToken}` },
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Página Home</h1>
      {token ? (
        <p className="mt-4 text-sm break-all">
          ✅ Token disponível: <br />
          <span className="text-green-600">{token}</span>
        </p>
      ) : (
        <p className="mt-4 text-red-500">Nenhum token encontrado. Faça login.</p>
      )}
    </div>
  );
}
