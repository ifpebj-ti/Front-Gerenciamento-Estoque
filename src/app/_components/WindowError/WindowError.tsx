"use client";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  sendClose: () => void;
};

const WindowError = ({ text, sendClose }: Props) => {
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
      <div className="flex justify-center items-center flex-col bg-white px-8 py-4 rounded-lg max-w-96">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-24 h-24 stroke-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>

        <p className="text-red-600 font-bold text-center">{text}</p>
      </div>
    </div>
  );
};

export default WindowError;
