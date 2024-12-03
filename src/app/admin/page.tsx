"use client";
import { useState } from "react";
import CardProductListAdmin from "../_components/Admin/CardProductListAdmin";
import SelectSession from "../_components/Admin/SelectSession";
import Header from "../_components/Header/Header";
import FilterProducts from "../_components/Stock/FilterProducts";
import Pagination from "../_components/Stock/Pagination";
import OPTIONS from "../_CONSTANTS/OptionsSession";
import WindowAddProduct from "../_components/Stock/WindowAddProduct";
import WindowEditProduct from "../_components/Stock/WindowEditProduct";
import products from "../_CONSTANTS/MockProducts";

const Admin = () => {
  const [currentSession, setCurrentSession] = useState(0);
  const [showWindowAddProduct, setShowWindowAddProduct] = useState(false);
  const [showWindowEditProduct, setShowWindowEditProduct] = useState(false);
  const [productSelectToEdit, setProdutSelectToEdit] = useState(0);
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
            {products.map((product) => {
              return (
                <CardProductListAdmin
                  key={product.id}
                  sendOpenEditWindow={() => {
                    // alert("editar + " + product.id);
                    setShowWindowAddProduct(false);
                    setShowWindowEditProduct(!showWindowEditProduct);
                    setProdutSelectToEdit(product.id);
                  }}
                  data={product}
                ></CardProductListAdmin>
              );
            })}
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
      {showWindowEditProduct ? (
        <>
          <div className="w-full  min-h-screen  bg-black/75 flex justify-center items-center fixed z-20 px-8"></div>
          <div className="absolute z-40 w-full flex justify-center items-center p-8">
            <WindowEditProduct
              id={productSelectToEdit}
              sendClose={() => {
                setShowWindowEditProduct(!showWindowEditProduct);
              }}
            ></WindowEditProduct>
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
          sendCategory={(category: string) => {
            console.log(category);
          }}
          sendName={(name: string) => {
            console.log(name);
          }}
        ></FilterProducts>
        <section className="flex flex-col gap-2 mt-4 relative">
          {renderSession()}
        </section>
        {currentSession === 0 ? (
          <>
            <Pagination
              sendCurrentPage={(page: number) => {
                console.log(page);
              }}
              totalPages={10}
            ></Pagination>
          </>
        ) : null}
      </main>
    </>
  );
};

export default Admin;
