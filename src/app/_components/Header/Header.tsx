"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import { useSession } from "next-auth/react";
import WindowLoad from "../WindowLoad/WindowLoad";

const Header = () => {
  const { data: session } = useSession();

  const [route, setRoute] = useState("");
  useEffect(() => {
    (function () {
      if (typeof window !== "undefined") {
        setRoute(window.location.pathname);
      }
    })();
    return () => {};
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {session ? (
        <header className="bg-[var(--color-primary)] w-full h-[4rem] flex justify-between items-center px-2 sm:px-6 ">
          <div className="relative w-0 sm:w-48 block sm:hidden  md:hidden lg:block ">
            <div
              onClick={() => {
                setMenuOpen(!menuOpen);
                const menu = document.getElementById(
                  "options-menu"
                ) as HTMLDivElement;
                const line = document.getElementById(
                  "line-middle-menu"
                ) as HTMLDivElement;
                const lineTop = document.getElementById(
                  "line-top-menu"
                ) as HTMLDivElement;
                // menu?.classList.add("animationOpenMenu");
                if (menu.classList.contains("animationOpenMenu")) {
                  menu.classList.remove("animationOpenMenu");
                  menu.classList.add("animationCloseMenu");
                  line.classList.remove("w-6");
                  line.classList.add("w-9");
                  lineTop.classList.remove("w-4");
                  lineTop.classList.add("w-9");
                } else {
                  menu.classList.remove("animationCloseMenu");
                  menu.classList.add("animationOpenMenu");
                  line.classList.remove("w-9");
                  line.classList.add("w-6");
                  lineTop.classList.remove("w-9");
                  lineTop.classList.add("w-4");
                }
              }}
              className="sm:hidden flex justify-center items-center cursor-pointer flex-col gap-2 hover:scale-105 transition-all ease-in-out  px-8 py-4"
            >
              <div
                id="line-top-menu"
                className="transition-all ease-in-out duration-200 w-9 border-b-4 border-white rounded-md"
              ></div>
              <div
                id="line-middle-menu"
                className="transition-all ease-in-out duration-200  w-9 border-b-4 border-white rounded-md"
              ></div>
              <div className="w-9 border-b-4 border-white rounded-md"></div>
            </div>
            <div
              id="options-menu"
              className="z-20 rounded-md transition-all ease-in-out duration-200 bg-white top-14 shadow-md absolute -left-[500px]  p-2"
            >
              <ul className="flex flex-col  gap-1 text-sm">
                <li className="border-b-[1px] border-slate-700 inline-flex w-full ">
                  <Link
                    className="uppercase  w-full text-center p-1"
                    href={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li className="border-b-[1px] border-slate-700  inline-flex w-full ">
                  <Link
                    className="uppercase  w-full text-center p-1"
                    href={"/stock"}
                  >
                    Estoque
                  </Link>
                </li>
                {session.userInfo.roles &&
                  session?.userInfo.roles.find(
                    (role) => role.authority === "ROLE_ADMIN"
                  ) && (
                    <li className=" inline-flex w-full ">
                      <Link
                        className="uppercase  w-full text-center p-1"
                        href={"/admin"}
                      >
                        Administração
                      </Link>
                    </li>
                  )}
              </ul>
            </div>
          </div>
          <nav>
            <ul className=" hidden sm:flex gap-2">
              <li>
                <Link
                  className={`${
                    route === "/home" || route === "/"
                      ? "font-extrabold text-white"
                      : "font-normal text-white/80 hover:scale-105"
                  } transition-all ease-in-out duration-200 hover:text-white  p-4 inline-flex justify-center items-center uppercase`}
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    route === "/stock"
                      ? "font-extrabold text-white"
                      : "font-normal text-white/80 hover:scale-105"
                  } transition-all ease-in-out duration-200 hover:text-white p-4 inline-flex justify-center items-center uppercase`}
                  href={"/stock"}
                >
                  Estoque
                </Link>
              </li>
              {session.userInfo.roles &&
                session?.userInfo.roles.find(
                  (role) => role.authority === "ROLE_ADMIN"
                ) && (
                  <li>
                    <Link
                      className={`${
                        route === "/admin"
                          ? "font-extrabold text-white"
                          : "font-normal text-white/80 hover:scale-105"
                      } transition-all ease-in-out duration-200 hover:text-white p-4 inline-flex justify-center items-center uppercase`}
                      href={"/admin"}
                    >
                      Administração
                    </Link>
                  </li>
                )}
            </ul>
          </nav>
          <ProfileCard
            data={{
              name: `${session?.userInfo.name || ""}`,
              avatar: "",
              email: `${session?.userInfo.email || ""}`,
            }}
          ></ProfileCard>
        </header>
      ) : (
        <WindowLoad></WindowLoad>
      )}
    </>
  );
};
export default Header;
