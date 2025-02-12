"use client";
import BackgroundLogin from "@/app/_components/AuthForms/BackgroundLogin/BackgroundLogin";
import ButtonLogin from "@/app/_components/AuthForms/ButtonLogin/ButtonLogin";
import { useEffect, useState } from "react";
import ButtonChangeLogin from "../ButtonChangeLogin/ButtonChangeLogin";
import FormLogin from "../FormLogin/FormLogin";
import FormRequestPasswordChange from "../FormRequestPasswordChange/FormRequestPasswordChange";
import FormChangePass from "../FormChangePass/FormChangePass";
import WindowIncorrectlyPass from "../FormLogin/WindowIncorrectlyPass";
import WindowLoad from "../../WindowLoad/WindowLoad";
import WindowConfirm from "../../WindowConfirm/WindowConfirm";
import {
  useResetPassword,
  useSendEmailToResetPassword,
} from "@/mutations/UserMutations";
import WindowError from "../../WindowError/WindowError";
import PopUpEmailNotify from "../PopUpEmailNotify/PopUpEmailNotify";
import WindowSuccess from "../../WindowSuccess/WindowSuccess";

type Props = {
  route: string;
};
const RegisterComponent = ({ route }: Props) => {
  const [errorPassOrEmail, setErrorPassOrEmail] = useState<boolean>(false);
  const [emailToSendToResetPass, setEmailToSendToResetPass] =
    useState<string>("");
  const [windowConfirmSendEmail, setWindowConfirmSendEmail] = useState(false);
  const [windowConfirmResetPass, setWindowConfirmResetPass] = useState(false);
  const [showWindowSuccessResetPass, setShowWindowSuccessResetPass] =
    useState(false);
  const [newPassword, setNewPassword] = useState<{
    token: string;
    newPassword: string;
  }>({
    token: "",
    newPassword: "",
  });
  const [showWindowError, setShowWindowError] = useState({
    show: false,
    message: "",
  });
  const [showWindowSuccess, setShowWindowSuccess] = useState(false);
  const useSendEmail = useSendEmailToResetPassword();
  const resetPassword = useResetPassword();
  /* eslint-disable */
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(false);
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

  const receiverEmail = (email: string) => {
    setEmailToSendToResetPass(email);
    setWindowConfirmSendEmail(true);
  };

  const receiverTokenAndNewPass = (token: string, newPass: string) => {
    setNewPassword({ token: token, newPassword: newPass });
    setWindowConfirmResetPass(true);
  };

  const renderForm = () => {
    switch (pathName) {
      case "/login":
        return (
          <>
            <FormLogin
              sendLoading={() => {
                setIsLoading(true);
              }}
              sendErrorPassOrEmail={handleSendErrorPassOrEmail}
            >
              <ButtonLogin
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
            <FormRequestPasswordChange sendEmail={receiverEmail}>
              <ButtonLogin textButton="SOLICITAR NOVA SENHA" />

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
            <FormChangePass sendEmailAndToken={receiverTokenAndNewPass}>
              <ButtonLogin textButton="SALVAR" />

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
      {showWindowSuccessResetPass && (
        <WindowSuccess
          text="Senha alterada com sucesso!"
          sendClose={() => setShowWindowSuccessResetPass(false)}
        ></WindowSuccess>
      )}
      {isLoading && <WindowLoad />}
      {errorPassOrEmail && <WindowIncorrectlyPass />}
      {showWindowError.show && (
        <WindowError
          text={showWindowError.message}
          sendClose={() => {
            setShowWindowError({ show: false, message: "" });
          }}
        />
      )}
      {showWindowSuccess && (
        <div className="w-full h-full flex justify-center items-center absolute bg-black/50 z-20">
          <PopUpEmailNotify email={emailToSendToResetPass}></PopUpEmailNotify>
        </div>
      )}
      {windowConfirmResetPass && (
        <WindowConfirm
          sendClose={() => setWindowConfirmResetPass(false)}
          title="Tem certeza que deseja salvar a nova senha?"
          confirm={() => {
            setIsLoading(true);
            resetPassword.mutate(
              {
                token: newPassword.token,
                newPassword: newPassword.newPassword,
              },
              {
                onSuccess: () => {
                  setShowWindowSuccessResetPass(true);
                },
                onError: (error: any) => {
                  setShowWindowError({
                    show: true,
                    message: error.message,
                  });
                },
              }
            );

            setIsLoading(false);
            setShowWindowError({
              show: false,
              message: "",
            });
            setWindowConfirmResetPass(false);
          }}
        ></WindowConfirm>
      )}
      {windowConfirmSendEmail && (
        <WindowConfirm
          title="Você tem certeza que deseja recuperar a senha?"
          sendClose={() => {
            setWindowConfirmSendEmail(false);
          }}
          confirm={() => {
            useSendEmail.mutate(
              { email: emailToSendToResetPass },
              {
                onSuccess: () => {
                  setShowWindowSuccess(true);
                },
                onError: (error: any) => {
                  setShowWindowError({
                    show: true,
                    message: error.message,
                  });
                },
              }
            );
            setShowWindowError({
              show: false,
              message: "",
            });
            setWindowConfirmSendEmail(false);
          }}
        ></WindowConfirm>
      )}
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
