// WindowAddNewCategory.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import WindowAddNewCategory from "@/app/_components/Stock/WindowAddNewCategory";
import "@testing-library/jest-dom";

// -----------------------------------------------------------------------
// Mock dos hooks externos
// -----------------------------------------------------------------------
import { useSession } from "next-auth/react";
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

import { useAddCategory } from "../../../mutations/CategoryMutations";
jest.mock("../../../mutations/CategoryMutations", () => ({
  useAddCategory: jest.fn(),
}));

// -----------------------------------------------------------------------
// Configuração dos mocks padrão para os testes
// -----------------------------------------------------------------------
const sendCloseMock = jest.fn();
const mutateMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  // Simula uma sessão com token "fake-token"
  (useSession as jest.Mock).mockReturnValue({
    data: { accessToken: "fake-token" },
  });
  // Simula que o hook useAddCategory retorna um objeto com a função mutate
  (useAddCategory as jest.Mock).mockReturnValue({ mutate: mutateMock });
});

describe("WindowAddNewCategory Component", () => {
  test("atualiza o valor do input conforme o usuário digita", () => {
    render(<WindowAddNewCategory sendClose={sendCloseMock} />);
    const input = screen.getByPlaceholderText(
      "Nome da categoria"
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "Nova Categoria" } });
    expect(input.value).toBe("Nova Categoria");
  });

  test("chama sendClose quando o botão 'Cancelar' é clicado", () => {
    render(<WindowAddNewCategory sendClose={sendCloseMock} />);
    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);
    expect(sendCloseMock).toHaveBeenCalled();
  });

  test("exibe alerta se o valor do input tiver menos de 3 caracteres ao clicar em 'Salvar'", () => {
    // Mock para window.alert
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<WindowAddNewCategory sendClose={sendCloseMock} />);
    const input = screen.getByPlaceholderText(
      "Nome da categoria"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "ab" } });

    const saveButton = screen.getByText("Salvar");
    fireEvent.click(saveButton);

    expect(alertMock).toHaveBeenCalledWith("Digite alguma categoria");
    alertMock.mockRestore();
  });

  test("chama mutate com os dados corretos e, no onSuccess, chama sendClose ao clicar em 'Salvar' com valor válido", async () => {
    render(<WindowAddNewCategory sendClose={sendCloseMock} />);
    const input = screen.getByPlaceholderText(
      "Nome da categoria"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Categoria Válida" } });

    const saveButton = screen.getByText("Salvar");
    fireEvent.click(saveButton);

    // Verifica se mutate foi chamada com o objeto correto:
    // { token: "fake-token", name: "Categoria Válida" }
    expect(mutateMock).toHaveBeenCalled();
    const [sendDataArg, optionsArg] = mutateMock.mock.calls[0];
    expect(sendDataArg).toEqual({
      token: "fake-token",
      name: "Categoria Válida",
    });

    // Simula o onSuccess chamando-o
    act(() => {
      optionsArg.onSuccess();
    });
    expect(sendCloseMock).toHaveBeenCalled();
  });
});
