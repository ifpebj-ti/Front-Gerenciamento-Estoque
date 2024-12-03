"use client";
import { useState } from "react";
import CardProductListAdmin from "../_components/Admin/CardProductListAdmin";
import SelectSession from "../_components/Admin/SelectSession";
import Header from "../_components/Header/Header";
import FilterProducts from "../_components/Stock/FilterProducts";
import Pagination from "../_components/Stock/Pagination";
import OPTIONS from "../_CONSTANTS/OptionsSession";
import WindowAddProduct from "../_components/Stock/WindowAddProduct";

const admin = () => {
  const [currentSession, setCurrentSession] = useState(0);
  const [showWindowAddProduct, setShowWindowAddProduct] = useState(false);
  const renderSession = () => {
    switch (currentSession) {
      case 0:
        return (
          <>
            <button
              onClick={() => {
                setShowWindowAddProduct(!showWindowAddProduct);
              }}
              className="transition-all ease-in-out duration-200 shadow-lg hover:scale-105 w-full h-20 bg-[var(--color-primary)] rounded-lg text-white hover:border-2 hover:border-white hover:border-dashed uppercase hover:opacity-70
          "
            >
              Adicionar Produto
            </button>
            <CardProductListAdmin
              data={{
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVUsms7oB4xz8w1geynBqKleFSF51p7reVg&s",
                title:
                  "KIT FECHADURAS STAM ANTIQUE 2 INTERNAS + 1 PARA BANHEIRO",
                categories: ["kit", "fechaduras", "banheiro"],
                quantity: 50,
                stock_value: "R$ 100,00",
                unit_price: "R$ 10.000,00",
              }}
            ></CardProductListAdmin>
            <CardProductListAdmin
              data={{
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVUsms7oB4xz8w1geynBqKleFSF51p7reVg&s",
                title:
                  "KIT FECHADURAS STAM ANTIQUE 2 INTERNAS + 1 PARA BANHEIRO",
                categories: ["kit", "fechaduras", "banheiro"],
                quantity: 50,
                stock_value: "R$ 100,00",
                unit_price: "R$ 10.000,00",
              }}
            ></CardProductListAdmin>
            <CardProductListAdmin
              data={{
                image:
                  "https://carpintariarezende.com.br/wp-content/uploads/2018/05/porta-pivotante-friso.jpg.webp",
                title:
                  "KIT FECHADURAS STAM ANTIQUE 2 INTERNAS + 1 PARA BANHEIRO",
                categories: ["kit", "fechaduras", "banheiro"],
                quantity: 50,
                stock_value: "R$ 100,00",
                unit_price: "R$ 10.000,00",
              }}
            ></CardProductListAdmin>
          </>
        );

      default:
        break;
    }
  };
  return (
    <>
      {showWindowAddProduct ? (
        <>
          <div className="w-full  min-h-screen  bg-black/75 flex justify-center items-center fixed z-20 px-8"></div>
          <div className="absolute z-40 w-full flex justify-center items-center p-8">
            <WindowAddProduct
              sendClose={() => {
                setShowWindowAddProduct(!showWindowAddProduct);
              }}
            ></WindowAddProduct>
          </div>
        </>
      ) : null}
      <Header></Header>
      <main className="max-w-[1100px] gap-8  w-full px-8 flex flex-col justify-center items-center mx-auto mt-8 mb-20">
        <SelectSession
          sendOption={(option: number) => {
            setCurrentSession(option);
          }}
          options={OPTIONS}
        ></SelectSession>
        <FilterProducts
          sendCategory={(category: string) => {}}
          sendName={(name: string) => {}}
        ></FilterProducts>
        <section className="flex flex-col gap-2 mt-4 relative">
          {renderSession()}
        </section>
        {currentSession === 0 ? (
          <>
            <Pagination
              sendCurrentPage={(page: number) => {}}
              totalPages={10}
            ></Pagination>
          </>
        ) : null}
      </main>
    </>
  );
};

export default admin;
