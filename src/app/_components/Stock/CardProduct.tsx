import Image from "next/image";

type Props = {
  data: {
    imageUrl: string;
    title: string;

    disponible: boolean;
  };
  click: () => void;
};

const CardProduct = ({ data, click }: Props) => {
  return (
    <div
      onClick={() => {
        click();
      }}
      className="hover:scale-105 transtion-all ease-in-out duration-200 cursor-pointer flex flex-col shadow-lg h-72 w-64 bg-white rounded-lg"
    >
      <Image
        className="shadow-sm border-[1px] border-slate-100 rounded-t-lg"
        src={data.imageUrl}
        alt="Imagem do produto"
        objectFit="fill"
        width={300}
        height={100}
      ></Image>
      <div className="flex flex-col px-4 w-full gap-2 h-full justify-center">
        <h1 className="font-bold w-[20ch]  h-12 overflow-y-clip">
          {data.title}
        </h1>
        <span
          className={` ${
            data.disponible ? "text-[var(--color-primary)]" : "text-red-500"
          }  font-bold text-xl`}
        >
          {data.disponible ? "Disponível" : "Indisponível"}
        </span>
      </div>
    </div>
  );
};

export default CardProduct;
