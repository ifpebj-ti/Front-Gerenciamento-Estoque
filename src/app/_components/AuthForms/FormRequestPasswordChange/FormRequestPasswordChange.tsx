"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Title from "../Title/Title";
import SchemaRequestPasswordChange from "@/app/_zod/SchemaRequestPasswordChange";
import { z } from "zod";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sendEmail: (email: string) => void;
};

// Cria um tipo específico para o formulário usando o SchemaLoginForm
type FormData = z.infer<typeof SchemaRequestPasswordChange>;

const FormRequestPasswordChange = ({ children, sendEmail }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SchemaRequestPasswordChange),
  });

  // Define `onSubmit` com o tipo `SubmitHandler<FormData>`
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Lógica para envio do formulário
    if (data.email === "") return null;
    sendEmail(data.email);
  };

  return (
    <>
      <form
        className="transition-all ease-in-out duration-200 w-full flex flex-col justify-center items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-16">
          <Title text={"RECUPERAR SENHA"} />
        </div>
        <div className="flex flex-col gap-1 relative">
          <input
            {...register("email")}
            id="email"
            onMouseEnter={() => {
              const idSelected = document.querySelector(
                "#email"
              ) as HTMLInputElement;
              if (idSelected) {
                idSelected.classList.remove("w-[var(--size-login-input)]");
                idSelected.classList.add(
                  "w-[calc(var(--size-login-input)*1.1)]"
                );
              }
            }}
            onMouseLeave={() => {
              const idSelected = document.querySelector(
                "#email"
              ) as HTMLInputElement;
              if (idSelected) {
                idSelected.classList.remove(
                  "w-[calc(var(--size-login-input)*1.1)]"
                );
                idSelected.classList.add("w-[var(--size-login-input)]");
              }
            }}
            required
            className={`${
              errors.email && "border-red-700 border-[3px]"
            } shadow-sm rounded-lg text-black h-11 w-[var(--size-login-input)] transition-all ease-in-out duration-200 border-2 border-slate-200 px-4 placeholder:text-slate-400`}
            placeholder="Email"
            type="email"
            name="email"
          ></input>
          {errors.email && (
            <span className="text-[0.775rem] text-red-700 absolute -bottom-[1.3rem] left-2">
              {errors.email.message as string}
            </span>
          )}
        </div>

        {children}
      </form>
    </>
  );
};

export default FormRequestPasswordChange;
