// MainHome.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainHome from "@/app/home/page";

/* eslint-disable */
// ---------------------------------------------------------------------
// Mocks para componentes e funções externos
// ---------------------------------------------------------------------

// Mock do next/image para renderizar uma tag <img> simples com os mesmos props
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // Removemos propriedades desnecessárias para testes, como objectFit
    const { objectFit, ...rest } = props;
    return <img {...rest} />;
  },
}));

// Mock do Header: renderiza um div identificável
jest.mock("./../../../app/_components/Header/Header", () => () => (
  <div data-testid="header">Header</div>
));

// Mock do ButtonLogin: renderiza um botão com o texto recebido na prop textButton
jest.mock(
  "./../../../app/_components/AuthForms/ButtonLogin/ButtonLogin",
  () =>
    ({ textButton }: { textButton: string }) =>
      <button>{textButton}</button>
);

// ---------------------------------------------------------------------
// Testes do componente MainHome
// ---------------------------------------------------------------------
describe("MainHome Component", () => {
  test("renderiza Header, título, subtítulo, botão e link corretamente", () => {
    render(<MainHome />);

    // Verifica se o Header é renderizado
    expect(screen.getByTestId("header")).toBeInTheDocument();

    // Verifica se o título é exibido (localizado no <h1>)
    expect(
      screen.getByText("Busque seus produtos dentro do estoque")
    ).toBeInTheDocument();

    // Verifica se o subtítulo (descrição) é exibido
    expect(
      screen.getByText("Estoque e pedidos sob controle, gestão sem esforço")
    ).toBeInTheDocument();

    // Verifica se o botão renderizado pelo ButtonLogin aparece com o texto correto
    expect(screen.getByText("REALIZE SUA BUSCA")).toBeInTheDocument();

    // Verifica se o Link envolve o botão e possui href "/stock"
    // O Link do Next deve renderizar um <a> com o href especificado
    const link = screen.getByRole("link", { name: "REALIZE SUA BUSCA" });
    expect(link).toHaveAttribute("href", "/stock");
  });

  test("renderiza a imagem com o alt e src esperados", () => {
    render(<MainHome />);
    // Verifica se a imagem possui o alt "Imagem Banner pagina inicial"
    const image = screen.getByAltText("Imagem Banner pagina inicial");
    expect(image).toBeInTheDocument();
    // Como usamos um mock para next/image, o src é repassado ao <img>.
    // Podemos verificar que o atributo src existe (o valor exato pode variar conforme o bundler)
    expect(image).toHaveAttribute("src");
  });
});
