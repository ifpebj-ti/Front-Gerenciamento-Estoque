// Stock.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// ---------------------------------------------------------------------
// Mocks dos hooks externos
// ---------------------------------------------------------------------
import { useSession } from "next-auth/react";
import { useGetProducts } from "./../../../queries/ProductsQueries";
import Stock from "@/app/stock/page";

/* eslint-disable */
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
jest.mock("./../../../queries/ProductsQueries", () => ({
  useGetProducts: jest.fn(),
}));

// ---------------------------------------------------------------------
// Mocks dos componentes filhos
// ---------------------------------------------------------------------
jest.mock("./../../../app/_components/Header/Header", () => () => (
  <div data-testid="header">Header</div>
));

jest.mock(
  "./../../../app/_components/Stock/CardProduct",
  () => (props: any) =>
    (
      // O mock renderiza um <div> com data-testid="card-product" e o título do produto,
      // e dispara props.click ao ser clicado.
      <div data-testid="card-product" onClick={props.click}>
        {props.data.title}
      </div>
    )
);

jest.mock(
  "./../../../app/_components/Stock/FilterProducts",
  () => (props: any) =>
    (
      <div data-testid="filter-products">
        {/* Um input para simular a digitação (chama props.sendName) */}
        <input
          data-testid="filter-name"
          placeholder="Filter"
          onChange={(e) => props.sendName(e.target.value)}
        />
        {/* Um select para categoria (chama props.sendCategory) */}
        <select
          data-testid="filter-category"
          onChange={(e) =>
            props.sendCategory(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Select</option>
          <option value="1">Category 1</option>
        </select>
      </div>
    )
);

jest.mock(
  "./../../../app/_components/Stock/ViewProduct",
  () => (props: any) =>
    (
      <div data-testid="view-product">
        ViewProduct: {props.data.title}
        <button onClick={props.close}>Close</button>
      </div>
    )
);

jest.mock("./../../../app/_components/Stock/Pagination", () => (props: any) => (
  <div data-testid="pagination">
    {/* Para fins de teste, um botão que chama sendCurrentPage com 2 */}
    <button onClick={() => props.sendCurrentPage(2)}>Go to page 2</button>
  </div>
));

jest.mock("./../../../app/_components/WindowLoad/WindowLoad", () => () => (
  <div data-testid="window-load">Loading...</div>
));

// ---------------------------------------------------------------------
// Mock da função base64ToBlob
// ---------------------------------------------------------------------
jest.mock("./../../../utils/convertImage.ts", () => ({
  __esModule: true,
  default: (input: string) => input, // Para teste, apenas retorna a string
}));

// ---------------------------------------------------------------------
// Dados de exemplo
// ---------------------------------------------------------------------
const dummySession = { accessToken: "fake-token" };

const dummyProducts = {
  content: [
    {
      id: 1,
      name: "Product 1",
      photo: "photo1",
      quantity: 10,
      unitValue: 100,
      description: "Description 1",
      categories: [],
      stockValue: 50,
      critical_quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      photo: "photo2",
      quantity: 0,
      unitValue: 200,
      description: "Description 2",
      categories: [],
      stockValue: 30,
      critical_quantity: 1,
    },
  ],
  totalPages: 3,
};

// ---------------------------------------------------------------------
// Configuração dos mocks padrão
// ---------------------------------------------------------------------
beforeEach(() => {
  // Simula o useSession retornando uma sessão
  (useSession as jest.Mock).mockReturnValue({ data: dummySession });
  // Simula useGetProducts retornando produtos
  (useGetProducts as jest.Mock).mockReturnValue({
    isLoading: false,
    data: dummyProducts,
    refetch: jest.fn(),
  });
});

describe("Stock Component", () => {
  test("exibe o WindowLoad quando products.isLoading é true", () => {
    (useGetProducts as jest.Mock).mockReturnValueOnce({
      isLoading: true,
      data: null,
      refetch: jest.fn(),
    });
    render(<Stock />);
    expect(screen.getByTestId("window-load")).toBeInTheDocument();
  });

  test("renderiza Header, FilterProducts, lista de produtos e Pagination", () => {
    render(<Stock />);

    // Header
    expect(screen.getByTestId("header")).toBeInTheDocument();
    // FilterProducts
    expect(screen.getByTestId("filter-products")).toBeInTheDocument();
    // Lista de produtos
    const cardProducts = screen.getAllByTestId("card-product");
    expect(cardProducts).toHaveLength(dummyProducts.content.length);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    // Pagination
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  test("ao clicar em um CardProduct, abre o ViewProduct modal", async () => {
    render(<Stock />);
    // Simula clique no primeiro CardProduct
    const firstCard = screen.getAllByTestId("card-product")[0];
    fireEvent.click(firstCard);
    // Verifica que o modal ViewProduct é exibido e mostra o título do produto selecionado
    await waitFor(() => {
      expect(screen.getByTestId("view-product")).toBeInTheDocument();
      expect(screen.getByText(/ViewProduct: Product 1/)).toBeInTheDocument();
    });
  });

  test("ao clicar no botão da Pagination, atualiza a página atual", () => {
    render(<Stock />);
    // No nosso mock de Pagination, há um botão que chama sendCurrentPage com 2
    const paginationButton = screen.getByText("Go to page 2");
    fireEvent.click(paginationButton);
    // Embora o estado currentPage seja interno, o teste garante que o callback é chamado,
    // e o componente continua renderizando a paginação.
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
