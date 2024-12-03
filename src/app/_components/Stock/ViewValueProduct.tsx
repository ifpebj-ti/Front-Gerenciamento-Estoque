"use client";
import formatMoney from "../../../utils/moneyFormat";
type Props = {
  data: {
    title: string;
    price: string | number;
    isMoney: boolean;
    sizeText?: string;
    gap?: string;
  };
};

const ViewValueProduct = ({ data }: Props) => {
  const valueFormatted = formatMoney(`${data.price}`);
  return (
    <div
      className={`${
        data.sizeText ? "text-md" : ""
      } text-slate-400 flex flex-col ${
        data.gap ? data.gap : "gap-2"
      } border-slate-200`}
    >
      <span className="uppercase">{data.title}</span>
      <span className="text-slate-400 flex items-start">
        {data.isMoney ? "R$ " : ""}
        <strong
          className={`${
            data.sizeText ? data.sizeText : "text-2xl"
          }  text-[var(--color-primary)]`}
        >
          {data.isMoney ? valueFormatted.replace("R$", "") : data.price}
        </strong>
      </span>
    </div>
  );
};

export default ViewValueProduct;
