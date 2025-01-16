import Link from "next/link";
import ButtonLogin from "../ButtonLogin/ButtonLogin";

type Props = {
  email: string;
};
const PopUpEmailNotify = ({ email }: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center py-20 px-8 sm:px-11 bg-white gap-8 rounded-lg shadow-lg">
        <h1 className="uppercase font-bold text-xl am:text-2xl">
          Verifique seu email
        </h1>
        <p className="text-center w-72 sm:w-96">
          Um email foi enviado para {email ? email : "Default"} com instruções
          para definir uma nova senha.
        </p>
        <Link href="/login">
          <ButtonLogin textButton="IR PARA O LOGIN"></ButtonLogin>
        </Link>
      </div>
    </div>
  );
};

export default PopUpEmailNotify;
