"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  sendClose: () => void;
};

const WindowSuccess = ({ text, sendClose }: Props) => {
  const [count, setCount] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      sendClose();
    }

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar
  }, [count, sendClose]);

  return (
    <div className="flex justify-center items-center fixed w-full h-full z-50 bg-black/50 top-0 right-0">
      <div className="flex justify-center items-center flex-col bg-white px-8 py-4 rounded-lg">
        <svg
          className="w-24 h-24 stroke-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <p className="text-green-600 font-bold">{text}</p>
      </div>
    </div>
  );
};

export default WindowSuccess;
