// WindowEditProduct.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WindowEditProduct from "@/app/_components/Stock/WindowEditProduct"; // ajuste o caminho conforme sua estrutura
import "@testing-library/jest-dom";
/* eslint-disable */
// ---------------------------------------------------------------------
// Mock do FormProduct
// ---------------------------------------------------------------------
// Para isolar o teste de WindowEditProduct, substituímos o FormProduct por um componente dummy
// que renderiza um <form> com data-testid="form-product" e que recebe os children.
jest.mock("./../../../app/_components/Stock/FormProduct", () => {
  return function DummyFormProduct({
    children,
    isEdit,
    idProduct,
    refetchProducts,
    sendClose,
  }: {
    children: React.ReactNode;
    isEdit?: boolean;
    idProduct?: number;
    refetchProducts?: () => void;
    sendClose?: () => void;
  }) {
    return <form data-testid="form-product">{children}</form>;
  };
});

// ---------------------------------------------------------------------
// Testes do WindowEditProduct
// ---------------------------------------------------------------------
describe("WindowEditProduct Component", () => {
  const sendCloseMock = jest.fn();
  const refetchProductsMock = jest.fn();
  const productId = 42; // exemplo de id

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza o título correto", () => {
    render(
      <WindowEditProduct
        sendClose={sendCloseMock}
        id={productId}
        refetchProducts={refetchProductsMock}
      />
    );
    expect(screen.getByText("Dados do produto - Edição")).toBeInTheDocument();
  });

  test("renderiza os botões 'Cancelar' e 'Editar Produto'", () => {
    render(
      <WindowEditProduct
        sendClose={sendCloseMock}
        id={productId}
        refetchProducts={refetchProductsMock}
      />
    );
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Editar Produto")).toBeInTheDocument();
  });

  test("o botão 'Cancelar' chama a função sendClose quando clicado", () => {
    render(
      <WindowEditProduct
        sendClose={sendCloseMock}
        id={productId}
        refetchProducts={refetchProductsMock}
      />
    );
    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);
    expect(sendCloseMock).toHaveBeenCalled();
  });

  test("o botão 'Editar Produto' possui o atributo type='submit'", () => {
    render(
      <WindowEditProduct
        sendClose={sendCloseMock}
        id={productId}
        refetchProducts={refetchProductsMock}
      />
    );
    const submitButton = screen.getByText("Editar Produto");
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  test("os botões são renderizados dentro do FormProduct", () => {
    render(
      <WindowEditProduct
        sendClose={sendCloseMock}
        id={productId}
        refetchProducts={refetchProductsMock}
      />
    );
    // Como usamos o mock, o FormProduct é renderizado como um <form> com data-testid="form-product"
    const formProduct = screen.getByTestId("form-product");
    expect(formProduct).toBeInTheDocument();
    expect(formProduct).toContainElement(screen.getByText("Cancelar"));
    expect(formProduct).toContainElement(screen.getByText("Editar Produto"));
  });
});
