"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormDataAlterDataType,
  SchemaFormAlterData,
} from "@/app/_zod/SchemaFormAlterData";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  isEditMode: boolean;
  imageProfile: string;
  data: {
    name: string;
    email: string;
  };
};
const FormAlterData = ({ children, isEditMode, imageProfile, data }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataAlterDataType>({
    resolver: zodResolver(SchemaFormAlterData),
  });

  // Define `onSubmit` com o tipo `SubmitHandler<FormData>`
  const onSubmit: SubmitHandler<FormDataAlterDataType> = (value) => {
    if (value.name === data.name && data.email === value.email) {
      return null;
    }
    console.log(value);
    // Lógica para envio do formulário
  };
  useEffect(() => {
    setValue("name", data.name);
    setValue("email", data.email);
  }, [setValue, data.name, data.email]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex md:flex-row flex-col items-center w-full gap-4 md:gap-16 justify-start "
    >
      <div
        style={{
          backgroundImage: `url(${imageProfile})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="border-2 boder-slate-200 w-[16rem] h-[16rem] rounded-full bg-slate-300 flex justify-center items-center "
      >
        {!imageProfile && <div className="font-bold">Sem imagem ):</div>}
      </div>
      <div className="flex flex-col justify-evenly h-56">
        <div className="flex flex-col gap-4">
          <div></div>
          <label className="flex flex-col " htmlFor="name">
            <input
              disabled={isEditMode ? false : true}
              className="text-lg border-2 border-slate-200 rounded-md px-2 py-1 w-80"
              type="text"
              {...register("name")}
              placeholder="Nome"
            />
            {isEditMode && (
              <span className="text-red-500 text-sm">
                {errors.name?.message as string}
              </span>
            )}
          </label>
          <label className="flex flex-col " htmlFor="email">
            <input
              disabled={isEditMode ? false : true}
              className="text-lg border-2 border-slate-200 rounded-md px-2 py-1 w-80"
              type="email"
              {...register("email")}
              placeholder="Email"
            />
            {isEditMode && (
              <span className="text-red-500 text-sm">
                {errors.email?.message as string}
              </span>
            )}
          </label>
        </div>

        <div className="flex gap-4 mt-8 md:flex-row flex-col">{children}</div>
      </div>
    </form>
  );
};

export default FormAlterData;
