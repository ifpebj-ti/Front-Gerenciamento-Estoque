/* eslint-disable */
import { render, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Importe o QueryClientProvider
import {
  useAddUser,
  useUpdateUser,
  useDeactivateUser,
  useActivateUser,
} from "./../../../mutations/UserMutations";
import * as API from "./../../../API/users"; // Mock das funções

jest.mock("./../../../API/users"); // Mock do módulo

// Cria uma instância do QueryClient para ser usada nos testes
const queryClient = new QueryClient();

describe("User Mutations", () => {
  it("should call addUser when useAddUser is triggered", async () => {
    // Mock do comportamento da função addUser
    (API.addUser as jest.Mock).mockResolvedValueOnce({ success: true });
    let mutation: any;

    // Componente de teste que usa o hook
    const TestComponent = () => {
      mutation = useAddUser();
      return null; // O componente não precisa renderizar nada
    };

    // Renderiza o TestComponent dentro do QueryClientProvider
    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    // Executa a mutation e verifica o comportamento
    await act(async () => {
      await mutation.mutateAsync({ name: "John Doe" });
    });

    // Verifica se a função mockada foi chamada corretamente
    expect(API.addUser).toHaveBeenCalledWith({ name: "John Doe" });
    expect(API.addUser).toHaveBeenCalledTimes(1);
  });

  it("should call updateUser when useUpdateUser is triggered", async () => {
    (API.updateUser as jest.Mock).mockResolvedValueOnce({ success: true });

    let mutation: any;
    const TestComponent = () => {
      mutation = useUpdateUser();
      return null;
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    await act(async () => {
      await mutation.mutateAsync({ id: 1, name: "John Updated" });
    });

    expect(API.updateUser).toHaveBeenCalledWith({
      id: 1,
      name: "John Updated",
    });
    expect(API.updateUser).toHaveBeenCalledTimes(1);
  });

  it("should call deactivateUser when useDeactivateUser is triggered", async () => {
    (API.deactivateUser as jest.Mock).mockResolvedValueOnce({ success: true });

    let mutation: any;
    const TestComponent = () => {
      mutation = useDeactivateUser();
      return null;
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    await act(async () => {
      await mutation.mutateAsync({ id: 1 });
    });

    expect(API.deactivateUser).toHaveBeenCalledWith({ id: 1 });
    expect(API.deactivateUser).toHaveBeenCalledTimes(1);
  });

  it("should call activateUser when useActivateUser is triggered", async () => {
    (API.activateUser as jest.Mock).mockResolvedValueOnce({ success: true });

    let mutation: any;
    const TestComponent = () => {
      mutation = useActivateUser();
      return null;
    };

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    await act(async () => {
      await mutation.mutateAsync({ id: 1 });
    });

    expect(API.activateUser).toHaveBeenCalledWith({ id: 1 });
    expect(API.activateUser).toHaveBeenCalledTimes(1);
  });
});
