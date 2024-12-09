"use client";

import { useState } from "react";

type Props = {
  sendClose: () => void;
};
const WindowAddNewCategory = ({ sendClose }: Props) => {
  const [data, setData] = useState("");

  const sendData = (data: string) => {
    if (data.trim().length < 3) {
      alert("Digite alguma categoria");
    }
    console.log(data);
  };
  return (
    <form className="p-8 bg-white flex flex-col gap-5 rounded-lg" action="">
      <input
        onChange={(e) => {
          setData(e.target.value);
        }}
        value={data}
        type="text"
        placeholder="Nome da categoria"
        className="border-2 p-2 w-full border-slate-200 rounded-md"
      />
      <div className="flex gap-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            sendClose();
          }}
          className="border-2 border-red-500 hover:bg-red-500 text-red-500 hover:text-white w-32 rounded-md py-1"
        >
          Cancelar
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            sendData(data);
          }}
          className="border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white w-32 py-1 rounded-md "
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default WindowAddNewCategory;
