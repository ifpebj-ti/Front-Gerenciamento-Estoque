"use client";
import { useEffect, useState } from "react";
import Header from "../_components/Header/Header";
import CardProduct from "../_components/Stock/CardProduct";
import FilterProducts from "../_components/Stock/FilterProducts";
import ViewProduct from "../_components/Stock/ViewProduct";
import Pagination from "../_components/Stock/Pagination";
import { useGetProducts } from "@/queries/ProductsQueries";
import { useSession } from "next-auth/react";
import WindowLoad from "../_components/WindowLoad/WindowLoad";
import { Product } from "@/types/productType";
import base64ToBlob from "@/utils/convertImage";

/* eslint-disable */
const Stock = () => {
  const { data: session } = useSession();

  const [viewProductOpen, setViewProductOpen] = useState(false);
  const [searchByName, setSearchByName] = useState("");
  const [filters, setFilters] = useState<{ category: number | null }>({
    category: null,
  });
  const [currentPage, setCurrentPage] = useState(1); // Controle da página
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    photo: "",
    quantity: 0,
    unitValue: 0,
    description: "",
    categories: [],
    name: "",
    stockValue: 0,
    critical_quantity: 0,
    id: 0,
  });
  const [listProducts, setListProducts] = useState<Product[]>([]);

  // Obter produtos com base nos filtros e página atual
  const products = useGetProducts({
    token: session?.accessToken as string,
    currentPage: currentPage,
    searchName: searchByName || "",
    category: filters.category,
  });

  // Resetar a página ao mudar os filtros e refazer a requisição
  useEffect(() => {
    setCurrentPage(1); // Voltar para a primeira página ao alterar os filtros
    products.refetch(); // Refaz a requisição quando os filtros mudam
  }, [filters]);

  // Refazer a requisição sempre que a página for alterada
  useEffect(() => {
    products.refetch();
  }, [currentPage]);

  // Atualizar lista de produtos quando os dados forem carregados
  useEffect(() => {
    if (products.data) {
      setListProducts(products.data.content);
    }
  }, [products.data]);

  return (
    <>
      {products.isLoading && <WindowLoad />}

      {viewProductOpen && (
        <div className="bg-black/50 fixed w-full h-full z-40"></div>
      )}

      {viewProductOpen && (
        <ViewProduct
          data={{
            image: selectedProduct.photo
              ? base64ToBlob(selectedProduct.photo)
              : null,
            description: selectedProduct.description,
            quantity: selectedProduct.quantity,
            stock_value: `${selectedProduct.stockValue}`,
            title: selectedProduct.name,
            unit_price: `${selectedProduct.unitValue}`,
          }}
          close={() => setViewProductOpen(false)}
        />
      )}

      <Header />

      <main className="relative max-w-[1100px] w-full px-8 sm:p-0 sm:w-[500px] md:w-[700px] backgroundLoginPoint:w-[1100px] mx-auto mt-8 mb-20">
        <section className="flex flex-col gap-5">
          <h1 className="font-extrabold text-xl">Catálogo de produtos</h1>
          <FilterProducts
            sendName={(name) => setSearchByName(name)}
            sendCategory={(category: number | null) => setFilters({ category })}
          />
        </section>

        <section className="w-full grid md:grid-cols-2 justify-items-center backgroundLoginPoint:grid-cols-4 backgroundLoginPoint:px-0 mt-8 gap-8 md:px-16">
          {listProducts.length > 0 ? (
            listProducts.map((product: Product) => (
              <CardProduct
                key={product.id}
                click={() => {
                  setSelectedProduct({
                    photo: product.photo || "",
                    name: product.name,
                    description: product.description,
                    categories: product.categories,
                    stockValue: product.stockValue,
                    unitValue: product.unitValue,
                    quantity: product.quantity,
                    id: product.id,
                    critical_quantity: product.critical_quantity,
                  });
                  setViewProductOpen(true);
                }}
                data={{
                  disponible: product.quantity > 0,
                  imageUrl: product.photo
                    ? `data:image/png;base64,${product.photo}`
                    : "https://placehold.co/600x400",
                  title: product.name,
                }}
              />
            ))
          ) : (
            <div className="text-center mt-16 font-bold w-full text-lg col-span-full">
              Não há produtos para mostrar
            </div>
          )}
        </section>

        <Pagination
          sendCurrentPage={setCurrentPage}
          totalPages={products.data?.totalPages || 1}
        />
      </main>
    </>
  );
};

export default Stock;
