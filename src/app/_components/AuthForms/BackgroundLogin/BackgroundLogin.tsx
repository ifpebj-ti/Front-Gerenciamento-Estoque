import Image from "next/image";
import BgImage from "./../../../../../public/assets/imgs/bg-image-login.svg";

const BackgroundLogin = () => {
  return (
    <div className="hidden backgroundLoginPoint:flex h-[38rem] w-[33rem] flex-col justify-start items-center  relative">
      <div id="titleBackground" className="w-full">
        <h1
          style={{ lineHeight: 1.1 }}
          className="text-[3rem] font-bold w-[20ch] "
        >
          Gerenciador de Estoque e Pedidos
        </h1>
      </div>
      <div id="subtitleBackground" className="w-full">
        <p className="text-lg text-[var(--text-color-secondary)] my-6">
          Agilidade e precisão no seu estoque e pedidos
        </p>
      </div>
      <div id="imageBackground">
        <Image width={420} src={BgImage} alt="Imagem da tela de login"></Image>
      </div>
    </div>
  );
};

export default BackgroundLogin;
