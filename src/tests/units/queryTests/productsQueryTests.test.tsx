import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useGetProducts,
  useGetProduct,
} from "./../../../queries/ProductsQueries"; // Ajuste o caminho conforme seu projeto
import * as API from "./../../../API/products"; // Mock das funções de API

jest.mock("./../../../API/products"); // Substitui o módulo real por um mock

// Instância do QueryClient para ser usada nos testes
const queryClient = new QueryClient();

// Wrapper para envolver o hook no QueryClientProvider
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetProducts", () => {
  it("should fetch products when valid arguments are provided", async () => {
    // Mock da função getProducts
    const mockProducts = [
      { id: 1, name: "Product 1", category: 1 },
      { id: 2, name: "Product 2", category: 2 },
    ];
    (API.getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    // Renderiza o hook
    const { result } = renderHook(
      () =>
        useGetProducts({
          token: "valid-token",
          currentPage: 1,
          searchName: "Product",
          category: 1,
        }),
      { wrapper }
    );

    // Aguarda até que o hook esteja em sucesso
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verifica se os dados retornados estão corretos
    expect(result.current.data).toEqual(mockProducts);

    // Verifica se a função mockada foi chamada com os argumentos corretos
    expect(API.getProducts).toHaveBeenCalledWith({
      token: "valid-token",
      currentPage: 1,
      searchName: "Product",
      category: 1,
    });
    expect(API.getProducts).toHaveBeenCalledTimes(1);
  });

  it("should not fetch products when token is not provided", async () => {
    // Renderiza o hook sem um token
    const { result } = renderHook(
      () =>
        useGetProducts({
          token: "",
          currentPage: 1,
          searchName: "",
          category: 0,
        }),
      { wrapper }
    );

    // Verifica que a query não foi executada
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useGetProduct", () => {
  it("should fetch a product when valid arguments are provided", async () => {
    // Mock da função getProduct
    const mockProduct = { id: 1, name: "Product 1", category: 1 };
    (API.getProduct as jest.Mock).mockResolvedValueOnce(mockProduct);

    // Renderiza o hook
    const { result } = renderHook(
      () => useGetProduct({ token: "valid-token", id: 1 }),
      { wrapper }
    );

    // Aguarda até que o hook esteja em sucesso
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verifica se os dados retornados estão corretos
    expect(result.current.data).toEqual(mockProduct);

    // Verifica se a função mockada foi chamada com os argumentos corretos
    expect(API.getProduct).toHaveBeenCalledWith({
      token: "valid-token",
      id: 1,
    });
    expect(API.getProduct).toHaveBeenCalledTimes(1);
  });

  it("should not fetch a product when token is not provided", async () => {
    // Renderiza o hook sem um token
    const { result } = renderHook(() => useGetProduct({ token: "", id: 1 }), {
      wrapper,
    });

    // Verifica que a query não foi executada
    expect(result.current.isLoading).toBe(false);
  });
});
