// Unauthorized.test.tsx
import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Unauthorized from "@/app/unauthorized/page";

// Armazena a localização original para restaurá-la após os testes
const originalLocation = window.location;

beforeAll(() => {
  // Redefine window.location para permitir sobrescrever href
  Object.defineProperty(window, "location", {
    writable: true,
    value: { ...window.location, href: "" },
  });
});

afterAll(() => {
  // Restaura a localização original
  window.location = originalLocation;
});

describe("Unauthorized Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renderiza a mensagem de não autorização e o contador inicial", () => {
    render(<Unauthorized />);

    // Verifica se a mensagem de autorização é exibida
    expect(
      screen.getByText("Você não tem autorização para acessar essa página!")
    ).toBeInTheDocument();

    // Verifica se o contador inicial (5) está presente
    expect(screen.getByText(/Redirecionando em 5/)).toBeInTheDocument();
  });

  test("atualiza o contador à medida que o tempo passa", () => {
    render(<Unauthorized />);

    // Inicialmente, deve exibir "Redirecionando em 5..."
    expect(screen.getByText(/Redirecionando em 5/)).toBeInTheDocument();

    // Avança 1 segundo
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // Agora, deve exibir "Redirecionando em 4..."
    expect(screen.getByText(/Redirecionando em 4/)).toBeInTheDocument();

    // Avança mais 2 segundos (total de 3 segundos passados)
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    // Deve exibir "Redirecionando em 2..." (5 - 3 = 2)
    expect(screen.getByText(/Redirecionando em 2/)).toBeInTheDocument();
  });

  test("redireciona para '/' quando o contador chega a 0", async () => {
    render(<Unauthorized />);

    // Avança o tempo para completar os 5 segundos
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Aguarda que o efeito de redirecionamento ocorra e verifique que window.location.href foi atualizado
    await waitFor(() => {
      expect(window.location.href).toBe("/");
    });
  });
});
