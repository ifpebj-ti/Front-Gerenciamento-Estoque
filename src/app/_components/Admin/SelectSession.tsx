"use client";
import { useState } from "react";

type Props = {
  options: string[];
  sendOption: (option: number) => void;
};

const SelectSession = ({ options, sendOption }: Props) => {
  const [selectedSession, setSelectedSession] = useState(0);
  const renderOptions = () => {
    return options.map((option, index) => {
      return (
        <button
          onClick={() => {
            setSelectedSession(options.indexOf(option));
            sendOption(options.indexOf(option));
          }}
          className={`${
            option === options[selectedSession]
              ? "bg-[var(--color-primary)] text-white"
              : ""
          } ${index === 0 ? "rounded-l-lg" : ""} ${
            index === options.length - 1 ? "rounded-r-lg" : ""
          } px-4 sm:px-8 py-2 hover:bg-[var(--color-primary)] hover:scale-110 hover:cursor-pointer transition-all ease-in-out duration-200 font-bold  hover:text-white text-[var(--color-primary)]`}
          key={option}
        >
          {option}
        </button>
      );
    });
  };
  return (
    <div className="flex justify-center items-center w-full ">
      <nav className="inline-flex  bg-white text-slate-400 rounded-lg">
        {renderOptions()}
      </nav>
    </div>
  );
};

export default SelectSession;
