// WindowAddProduct.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WindowAddProduct from "@/app/_components/Stock/WindowAddProduct"; // ajuste o caminho conforme sua estrutura
import "@testing-library/jest-dom";

// ---------------------------------------------------------------------
// Mock para o FormProduct
// ---------------------------------------------------------------------
// Para isolar o teste do WindowAddProduct, vamos simular o componente FormProduct
// de forma simples: ele renderiza um <form> com um data-testid e os children passados.
jest.mock("./../../../app/_components/Stock/FormProduct", () => {
  return function DummyFormProduct({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <form data-testid="form-product">{children}</form>;
  };
});

// ---------------------------------------------------------------------
// Testes do WindowAddProduct
// ---------------------------------------------------------------------
describe("WindowAddProduct Component", () => {
  const sendCloseMock = jest.fn();
  const refetchProductsMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza o título e os botões corretamente", () => {
    render(
      <WindowAddProduct
        sendClose={sendCloseMock}
        refetchProducts={refetchProductsMock}
      />
    );

    // Verifica se o título "Dados do produto" é renderizado
    expect(screen.getByText(/Dados do produto/i)).toBeInTheDocument();

    // Verifica se os botões "Cancelar" e "Salvar Produto" são renderizados
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Salvar Produto")).toBeInTheDocument();
  });

  test("chama sendClose ao clicar no botão 'Cancelar'", () => {
    render(
      <WindowAddProduct
        sendClose={sendCloseMock}
        refetchProducts={refetchProductsMock}
      />
    );

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);
    expect(sendCloseMock).toHaveBeenCalled();
  });

  test("o botão 'Salvar Produto' tem type='submit'", () => {
    render(
      <WindowAddProduct
        sendClose={sendCloseMock}
        refetchProducts={refetchProductsMock}
      />
    );

    const saveButton = screen.getByText("Salvar Produto");
    expect(saveButton).toHaveAttribute("type", "submit");
  });

  test("os botões são renderizados dentro do FormProduct", () => {
    render(
      <WindowAddProduct
        sendClose={sendCloseMock}
        refetchProducts={refetchProductsMock}
      />
    );

    // Como usamos o mock, FormProduct é renderizado como um <form> com data-testid="form-product"
    const formProduct = screen.getByTestId("form-product");
    expect(formProduct).toBeInTheDocument();

    // Verifica se os botões estão dentro do formulário
    expect(formProduct).toContainElement(screen.getByText("Cancelar"));
    expect(formProduct).toContainElement(screen.getByText("Salvar Produto"));
  });
});
