"use client";

import { UserInfoType } from "@/types/userType";
import base64ToBlob from "@/utils/convertImage";

type Props = {
  data: UserInfoType;
  sendOpenEditWindow: () => void;
};
const CardUserListAdmin = ({ data, sendOpenEditWindow }: Props) => {
  return (
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
          <span className="text-sm font-bold uppercase text-center lg:text-start">
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
          className="text-sm sm:text-md hover:scale-110 hover:bg-slate-400 hover:text-white transition-all ease-in-out duration-200 uppercase text-slate-400 border-slate-400 border-2 px-8 backgroundLoginPoint:px-16 py-1 rounded-lg"
        >
          editar
        </button>
        <button className="text-sm sm:text-md hover:scale-110 hover:bg-red-700 hover:text-white transition-all ease-in-out duration-200 uppercase text-red-700 border-red-700 border-2 px-8 backgroundLoginPoint:px-16 py-1 rounded-lg">
          desativar
        </button>
      </div>
    </div>
  );
};

export default CardUserListAdmin;
