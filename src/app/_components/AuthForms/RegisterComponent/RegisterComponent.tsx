"use client";
import BackgroundLogin from "@/app/_components/AuthForms/BackgroundLogin/BackgroundLogin";
import ButtonLogin from "@/app/_components/AuthForms/ButtonLogin/ButtonLogin";
import { useEffect, useState } from "react";
import ButtonChangeLogin from "../ButtonChangeLogin/ButtonChangeLogin";
import FormLogin from "../FormLogin/FormLogin";
import FormRequestPasswordChange from "../FormRequestPasswordChange/FormRequestPasswordChange";
import FormChangePass from "../FormChangePass/FormChangePass";
import WindowIncorrectlyPass from "../FormLogin/WindowIncorrectlyPass";

type Props = {
  route: string;
};
const RegisterComponent = ({ route }: Props) => {
  const [errorPassOrEmail, setErrorPassOrEmail] = useState<boolean>(false);
  /* eslint-disable */
  const [count, setCount] = useState(5);
  const [isReplace, setIsReplace] = useState<boolean>(() => {
    switch (route) {
      case "login":
        return true;
      case "recover":
        return false;
      case "newPass":
        return false;
      default:
        return true;
    }
  });

  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathName(window.location.pathname);
    }
  }, [isReplace]);

  const handleSendErrorPassOrEmail = () => {
    setErrorPassOrEmail(true);
    setCount(5);
    // Inicia o timer para decrementar
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer); // Limpa o intervalo quando chegar a zero
          setErrorPassOrEmail(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000); // Executa a cada 1 segundo
  };

  const renderForm = () => {
    switch (pathName) {
      case "/login":
        return (
          <>
            <FormLogin
              sendLoading={() => {}}
              sendErrorPassOrEmail={handleSendErrorPassOrEmail}
            >
              <ButtonLogin
                buttonType="submit"
                textButton={`${isReplace ? "LOGAR" : "SOLICITAR NOVA SENHA"}`}
              />

              <ButtonChangeLogin
                click={() => {
                  setIsReplace(!isReplace);
                  history.pushState({ data: "exemplo" }, "", `/recover`);
                }}
                invertArrow={isReplace}
                text={isReplace ? "Recuperar Senha" : "Retornar para o login"}
              ></ButtonChangeLogin>
            </FormLogin>
          </>
        );
      case "/recover":
        return (
          <>
            <FormRequestPasswordChange>
              <ButtonLogin
                buttonType="submit"
                textButton="SOLICITAR NOVA SENHA"
              />

              <ButtonChangeLogin
                click={() => {
                  setIsReplace(!isReplace);
                  history.pushState({ data: "exemplo" }, "", `/login`);
                }}
                invertArrow={isReplace}
                text={isReplace ? "Recuperar Senha" : "Retornar para o login"}
              ></ButtonChangeLogin>
            </FormRequestPasswordChange>
          </>
        );
      case "/newPass":
        return (
          <>
            <FormChangePass>
              <ButtonLogin buttonType="submit" textButton="SALVAR" />

              <ButtonChangeLogin
                click={() => {
                  setIsReplace(!isReplace);
                  history.pushState({ data: "exemplo" }, "", `/login`);
                }}
                invertArrow={isReplace}
                text={isReplace ? "Recuperar Senha" : "Retornar para o login"}
              ></ButtonChangeLogin>
            </FormChangePass>
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      {errorPassOrEmail && <WindowIncorrectlyPass />}
      <main className="flex justify-center items-center w-full">
        <section
          className={` flex transition-all ease-linear duration-500  gap-11 h-screen justify-center w-full  sm:w-[1144px] items-center `}
        >
          <div
            className={`translate-x-0 hidden backgroundLoginPoint:block transition-transform duration-500 ease-in-out  ${
              isReplace ? "translate-x-0" : "translate-x-[35rem] "
            } `}
          >
            <BackgroundLogin />
          </div>

          <div
            id="translateLoginForm"
            className={` -translate-x-0 ${
              isReplace
                ? "-translate-x-0"
                : "backgroundLoginPoint:-translate-x-[38rem]"
            } flex justify-center items-center relative w-[33rem] transition-all duration-500 ease-in-out`}
          >
            <div
              id="loginForm"
              className="sm:bg-white sm:w-[30rem] py-20 rounded-2xl sm:shadow-lg flex justify-center items-center"
            >
              {renderForm()}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterComponent;
