"use client";
import SchemaProduct from "@/app/_zod/SchemaProduct";
import formatMoney from "@/utils/moneyFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof SchemaProduct>;
type Props = {
  children: React.ReactNode;
};
const FormProduct = ({ children }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SchemaProduct),
    defaultValues: {
      unit_price: "", // Garante um valor inicial como string
    },
  });
  const [priceState, setPriceState] = useState("");
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const price = watch("unit_price");
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (imageSelected === null) {
      alert("Selecione uma imagem");
    }
    console.log(data, imageSelected);
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
        if (sizeImage > 5 * 1024 * 1024) {
          alert("O tamanho da imagem deve ser menor que 5 mb");
          return null;
        }
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

  return (
    <>
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
          <div className="flex flex-col gap-2 ">
            <select
              className="bg-white border-2 rounded-md border-slate-200 w-full placeholder:text-slate-400 p-2"
              {...register("categories")}
            >
              <option value="0" selected disabled>
                Selecione uma categoria
              </option>
            </select>
            <span className="text-sm text-red-500">
              {errors.categories?.message}
            </span>
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
              id="image"
              type="file"
              className="w-full hidden"
              accept="image/jpeg, image/png, image/jpg"
            />
            <div className="flex flex-col lg:flex-row justify-between">
              <span className="text-sm text-blue-500">
                As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb.
              </span>
              {imageSelected && (
                <div className="flex flex-col gap-2">
                  <Image
                    src={URL.createObjectURL(imageSelected)}
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
                    }}
                    className="hover:scale-105 transition-all ease-in-out duration-200 bg-red-500 text-white px-4 py-1 rounded-md w-40 text-sm"
                  >
                    Remover Imagem
                  </button>
                </div>
              )}
            </div>

            <span className="text-sm text-red-500">
              {imageSelected === null ? "Selecione uma imagem" : ""}
            </span>
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
