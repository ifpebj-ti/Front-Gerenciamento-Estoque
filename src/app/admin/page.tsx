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
import CardUserListAdmin from "../_components/Admin/CardUserListAdmin";
import WindowAddNewUser from "../_components/Admin/WindowAddNewUser";
import { UserInfoType } from "@/types/userType";
import { useSession } from "next-auth/react";
import { useGetProducts } from "@/queries/ProductsQueries";
import WindowLoad from "../_components/WindowLoad/WindowLoad";
import { Product } from "@/types/productType";
import { useGetUsers } from "@/queries/UsersQueries";

const Admin = () => {
  const { data: session } = useSession();
  const [currentSession, setCurrentSession] = useState(0);
  const [showWindowAddProduct, setShowWindowAddProduct] = useState(false);
  const [showWindowEditProduct, setShowWindowEditProduct] = useState(false);
  const [showWindowAddNewUser, setShowWindowAddNewUser] = useState(false);
  const [productSelectToEdit, setProdutSelectToEdit] = useState(0);
  const [userSelected, setUserSelected] = useState<UserInfoType | null>(null);
  const [searchByName, setSearchByName] = useState("");
  const [filters, setFilters] = useState<{ category: number | null }>({
    category: null,
  });
  const [currentPage, setCurrentPage] = useState(1); // Controle da página
  const products = useGetProducts({
    token: session?.accessToken as string,
    currentPage: currentPage,
    searchName: `${searchByName ? searchByName : ""}`,
    category: filters.category,
  });
  const users = useGetUsers(session?.accessToken as string);

  // Resetar a página ao mudar os filtros
  // useEffect(() => {
  //   setCurrentPage(1); // Voltar para a primeira página ao alterar os filtros
  //   products.refetch(); // Refaz a requisição quando os filtros mudarem
  // }, [filters, products]);
  const renderSession = () => {
    switch (currentSession) {
      case 0:
        return (
          <>
            <button
              onClick={() => {
                setShowWindowAddProduct(!showWindowAddProduct);
              }}
              className="transition-all ease-in-out duration-200 shadow-lg hover:bg-[var(--color-primary)] hover:text-white hover:border-none w-full h-12 text-slate-400 rounded-lg  border-2 border-slate-400  uppercase 
          "
            >
              Adicionar Produto
            </button>
            {products.data?.content.map((product: Product) => {
              return (
                <CardProductListAdmin
                  refetch={products.refetch}
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
            <Pagination
              sendCurrentPage={(page: number) => {
                setCurrentPage(page);
              }}
              totalPages={products.data?.totalPages as number}
            ></Pagination>
          </>
        );
      case 1:
        return (
          <>
            <button
              onClick={() => {
                setShowWindowAddNewUser(!showWindowAddNewUser);
              }}
              className="transition-all ease-in-out duration-200 shadow-lg hover:bg-[var(--color-primary)] hover:text-white hover:border-none w-full h-12 text-slate-400 rounded-lg  border-2 border-slate-400  uppercase 
          "
            >
              Adicionar Usuário
            </button>
            {users &&
              users.data.map((user: UserInfoType) => {
                return (
                  <CardUserListAdmin
                    data={user}
                    key={user.id}
                    sendOpenEditWindow={() => {
                      setShowWindowAddNewUser(true);
                      setUserSelected(user);
                    }}
                  ></CardUserListAdmin>
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
      {products.isLoading && <WindowLoad></WindowLoad>}
      {showWindowAddNewUser && (
        <>
          <div className="w-full  min-h-screen  bg-black/75 flex justify-center items-center fixed z-40 px-8"></div>
          <div className="absolute z-40 w-full flex justify-center items-center p-8">
            <WindowAddNewUser
              data={userSelected}
              sendClose={() => {
                setShowWindowAddNewUser(!showWindowAddNewUser);
                setUserSelected(null);
              }}
            />
          </div>
        </>
      )}
      {showWindowAddProduct ? (
        <>
          <div className="w-full  min-h-screen  bg-black/75 flex justify-center items-center fixed z-40 px-8"></div>
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
          <div className="w-full  min-h-screen  bg-black/75 flex justify-center items-center fixed z-40 px-8"></div>
          <div className="absolute z-40 w-full flex justify-center items-center p-8">
            <WindowEditProduct
              refetchProducts={products.refetch}
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
          isUser={currentSession === 1 ? true : false}
          sendCategory={(category: number | null) => {
            setFilters({ category: category });
          }}
          sendName={(name: string) => {
            setSearchByName(name);
          }}
        ></FilterProducts>
        <section className="flex flex-col gap-2 mt-4 relative">
          {renderSession()}
        </section>
      </main>
    </>
  );
};

export default Admin;
