"use client";
import { useState } from "react";
import Header from "../_components/Header/Header";
import FormAlterPass from "../_components/Profile/FormAlterPass";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <Header></Header>
      <main className="shadow-lg max-w-[1100px] gap-8  w-full  px-8 py-16 flex flex-col justify-center items-center md:items-start mx-auto mt-8 mb-20 bg-white rounded-lg">
        <h1 className="uppercase text-2xl font-bold">
          {isEditMode && "Editar Senha"}
        </h1>
        <FormAlterPass
          sendClose={() => {
            setIsEditMode(!isEditMode);
          }}
          imageProfile={`${session?.userInfo.photo}` || ""}
          isEditMode={isEditMode}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditMode(!isEditMode);
              if (isEditMode) {
                window.location.reload();
              }
            }}
            className="text-nowrap flex-1 uppercase border-red-500 border-2 rounded-md px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all ease-in-out duration-200"
          >
            {isEditMode ? "cancelar" : "alterar senha e foto do perfil"}
          </button>
          {isEditMode && (
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
          )}
        </FormAlterPass>
      </main>
    </>
  );
};

export default Profile;
// cNpw@5cNpw
