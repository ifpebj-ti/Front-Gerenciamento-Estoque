import { render, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAddCategory } from "./../../../mutations/CategoryMutations"; // Ajuste o caminho para o hook
import * as API from "./../../../API/category"; // Mock da função addCategory

jest.mock("./../../../API/category"); // Substitui o módulo real por um mock

// Instância do QueryClient para ser usada nos testes
const queryClient = new QueryClient();
/* eslint-disable */
describe("useAddCategory", () => {
  it("should call addCategory when useAddCategory is triggered", async () => {
    // Mock do comportamento de addCategory
    (API.addCategory as jest.Mock).mockResolvedValueOnce({ success: true });

    let mutation: any;

    // Componente de teste que usa o hook
    const TestComponent = () => {
      mutation = useAddCategory();
      return null; // O componente não precisa renderizar nada
    };

    // Renderiza o componente de teste com o QueryClientProvider
    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    // Executa a mutation
    await act(async () => {
      await mutation.mutateAsync({ name: "New Category" });
    });

    // Verifica se a função mockada foi chamada corretamente
    expect(API.addCategory).toHaveBeenCalledWith({ name: "New Category" });
    expect(API.addCategory).toHaveBeenCalledTimes(1);
  });
});
