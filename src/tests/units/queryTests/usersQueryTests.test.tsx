import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetUsers, useGetUser } from "./../../../queries/UsersQueries"; // Ajuste o caminho conforme seu projeto
import * as API from "./../../../API/users"; // Mock das funções de API

jest.mock("./../../../API/users"); // Substitui o módulo real por um mock

// Instância do QueryClient para ser usada nos testes
const queryClient = new QueryClient();

// Wrapper para envolver o hook no QueryClientProvider
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetUsers", () => {
  it("should fetch users when token is provided", async () => {
    // Mock da função getUsers
    const mockUsers = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];
    (API.getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    // Renderiza o hook
    const { result } = renderHook(() => useGetUsers("valid-token"), {
      wrapper,
    });

    // Aguarda até que o hook esteja em sucesso
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verifica se os dados retornados estão corretos
    expect(result.current.data).toEqual(mockUsers);

    // Verifica se a função mockada foi chamada com o token correto
    expect(API.getUsers).toHaveBeenCalledWith("valid-token");
    expect(API.getUsers).toHaveBeenCalledTimes(1);
  });

  it("should not fetch users when token is not provided", async () => {
    // Renderiza o hook com um token inválido (vazio)
    const { result } = renderHook(() => useGetUsers(""), { wrapper });

    // Verifica que a query não foi executada
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useGetUser", () => {
  it("should fetch a user when token is provided", async () => {
    // Mock da função getUser
    const mockUser = { id: 1, name: "John Doe" };
    (API.getUser as jest.Mock).mockResolvedValueOnce(mockUser);

    // Renderiza o hook
    const { result } = renderHook(() => useGetUser("valid-token"), { wrapper });

    // Aguarda até que o hook esteja em sucesso
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verifica se os dados retornados estão corretos
    expect(result.current.data).toEqual(mockUser);

    // Verifica se a função mockada foi chamada com o token correto
    expect(API.getUser).toHaveBeenCalledWith("valid-token");
    expect(API.getUser).toHaveBeenCalledTimes(1);
  });

  it("should not fetch a user when token is not provided", async () => {
    // Renderiza o hook com um token inválido (vazio)
    const { result } = renderHook(() => useGetUser(""), { wrapper });

    // Verifica que a query não foi executada
    expect(result.current.isLoading).toBe(false);
  });
});
