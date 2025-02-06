// Logout.test.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { signOut } from "next-auth/react";
import "@testing-library/jest-dom";
import Logout from "@/app/logout/page";

// ---------------------------------------------------------------------
// Mock do signOut do next-auth/react
// ---------------------------------------------------------------------
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

// ---------------------------------------------------------------------
// Mock do useRouter do next/navigation
// ---------------------------------------------------------------------
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("Logout Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("chama signOut, limpa os storages e redireciona para '/login'", async () => {
    // Simula que signOut retorna uma promise resolvida
    (signOut as jest.Mock).mockResolvedValueOnce({});

    // Cria _spies_ para localStorage.clear e sessionStorage.clear
    const localStorageClearSpy = jest
      .spyOn(window.localStorage.__proto__, "clear")
      .mockImplementation(() => {});
    const sessionStorageClearSpy = jest
      .spyOn(window.sessionStorage.__proto__, "clear")
      .mockImplementation(() => {});

    render(<Logout />);

    // Aguarda que o useEffect execute as ações assíncronas
    await waitFor(() => {
      // Verifica se signOut foi chamado com { redirect: false }
      expect(signOut).toHaveBeenCalledWith({ redirect: false });
      // Verifica se os storages foram limpos
      expect(localStorageClearSpy).toHaveBeenCalled();
      expect(sessionStorageClearSpy).toHaveBeenCalled();
      // Verifica se o router.push foi chamado com "/login"
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });

  test("renderiza o componente WindowLoad", () => {
    // Aqui, não precisamos aguardar as ações do useEffect, pois o componente sempre renderiza WindowLoad
    (signOut as jest.Mock).mockResolvedValueOnce({});
    const { container } = render(<Logout />);
    // Como o Logout retorna o componente WindowLoad, podemos verificar se algum elemento esperado de WindowLoad está presente.
    // Por exemplo, se WindowLoad renderizar um elemento com uma classe ou data-testid (se você tiver definido).
    // Caso não haja data-testid, verificamos se o container não está vazio.
    expect(container.firstChild).toBeInTheDocument();
  });
});
