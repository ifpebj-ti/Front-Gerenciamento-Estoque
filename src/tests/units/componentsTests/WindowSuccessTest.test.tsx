// WindowSuccess.test.tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import WindowSuccess from "@/app/_components/WindowSuccess/WindowSuccess";

describe("WindowSuccess Component", () => {
  // Configuramos os fake timers antes de cada teste
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Restauramos os timers reais após cada teste
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renderiza o texto de sucesso corretamente", () => {
    render(
      <WindowSuccess
        text="Operação realizada com sucesso!"
        sendClose={() => {}}
      />
    );
    expect(
      screen.getByText("Operação realizada com sucesso!")
    ).toBeInTheDocument();
  });

  test("chama sendClose após 2 segundos de countdown", () => {
    const sendCloseMock = jest.fn();
    render(
      <WindowSuccess
        text="Operação realizada com sucesso!"
        sendClose={sendCloseMock}
      />
    );

    // Inicialmente, sendClose não deve ter sido chamado
    expect(sendCloseMock).not.toHaveBeenCalled();

    // Avança 1 segundo (contador de 2 para 1)
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(sendCloseMock).not.toHaveBeenCalled();

    // Avança mais 1 segundo (contador chega a 0 e sendClose deve ser chamada)
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(sendCloseMock).toHaveBeenCalledTimes(1);
  });
});
