// Admin.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Admin from "./../../../app/admin/page"; // Ajuste o caminho conforme sua estrutura
import "@testing-library/jest-dom";

/* eslint-disable */
// ---------------------------------------------------------------------
// Mocks dos hooks principais
// ---------------------------------------------------------------------
import { useSession } from "next-auth/react";
import { useGetProducts } from "./../../../queries/ProductsQueries";
import { useGetUsers } from "./../../../queries/UsersQueries";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
jest.mock("./../../../queries/ProductsQueries", () => ({
  useGetProducts: jest.fn(),
}));
jest.mock("./../../../queries/UsersQueries", () => ({
  useGetUsers: jest.fn(),
}));

// ---------------------------------------------------------------------
// Mocks dos componentes filhos
// ---------------------------------------------------------------------
jest.mock("./../../../app/_components/WindowLoad/WindowLoad", () => () => (
  <div data-testid="window-load">Loading...</div>
));
jest.mock("./../../../app/_components/Header/Header", () => () => (
  <header>Header</header>
));
jest.mock(
  "./../../../app/_components/Admin/SelectSession",
  () =>
    ({ sendOption, options }: any) =>
      (
        <div data-testid="select-session">
          <button onClick={() => sendOption(0)}>Session 0</button>
          <button onClick={() => sendOption(1)}>Session 1</button>
        </div>
      )
);
jest.mock("./../../../app/_components/Stock/FilterProducts", () => () => (
  <div data-testid="filter-products">FilterProducts</div>
));
jest.mock(
  "./../../../app/_components/Stock/Pagination",
  () =>
    ({ sendCurrentPage, totalPages }: any) =>
      <div data-testid="pagination">Pagination - Total pages: {totalPages}</div>
);
jest.mock(
  "./../../../app/_components/Admin/CardProductListAdmin",
  () => (props: any) =>
    (
      <div
        data-testid="card-product-list-admin"
        onClick={() => props.sendOpenEditWindow()}
      >
        Product {props.data.id}
      </div>
    )
);
jest.mock("./../../../app/_components/Stock/WindowAddProduct", () => () => (
  <div data-testid="window-add-product">WindowAddProduct</div>
));
jest.mock("./../../../app/_components/Stock/WindowEditProduct", () => () => (
  <div data-testid="window-edit-product">WindowEditProduct</div>
));
jest.mock(
  "./../../../app/_components/Admin/CardUserListAdmin",
  () => (props: any) =>
    (
      <div
        data-testid="card-user-list-admin"
        onClick={() => props.sendOpenEditWindow()}
      >
        User {props.data.id}
      </div>
    )
);
jest.mock("./../../../app/_components/Admin/WindowAddNewUser", () => () => (
  <div data-testid="window-add-new-user">WindowAddNewUser</div>
));

// ---------------------------------------------------------------------
// Dados de exemplo para produtos e usuários
// ---------------------------------------------------------------------
const dummyProducts = {
  content: [
    {
      id: 1,
      title: "Product 1",
      unit_price: "100",
      stock_value: "50",
      quantity: 10,
      description: "Desc 1",
      image: "https://example.com/img1.png",
    },
    {
      id: 2,
      title: "Product 2",
      unit_price: "200",
      stock_value: "30",
      quantity: 5,
      description: "Desc 2",
      image: "https://example.com/img2.png",
    },
  ],
  totalPages: 3,
};

const dummyUsers = [
  { id: 1, name: "User 1", email: "user1@example.com" },
  { id: 2, name: "User 2", email: "user2@example.com" },
];

// ---------------------------------------------------------------------
// Configuração padrão dos mocks
// ---------------------------------------------------------------------
beforeEach(() => {
  (useSession as jest.Mock).mockReturnValue({
    data: { accessToken: "fake-token" },
  });
  (useGetProducts as jest.Mock).mockReturnValue({
    isLoading: false,
    data: dummyProducts,
    refetch: jest.fn(),
  });
  (useGetUsers as jest.Mock).mockReturnValue({
    data: dummyUsers,
    refetch: jest.fn(),
  });
});

describe("Admin Page Component", () => {
  test("renderiza Header, SelectSession e conteúdo principal", () => {
    render(<Admin />);
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByTestId("select-session")).toBeInTheDocument();
    // Como o currentSession padrão é 0, FilterProducts deve estar presente
    expect(screen.getByTestId("filter-products")).toBeInTheDocument();
  });

  test("renderiza a lista de produtos e Pagination quando currentSession é 0", () => {
    render(<Admin />);
    // Deve renderizar 2 produtos (dummyProducts.content possui 2 itens)
    const productCards = screen.getAllByTestId("card-product-list-admin");
    expect(productCards).toHaveLength(2);
    expect(screen.getByTestId("pagination")).toHaveTextContent(
      "Total pages: 3"
    );
  });

  test("ao clicar no botão 'Adicionar Produto', exibe a modal WindowAddProduct", () => {
    render(<Admin />);
    // Encontra o botão "Adicionar Produto"
    const addProductButton = screen.getByText("Adicionar Produto");
    fireEvent.click(addProductButton);
    // Verifica se a modal com WindowAddProduct é renderizada
    expect(screen.getByTestId("window-add-product")).toBeInTheDocument();
  });

  test("ao clicar em um produto, exibe a modal WindowEditProduct", () => {
    render(<Admin />);
    // Simula clique em um CardProductListAdmin; nosso mock dispara sendOpenEditWindow no onClick
    const productCard = screen.getAllByTestId("card-product-list-admin")[0];
    fireEvent.click(productCard);
    expect(screen.getByTestId("window-edit-product")).toBeInTheDocument();
  });

  test("ao mudar para sessão 1, renderiza a lista de usuários e botão 'Adicionar Usuário'", () => {
    render(<Admin />);
    // Simula a mudança de sessão clicando no botão "Session 1" (do mock de SelectSession)
    const session1Button = screen.getByText("Session 1");
    fireEvent.click(session1Button);
    // Na sessão 1, a função renderSession() renderiza o botão "Adicionar Usuário"
    expect(screen.getByText("Adicionar Usuário")).toBeInTheDocument();
    // Também renderiza os usuários (CardUserListAdmin)
    const userCards = screen.getAllByTestId("card-user-list-admin");
    expect(userCards).toHaveLength(dummyUsers.length);
  });

  test("ao clicar no botão 'Adicionar Usuário', exibe a modal WindowAddNewUser", () => {
    render(<Admin />);
    // Muda para sessão 1
    fireEvent.click(screen.getByText("Session 1"));
    // Clica no botão "Adicionar Usuário"
    const addUserButton = screen.getByText("Adicionar Usuário");
    fireEvent.click(addUserButton);
    expect(screen.getByTestId("window-add-new-user")).toBeInTheDocument();
  });

  test("exibe o componente WindowLoad quando products.isLoading é true", () => {
    // Simula que os produtos estão carregando
    (useGetProducts as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      refetch: jest.fn(),
    });
    render(<Admin />);
    expect(screen.getByTestId("window-load")).toBeInTheDocument();
  });
});
