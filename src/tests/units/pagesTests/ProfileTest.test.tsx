import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

// Mock do useSession do next-auth
import { useSession } from "next-auth/react";
import Profile from "@/app/profile/page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

// Função helper para renderizar o componente com QueryClientProvider
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Profile Component", () => {
  const dummySession = { userInfo: { photo: "https://example.com/photo.png" } };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({ data: dummySession });
  });

  test("renderiza corretamente e mostra o botão de alterar senha", () => {
    renderWithClient(<Profile />);
    expect(
      screen.getByText("alterar senha e foto do perfil")
    ).toBeInTheDocument();
  });

  test("alternar para modo de edição e depois clicar para cancelar chama window.location.reload", async () => {
    const originalLocation = window.location; // Salva a referência original

    /* eslint-disable */
    // Substitui window.location temporariamente para permitir mock
    delete (window as any).location;
    window.location = { ...originalLocation, reload: jest.fn() } as Location;

    renderWithClient(<Profile />);

    // Clica no botão para ativar o modo de edição
    const toggleButton = screen.getByText("alterar senha e foto do perfil");
    fireEvent.click(toggleButton);

    // Aguarda que o botão "cancelar" apareça
    await waitFor(() => {
      expect(screen.getByText("cancelar")).toBeInTheDocument();
    });

    // Clica no botão "cancelar"
    const cancelButton = screen.getByText("cancelar");
    fireEvent.click(cancelButton);

    // Verifica se window.location.reload foi chamado
    expect(window.location.reload).toHaveBeenCalled();

    // Restaura o objeto original após o teste
    window.location = originalLocation;
  });
});
