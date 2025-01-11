import FormAlterData from "../Profile/FormAlterData";
import { UserInfoType } from "@/types/userType";
import FormAlterPass from "../Profile/FormAlterPass";

type Props = {
  sendClose: () => void;
  data?: UserInfoType | null;
  isAddUser?: boolean;
  isRefetch?: () => void;
};

const WindowAddNewUser = ({ sendClose, data, isAddUser, isRefetch }: Props) => {
  return (
    <>
      <main className="shadow-lg max-w-[1100px] gap-8  w-full  px-8 py-16 flex flex-col justify-center items-center md:items-start mx-auto mt-8 mb-20 bg-white rounded-lg">
        <h1 className="uppercase text-2xl font-bold text-md text-center sm:text-start ">
          {isAddUser ? "Adicionar Novo Usuário" : "Editar Usuário"}
        </h1>
        {isAddUser ? (
          <FormAlterData
            isRefetch={isRefetch}
            sendClose={sendClose}
            data={{
              // avatar: data?.avatar || "",
              email: data?.email || "",
              id: data?.id || 0,
              name: data?.name || "",
              status: data?.status || false,
              roles: data?.roles || [],
              first_acess: data?.first_acess || false,
              photo: data?.photo || null,
            }}
            isEditMode={true}
            isRegister={isAddUser ? true : false}
          >
            <button
              onClick={() => {
                sendClose();
              }}
              className="text-nowrap flex-1 uppercase border-red-500 border-2 rounded-md px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all ease-in-out duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className=" uppercase border-[var(--color-primary)] border-2  text-[var(--color-primary)] px-4 py-2 rounded-md flex-1 hover:bg-[var(--color-primary)] hover:text-white transition-all ease-in-out duration-200"
            >
              Salvar
            </button>
          </FormAlterData>
        ) : (
          <FormAlterPass
            sendClose={sendClose}
            isRefetch={isRefetch}
            email={data?.email || ""}
            imageProfile={data?.photo ? data.photo : ""}
            isEditMode={true}
          >
            <button
              onClick={() => {
                sendClose();
              }}
              className="text-nowrap flex-1 uppercase border-red-500 border-2 rounded-md px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all ease-in-out duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className=" uppercase border-[var(--color-primary)] border-2  text-[var(--color-primary)] px-4 py-2 rounded-md flex-1 hover:bg-[var(--color-primary)] hover:text-white transition-all ease-in-out duration-200"
            >
              Salvar
            </button>
          </FormAlterPass>
        )}
      </main>
    </>
  );
};

export default WindowAddNewUser;
