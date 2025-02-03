"use client";
type Props = {
  title: string;
  message?: string;
  sendClose: () => void;
  confirm: () => void;
};
const WindowConfirm = ({ title, message, sendClose, confirm }: Props) => {
  return (
    <div className="bg-black/50 fixed w-screen h-full z-40 top-0 right-0 flex justify-center items-center">
      <div className="mx-4 sm:mx-0 p-4 sm:p-8 justify-center items-center  bg-white flex flex-col gap-5 sm:gap-4 rounded-lg">
        <h1 className="font-bold text-lg sm:text-xl text-center">
          {title ? title : "Tem certeza?"}
        </h1>
        <p className="text-center text-sm text-red-700">
          {message ? message : ""}
        </p>
        <div className="flex gap-5 mt-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              sendClose();
            }}
            className="uppercase border-2 border-red-500 hover:bg-red-500 text-red-500 hover:text-white w-32 rounded-md py-1"
          >
            Cancelar
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              confirm();
              sendClose();
            }}
            className="uppercase border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white w-32 py-1 rounded-md "
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WindowConfirm;
