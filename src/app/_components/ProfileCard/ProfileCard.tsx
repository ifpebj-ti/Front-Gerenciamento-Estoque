"use client";
import Image from "next/image";
import iconAvatar from "./../../../../public/assets/imgs/avatar.svg";
import iconDownOrUp from "./../../../../public/assets/icons/icon-down-or-up-card-profile.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  data: {
    name: string;
    avatar: string;
    email: string;
  };
};
const ProfileCard = ({ data }: Props) => {
  const [widthScreen, setWidthScreen] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthScreen(window.innerWidth);
      console.log(data.avatar);
    }
  }, [data]);

  const openProfileMenu = () => {
    const profile = document.getElementById("profile-card") as HTMLDivElement;
    const icon = profile.querySelector("#profile-icon");
    const options = profile.querySelector("#options");
    if (icon?.classList.contains("rotate-180")) {
      icon?.classList.remove("rotate-180");
      options?.classList.remove("py-2");
      options?.classList.add("py-0");
      options?.classList.remove("flex");
      options?.classList.add("hidden");
    } else {
      icon?.classList.add("rotate-180");
      options?.classList.remove("py-0");
      options?.classList.add("py-2");
      options?.classList.remove("hidden");
      options?.classList.add("flex");
    }
  };

  return (
    <div
      onClick={() => {
        if (widthScreen <= 768) {
          openProfileMenu();
        }
      }}
      onMouseEnter={() => {
        if (widthScreen >= 768) {
          openProfileMenu();
        }
      }}
      onMouseLeave={() => {
        if (widthScreen >= 768) {
          openProfileMenu();
        }
      }}
      id="profile-card"
      className="z-20 flex rounded-full hover:rounded-b-none  sm:rounded-md bg-white p-2 sm:p-0 sm:w-48 sm:h-12 justify-center items-center gap-2 cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 relative"
    >
      <Image
        className="object-cover bg-slate-400 rounded-full w-9 h-9 text-sm"
        src={`${
          data.avatar !== ""
            ? "data:image/png;base64," + data.avatar
            : "https://placehold.co/600x400"
        }`}
        alt="foto"
        width={10}
        height={10}
      ></Image>
      <span className="hidden sm:block text-[var(--color-primary)] font-extrabold first-letter:uppercase">
        {data.name.length >= 12 ? data.name.slice(0, 12) + "..." : data.name}
      </span>
      <Image
        id="profile-icon"
        className={`hidden sm:block transition-all ease-in-out duration-300`}
        src={iconDownOrUp}
        alt="Ícone para abrir ou fechar header"
      ></Image>
      <div
        id="options"
        className="text-sm flex-col gap-1 items-center transtion-all ease-in-out duration-300  hidden absolute w-48 bg-white shadow-md p-0 top-[3.2rem] right-0 sm:top-[3rem] sm:rounded-b-md rounded-b-md rounded-tl-md sm:rounded-tl-none"
      >
        <span className="cursor-default font-bold">
          {data.email.length > 19
            ? data.email.slice(0, 19) + "..."
            : data.email}
        </span>
        <div className="cursor-default border-b-[0.5px] w-[90%] border-black"></div>
        <ul className="flex flex-col">
          <li className="w-full inline-flex">
            <Link
              className=" p-2  w-full hover:scale-105 transition-all ease-in-out duration-200 hover:font-bold"
              href="/profile"
            >
              Configurações da conta
            </Link>
          </li>
          <li className="w-full inline-flex">
            <Link
              className=" p-2 w-full  text-center hover:scale-105 transition-all ease-in-out duration-200 hover:font-bold"
              href="/logout"
            >
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
