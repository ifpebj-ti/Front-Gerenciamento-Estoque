"use client";
import { useEffect, useState } from "react";
import CardProductListAdmin from "../_components/Admin/CardProductListAdmin";
import SelectSession from "../_components/Admin/SelectSession";
import Header from "../_components/Header/Header";
import FilterProducts from "../_components/Stock/FilterProducts";
import Pagination from "../_components/Stock/Pagination";
import OPTIONS from "../_CONSTANTS/OptionsSession";
import WindowAddProduct from "../_components/Stock/WindowAddProduct";
import WindowEditProduct from "../_components/Stock/WindowEditProduct";
import CardUserListAdmin from "../_components/Admin/CardUserListAdmin";
import WindowAddNewUser from "../_components/Admin/WindowAddNewUser";
import { UserInfoType } from "@/types/userType";
import { useSession } from "next-auth/react";
import { useGetProducts } from "@/queries/ProductsQueries";
import WindowLoad from "../_components/WindowLoad/WindowLoad";
import { Product } from "@/types/productType";
import { useGetUsers } from "@/queries/UsersQueries";

/* eslint-disable */
const Admin = () => {
  const { data: session } = useSession();
  const [currentSession, setCurrentSession] = useState(0);
  const [showWindowAddProduct, setShowWindowAddProduct] = useState(false);
  const [showWindowEditProduct, setShowWindowEditProduct] = useState(false);
  const [showWindowAddNewUser, setShowWindowAddNewUser] = useState(false);
  const [productSelectToEdit, setProdutSelectToEdit] = useState(0);
  const [userSelected, setUserSelected] = useState<UserInfoType | null>(null);
  const [searchByName, setSearchByName] = useState("");
  const [showDefaultPass, setShowDefaultPass] = useState(false);
  const [filters, setFilters] = useState<{ category: number | null }>({
    category: null,
  });
  const [listUsers, setListUsers] = useState<UserInfoType[]>([]);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const products = useGetProducts({
    token: session?.accessToken as string,
    currentPage,
    searchName: searchByName || "",
    category: filters.category,
  });

  const users = useGetUsers(session?.accessToken as string);
  const [userAction, setUserAction] = useState<"add" | "edit">("add");

  // Resetar a página ao mudar os filtros e refazer a requisição
  useEffect(() => {
    setCurrentPage(1);
    products.refetch();
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

  // Atualizar lista de usuários quando os dados forem carregados
  useEffect(() => {
    if (users.data) {
      setListUsers(users.data);
    }
  }, [users.data]);

  const renderSession = () => {
    switch (currentSession) {
      case 0:
        return (
          <>
            <button
              onClick={() => setShowWindowAddProduct(!showWindowAddProduct)}
              className="transition-all ease-in-out duration-200 shadow-lg hover:bg-[var(--color-primary)] hover:text-white hover:border-none w-full h-12 text-slate-400 rounded-lg border-2 border-slate-400 uppercase"
            >
              Adicionar Produto
            </button>
            {listProducts.length > 0 ? (
              listProducts.map((product: Product) => (
                <CardProductListAdmin
                  refetch={products.refetch}
                  key={product.id}
                  sendOpenEditWindow={() => {
                    setShowWindowAddProduct(false);
                    setShowWindowEditProduct(!showWindowEditProduct);
                    setProdutSelectToEdit(product.id);
                  }}
                  data={product}
                />
              ))
            ) : (
              <div className="text-center mt-16 font-bold text-lg">
                Não há produtos para mostrar
              </div>
            )}
            <Pagination
              sendCurrentPage={setCurrentPage}
              totalPages={products.data?.totalPages || 1}
            />
          </>
        );
      case 1:
        return (
          <>
            <button
              onClick={() => {
                setUserAction("add");
                setShowWindowAddNewUser(!showWindowAddNewUser);
              }}
              className="transition-all ease-in-out duration-200 shadow-lg hover:bg-[var(--color-primary)] hover:text-white hover:border-none w-full h-12 text-slate-400 rounded-lg border-2 border-slate-400 uppercase"
            >
              Adicionar Usuário
            </button>
            <div className="flex w-full justify-end relative my-4">
              <div
                onClick={() => {
                  setShowDefaultPass(!showDefaultPass);
                }}
                className="flex gap-1 justify-center items-center hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer *:hover:fill-[var(--color-primary)]  *:hover:text-[var(--color-primary)]"
              >
                {showDefaultPass ? (
                  <>
                    <svg
                      className="w-6 h-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6  "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                    </svg>
                  </>
                )}
                <span className="text-sm font-semibold ">
                  {showDefaultPass ? "Ocultar" : "Ver"} Senha Padrão
                </span>
              </div>
              {showDefaultPass && (
                <div className=" absolute rounded-md max-w-56 text-center p-2 bg-black/70 text-white -bottom-[4.5rem] right-0  shadow-md">
                  A senha padrão para novos usuários é:{" "}
                  <strong>T2b95*R8</strong>
                </div>
              )}
            </div>

            {listUsers.length > 0 ? (
              listUsers.map((user: UserInfoType) => (
                <CardUserListAdmin
                  isRefetch={() => {
                    users.refetch();
                  }}
                  data={user}
                  key={user.id}
                  sendOpenEditWindow={() => {
                    setShowWindowAddNewUser(true);
                    setUserSelected(user);
                    setUserAction("edit");
                  }}
                />
              ))
            ) : (
              <div className="text-center mt-16 font-bold text-lg">
                Não há usuários cadastrados
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {products.isLoading && <WindowLoad />}

      {showWindowAddProduct && (
        <>
          <div className="bg-black/75 fixed top-0 right-0 w-full h-full z-50"></div>
          <div className="absolute z-[51] w-full p-8">
            <WindowAddProduct
              refetchProducts={products.refetch}
              sendClose={() => setShowWindowAddProduct(false)}
            />
          </div>
        </>
      )}

      {showWindowEditProduct && (
        <>
          <div className="bg-black/75 fixed top-0 right-0 w-full h-full z-50"></div>
          <div className="absolute z-[51] w-full p-8">
            <WindowEditProduct
              refetchProducts={products.refetch}
              id={productSelectToEdit}
              sendClose={() => setShowWindowEditProduct(false)}
            />
          </div>
        </>
      )}

      {showWindowAddNewUser && (
        <>
          <div className="bg-black/75 fixed top-0 right-0 w-full h-full z-50"></div>
          <div className="absolute z-[51] w-full p-8">
            <WindowAddNewUser
              isRefetch={users.refetch}
              isAddUser={userAction === "add"}
              data={userSelected}
              sendClose={() => {
                setShowWindowAddNewUser(false);
                setUserSelected(null);
              }}
            />
          </div>
        </>
      )}

      <Header />
      <main className="max-w-[1100px] gap-8 w-full px-8 flex flex-col justify-center items-center mx-auto mt-8 mb-20">
        <SelectSession sendOption={setCurrentSession} options={OPTIONS} />

        {currentSession === 0 && (
          <FilterProducts
            sendCategory={(category) => setFilters({ category })}
            sendName={setSearchByName}
          />
        )}

        <section className="flex flex-col gap-2 mt-4 relative">
          {renderSession()}
        </section>
      </main>
    </>
  );
};

export default Admin;
