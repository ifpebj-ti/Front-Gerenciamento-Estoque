"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WindowLoad from "../_components/WindowLoad/WindowLoad";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Chama o signOut para limpar a sessão
        await signOut({ redirect: false }); // Evita o redirecionamento automático

        // Limpa localStorage e sessionStorage, se necessário
        localStorage.clear();
        sessionStorage.clear();

        // Redireciona manualmente para a página desejada
        router.push("/login");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    };

    handleLogout();
  }, [router]);

  return <WindowLoad></WindowLoad>;
};

export default Logout;
