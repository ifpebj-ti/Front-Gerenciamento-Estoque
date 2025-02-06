// categoriesAPI.test.ts
import { getCategories, addCategory } from "./../../../API/category"; // ajuste o caminho conforme sua estrutura
import { api } from "./../../../API/base";

// --- Mock do módulo base ---
// Aqui, simulamos o objeto "api" (instância do axios) para controlar as chamadas GET e POST.
jest.mock("./../../../API/base", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe("getCategories", () => {
  const token = "dummy-token";
  const dummyCategories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
  ];

  it("deve retornar os dados quando a requisição é bem-sucedida", async () => {
    // Simula que api.get resolve com os dados esperados
    (api.get as jest.Mock).mockResolvedValueOnce({ data: dummyCategories });

    const result = await getCategories(token);

    // Verifica se a chamada à API foi feita com o endpoint e os headers corretos
    expect(api.get).toHaveBeenCalledWith("/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toEqual(dummyCategories);
  });

  it("deve retornar null quando ocorre um erro Axios", async () => {
    // Simula um erro do tipo Axios (possui a propriedade isAxiosError=true)
    const axiosError = { isAxiosError: true, message: "Axios error" };
    (api.get as jest.Mock).mockRejectedValueOnce(axiosError);

    const result = await getCategories(token);
    expect(result).toBeNull();
  });

  it("deve relançar o erro quando ocorre um erro não Axios", async () => {
    const nonAxiosError = new Error("Non-axios error");
    (api.get as jest.Mock).mockRejectedValueOnce(nonAxiosError);

    await expect(getCategories(token)).rejects.toThrow("Non-axios error");
  });
});

describe("addCategory", () => {
  const token = "dummy-token";
  const name = "New Category";
  const dummyResponse = { id: 1, name: "New Category" };

  it("deve retornar os dados quando a requisição é bem-sucedida", async () => {
    // Simula que api.post resolve com os dados retornados
    (api.post as jest.Mock).mockResolvedValueOnce({ data: dummyResponse });

    const result = await addCategory({ token, name });

    // Verifica se a chamada à API foi feita com o endpoint, o body e os headers corretos
    expect(api.post).toHaveBeenCalledWith(
      "/categories",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result).toEqual(dummyResponse);
  });

  it("deve retornar null quando ocorre um erro Axios", async () => {
    const axiosError = { isAxiosError: true, message: "Axios error" };
    (api.post as jest.Mock).mockRejectedValueOnce(axiosError);

    const result = await addCategory({ token, name });
    expect(result).toBeNull();
  });

  it("deve relançar o erro quando ocorre um erro não Axios", async () => {
    const nonAxiosError = new Error("Non-axios error");
    (api.post as jest.Mock).mockRejectedValueOnce(nonAxiosError);

    await expect(addCategory({ token, name })).rejects.toThrow(
      "Non-axios error"
    );
  });
});
