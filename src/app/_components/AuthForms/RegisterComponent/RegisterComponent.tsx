"use client";
import BackgroundLogin from "@/app/_components/AuthForms/BackgroundLogin/BackgroundLogin";
import ButtonLogin from "@/app/_components/AuthForms/ButtonLogin/ButtonLogin";
import { useEffect, useState } from "react";
import ButtonChangeLogin from "../ButtonChangeLogin/ButtonChangeLogin";
import FormLogin from "../FormLogin/FormLogin";
import FormRequestPasswordChange from "../FormRequestPasswordChange/FormRequestPasswordChange";
import FormChangePass from "../FormChangePass/FormChangePass";

type Props = {
  route: string;
};
const RegisterComponent = ({ route }: Props) => {
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

  const renderForm = () => {
    switch (pathName) {
      case "/login":
        return (
          <>
            <FormLogin>
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
  );
};

export default RegisterComponent;

// {isReplace ? (
//   <>
//     <FormLogin>
//       <ButtonLogin
//         buttonType="submit"
//         textButton={`${
//           isReplace ? "LOGAR" : "SOLICITAR NOVA SENHA"
//         }`}
//       />

//       <ButtonChangeLogin
//         click={() => {
//           setIsReplace(!isReplace);
//           history.pushState({ data: "exemplo" }, "", `/recover`);
//         }}
//         invertArrow={isReplace}
//         text={
//           isReplace ? "Recuperar Senha" : "Retornar para o login"
//         }
//       ></ButtonChangeLogin>
//     </FormLogin>
//   </>
// ) : (
//   <>
//     <FormRequestPasswordChange>
//       <ButtonLogin
//         buttonType="submit"
//         textButton={`${
//           isReplace ? "LOGAR" : "SOLICITAR NOVA SENHA"
//         }`}
//       />

//       <ButtonChangeLogin
//         click={() => {
//           setIsReplace(!isReplace);
//           history.pushState({ data: "exemplo" }, "", `/login`);
//         }}
//         invertArrow={isReplace}
//         text={
//           isReplace ? "Recuperar Senha" : "Retornar para o login"
//         }
//       ></ButtonChangeLogin>
//     </FormRequestPasswordChange>
//     {/* <InputLogin
//         data={{
//           name: "email",
//           type: "email",
//           placeholder: "Email",
//         }}
//       /> */}
//   </>
// )}
