"use client";
import {
  FormDataAlterPassType,
  SchemaFormAlterPass,
} from "@/app/_zod/SchemaProfileAlterPass";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import WindowConfirm from "../WindowConfirm/WindowConfirm";
import WindowLoad from "../WindowLoad/WindowLoad";
import WindowSuccess from "../WindowSuccess/WindowSuccess";
import WindowError from "../WindowError/WindowError";
import { UserUpdateType } from "@/types/userType";
import { useUpdateUser } from "@/mutations/UserMutations";

type Props = {
  children: React.ReactNode;
  isEditMode: boolean;
  imageProfile: string;
  isProfile?: boolean;
  email?: string;
  isRefetch?: () => void;
  sendClose?: () => void;
};
const FormAlterPass = ({
  children,
  isEditMode,
  imageProfile,
  isProfile,
  email,
  isRefetch,
  sendClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataAlterPassType>({
    resolver: zodResolver(SchemaFormAlterPass),
  });
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [showWindowConfirm, setShowWindowConfirm] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState({ show: false, message: "" });
  const { data: session } = useSession();
  const [newData, setNewData] = useState<{
    token: string;
    email: string;
    data: UserUpdateType;
  }>({
    token: "",
    email: "",
    data: {
      password: "12345678",
      photo: null,
    },
  });
  const userUpdateMutation = useUpdateUser();
  // Define `onSubmit` com o tipo `SubmitHandler<FormData>`
  const onSubmit: SubmitHandler<FormDataAlterPassType> = (value) => {
    if (imageProfile === "" && imageSelected === null) {
      setShowError({ show: true, message: "Selecione uma imagem" });
      return;
    }
    setNewData({
      token: session?.accessToken as string,
      email: email ? email : (session?.user?.email as string),
      data: {
        password: value.password === "" ? "" : (value.password as string),
        photo: imageSelected,
      },
    });
    setShowWindowConfirm(true);
    // Lógica para envio do formulário
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageSelected(file);
      const img = URL.createObjectURL(file);
      const imgElement = document.querySelector(
        "#img-profile"
      ) as HTMLDivElement;
      imgElement.style.backgroundImage = `url(${img})`;
    }
  };

  return (
    <>
      {showError.show && (
        <WindowError
          sendClose={() => setShowError({ show: false, message: "" })}
          text={showError.message}
        ></WindowError>
      )}
      {showSuccess && (
        <WindowSuccess
          text="Senha alterada com sucesso!"
          sendClose={() => setShowSuccess(false)}
        ></WindowSuccess>
      )}
      {showLoad && <WindowLoad></WindowLoad>}
      {showWindowConfirm && (
        <WindowConfirm
          confirm={() => {
            userUpdateMutation.mutate(newData, {
              onSuccess: () => {
                setShowSuccess(true);
                setShowWindowConfirm(false);
                setShowLoad(false);
                setValue("password", "");
                setValue("confirmPassword", "");
                if (isRefetch) {
                  isRefetch();
                }
                if (sendClose) {
                  sendClose();
                }
              },
              onError: (error) => {
                setShowError({ show: true, message: error.message });
                setShowWindowConfirm(false);
                setShowLoad(false);
              },
            });
          }}
          sendClose={() => setShowWindowConfirm(false)}
          title="Modificar senha"
          message="Tem certeza que deseja alterar sua senha?"
        ></WindowConfirm>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex md:flex-row flex-col items-center w-full gap-4 md:gap-16 justify-start "
      >
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {isProfile ? (
          <div
            style={{
              backgroundImage: `url(${
                imageProfile !== ""
                  ? "data:image/png;base64," + imageProfile
                  : "https://placehold.co/640x480"
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="border-2 boder-slate-200 w-[16rem] h-[16rem] rounded-full bg-slate-300 flex justify-center items-center "
          >
            {!imageProfile && <div className="font-bold">Sem imagem ):</div>}
          </div>
        ) : (
          <div
            id="img-profile"
            onClick={() => {
              if (isEditMode) {
                const fileInputElement = document.querySelector(
                  "input[type=file]"
                ) as HTMLInputElement;
                fileInputElement.click();
              }
            }}
            style={{
              backgroundImage: `url(${
                imageProfile
                  ? "data:image/png;base64," + imageProfile
                  : "https://placehold.co/640x480"
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="border-2 boder-slate-200 w-[16rem] h-[16rem] rounded-full bg-slate-300 flex justify-center items-center relative"
          >
            {isEditMode && (
              <>
                <div className="absolute w-full h-full hover:bg-black/25 rounded-full cursor-pointer opacity-0 hover:opacity-100 flex justify-center items-center text-white font-bold">
                  {imageProfile
                    ? "Mudar foto do perfil"
                    : "Adicionar foto no perfil"}
                </div>

                <svg
                  className="absolute bottom-0 right-0 -translate-x-1/2 -translate-y-1/2"
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="23"
                    cy="23"
                    r="23"
                    fill="url(#paint0_linear_142_300)"
                  />
                  <g clipPath="url(#clip0_142_300)">
                    <path
                      d="M40.483 32.1381C40.483 32.9795 40.1487 33.7864 39.5538 34.3813C38.9589 34.9763 38.1519 35.3105 37.3106 35.3105H8.75884C7.91746 35.3105 7.11055 34.9763 6.5156 34.3813C5.92066 33.7864 5.58643 32.9795 5.58643 32.1381V14.6898C5.58643 13.8484 5.92066 13.0415 6.5156 12.4466C7.11055 11.8516 7.91746 11.5174 8.75884 11.5174H15.1037L18.2761 6.75879H27.7933L30.9657 11.5174H37.3106C38.1519 11.5174 38.9589 11.8516 39.5538 12.4466C40.1487 13.0415 40.483 13.8484 40.483 14.6898V32.1381Z"
                      stroke="#1E1E1E"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.0347 28.9657C26.5389 28.9657 29.3795 26.125 29.3795 22.6209C29.3795 19.1167 26.5389 16.276 23.0347 16.276C19.5305 16.276 16.6899 19.1167 16.6899 22.6209C16.6899 26.125 19.5305 28.9657 23.0347 28.9657Z"
                      stroke="#1E1E1E"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_142_300"
                      x1="23"
                      y1="0"
                      x2="23"
                      y2="46"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.5" stopColor="#E1E1E1" />
                    </linearGradient>
                    <clipPath id="clip0_142_300">
                      <rect
                        width="38.069"
                        height="38.069"
                        fill="white"
                        transform="translate(4 2)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </>
            )}

            {/* {!data?.avatar && <div className="font-bold">Sem imagem ):</div>} */}
          </div>
        )}

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
    </>
  );
};

export default FormAlterPass;
