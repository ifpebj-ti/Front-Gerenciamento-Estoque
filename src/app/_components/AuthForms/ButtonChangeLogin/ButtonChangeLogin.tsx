"use client";
type Props = {
  click: () => void;
  text: string;
  invertArrow: boolean;
};
const ButtonChangeLogin = ({ click, text, invertArrow }: Props) => {
  return (
    <button
      id="changeButtonLogin"
      onMouseEnter={() => {
        const btn = document.querySelector(
          "#changeButtonLogin"
        ) as HTMLButtonElement;
        btn.classList.add("animationButtonChangeLogin");
        const svg = btn?.querySelector("svg") as HTMLElement | null;
        if (svg) {
          svg.classList.remove("stroke-black");
          svg.classList.add("stroke-[#417AFC]");
        }
      }}
      onMouseLeave={() => {
        const btn = document.querySelector(
          "#changeButtonLogin"
        ) as HTMLButtonElement;
        btn.classList.remove("animationButtonChangeLogin");
        const svg = btn?.querySelector("svg") as HTMLElement | null;
        if (svg) {
          svg.classList.remove("stroke-[#417AFC]");
          svg.classList.add("stroke-black");
        }
      }}
      className={`transition-all ease-linear duration-200 hover:text-[#417AFC] underline backgroundLoginPoint:no-underline flex ${
        invertArrow ? "" : "flex-row-reverse"
      } justify-center items-center gap-1 mt-4`}
      onClick={(e) => {
        e.preventDefault();
        click();
      }}
    >
      <svg
        className={`stroke-black transition-all ease-linear duration-200 ${
          invertArrow ? "" : "rotate-180"
        } hidden backgroundLoginPoint:block`}
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M11 9L8 12M8 12L11 15M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      {(text && text.trim()) || "Default"}
    </button>
  );
};

export default ButtonChangeLogin;
