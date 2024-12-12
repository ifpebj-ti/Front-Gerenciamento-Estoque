"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
const Logout = () => {
  useEffect(() => {
    signOut();
    window.location.href = "/";
  }, []);
  return <></>;
};

export default Logout;
