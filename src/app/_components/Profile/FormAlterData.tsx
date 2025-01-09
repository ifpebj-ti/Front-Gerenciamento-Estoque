"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormDataAlterDataType,
  SchemaFormAlterData,
} from "@/app/_zod/SchemaFormAlterData";
import React, { useEffect, useState } from "react";
import { UserInfoType, UserRegisterType } from "@/types/userType";
import { useAddUser } from "@/mutations/UserMutations";
import { useSession } from "next-auth/react";
import WindowConfirm from "../WindowConfirm/WindowConfirm";
import WindowLoad from "../WindowLoad/WindowLoad";
import WindowSuccess from "../WindowSuccess/WindowSuccess";
import WindowError from "../WindowError/WindowError";

type Props = {
  children: React.ReactNode;
  isEditMode: boolean;
  data: UserInfoType;
  isRegister: boolean;
  sendClose?: () => void;
  isRefetch?: () => void;
};
const FormAlterData = ({
  children,
  isEditMode,
  data,
  isRegister,
  sendClose,
  isRefetch,
}: Props) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataAlterDataType>({
    resolver: zodResolver(SchemaFormAlterData),
  });
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [showWindow, setShowWindow] = useState(false);
  const [showWindowSuccess, setShowWindowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<{
    token: string;
    data: UserRegisterType;
  }>({
    token: "",
    data: {
      name: "",
      email: "",
      status: true,
      password: "T2b95*R8",
      first_acess: true,
      photo: null,
      roles: [2],
    },
  });
  const [showWindowError, setShowWindowError] = useState({
    message: "",
    show: false,
  });
  // Define `onSubmit` com o tipo `SubmitHandler<FormData>`
  const addUser = useAddUser();
  const onSubmit: SubmitHandler<FormDataAlterDataType> = (value) => {
    if (!isEditMode && imageSelected == null) {
      setShowWindowError({
        message: "Selecione uma foto para o perfil",
        show: true,
      });
      return;
    }
    if (
      value.name === data.name &&
      data.email === value.email &&
      imageSelected === null
    ) {
      return null;
    }
    if (isEditMode) {
      if (isRegister) {
        const sendData: {
          token: string;
          data: UserRegisterType;
        } = {
          token: session?.accessToken as string,
          data: {
            name: value.name,
            email: value.email,
            status: true,
            password: "T2b95*R8",
            first_acess: true,
            photo: imageSelected,
            roles: [2],
          },
        };
        setUserData(sendData);
        setShowWindow(true);
      } else {
        alert("edit");
      }
    }

    // Lógica para envio do formulário
  };
  useEffect(() => {
    setValue("name", data?.name);
    setValue("email", data?.email);
  }, [setValue, data?.name, data?.email]);

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
      {showWindowError.show && (
        <WindowError
          sendClose={() => setShowWindowError({ show: false, message: "" })}
          text={showWindowError.message}
        ></WindowError>
      )}
      {showWindowSuccess && (
        <WindowSuccess
          sendClose={() => {
            setShowWindowSuccess(false);
            if (sendClose) {
              sendClose();
            }
          }}
          text={`${
            isRegister
              ? "Usuário cadastrado com sucesso!"
              : "Usuário editado com sucesso!"
          }`}
        ></WindowSuccess>
      )}
      {loading && <WindowLoad></WindowLoad>}
      {showWindow && (
        <WindowConfirm
          title={`${!isRegister ? "Editar usuário" : "Adicionar novo usuário"}`}
          message={`${
            !isRegister
              ? "Tem certeza que deseja editar esse usuário?"
              : "Tem certeza que deseja adicionar um novo usuário?"
          }`}
          sendClose={() => {
            setShowWindow(false);
          }}
          confirm={() => {
            setLoading(true);
            if (isEditMode && !isRegister) {
              return null;
            }
            addUser.mutate(userData, {
              onSuccess: () => {
                setLoading(false);
                setShowWindow(false);
                setShowWindowSuccess(true);
                if (isRefetch) {
                  isRefetch();
                }
              },
              /* eslint-disable-next-line */
              onError: (error: any) => {
                setLoading(false);
                setShowWindow(false);
                setShowWindowError({
                  message:
                    error.message ||
                    "Error inesperado ao adicionar ou editar usuário",
                  show: true,
                });
              },
            });
          }}
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
              data?.photo
                ? "data:image/png;base64," + data?.photo
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
                {data?.photo
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
                <g clip-path="url(#clip0_142_300)">
                  <path
                    d="M40.483 32.1381C40.483 32.9795 40.1487 33.7864 39.5538 34.3813C38.9589 34.9763 38.1519 35.3105 37.3106 35.3105H8.75884C7.91746 35.3105 7.11055 34.9763 6.5156 34.3813C5.92066 33.7864 5.58643 32.9795 5.58643 32.1381V14.6898C5.58643 13.8484 5.92066 13.0415 6.5156 12.4466C7.11055 11.8516 7.91746 11.5174 8.75884 11.5174H15.1037L18.2761 6.75879H27.7933L30.9657 11.5174H37.3106C38.1519 11.5174 38.9589 11.8516 39.5538 12.4466C40.1487 13.0415 40.483 13.8484 40.483 14.6898V32.1381Z"
                    stroke="#1E1E1E"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.0347 28.9657C26.5389 28.9657 29.3795 26.125 29.3795 22.6209C29.3795 19.1167 26.5389 16.276 23.0347 16.276C19.5305 16.276 16.6899 19.1167 16.6899 22.6209C16.6899 26.125 19.5305 28.9657 23.0347 28.9657Z"
                    stroke="#1E1E1E"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                    <stop offset="0.5" stop-color="#E1E1E1" />
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
    </>
  );
};

export default FormAlterData;
