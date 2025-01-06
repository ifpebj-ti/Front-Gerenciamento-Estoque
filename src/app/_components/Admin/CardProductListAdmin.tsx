"use client";
import { CategoriesType, Product } from "@/types/productType";
import ViewValueProduct from "../Stock/ViewValueProduct";
import base64ToBlob from "../../../utils/convertImage";
import { useSession } from "next-auth/react";
import { useDeleteProduct } from "@/mutations/ProductMutations";
import WindowConfirm from "./../WindowConfirm/WindowConfirm";
import { useState } from "react";
import WindowLoad from "../WindowLoad/WindowLoad";
import WindowError from "../WindowError/WindowError";
import WindowSuccess from "../WindowSuccess/WindowSuccess";

type Props = {
  data: Product;
  sendOpenEditWindow: () => void;
  refetch?: () => void;
};
const CardProductListAdmin = ({ data, sendOpenEditWindow, refetch }: Props) => {
  const { data: session } = useSession();
  const [showWindowConfirm, setShowWindowConfirm] = useState(false);
  const [showWindowError, setShowWindowError] = useState({
    show: false,
    message: "",
  });
  const [showWindowSuccess, setShowWindowSuccess] = useState(false);
  const [showWindowLoad, setShowWindowLoad] = useState(false);
  const deleteProduct = useDeleteProduct();
  return (
    <>
      {showWindowSuccess && (
        <WindowSuccess
          text="Produto excluido com sucesso"
          sendClose={() => setShowWindowSuccess(false)}
        ></WindowSuccess>
      )}
      {showWindowError.show && (
        <WindowError
          text={showWindowError.message}
          sendClose={() => setShowWindowError({ show: false, message: "" })}
        ></WindowError>
      )}
      {showWindowLoad && <WindowLoad></WindowLoad>}
      {showWindowConfirm && (
        <WindowConfirm
          title="Excluir produto"
          message="Deseja excluir o produto?"
          confirm={() => {
            setShowWindowLoad(true);
            if (session?.accessToken && refetch) {
              deleteProduct.mutate(
                {
                  token: session?.accessToken as string,
                  id: data.id,
                },
                {
                  onSuccess: () => {
                    setShowWindowSuccess(true);
                    refetch();
                  },
                  onError: () => {
                    setShowWindowLoad(false);
                    setShowWindowError({
                      message: "Erro ao excluir produto",
                      show: true,
                    });
                  },
                }
              );
            }
          }}
          sendClose={() => {
            setShowWindowConfirm(false);
          }}
        ></WindowConfirm>
      )}

      <div className="max-w-[1100px] w-full  sm:p-0 sm:w-[500px] lg:w-full   bg-white  rounded-lg flex flex-col lg:flex-row shadow-lg  justify-between items-center">
        <div
          style={{
            backgroundImage: `url(${
              data.photo
                ? base64ToBlob(data.photo)
                : "https://placehold.co/600x400"
            })`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full h-64 md:h-96 rounded-t-lg lg:rounded-t-none lg:w-52 lg:h-40 lg:rounded-l-lg border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-slate-200"
        ></div>

        <div className="flex flex-col px-4 md:px-0 gap-6 lg:gap-2 mt-8 lg:mt-0 lg:ml-4 flex-1">
          <h1 className="text-sm font-bold uppercase text-center lg:text-start">
            {data.name}
          </h1>
          <span className="inline-flex flex-wrap justify-center sm:justify-stretch gap-4 mx-auto lg:mx-0">
            <ViewValueProduct
              data={{
                title: "Valor unitário",
                price: data.unitValue,
                isMoney: true,
                gap: "gap-0",
                sizeText: "text-md",
              }}
            ></ViewValueProduct>
            <ViewValueProduct
              data={{
                title: "Valor estoque",
                price: data.stockValue,
                isMoney: true,
                gap: "gap-0",
                sizeText: "text-md",
              }}
            ></ViewValueProduct>
            <ViewValueProduct
              data={{
                title: "Quantidade",
                price: data.quantity,
                isMoney: false,
                gap: "gap-0",
                sizeText: "text-md",
              }}
            ></ViewValueProduct>
          </span>
          <span className="inline-flex flex-wrap justify-center sm:justify-stretch gap-4  max-w-64 sm:max-w-96  lg:mx-0 mx-auto">
            {data.categories.map((category: CategoriesType) => {
              return (
                <div
                  className="px-4 py-1 bg-slate-200 rounded-lg text-nowrap"
                  key={category.id}
                >
                  {category.name}
                </div>
              );
            })}
          </span>
        </div>
        <div className="flex flex-row my-11 lg:my-0 lg:flex-col gap-2 mx-8">
          <button
            onClick={() => sendOpenEditWindow()}
            className="text-sm sm:text-md hover:scale-110 hover:bg-slate-400 hover:text-white transition-all ease-in-out duration-200 uppercase text-slate-400 border-slate-400 border-2 px-8 backgroundLoginPoint:px-16 py-1 rounded-lg"
          >
            editar
          </button>
          <button
            onClick={() => {
              setShowWindowConfirm(true);
            }}
            className="text-sm sm:text-md hover:scale-110 hover:bg-red-700 hover:text-white transition-all ease-in-out duration-200 uppercase text-red-700 border-red-700 border-2 px-8 backgroundLoginPoint:px-16 py-1 rounded-lg"
          >
            excluir
          </button>
        </div>
      </div>
    </>
  );
};

export default CardProductListAdmin;

//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVUsms7oB4xz8w1geynBqKleFSF51p7reVg&s
