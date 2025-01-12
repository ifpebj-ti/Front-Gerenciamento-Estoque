"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import WindowLoad from "../_components/WindowLoad/WindowLoad";

const Logout = () => {
  useEffect(() => {
    (() => {
      // const callbackUrl = `${process.env.NEXT_PUBLIC_URL}/login`; // Use NEXTAUTH_URL do ambiente
      return signOut();
    })();
  }, []);

  return <WindowLoad></WindowLoad>;
};

export default Logout;
