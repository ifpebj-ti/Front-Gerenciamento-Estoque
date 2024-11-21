import Header from "../_components/Header/Header";
import FilterProducts from "../_components/Stock/FilterProducts";

const Stock = () => {
  return (
    <>
      <Header></Header>
      <main className="max-w-[1200px]  mx-auto mt-8">
        <section className="flex flex-col">
          <h1 className="font-extrabold text-xl">Catálogo de produtos</h1>
          <FilterProducts></FilterProducts>
        </section>
      </main>
    </>
  );
};

export default Stock;
