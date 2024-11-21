"use client";
import Header from "../_components/Header/Header";
import FilterProducts from "../_components/Stock/FilterProducts";

const Stock = () => {
  return (
    <>
      <Header></Header>
      <main className="max-w-[1100px]  w-80 sm:w-[500px] md:w-[700px] backgroundLoginPoint:w-[1100px]  mx-auto mt-8">
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
      </main>
    </>
  );
};

export default Stock;
