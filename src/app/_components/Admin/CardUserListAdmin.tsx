"use client";

import { useActivateUser, useDeactivateUser } from "@/mutations/UserMutations";
import { UserInfoType } from "@/types/userType";
import base64ToBlob from "@/utils/convertImage";
import WindowConfirm from "../WindowConfirm/WindowConfirm";
import { useState } from "react";
import WindowLoad from "../WindowLoad/WindowLoad";
import WindowError from "../WindowError/WindowError";
import WindowSuccess from "../WindowSuccess/WindowSuccess";
import { useSession } from "next-auth/react";

type Props = {
  data: UserInfoType;
  sendOpenEditWindow: () => void;
  isRefetch?: () => void;
};
const CardUserListAdmin = ({ data, sendOpenEditWindow, isRefetch }: Props) => {
  const [showWindowConfirm, setShowWindowConfirm] = useState(false);
  const [showWindowLoad, setShowWindowLoad] = useState(false);
  const [showWindowError, setShowWindowError] = useState({
    show: false,
    message: "",
  });
  const [showWindowSuccess, setShowWindowSuccess] = useState(false);
  const { data: session } = useSession();
  const deactivateUser = useDeactivateUser();
  const activeUser = useActivateUser();

  const renderStatus = () => {
    if (data.status === true) {
      return "Desativar";
    }
    return "Ativar";
  };

  return (
    <>
      {showWindowError.show && (
        <WindowError
          text={showWindowError.message}
          sendClose={() => setShowWindowError({ show: false, message: "" })}
        ></WindowError>
      )}
      {showWindowSuccess && (
        <WindowSuccess
          text={`${
            data.status == true
              ? "Ativado com sucesso"
              : "Desativado com sucesso"
          }`}
          sendClose={() => setShowWindowSuccess(false)}
        ></WindowSuccess>
      )}
      {showWindowLoad && <WindowLoad></WindowLoad>}
      {showWindowConfirm && (
        <WindowConfirm
          confirm={() => {
            setShowWindowLoad(true);
            if (data.status === true) {
              deactivateUser.mutate(
                {
                  token: session?.accessToken as string,
                  id: data.id,
                },
                {
                  onSuccess: () => {
                    setShowWindowLoad(false);
                    setShowWindowSuccess(true);
                    if (isRefetch) {
                      isRefetch();
                    }
                  },
                  onError: (error) => {
                    setShowWindowLoad(false);
                    setShowWindowError({
                      show: true,
                      message: error.message,
                    });
                  },
                }
              );
              setShowWindowConfirm(false);

              return;
            }
            activeUser.mutate(
              {
                token: session?.accessToken as string,
                id: data.id,
              },
              {
                onSuccess: () => {
                  setShowWindowLoad(false);
                  setShowWindowSuccess(true);
                  if (isRefetch) {
                    isRefetch();
                  }
                },
                onError: (error) => {
                  setShowWindowLoad(false);
                  setShowWindowError({
                    show: true,
                    message: error.message,
                  });
                },
              }
            );

            setShowWindowConfirm(false);
          }}
          title={`${
            data.status === true ? "Desativar Usuário " : "Ativar Usuário"
          }`}
          message={`${
            data.status === true
              ? "Tem certeza que deseja desativar esse usuário?"
              : "Tem certeza que deseja ativar esse usuário?"
          }`}
          sendClose={() => setShowWindowConfirm(false)}
        ></WindowConfirm>
      )}
      <div className="max-w-[1100px] lg:w-[900px] w-full  sm:p-0 sm:w-[500px]   bg-white  rounded-lg flex flex-col lg:flex-row shadow-lg  justify-between items-center">
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
          <span className="text-sm font-bold uppercase text-center lg:text-start">
            <p className="text-slate-500 lowercase first-letter:uppercase">
              Nome:
            </p>
            {data.name}
          </span>
          <span className="inline-flex flex-wrap justify-center sm:justify-stretch gap-4 mx-auto lg:mx-0">
            <span className="text-sm font-bold sss text-center lg:text-start">
              <p className="text-slate-500 lowercase first-letter:uppercase">
                Email:
              </p>
              {data.email}
            </span>
          </span>
        </div>
        <div className="flex flex-row my-11 lg:my-0 lg:flex-col gap-2 mx-8">
          <button
            onClick={() => sendOpenEditWindow()}
            className="w-full lg:min-w-56 text-sm sm:text-md hover:scale-110 hover:bg-slate-400 hover:text-white transition-all ease-in-out duration-200 uppercase text-slate-400 border-slate-400 border-2 px-8 backgroundLoginPoint:px-16 py-1 rounded-lg"
          >
            editar
          </button>
          <button
            onClick={() => {
              setShowWindowConfirm(true);
            }}
            className={`w-full lg:min-w-56 text-sm sm:text-md hover:scale-110 ${
              !data.status
                ? "text-green-700 border-green-700 hover:bg-green-700"
                : "text-red-700 border-red-700 hover:bg-red-700"
            }  hover:text-white transition-all ease-in-out duration-200 uppercase  border-2 px-8 backgroundLoginPoint:px-16 py-1 rounded-lg`}
          >
            {renderStatus()}
          </button>
        </div>
      </div>
    </>
  );
};

export default CardUserListAdmin;
