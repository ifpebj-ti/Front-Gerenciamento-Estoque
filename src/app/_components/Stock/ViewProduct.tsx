import Image from "next/image";
type Props = {
  close: () => void;
  data: {
    image: string;
    title: string;
    unit_price: string;
    stock_value: string;
    quantity: number;
    description: string;
  };
};
const ViewProduct = ({ close, data }: Props) => {
  return (
    <div className="z-40 rounded-lg shadow-2xl flex flex-col  gap-4 absolute bg-white w-full  p-8">
      <div
        onClick={() => {
          close();
        }}
        className="inline-flex p-2 w-40 justify-start font-bold items-center gap-3 hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer"
      >
        <div className="border-b-2 border-r-2 border-blue-700 w-3 h-3 rotate-[130deg]"></div>
        VOLTAR
      </div>
      <div className="flex backgroundLoginPoint:flex-row flex-col items-center backgroundLoginPoint:items-stretch gap-10">
        <div className="flex flex-col gap-4">
          <div
            style={{
              backgroundImage: `url(${
                data.image ? data.image : "https://placehold.co/600x400"
              })`,
            }}
            className="w-[18rem] h-[18rem] sm:w-[30rem] sm:h-[30rem] object-contain bg-contain bg-center border-[1px] border-slate-300 rounded-lg bg-no-repeat"
          ></div>
          <h1 className="w-[30ch] font-bold text-md sm:text-2xl">
            {data.title}
          </h1>
          <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 ">
            <div className="text-slate-400 flex flex-col gap-2 border-slate-200">
              VALOR UNITÁRIO
              <span className="text-slate-400 flex items-start">
                R$
                <strong className="text-2xl text-[var(--color-primary)]">
                  {data.unit_price}
                </strong>
              </span>
            </div>
            <div className="text-slate-400 flex flex-col gap-2">
              VALOR ESTOQUE
              <span className="text-slate-400 flex items-start">
                R$
                <strong className="text-2xl text-[var(--color-primary)]">
                  {data.stock_value}
                </strong>
              </span>
            </div>
            <div className="text-slate-400 flex flex-col gap-2">
              QUANTIDADE
              <span className="text-slate-400 flex items-start">
                <strong className="text-2xl text-[var(--color-primary)]">
                  {data.quantity}
                </strong>
              </span>
            </div>
          </div>
        </div>
        <div className="border-[1px] rounded-lg border-slate-300 h-[90%] w-full flex flex-col p-4">
          <h2 className="text-lg font-bold text-slate-400">
            Descrição do Produto
          </h2>
          <p className="text-sm text-slate-600 text-justify mt-4">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
