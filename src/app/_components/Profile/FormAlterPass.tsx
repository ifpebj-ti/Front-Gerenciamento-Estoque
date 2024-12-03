"use client";
import {
  FormDataAlterPassType,
  SchemaFormAlterPass,
} from "@/app/_zod/SchemaProfileAlterPass";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  isEditMode: boolean;
  imageProfile: string;
};
const FormAlterPass = ({ children, isEditMode, imageProfile }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAlterPassType>({
    resolver: zodResolver(SchemaFormAlterPass),
  });

  // Define `onSubmit` com o tipo `SubmitHandler<FormData>`
  const onSubmit: SubmitHandler<FormDataAlterPassType> = (value) => {
    console.log(value);
    // Lógica para envio do formulário
  };

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
          <label className="flex flex-col " htmlFor="password">
            <input
              disabled={isEditMode ? false : true}
              className="text-lg border-2 border-slate-200 rounded-md px-2 py-1 w-80"
              type="password"
              {...register("password")}
              placeholder="Senha"
            />
            {isEditMode && (
              <span className="text-red-500 text-sm">
                {errors.password?.message as string}
              </span>
            )}
          </label>
          <label className="flex flex-col " htmlFor="confirmPassword">
            <input
              disabled={isEditMode ? false : true}
              className="text-lg border-2 border-slate-200 rounded-md px-2 py-1 w-80"
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirme sua senha"
            />
            {isEditMode && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword?.message as string}
              </span>
            )}
          </label>
        </div>

        <div className="flex gap-4 mt-8 md:flex-row flex-col">{children}</div>
      </div>
    </form>
  );
};

export default FormAlterPass;
