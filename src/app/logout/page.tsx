"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import WindowLoad from "../_components/WindowLoad/WindowLoad";

const Logout = () => {
  useEffect(() => {
    // Chame o signOut e defina o callbackUrl para redirecionar após o logout
    signOut({ callbackUrl: "/login" });
  }, []);

  return <WindowLoad></WindowLoad>;
};

export default Logout;
