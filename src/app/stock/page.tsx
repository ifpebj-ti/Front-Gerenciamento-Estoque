"use client";
import { useState, useEffect } from "react";
import Header from "../_components/Header/Header";
import CardProduct from "../_components/Stock/CardProduct";
import FilterProducts from "../_components/Stock/FilterProducts";
import ViewProduct from "../_components/Stock/ViewProduct";
import Pagination from "../_components/Stock/Pagination";
import { useGetProducts } from "@/queries/ProductsQueries";
import { useSession } from "next-auth/react";
import WindowLoad from "../_components/WindowLoad/WindowLoad";
import { Product } from "@/types/productType";

const Stock = () => {
  const { data: session } = useSession();

  const [viewProductOpen, setViewProductOpen] = useState(false);
  const [searchByName, setSearchByName] = useState("");
  const [filters, setFilters] = useState<{ category: number | null }>({
    category: null,
  });
  const [currentPage, setCurrentPage] = useState(1); // Controle da página
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    photo: null,
    quantity: 0,
    unitValue: 0,
    name: "",
    stockValue: 0,
    critical_quantity: 0,
    id: 0,
  });

  // Refazer a requisição sempre que os filtros ou página forem alterados
  const products = useGetProducts({
    token: session?.accessToken as string,
    currentPage: currentPage,
    searchName: `${searchByName ? searchByName : ""}`,
    category: filters.category,
  });

  // Resetar a página ao mudar os filtros
  useEffect(() => {
    setCurrentPage(1); // Voltar para a primeira página ao alterar os filtros
    products.refetch(); // Refaz a requisição quando os filtros mudarem
  }, [filters, products]);

  return (
    <>
      {products.isLoading && <WindowLoad></WindowLoad>}
      {viewProductOpen ? (
        <div className="bg-black/50 fixed w-full h-full z-20"></div>
      ) : null}

      <Header></Header>

      <main className="relative max-w-[1100px] w-full px-8 sm:p-0 sm:w-[500px] md:w-[700px] backgroundLoginPoint:w-[1100px]  mx-auto mt-8 mb-20">
        {viewProductOpen ? (
          <ViewProduct
            data={{
              image: selectedProduct?.photo
                ? URL.createObjectURL(selectedProduct?.photo)
                : null,
              description: "Descrição",
              quantity: selectedProduct?.quantity,
              stock_value: `${selectedProduct?.stockValue}`,
              title: `${selectedProduct?.name}`,
              unit_price: `${selectedProduct?.unitValue}`,
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
              setSearchByName(name);
            }}
            sendCategory={(category: number | null) => {
              setFilters({
                category: category,
              });
            }}
          ></FilterProducts>
        </section>
        <section className="w-full  grid md:grid-cols-2 justify-items-center   backgroundLoginPoint:grid-cols-4 backgroundLoginPoint:px-0 mt-8 gap-8 md:px-16  ">
          {products.data?.content.map((product: Product) => {
            return (
              <CardProduct
                key={product.id}
                click={() => {
                  setSelectedProduct({
                    photo: product.photo
                      ? product.photo
                      : "https://placehold.co/600x400",
                    name: `${product.name}`,
                    stockValue: product.stockValue,
                    unitValue: product.unitValue,
                    quantity: product.quantity,
                    id: product.id,
                    critical_quantity: product.critical_quantity,
                  });
                  setViewProductOpen(!viewProductOpen);
                }}
                data={{
                  disponible: product.quantity > 0 ? true : false,
                  imageUrl: product.photo
                    ? product.photo
                    : "https://placehold.co/600x400",
                  title: `${product.name}`,
                }}
              ></CardProduct>
            );
          })}
        </section>
        <Pagination
          sendCurrentPage={(page) => {
            setCurrentPage(page); // Atualizar a página atual ao mudar na paginação
          }}
          totalPages={products.data?.totalPages as number}
        ></Pagination>
      </main>
    </>
  );
};

export default Stock;
