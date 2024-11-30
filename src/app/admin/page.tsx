"use client";
import CardProductListAdmin from "../_components/Admin/CardProductListAdmin";
import SelectSession from "../_components/Admin/SelectSession";
import Header from "../_components/Header/Header";
import FilterProducts from "../_components/Stock/FilterProducts";
import Pagination from "../_components/Stock/Pagination";
import OPTIONS from "../_CONSTANTS/OptionsSession";

const admin = () => {
  return (
    <>
      <Header></Header>
      <main className="max-w-[1100px] gap-8  w-full px-8 flex flex-col justify-center items-center mx-auto mt-8 mb-20">
        <SelectSession
          sendOption={(option: number) => {}}
          options={OPTIONS}
        ></SelectSession>
        <FilterProducts
          sendCategory={(category: string) => {}}
          sendName={(name: string) => {}}
        ></FilterProducts>
        <section className="flex flex-col gap-2 mt-4">
          <CardProductListAdmin
            data={{
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVUsms7oB4xz8w1geynBqKleFSF51p7reVg&s",
              title: "KIT FECHADURAS STAM ANTIQUE 2 INTERNAS + 1 PARA BANHEIRO",
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
              title: "KIT FECHADURAS STAM ANTIQUE 2 INTERNAS + 1 PARA BANHEIRO",
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
              title: "KIT FECHADURAS STAM ANTIQUE 2 INTERNAS + 1 PARA BANHEIRO",
              categories: ["kit", "fechaduras", "banheiro"],
              quantity: 50,
              stock_value: "R$ 100,00",
              unit_price: "R$ 10.000,00",
            }}
          ></CardProductListAdmin>
        </section>

        <Pagination
          sendCurrentPage={(page: number) => {}}
          totalPages={10}
        ></Pagination>
      </main>
    </>
  );
};

export default admin;
