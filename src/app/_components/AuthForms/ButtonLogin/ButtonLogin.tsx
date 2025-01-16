"use client";
type Props = {
  textButton: string;
};

const ButtonLogin = ({ textButton }: Props) => {
  return (
    <button
      id="btnLogin"
      onMouseEnter={() => {
        const btn = document.querySelector("#btnLogin") as HTMLButtonElement;
        if (btn) {
          const decoration = btn.querySelector(
            "#decorationBtnLogin"
          ) as HTMLDivElement;
          const arrow = btn.querySelector("#btnArrow") as HTMLDivElement;
          const sizeDecoration = btn.querySelector(
            "#sizeDecoration"
          ) as HTMLDivElement;
          decoration.classList.remove("w-[0%]");
          decoration.classList.add("w-[15%]");
          sizeDecoration.classList.remove("w-[0%]");
          sizeDecoration.classList.add("w-[15%]");
          arrow.classList.remove("w-0");
          arrow.classList.remove("h-0");
          arrow.classList.remove("hidden");
          arrow.classList.add("w-4");
          arrow.classList.add("h-4");
          arrow.classList.add("visible");
        }
      }}
      onMouseLeave={() => {
        const btn = document.querySelector("#btnLogin") as HTMLButtonElement;
        if (btn) {
          const decoration = btn.querySelector(
            "#decorationBtnLogin"
          ) as HTMLDivElement;
          const arrow = btn.querySelector("#btnArrow") as HTMLDivElement;
          const sizeDecoration = btn.querySelector(
            "#sizeDecoration"
          ) as HTMLDivElement;
          decoration.classList.remove("w-[15%]");
          decoration.classList.add("w-[0%]");
          sizeDecoration.classList.remove("w-[15%]");
          sizeDecoration.classList.add("w-[0%]");
          arrow.classList.remove("w-4");
          arrow.classList.remove("h-4");
          arrow.classList.remove("visible");
          arrow.classList.add("w-0");
          arrow.classList.add("h-0");
          arrow.classList.add("hidden");
        }
      }}
      className="mt-11 relative  flex justify-between items-center bg-[var(--color-primary)] w-[var(--size-login-input)] text-white py-[.7rem]  rounded-lg shadow-md"
      type="submit"
    >
      <div className="font-bold flex-1">{textButton}</div>
      <div
        id="sizeDecoration"
        className="w-[0%] transition-all ease-in-out duration-200"
      ></div>
      <div
        id="decorationBtnLogin"
        className="bg-black/35 transition-all ease-in-out duration-200 flex justify-center items-center absolute w-[0%] h-12 rounded-r-lg shadow-lg right-0"
      >
        <div
          id="btnArrow"
          className="hidden rotate-[310deg] border-white border-b-4 border-r-4 w-4 h-4"
        ></div>
      </div>
    </button>
  );
};

export default ButtonLogin;
