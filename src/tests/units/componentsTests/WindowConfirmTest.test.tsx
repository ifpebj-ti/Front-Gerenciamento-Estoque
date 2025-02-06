// WindowConfirm.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WindowConfirm from "@/app/_components/WindowConfirm/WindowConfirm"; // Ajuste o caminho conforme sua estrutura
import "@testing-library/jest-dom";

describe("WindowConfirm Component", () => {
  const sendCloseMock = jest.fn();
  const confirmMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza o título e a mensagem passados", () => {
    render(
      <WindowConfirm
        title="Confirmação"
        message="Deseja realmente prosseguir?"
        sendClose={sendCloseMock}
        confirm={confirmMock}
      />
    );

    // Verifica se o título é renderizado conforme passado
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveTextContent("Confirmação");

    // Verifica se a mensagem também é renderizada
    expect(
      screen.getByText("Deseja realmente prosseguir?")
    ).toBeInTheDocument();
  });

  test("renderiza o título padrão e mensagem vazia se não forem fornecidos", () => {
    render(
      <WindowConfirm title="" sendClose={sendCloseMock} confirm={confirmMock} />
    );

    // Se o título for vazio, o componente utiliza o padrão "Tem certeza?"
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveTextContent("Tem certeza?");

    // Como a mensagem não foi fornecida, o <p> renderizado fica vazio
    // Podemos procurar um elemento <p> cujo conteúdo seja uma string vazia
    const pElement = screen.getByText("", { selector: "p" });
    expect(pElement).toBeInTheDocument();
  });

  test("ao clicar no botão 'Cancelar', chama sendClose", () => {
    render(
      <WindowConfirm
        title="Confirmação"
        message="Deseja realmente prosseguir?"
        sendClose={sendCloseMock}
        confirm={confirmMock}
      />
    );

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(sendCloseMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).not.toHaveBeenCalled();
  });

  test("ao clicar no botão 'Confirmar', chama confirm e sendClose", () => {
    render(
      <WindowConfirm
        title="Confirmação"
        message="Deseja realmente prosseguir?"
        sendClose={sendCloseMock}
        confirm={confirmMock}
      />
    );

    // Seleciona o botão de confirmar através do data-testid
    const confirmButton = screen.getByTestId("confirm");
    fireEvent.click(confirmButton);

    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(sendCloseMock).toHaveBeenCalledTimes(1);
  });
});
