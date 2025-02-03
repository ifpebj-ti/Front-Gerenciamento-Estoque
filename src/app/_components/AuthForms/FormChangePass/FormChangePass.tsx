"use client";
import SchemaChangePass from "@/app/_zod/SchemaChangePass";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Title from "../Title/Title";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

type Props = {
  children: ReactNode;
  sendEmailAndToken: (password: string, token: string) => void;
};

// Cria um tipo específico para o formulário usando o SchemaLoginForm
type FormData = z.infer<typeof SchemaChangePass>;

const FormChangePass = ({ children, sendEmailAndToken }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SchemaChangePass),
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // Define `onSubmit` com o tipo `SubmitHandler<FormData>`
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (
      data.password === "" ||
      data.confirm_pass === "" ||
      token === null ||
      token === ""
    )
      return null;
    sendEmailAndToken(data.password, token);
  };

  useEffect(() => {
    if (!token || token === "") {
      (function () {
        window.location.pathname = "/login";
      })();
      return;
    } else {
      setValue("verify_code", token);
    }
  }, [token, setValue]);

  return (
    <form
      className="transition-all ease-in-out duration-200 w-full flex flex-col justify-center items-center gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-16">
        <Title text={"NOVA SENHA"} />
      </div>
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
              idSelected.classList.add("w-[calc(var(--size-login-input)*1.1)]");
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

      {
        // Confirm pass
      }

      <div className="flex flex-col gap-1 relative">
        <input
          {...register("confirm_pass")}
          id="confirm_pass"
          onMouseEnter={() => {
            const idSelected = document.querySelector(
              "#confirm_pass"
            ) as HTMLInputElement;
            if (idSelected) {
              idSelected.classList.remove("w-[var(--size-login-input)]");
              idSelected.classList.add("w-[calc(var(--size-login-input)*1.1)]");
            }
          }}
          onMouseLeave={() => {
            const idSelected = document.querySelector(
              "#confirm_pass"
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
            errors.confirm_pass && "border-red-700 border-[3px]"
          } shadow-sm rounded-lg text-black h-11 w-[var(--size-login-input)] transition-all ease-in-out duration-200 border-2 border-slate-200 px-4 placeholder:text-slate-400`}
          placeholder="Confirme a Senha"
          type="password"
          name="confirm_pass"
        ></input>
        {errors.confirm_pass && (
          <span className="text-[0.775rem] text-red-700 absolute -bottom-[1.3rem] left-2">
            {errors.confirm_pass.message as string}
          </span>
        )}
      </div>

      {
        // Verify code
      }

      <div className="flex flex-col gap-1 relative">
        <input
          {...register("verify_code")}
          id="verify_code"
          onMouseEnter={() => {
            const idSelected = document.querySelector(
              "#verify_code"
            ) as HTMLInputElement;
            if (idSelected) {
              idSelected.classList.remove("w-[var(--size-login-input)]");
              idSelected.classList.add("w-[calc(var(--size-login-input)*1.1)]");
            }
          }}
          onMouseLeave={() => {
            const idSelected = document.querySelector(
              "#verify_code"
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
            errors.verify_code && "border-red-700 border-[3px]"
          } shadow-sm rounded-lg text-black h-11 w-[var(--size-login-input)] transition-all ease-in-out duration-200 border-2 border-slate-200 px-4 placeholder:text-slate-400`}
          placeholder="Token de recuperação de senha"
          type="text"
          name="verify_code"
        ></input>
        {errors.verify_code && (
          <span className="text-[0.775rem] text-red-700 absolute -bottom-[1.3rem] left-2">
            {errors.verify_code.message as string}
          </span>
        )}
      </div>

      {children}
    </form>
  );
};

export default FormChangePass;
