"use client";
import Header from "../_components/Header/Header";
import CardProduct from "../_components/Stock/CardProduct";
import FilterProducts from "../_components/Stock/FilterProducts";

const Stock = () => {
  return (
    <>
      <Header></Header>
      <main className="max-w-[1100px]  w-80 sm:w-[500px] md:w-[700px] backgroundLoginPoint:w-[1100px]  mx-auto mt-8 mb-20">
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
              alert("Hello");
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
      </main>
    </>
  );
};

export default Stock;
