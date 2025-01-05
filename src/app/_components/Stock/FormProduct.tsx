"use client";
import SchemaProduct from "./../../../app/_zod/SchemaProduct";
import formatMoney from "@/utils/moneyFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import WindowAddNewCategory from "./WindowAddNewCategory";
import { useSession } from "next-auth/react";
import {
  useAddProduct,
  useUpdateProduct,
} from "./../../../mutations/ProductMutations";
import { AddProductType } from "./../../../API/products";
import WindowLoad from "../WindowLoad/WindowLoad";
import WindowSuccess from "../WindowSuccess/WindowSuccess";
import { useGetCategories } from "@/queries/CategoriesQueries";
import { CategoriesType } from "@/types/productType";
import { useGetProduct } from "@/queries/ProductsQueries";
import base64ToBlob from "@/utils/convertImage";
import WindowConfirm from "../WindowConfirm/WindowConfirm";
import WindowError from "../WindowError/WindowError";

type FormData = z.infer<typeof SchemaProduct>;
type Props = {
  children: React.ReactNode;
  isEdit?: boolean;
  idProduct?: number;
  sendClose: () => void;
  refetchProducts?: () => void;
};

type ProductType = {
  id: number;
  title: string;
  image: string;
  unit_price: string;
  stock_value: string;
  quantity: number;
  categories: string[];
  criticalQuantityStock: number;
  description: string;
};

const FormProduct = ({
  children,
  isEdit,
  idProduct,
  sendClose,
  refetchProducts,
}: Props) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SchemaProduct),
    defaultValues: {
      unit_price: "", // Garante um valor inicial como string
      categories: [],
    },
  });
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    id: 0,
    title: "",
    image: "",
    unit_price: "",
    stock_value: "",
    quantity: 0,
    categories: [],
    criticalQuantityStock: 0,
    description: "",
  });
  const addProduct = useAddProduct();
  const editProduct = useUpdateProduct();
  const [priceState, setPriceState] = useState("");
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [showWindowNewCategory, setShowWindowNewCategory] = useState(false);
  const [showWindowSuccess, setShowWindowSuccess] = useState(false);
  const [showWindowLoad, setShowWindowLoad] = useState(false);
  const [showWindowConfirm, setShowWindowConfirm] = useState(false);
  const [showWindowError, setShowWindowError] = useState({
    message: "",
    show: false,
  });
  const [productToSend, setProductToSend] = useState<{
    id: number;
    token: string;
    data: AddProductType;
  }>({
    id: 0,
    token: "",
    data: {
      name: "",
      unit_value: 0,
      quantity: 0,
      critical_quantity: 0,
      description: "",
      categories: [],
      photo: null,
    },
  });
  const price = watch("unit_price");
  const categoriesRegistered = useGetCategories(session?.accessToken as string);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!isEdit && imageSelected === null && selectedProduct.image === "") {
      setShowWindowError({
        message: "Selecione uma foto para o produto",
        show: true,
      });
      return;
    }
    //console.log(data, imageSelected);
    // Disable when using a mutation

    const sendData: {
      id: number;
      token: string;
      data: AddProductType;
    } = {
      id: 0,
      token: session?.accessToken as string,
      data: {
        name: data.title,
        unit_value: +data.unit_price,
        quantity: +data.quantity,
        critical_quantity: +data.criticalQuantityStock,
        categories: data.categories,
        description: data.description,
        photo: imageSelected,
      },
    };
    if (isEdit) {
      sendData.id = idProduct as number;
      if (sendData.id) {
        editProduct.mutate(sendData, {
          onSuccess: () => {
            if (refetchProducts) {
              refetchProducts();
              setShowWindowSuccess(true);
            }
          },
        });
      }
    } else {
      setProductToSend(sendData);
      setShowWindowConfirm(true);
    }
  };

  const handleImageChange = (img: HTMLInputElement) => {
    img.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      const sizeImage = file?.size;
      const typeFile = file?.type;
      if (file && sizeImage && typeFile) {
        if (
          typeFile !== "image/jpeg" &&
          typeFile !== "image/png" &&
          typeFile !== "image/jpg"
        ) {
          alert("Tipo de imagem inválido");
          return null;
        }
        if (sizeImage > 1024 * 1024 * 5) {
          alert("O tamanho da imagem deve ser menor que 5 mb");
          return null;
        }
        setSelectedProduct({
          ...selectedProduct,
          image: URL.createObjectURL(file),
        });
        setImageSelected(file);
        URL.createObjectURL(file);
      }
    };
  };
  useEffect(() => {
    const priceElement = document.querySelector("#price") as HTMLInputElement;
    if (price) {
      const rawValue = price.replace(/[^\d]/g, "");
      setValue("unit_price", rawValue);
      priceElement.style.color = "black";
      setPriceState(formatMoney(rawValue));
    } else {
      setPriceState("Preço do produto");
      priceElement.style.color = "rgb(148 163 184 / var(--tw-text-opacity))";
    }
  }, [price, setValue]);

  // Criar requisição para obter o produto

  const product = useGetProduct({
    token: session?.accessToken as string,
    id: idProduct as number,
  });

  const initializeForm = () => {
    if (isEdit && product && product.data) {
      setValue("title", product.data.name as string);
      setValue("unit_price", `${product.data.unitValue}`);
      setValue(
        "criticalQuantityStock",
        `${product.data.critical_quantity as number}`
      );
      setValue("quantity", `${product.data.quantity as number}`);
      setValue("description", product.data.description as string);
      const idsCategoriesSelecteds = product.data.categories.map(
        (item: { name: string; id: number }) => item.id
      );
      setValue("categories", idsCategoriesSelecteds || []);
      setSelectedProduct({
        id: product.data.id,
        title: product.data.name,
        image: product.data.photo ? base64ToBlob(product.data.photo) : "",
        unit_price: `${product.data.unitValue}`,
        stock_value: `${product.data.stockValue || 0}`,
        quantity: product.data.quantity,
        categories: product.data.categories || [],
        criticalQuantityStock: product.data.critical_quantity,
        description: product.data.description,
      });
    }
  };

  useEffect(() => {
    if (
      isEdit &&
      !product.isLoading &&
      product &&
      product.data &&
      !isFormInitialized
    ) {
      initializeForm();
      setIsFormInitialized(true);
    } /* eslint-disable-next-line*/
  }, [isEdit, product, isFormInitialized]);

  return (
    <>
      {showWindowError.show && (
        <WindowError
          text={`${showWindowError.message}`}
          sendClose={() => setShowWindowError({ message: "", show: false })}
        ></WindowError>
      )}
      {showWindowLoad && <WindowLoad></WindowLoad>}
      {showWindowConfirm && (
        <WindowConfirm
          confirm={() => {
            setShowWindowLoad(true);
            addProduct.mutate(productToSend, {
              onSuccess: () => {
                setShowWindowLoad(false);
                setShowWindowSuccess(true);
                if (refetchProducts) {
                  refetchProducts();
                }
              },
              onError: () => {
                setShowWindowLoad(false);
                setShowWindowError({
                  message: "Erro ao adicionar produto",
                  show: true,
                });
              },
            });
          }}
          sendClose={() => setShowWindowConfirm(false)}
          title={`${isEdit ? "Editar Produto" : "Adicionar Produto"}`}
          message={`${
            isEdit
              ? "Deseja realmente editar o produto?"
              : "Deseja realmente adicionar o produto?"
          }`}
        ></WindowConfirm>
      )}
      {showWindowSuccess && (
        <WindowSuccess
          text="Produto cadastrado com sucesso!"
          sendClose={() => {
            setShowWindowSuccess(false);
            sendClose();
          }}
        ></WindowSuccess>
      )}
      {addProduct.isPending && <WindowLoad></WindowLoad>}
      {showWindowNewCategory && (
        <div className="w-full h-full flex justify-center items-center fixed bg-black/50 z-40 top-0 right-0">
          <WindowAddNewCategory
            sendClose={() => {
              setShowWindowNewCategory(!showWindowNewCategory);
              categoriesRegistered.refetch();
            }}
          ></WindowAddNewCategory>
        </div>
      )}

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-11  mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              className="border-2 rounded-md border-slate-200 w-full placeholder:text-slate-400 p-2"
              placeholder="Nome do Produto"
              {...register("title")}
              type="text"
            />
            <span className="text-sm text-red-500">
              {errors.title?.message}
            </span>
          </div>
          {/* Init categories*/}
          <div className="w-full flex flex-col justify-center items-center">
            <label className="font-bold text-lg">Selecione as categorias</label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <div className="border-b-2 border-slate-200 border-t-2 p-2 w-full flex flex-wrap justify-start items-center gap-5">
                  {categoriesRegistered.data &&
                    categoriesRegistered.data.map(
                      (category: CategoriesType) => (
                        <label
                          className="flex justify-center items-center gap-1"
                          key={category.id}
                        >
                          <input
                            className="w-4 h-4"
                            type="checkbox"
                            value={category.id}
                            checked={field.value.includes(category.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, category.id]); // Add category
                              } else {
                                field.onChange(
                                  field.value.filter(
                                    (item) => item !== category.id
                                  ) // Remove category
                                );
                              }
                            }}
                          />
                          {category.name}
                        </label>
                      )
                    )}
                </div>
              )}
            />
            {errors.categories && <span>{errors.categories.message}</span>}
          </div>

          {/* End categories*/}

          <div className="flex justify-center items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowWindowNewCategory(!showWindowNewCategory);
              }}
              className="text-nowrap uppercase bg-[var(--color-primary)] text-white px-4 py-2 rounded-md flex-1 hover:scale-105 transition-all ease-in-out duration-200"
            >
              Adicionar nova categoria
            </button>
          </div>
          <div className="flex flex-col  gap-2  relative">
            <div
              id="price"
              className={`hover:border-black text-start border-2 border-slate-200 w-full p-2 rounded-md text-slate-400 absolute top-2 left-0 
          `}
            >
              {priceState}
            </div>
            <input
              className="border-2 rounded-md border-slate-200 w-full text-white p-2 opacity-0"
              {...register("unit_price")}
              type="text"
            />
            <span className="text-sm text-red-500">
              {errors.unit_price?.message}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="border-2 rounded-md border-slate-200 w-full placeholder:text-slate-400 p-2"
              placeholder="Quantidade"
              {...register("quantity")}
              type="number"
            />
            <span className="text-sm text-red-500">
              {errors.quantity?.message}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="border-2 rounded-md border-slate-200 w-full placeholder:text-slate-400 p-2"
              placeholder="Estoque critico"
              {...register("criticalQuantityStock")}
              type="number"
            />
            <span className="text-sm text-red-500">
              {errors.criticalQuantityStock?.message}
            </span>
          </div>
          <div className="flex flex-col gap-2 relative">
            <button
              className="px-8 py-2 bg-slate-400 text-white rounded-md hover:bg-[var(--color-primary)]"
              onClick={(e) => {
                e.preventDefault();
                const img = document.getElementById(
                  "image"
                ) as HTMLInputElement;
                img?.click();
                handleImageChange(img);
              }}
            >
              Selecionar Imagem
            </button>
            <input
              onChange={(e) => {
                e.preventDefault();
              }}
              id="image"
              type="file"
              className="w-full hidden"
              accept="image/jpeg, image/png, image/jpg"
            />
            <div className="flex flex-col lg:flex-row justify-between">
              <span className="text-sm text-blue-500">
                As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb.
              </span>
              {imageSelected !== null || isEdit ? (
                <div className="flex flex-col gap-2">
                  <Image
                    src={`${
                      selectedProduct
                        ? selectedProduct.image
                        : URL.createObjectURL(imageSelected as File)
                    }`}
                    alt="Imagem selecionada"
                    id="imagePreview"
                    width={160}
                    height={160} // Mantém uma proporção controlada (por exemplo, 40x40 ou 160x160)
                    className="h-40 w-40 object-cover"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setImageSelected(null);
                      setSelectedProduct({ ...selectedProduct, image: "" });
                    }}
                    className="hover:scale-105 transition-all ease-in-out duration-200 bg-red-500 text-white px-4 py-1 rounded-md w-40 text-sm"
                  >
                    Remover Imagem
                  </button>
                </div>
              ) : null}
            </div>
            {selectedProduct?.image.length > 0 ? (
              <></>
            ) : (
              <span className="text-sm text-red-500">
                {imageSelected === null ? "Selecione uma imagem" : ""}
              </span>
            )}
          </div>
        </div>
        <div
          className="flex flex-col justify-between
        "
        >
          <div className="flex flex-col gap-2">
            <textarea
              className="h-40 max-h-56 sm:max-h-96 min-h-40 sm:h-80 sm:min-h-80 border-2 rounded-md border-slate-200 w-full placeholder:text-slate-400 p-2"
              {...register("description")}
              name="description"
              id=""
              placeholder="Descrição"
            ></textarea>
            <span className="text-sm text-red-500">
              {errors.description?.message}
            </span>
          </div>
          <div className="flex flex-wrap gap-5 mt-11">{children}</div>
        </div>
      </form>
    </>
  );
};

export default FormProduct;
