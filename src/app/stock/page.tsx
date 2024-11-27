"use client";
import { useState } from "react";
import Header from "../_components/Header/Header";
import CardProduct from "../_components/Stock/CardProduct";
import FilterProducts from "../_components/Stock/FilterProducts";
import ViewProduct from "../_components/Stock/ViewProduct";
import Pagination from "../_components/Stock/Pagination";

type Product = {
  title: string;
  image: string;
  stock_value: string;
  unit_price: string;
  description: string;
  quantity: number;
};

const Stock = () => {
  const [viewProductOpen, setViewProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    image: "",
    description: "",
    quantity: 0,
    stock_value: "",
    title: "",
    unit_price: "",
  });
  return (
    <>
      {viewProductOpen ? (
        <div className="bg-black/50 fixed w-full h-full z-20"></div>
      ) : null}

      <Header></Header>

      <main className="relative max-w-[1100px]  w-80 sm:w-[500px] md:w-[700px] backgroundLoginPoint:w-[1100px]  mx-auto mt-8 mb-20">
        {viewProductOpen ? (
          <ViewProduct
            data={{
              image: selectedProduct?.image,
              description: selectedProduct?.description,
              quantity: selectedProduct?.quantity,
              stock_value: selectedProduct?.stock_value,
              title: selectedProduct?.title,
              unit_price: selectedProduct?.unit_price,
            }}
            close={() => {
              setViewProductOpen(!viewProductOpen);
            }}
          ></ViewProduct>
        ) : null}

        <section className="flex flex-col gap-5">
          <h1 className="font-extrabold text-xl">Catálogo de produtos</h1>
          <FilterProducts
            sendName={(name) => {
              alert(name);
            }}
            sendCategory={(category) => {
              alert(category);
            }}
          ></FilterProducts>
        </section>
        <section className="w-full  grid md:grid-cols-2 justify-items-center   backgroundLoginPoint:grid-cols-4 backgroundLoginPoint:px-0 mt-8 gap-8 md:px-16  ">
          <CardProduct
            click={() => {
              setSelectedProduct({
                image:
                  "https://a-static.mlcdn.com.br/1500x1500/macaneta-para-porta-oxidada-dourada-stam-modelo-21-51254/casaeconstrucaomuller/f7f51c00ef4411ed8da94201ac185049/1f16e6b1ec594cf3a92e301020d9be3b.jpeg",
                title: "Fechadura Externa Concept Cromado",
                description: "Descrição",
                stock_value: "20.000,00",
                unit_price: "2.000,00",
                quantity: 20,
              });
              setViewProductOpen(!viewProductOpen);
            }}
            data={{
              disponible: false,
              imageUrl: "https://placehold.co/600x400",
              title: "Fechadura Externa Concept Cromado",
            }}
          ></CardProduct>
          <CardProduct
            click={() => {}}
            data={{
              disponible: true,
              imageUrl: "https://placehold.co/600x400",
              title: "Fechadura Externa Concept Cromado",
            }}
          ></CardProduct>
          <CardProduct
            click={() => {}}
            data={{
              disponible: true,
              imageUrl: "https://placehold.co/600x400",
              title: "Fechadura Externa Concept Cromado",
            }}
          ></CardProduct>
          <CardProduct
            click={() => {}}
            data={{
              disponible: true,
              imageUrl: "https://placehold.co/600x400",
              title: "Fechadura Externa Concept Cromado",
            }}
          ></CardProduct>
          <CardProduct
            click={() => {}}
            data={{
              disponible: true,
              imageUrl: "https://placehold.co/600x400",
              title: "Fechadura Externa Concept Cromado",
            }}
          ></CardProduct>
          <CardProduct
            click={() => {}}
            data={{
              disponible: true,
              imageUrl: "https://placehold.co/600x400",
              title: "Fechadura Externa Concept Cromado",
            }}
          ></CardProduct>
          <CardProduct
            click={() => {}}
            data={{
              disponible: true,
              imageUrl: "https://placehold.co/600x400",
              title: "Fechadura Externa Concept Cromado",
            }}
          ></CardProduct>
        </section>
        <Pagination
          sendCurrentPage={(page) => {
            console.log(page);
          }}
          totalPages={50}
        ></Pagination>
      </main>
    </>
  );
};

export default Stock;
