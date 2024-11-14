import Image from "next/image";
import Header from "../_components/Header/Header";
import bgHome from "./../../../public/assets/imgs/bg-banner-home.svg";
import ButtonLogin from "../_components/AuthForms/ButtonLogin/ButtonLogin";
const MainHome = () => {
  return (
    <>
      <Header></Header>
      <main className=" w-full h-full flex justify-center items-center px-6  ">
        <section className="shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl flex justify-center items-center BannerHomePoint:w-full py-8 BannerHomePoint:py-16 flex-col-reverse BannerHomePoint:flex-row BannerHomePoint:px-20 mb-8  mt-16">
          <div className=" h-96 flex flex-col justify-start items-start py-4 BannerHomePoint:flex-1 relative  px-4 backgroundLoginPoint:px-0">
            <div
              id="titleHomeBackground"
              className="inline-flex justify-center items-center backgroundLoginPoint:inline-block w-full"
            >
              <h1
                style={{ lineHeight: 1.3 }}
                className="text-[1.5rem] sm:text-[2.5rem]  text-center BannerHomePoint:text-start BannerHomePoint:text-[3.5rem] font-bold w-[20ch] "
              >
                Busque seus produtos dentro do estoque
              </h1>
            </div>
            <div
              id="subtitleHomeBackground"
              className="text-center backgroundLoginPoint:text-start w-full"
            >
              <p className="text-sm sm:text-lg text-[var(--text-color-secondary)] my-6 text-center BannerHomePoint:text-start">
                Estoque e pedidos sob controle, gestão sem esforço
              </p>
            </div>
            <div
              className="mt-4 sm:mt-11 w-full inline-flex justify-center items-center BannerHomePoint:inline-block"
              id="buttonHomeBackground"
            >
              <ButtonLogin
                buttonType="submit"
                textButton="REALIZE SUA BUSCA"
              ></ButtonLogin>
            </div>
          </div>
          <div className="relative BannerHomePoint:flex-1 BannerHomePoint:w-96 BannerHomePoint:h-[30rem] ">
            <Image
              id="imageHomeBackground"
              src={bgHome}
              alt="Imagem Banner pagina inicial"
            ></Image>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainHome;
