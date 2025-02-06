// WindowError.test.tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import WindowError from "@/app/_components/WindowError/WindowError";

describe("WindowError Component", () => {
  // Utiliza fake timers para controlar o setInterval
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renderiza o texto de erro corretamente", () => {
    render(<WindowError text="Ocorreu um erro" sendClose={() => {}} />);
    expect(screen.getByText("Ocorreu um erro")).toBeInTheDocument();
  });

  test("chama sendClose após 2 segundos de countdown", () => {
    const sendCloseMock = jest.fn();
    render(<WindowError text="Erro" sendClose={sendCloseMock} />);

    // Inicialmente, sendClose não deve ter sido chamado
    expect(sendCloseMock).not.toHaveBeenCalled();

    // Avança 1 segundo: count de 2 para 1
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(sendCloseMock).not.toHaveBeenCalled();

    // Avança mais 1 segundo: count vai para 0 e sendClose é chamado
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(sendCloseMock).toHaveBeenCalledTimes(1);
  });
});
