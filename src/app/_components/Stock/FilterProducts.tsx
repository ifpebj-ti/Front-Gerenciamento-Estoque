"use client";
type Props = {
  sendName: (name: string) => void;
  sendCategory: (category: string) => void;
};
const FilterProducts = ({ sendName, sendCategory }: Props) => {
  return (
    <form className=" flex flex-col md:flex-row sm:w-[500px] md:w-[700px] gap-5 shadow-lg rounded-lg bg-white backgroundLoginPoint:w-full py-4 px-8 justify-between items-center">
      <label className="border-b-2 border-slate-300 bg-transparent w-full inline-flex justify-between">
        <input
          onChange={(e) => {
            sendName(e.target.value);
          }}
          className="placeholder:text-slate-400 px-2 w-full focus:outline-none focus:font-bold"
          type="text"
          name=""
          id=""
          placeholder="Nome do produto"
        />
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.0792 8C15.0792 11.2787 12.3607 14 8.92849 14C5.49623 14 2.77783 11.2787 2.77783 8C2.77783 4.72131 5.49623 2 8.92849 2C12.3607 2 15.0792 4.72131 15.0792 8ZM13.8686 14.3637C12.4979 15.3903 10.7858 16 8.92849 16C4.42701 16 0.777832 12.4183 0.777832 8C0.777832 3.58172 4.42701 0 8.92849 0C13.43 0 17.0792 3.58172 17.0792 8C17.0792 9.88002 16.4184 11.6086 15.3125 12.9742L19.8791 18.3528C20.2365 18.7738 20.185 19.4049 19.764 19.7623C19.343 20.1198 18.7119 20.0682 18.3545 19.6472L13.8686 14.3637Z"
            fill="#9E9E9E"
          />
        </svg>
      </label>

      <select
        onChange={(e) => {
          sendCategory(e.target.value);
        }}
        className="bg-transparent border-b-2 text-slate-400 w-full py-1 focus:outline-none focus:font-bold"
        name=""
        id=""
      >
        <option value="default" selected disabled>
          Selecione uma categoria
        </option>
        <option value="1">Qualquer coisa</option>
      </select>
      <button
        className="font-extrabold text-nowrap uppercase px-9 py-1 text-slate-400 border-[1px] border-slate-300 rounded-md hover:scale-105 transition-all duration-200 hover:text-black hover:border-black md:w-[500px]"
        type="reset"
      >
        Limpar filtro
      </button>
    </form>
  );
};

export default FilterProducts;
