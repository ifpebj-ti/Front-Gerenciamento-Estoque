import { render, screen } from "@testing-library/react";
import PopUpEmailNotify from "./../../../app/_components/AuthForms/PopUpEmailNotify/PopUpEmailNotify";
import "@testing-library/jest-dom"; // Para matchers como `toBeInTheDocument`

// Mock do `next/router` para testes de navegação
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("PopUpEmailNotify", () => {
  it("should render correctly with the provided email", () => {
    // Renderiza o componente com um e-mail fornecido
    render(<PopUpEmailNotify email="test@example.com" />);

    // Verifica se o título aparece corretamente
    expect(
      screen.getByRole("heading", { name: /verifique seu email/i })
    ).toBeInTheDocument();

    // Verifica se a mensagem de e-mail é renderizada corretamente
    expect(
      screen.getByText(
        /um email foi enviado para test@example.com com instruções para definir uma nova senha/i
      )
    ).toBeInTheDocument();

    // Verifica se o botão está presente
    expect(
      screen.getByRole("button", { name: /ir para o login/i })
    ).toBeInTheDocument();
  });

  it("should render default email message when no email is provided", () => {
    // Renderiza o componente sem fornecer um e-mail
    render(<PopUpEmailNotify email="" />);

    // Verifica se a mensagem padrão é exibida
    expect(
      screen.getByText(
        /um email foi enviado para Default com instruções para definir uma nova senha/i
      )
    ).toBeInTheDocument();
  });

  it("should have a link to the login page", () => {
    // Renderiza o componente
    render(<PopUpEmailNotify email="test@example.com" />);

    // Verifica se o link está correto
    const link = screen.getByRole("link", { name: /ir para o login/i });
    expect(link).toHaveAttribute("href", "/login");
  });
});
