"use client";
import { useEffect, useState } from "react";
import Header from "../_components/Header/Header";
import FormAlterData from "../_components/Profile/FormAlterData";
import FormAlterPass from "../_components/Profile/FormAlterPass";
import { UserType } from "@/types/userType";
import WindowConfirm from "../_components/WindowConfirm/WindowConfirm";
import WindowLoad from "../_components/WindowLoad/WindowLoad";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [alterSession, setAlterSession] = useState(0);
  const [infoUser, setInfoUser] = useState<UserType>();

  useEffect(() => {
    (() => {
      setInfoUser({
        id: 1,
        avatar:
          "https://images-americanas.b2w.io/produtos/3312202621/imagens/boneco-eufrazino-looney-tunes-10cm-nj-croce/3312202621_1_xlarge.jpg",
        name: "João Almeida e Silva",
        email: "joao@example.com",
      });
    })();
  }, []);

  const renderSession = () => {
    switch (alterSession) {
      case 0:
        return (
          <FormAlterData data={infoUser as UserType} isEditMode={isEditMode}>
            <button
              onClick={() => {
                setIsEditMode(!isEditMode);
                if (isEditMode) {
                  window.location.reload();
                }
              }}
              className="text-nowrap flex-1 uppercase border-red-500 border-2 rounded-md px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all ease-in-out duration-200"
            >
              {isEditMode ? "cancelar" : "alterar dados pessoais"}
            </button>
            <button
              onClick={(e) => {
                if (!isEditMode) {
                  e.preventDefault();
                  setAlterSession(1);
                  setIsEditMode(!isEditMode);
                }
              }}
              className=" uppercase border-[var(--color-primary)] border-2  text-[var(--color-primary)] px-4 py-2 rounded-md flex-1 hover:bg-[var(--color-primary)] hover:text-white transition-all ease-in-out duration-200"
            >
              {isEditMode ? "Salvar" : "Alterar senha"}
            </button>
          </FormAlterData>
        );
      case 1:
        return (
          <FormAlterPass
            imageProfile={infoUser?.avatar as string}
            isEditMode={isEditMode}
          >
            <button
              onClick={() => {
                setIsEditMode(!isEditMode);
                if (isEditMode) {
                  window.location.reload();
                }
              }}
              className="text-nowrap flex-1 uppercase border-red-500 border-2 rounded-md px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all ease-in-out duration-200"
            >
              {isEditMode ? "cancelar" : "alterar dados pessoais"}
            </button>
            <button
              onClick={(e) => {
                if (!isEditMode) {
                  e.preventDefault();
                }
              }}
              className=" uppercase border-[var(--color-primary)] border-2  text-[var(--color-primary)] px-4 py-2 rounded-md flex-1 hover:bg-[var(--color-primary)] hover:text-white transition-all ease-in-out duration-200"
            >
              {isEditMode ? "Salvar" : "Alterar senha"}
            </button>
          </FormAlterPass>
        );
      default:
        return <div>Default</div>;
    }
  };
  return (
    <>
      {/* <WindowLoad></WindowLoad> */}
      <WindowConfirm
        title="Você deseja exluir esse usuario?"
        message="Ao excluir esse usuario todos os seus dados serao perdidos"
        sendClose={() => {}}
        confirm={() => {}}
      ></WindowConfirm>
      <Header></Header>
      <main className="shadow-lg max-w-[1100px] gap-8  w-full  px-8 py-16 flex flex-col justify-center items-center md:items-start mx-auto mt-8 mb-20 bg-white rounded-lg">
        <h1 className="uppercase text-2xl font-bold">
          {!isEditMode
            ? "Meus Dados"
            : alterSession == 0
            ? "Alterar dados pessoais"
            : "Editar Senha"}
        </h1>
        {renderSession()}
      </main>
    </>
  );
};

export default Profile;
