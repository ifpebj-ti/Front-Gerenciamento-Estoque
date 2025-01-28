import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetCategories } from "./../../../queries/CategoriesQueries"; // Ajuste o caminho conforme seu projeto
import * as API from "./../../../API/category"; // Mock da função getCategories

jest.mock("./../../../API/category"); // Substitui o módulo real por um mock

// Instância do QueryClient para ser usada nos testes
const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetCategories", () => {
  it("should fetch categories when token is provided", async () => {
    // Mock do comportamento de getCategories
    const mockCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];
    (API.getCategories as jest.Mock).mockResolvedValueOnce(mockCategories);

    // Renderiza o hook
    const { result } = renderHook(() => useGetCategories("valid-token"), {
      wrapper,
    });

    // Aguarda a query ser concluída
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verifica se os dados retornados estão corretos
    expect(result.current.data).toEqual(mockCategories);

    // Verifica se a função mockada foi chamada com o token correto
    expect(API.getCategories).toHaveBeenCalledWith("valid-token");
    expect(API.getCategories).toHaveBeenCalledTimes(1);
  });

  it("should not fetch categories when token is not provided", async () => {
    // Renderiza o hook com um token inválido (vazio)
    const { result } = renderHook(() => useGetCategories(""), { wrapper });

    // Verifica que a query não foi executada (está em loading e nunca muda para success)
    expect(result.current.isLoading).toBe(false);
  });
});
