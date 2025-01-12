"use client";

// import { signOut } from "next-auth/react";
import { useEffect } from "react";
import WindowLoad from "../_components/WindowLoad/WindowLoad";

const Logout = () => {
  useEffect(() => {
    // Chame o signOut e defina o callbackUrl para redirecionar após o logout
    const callbackUrl = `${process.env.NEXT_PUBLIC_URL}/login`; // Use NEXTAUTH_URL do ambiente
    // signOut({ callbackUrl: callbackUrl });
    console.log(callbackUrl);
  }, []);

  return <WindowLoad></WindowLoad>;
};

export default Logout;
