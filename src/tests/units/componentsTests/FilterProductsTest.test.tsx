// FilterProducts.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { useGetCategories } from "./../../../queries/CategoriesQueries";
import FilterProducts from "@/app/_components/Stock/FilterProducts";

// Mocks dos hooks utilizados no componente
jest.mock("next-auth/react");
jest.mock("./../../../queries/CategoriesQueries");

const mockedUseSession = useSession as jest.Mock;
const mockedUseGetCategories = useGetCategories as jest.Mock;

describe("FilterProducts Component", () => {
  // Mocks para as funções de callback
  const sendNameMock = jest.fn();
  const sendCategoryMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("quando isUser é true", () => {
    beforeEach(() => {
      // Simula uma sessão com token de acesso
      mockedUseSession.mockReturnValue({ data: { accessToken: "fake-token" } });
      // Para isUser true, não precisamos de categorias, mas definimos um array vazio
      mockedUseGetCategories.mockReturnValue({ data: [] });
    });

    test("renderiza input com placeholder 'Nome do usuário' e não renderiza select nem botão", () => {
      render(
        <FilterProducts
          sendName={sendNameMock}
          sendCategory={sendCategoryMock}
          isUser={true}
        />
      );

      // Verifica o input com o placeholder adequado
      const input = screen.getByPlaceholderText("Nome do usuário");
      expect(input).toBeInTheDocument();

      // Verifica que não existe o select (utilizando o papel combobox) nem o botão
      expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /limpar filtro/i })
      ).not.toBeInTheDocument();
    });

    test("chama sendName quando o input é alterado", () => {
      render(
        <FilterProducts
          sendName={sendNameMock}
          sendCategory={sendCategoryMock}
          isUser={true}
        />
      );

      const input = screen.getByPlaceholderText("Nome do usuário");
      fireEvent.change(input, { target: { value: "teste" } });
      expect(sendNameMock).toHaveBeenCalledWith("teste");
    });
  });

  describe("quando isUser é false", () => {
    // Dados falsos para as categorias
    const fakeCategories = [
      { id: 1, name: "Categoria Um" },
      { id: 2, name: "Categoria Dois" },
    ];

    beforeEach(() => {
      mockedUseSession.mockReturnValue({ data: { accessToken: "fake-token" } });
      mockedUseGetCategories.mockReturnValue({ data: fakeCategories });
    });

    test("renderiza input com placeholder 'Nome do produto', select e botão", () => {
      render(
        <FilterProducts
          sendName={sendNameMock}
          sendCategory={sendCategoryMock}
          isUser={false}
        />
      );

      // Verifica o input com placeholder 'Nome do produto'
      const input = screen.getByPlaceholderText("Nome do produto");
      expect(input).toBeInTheDocument();

      // Verifica o select (role combobox)
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      // Verifica a opção default (deve estar selecionada e desabilitada)
      const defaultOption = screen.getByRole("option", {
        name: "Selecione uma categoria",
      });
      expect(defaultOption).toBeInTheDocument();
      expect(defaultOption).toBeDisabled();

      // Verifica se as categorias fornecidas são renderizadas
      fakeCategories.forEach((category) => {
        expect(
          screen.getByRole("option", { name: category.name })
        ).toBeInTheDocument();
      });

      // Verifica o botão de limpar filtro
      const button = screen.getByRole("button", { name: /limpar filtro/i });
      expect(button).toBeInTheDocument();
    });

    test("chama sendName quando o input é alterado", () => {
      render(
        <FilterProducts
          sendName={sendNameMock}
          sendCategory={sendCategoryMock}
          isUser={false}
        />
      );

      const input = screen.getByPlaceholderText("Nome do produto");
      fireEvent.change(input, { target: { value: "produto teste" } });
      expect(sendNameMock).toHaveBeenCalledWith("produto teste");
    });

    test("chama sendCategory com valor numérico quando o select é alterado", () => {
      render(
        <FilterProducts
          sendName={sendNameMock}
          sendCategory={sendCategoryMock}
          isUser={false}
        />
      );

      const select = screen.getByRole("combobox");
      // Simula a escolha da categoria com id 1
      fireEvent.change(select, { target: { value: "1" } });
      expect(sendCategoryMock).toHaveBeenCalledWith(1);
    });

    test("chama sendCategory com null e reseta o select ao clicar no botão", () => {
      render(
        <FilterProducts
          sendName={sendNameMock}
          sendCategory={sendCategoryMock}
          isUser={false}
        />
      );

      const select = screen.getByRole("combobox") as HTMLSelectElement;
      // Seleciona uma categoria (por exemplo, id 1)
      fireEvent.change(select, { target: { value: "1" } });
      expect(sendCategoryMock).toHaveBeenCalledWith(1);

      // Clica no botão para limpar filtro
      const button = screen.getByRole("button", { name: /limpar filtro/i });
      fireEvent.click(button);
      expect(sendCategoryMock).toHaveBeenCalledWith(null);
      // Verifica se o select foi resetado para o valor "1"
      expect(select.value).toBe("1");
    });
  });
});
