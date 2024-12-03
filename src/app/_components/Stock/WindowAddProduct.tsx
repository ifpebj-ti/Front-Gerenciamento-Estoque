"use client";
import FormProduct from "./FormProduct";

type Props = {
  sendClose: () => void;
};

const WindowAddProduct = ({ sendClose }: Props) => {
  return (
    <div className="  bg-white text-center sm:text-start py-4 sm:py-16 px-8 w-full rounded-lg ">
      <h1 className="uppercase font-bold text-lg sm:text-2xl mb-4">
        Dados do produto
      </h1>
      <FormProduct>
        <button
          onClick={(e) => {
            e.preventDefault();
            sendClose();
          }}
          className="text-sm border-2 border-red-500 uppercase text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md flex-1 hover:scale-105 transition-all ease-in-out duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="text-sm uppercase bg-[var(--color-primary)] text-white px-4 py-2 rounded-md flex-1 hover:scale-105 transition-all ease-in-out duration-200"
        >
          Salvar Produto
        </button>
      </FormProduct>
    </div>
  );
};

export default WindowAddProduct;
