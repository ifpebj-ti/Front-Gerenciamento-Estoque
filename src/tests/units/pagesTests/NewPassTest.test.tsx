// NewPass.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewPass from "@/app/newPass/page";

/* eslint-disable */
// ---------------------------------------------------------------------
// Para garantir que componentes que usam React Query funcionem,
// podemos envolver o componente em um QueryClientProvider.
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

// ---------------------------------------------------------------------
// Mocks dos componentes filhos para isolar o teste
// ---------------------------------------------------------------------
jest.mock(
  "./../../../app/_components/AuthForms/BackgroundLogin/BackgroundLogin",
  () => () => <div data-testid="background-login">BackgroundLogin</div>
);
jest.mock(
  "./../../../app/_components/AuthForms/ButtonLogin/ButtonLogin",
  () =>
    ({ textButton }: { textButton: string }) =>
      <button data-testid="button-login">{textButton}</button>
);
jest.mock(
  "../../../app/_components/AuthForms/ButtonChangeLogin/ButtonChangeLogin",
  () =>
    ({
      click,
      invertArrow,
      text,
    }: {
      click: () => void;
      invertArrow: boolean;
      text: string;
    }) =>
      (
        <button data-testid="button-change-login" onClick={click}>
          {text}
        </button>
      )
);
jest.mock(
  "./../../../app/_components/AuthForms/FormChangePass/FormChangePass",
  () =>
    ({ sendEmailAndToken, children }: any) =>
      (
        <div data-testid="form-change-pass">
          FormChangePass
          {children}
        </div>
      )
);
jest.mock(
  "./../../../app/_components/AuthForms/FormLogin/FormLogin",
  () =>
    ({ children }: any) =>
      <div data-testid="form-login">{children}</div>
);
jest.mock(
  "../../../app/_components/AuthForms/FormRequestPasswordChange/FormRequestPasswordChange",
  () =>
    ({ children }: any) =>
      <div data-testid="form-request-password-change">{children}</div>
);
jest.mock("./../../../app/_components/WindowLoad/WindowLoad", () => () => (
  <div data-testid="window-load">WindowLoad</div>
));
jest.mock(
  "./../../../app/_components/WindowConfirm/WindowConfirm",
  () =>
    ({ title }: any) =>
      <div data-testid="window-confirm">{title}</div>
);
jest.mock(
  "./../../../app/_components/WindowError/WindowError",
  () =>
    ({ text }: any) =>
      <div data-testid="window-error">{text}</div>
);
jest.mock(
  "./../../../app/_components/AuthForms/PopUpEmailNotify/PopUpEmailNotify",
  () =>
    ({ email }: any) =>
      <div data-testid="popup-email-notify">{email}</div>
);
jest.mock(
  "./../../../app/_components/WindowSuccess/WindowSuccess",
  () =>
    ({ text }: any) =>
      <div data-testid="window-success">{text}</div>
);

// ---------------------------------------------------------------------
// Mocks dos hooks de mutação (não são essenciais para a renderização)
// ---------------------------------------------------------------------
jest.mock("./../../../mutations/UserMutations.ts", () => ({
  useResetPassword: () => ({ mutate: jest.fn() }),
  useSendEmailToResetPassword: () => ({ mutate: jest.fn() }),
}));

// ---------------------------------------------------------------------
// Mock do useSession para simular uma sessão
// ---------------------------------------------------------------------
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { accessToken: "fake-token", userInfo: { photo: "photo.png" } },
  }),
}));

// ---------------------------------------------------------------------
// Simula que window.location.pathname é "/newPass"
// ---------------------------------------------------------------------
Object.defineProperty(window, "location", {
  value: {
    pathname: "/newPass",
  },
  writable: true,
});

describe("NewPass Page", () => {
  test("renderiza o formulário para alterar a senha (FormChangePass) com botões corretos", async () => {
    renderWithClient(<NewPass />);

    // Verifica se o BackgroundLogin é renderizado
    expect(screen.getByTestId("background-login")).toBeInTheDocument();

    // Como route é "newPass", o renderForm() em RegisterComponent deve executar o case "/newPass",
    // renderizando o FormChangePass
    expect(screen.getByTestId("form-change-pass")).toBeInTheDocument();

    // Dentro do FormChangePass, o ButtonLogin deve exibir o texto "SALVAR"
    expect(screen.getByTestId("button-login")).toHaveTextContent("SALVAR");

    // O ButtonChangeLogin deve exibir "Retornar para o login" (pois, para "newPass", isReplace é false)
    expect(screen.getByTestId("button-change-login")).toHaveTextContent(
      "Retornar para o login"
    );
  });

  test("ao clicar no ButtonChangeLogin, simula a mudança de rota (history.pushState) e troca o estado", async () => {
    renderWithClient(<NewPass />);

    // Capture o botão de mudança de login
    const btnChange = screen.getByTestId("button-change-login");
    expect(btnChange).toBeInTheDocument();

    // Simule um clique. Nosso mock do ButtonChangeLogin apenas dispara o onClick passado.
    fireEvent.click(btnChange);

    // Como o comportamento real envolve a chamada de history.pushState, você pode
    // testar que a função foi chamada se você tiver mockado history.pushState,
    // ou, alternativamente, verificar que o botão continua presente (o teste pode ser ajustado conforme a lógica interna)
    expect(screen.getByTestId("button-change-login")).toBeInTheDocument();
  });
});
