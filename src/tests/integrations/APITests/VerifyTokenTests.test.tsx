// verifyToken.test.ts
import axios from "axios";
import { api } from "../../../API/base";
import { verifyToken } from "../../../API/verifyToken"; // ajuste o caminho conforme sua estrutura
import "@testing-library/jest-dom";

// ---------------------------------------------------------------------
// Mock do módulo que exporta a instância "api"
// ---------------------------------------------------------------------
jest.mock("../../../API/base", () => ({
  api: {
    get: jest.fn(),
  },
}));
/* eslint-disable */
// Configura axios.isAxiosError para retornar true se o objeto de erro tiver a propriedade isAxiosError === true
jest
  .spyOn(axios, "isAxiosError")
  .mockImplementation((error: any) => error && error.isAxiosError === true);

describe("verifyToken", () => {
  const dummyToken = "dummy-token";

  it("retorna data e status quando a requisição é bem-sucedida", async () => {
    const dummyResponseData = { id: 1, name: "User 1" };
    const dummyStatus = 200;

    // Simula que api.get resolve com os dados esperados
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: dummyResponseData,
      status: dummyStatus,
    });

    const result = await verifyToken({ token: dummyToken });

    // Verifica se a API foi chamada com o endpoint e headers corretos
    expect(api.get).toHaveBeenCalledWith("/users/me", {
      headers: { Authorization: `Bearer ${dummyToken}` },
    });
    expect(result).toEqual({ data: dummyResponseData, status: dummyStatus });
  });

  it("retorna o objeto de erro quando ocorre um erro Axios", async () => {
    const dummyErrorData = { message: "Unauthorized" };
    const dummyErrorStatus = 401;
    const axiosError = {
      isAxiosError: true,
      response: { data: dummyErrorData, status: dummyErrorStatus },
    };

    (api.get as jest.Mock).mockRejectedValueOnce(axiosError);

    const result = await verifyToken({ token: dummyToken });
    expect(result).toEqual({ data: dummyErrorData, status: dummyErrorStatus });
  });

  it("lança o erro quando ocorre um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network failure");
    (api.get as jest.Mock).mockRejectedValueOnce(nonAxiosError);

    await expect(verifyToken({ token: dummyToken })).rejects.toThrow(
      "Network failure"
    );
  });
});
