import { render, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "./../../../mutations/ProductMutations";
import * as API from "./../../../API/products"; // Mock das funções de API

jest.mock("./../../../API/products"); // Mock do módulo com as funções

// Instância de QueryClient para uso nos testes
const queryClient = new QueryClient();
/* eslint-disable */
describe("Product Mutations", () => {
  it("should call addPost when useAddProduct is triggered", async () => {
    // Mock do comportamento de addPost
    (API.addPost as jest.Mock).mockResolvedValueOnce({ success: true });

    let mutation: any;

    // Componente de teste que usa o hook
    const TestComponent = () => {
      mutation = useAddProduct();
      return null; // Sem renderização necessária
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    // Executa a mutation
    await act(async () => {
      await mutation.mutateAsync({ name: "New Product", price: 10 });
    });

    // Verifica se a função mockada foi chamada corretamente
    expect(API.addPost).toHaveBeenCalledWith({
      name: "New Product",
      price: 10,
    });
    expect(API.addPost).toHaveBeenCalledTimes(1);
  });

  it("should call updateProduct when useUpdateProduct is triggered", async () => {
    // Mock do comportamento de updateProduct
    (API.updateProduct as jest.Mock).mockResolvedValueOnce({ success: true });

    let mutation: any;

    // Componente de teste que usa o hook
    const TestComponent = () => {
      mutation = useUpdateProduct();
      return null;
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    // Executa a mutation
    await act(async () => {
      await mutation.mutateAsync({ id: 1, name: "Updated Product", price: 20 });
    });

    // Verifica se a função mockada foi chamada corretamente
    expect(API.updateProduct).toHaveBeenCalledWith({
      id: 1,
      name: "Updated Product",
      price: 20,
    });
    expect(API.updateProduct).toHaveBeenCalledTimes(1);
  });

  it("should call deleteProduct when useDeleteProduct is triggered", async () => {
    // Mock do comportamento de deleteProduct
    (API.deleteProduct as jest.Mock).mockResolvedValueOnce({ success: true });

    let mutation: any;

    // Componente de teste que usa o hook
    const TestComponent = () => {
      mutation = useDeleteProduct();
      return null;
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    // Executa a mutation
    await act(async () => {
      await mutation.mutateAsync({ id: 1 });
    });

    // Verifica se a função mockada foi chamada corretamente
    expect(API.deleteProduct).toHaveBeenCalledWith({ id: 1 });
    expect(API.deleteProduct).toHaveBeenCalledTimes(1);
  });
});
