import ViewValueProduct from "./ViewValueProduct";

type Props = {
  close: () => void;
  data: {
    image: string | null;
    title: string;
    unit_price: string;
    stock_value: string;
    quantity: number;
    description: string;
  };
};
const ViewProduct = ({ close, data }: Props) => {
  return (
    <div className=" z-40 w-full backgroundLoginPoint:h-[100vh] py-8  flex justify-center  items-center  absolute left-0 top-0 ">
      <div className="bg-white w-[95%] rounded-lg  p-8  shadow-2xl flex flex-col  gap-4">
        <div
          onClick={() => {
            close();
          }}
          className=" inline-flex p-2 w-40 justify-start font-bold items-center gap-3 hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer"
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
              <ViewValueProduct
                data={{
                  title: "Valor unitário",
                  price: data.unit_price,
                  isMoney: true,
                }}
              ></ViewValueProduct>
              <ViewValueProduct
                data={{
                  title: "Valor estoque",
                  price: data.stock_value,
                  isMoney: true,
                }}
              ></ViewValueProduct>
              <ViewValueProduct
                data={{
                  title: "Quantidade",
                  price: data.quantity,
                  isMoney: false,
                }}
              ></ViewValueProduct>
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
    </div>
  );
};

export default ViewProduct;
