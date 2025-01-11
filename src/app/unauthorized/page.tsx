"use client";

import { useEffect, useState } from "react";

const Unauthorized = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      window.location.href = "/";
    }

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar
  }, [count]);

  return (
    <main className="flex justify-center items-center w-full h-screen px-4">
      <div className="p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <svg
          style={{ stroke: "red" }}
          className="w-20 h-20 sm:w-40 sm:h-40"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <p className="text-red-500 sm:text-lg font-bold text-center">
          Você não tem autorização para acessar essa página!
        </p>
        <p className="mt-4 text-gray-500">Redirecionando em {count}...</p>
      </div>
    </main>
  );
};

export default Unauthorized;
