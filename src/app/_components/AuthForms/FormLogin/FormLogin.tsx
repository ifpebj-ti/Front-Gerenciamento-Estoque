"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import SchemaLoginForm from "../../../_zod/SchemaLoginForm";
import { z } from "zod";
import { ReactNode } from "react";
import Title from "../Title/Title";
import { useRouter } from "next/navigation";

// Cria um tipo específico para o formulário usando o SchemaLoginForm
type FormData = z.infer<typeof SchemaLoginForm>;

type Props = {
  children: ReactNode;
};

const FormLogin = ({ children }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SchemaLoginForm),
  });

  // Define `onSubmit` com o tipo `SubmitHandler<FormData>`
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const email = data.email;
    const password = data.password;
    const result = await signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
    });
    if (result?.error) {
      alert(result.error);
    }
    if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <>
      <form
        className="transition-all ease-in-out duration-200 w-full flex flex-col justify-center items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-16">
          <Title text={"LOGIN"} />
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
        {
          //Password input
        }

        <div className="flex flex-col gap-1 relative">
          <input
            {...register("password")}
            id="password"
            onMouseEnter={() => {
              const idSelected = document.querySelector(
                "#password"
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
                "#password"
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
              errors.password && "border-red-700 border-[3px]"
            } shadow-sm rounded-lg text-black h-11 w-[var(--size-login-input)] transition-all ease-in-out duration-200 border-2 border-slate-200 px-4 placeholder:text-slate-400`}
            placeholder="Senha"
            type="password"
            name="password"
          ></input>
          {errors.password && (
            <span className="text-[0.775rem] text-red-700 absolute -bottom-[1.3rem] left-2">
              {errors.password.message as string}
            </span>
          )}
        </div>

        {children}
      </form>
    </>
  );
};

export default FormLogin;
