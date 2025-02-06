// productsAPI.test.ts
import axios from "axios";
import { api } from "./../../../API/base";
import {
  getProducts,
  addPost,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./../../../API/products"; // ajuste o caminho conforme sua estrutura

// Vamos supor que os tipos importados (getProductsType, AddProductType, etc.) já estejam definidos em seus respectivos arquivos

// ---------------------------------------------------------------------
// Mock do módulo que exporta o objeto "api"
// ---------------------------------------------------------------------
jest.mock("./../../../API/base", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));
/* eslint-disable */
// Configura axios.isAxiosError para retornar true se o erro tiver a propriedade "isAxiosError: true"
jest
  .spyOn(axios, "isAxiosError")
  .mockImplementation((error: any) => error && error.isAxiosError === true);

describe("getProducts", () => {
  const token = "dummy-token";
  const currentPage = 2;
  const searchName = "test";
  const category = 1;
  const dummyResponse = {
    content: [{ id: 1, name: "Product 1" }],
    totalPages: 3,
  };

  it("retorna os dados quando a requisição é bem-sucedida", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: dummyResponse });

    const result = await getProducts({
      token,
      currentPage,
      searchName,
      category,
    });

    // Como currentPage é 2, a função subtrai 1: página = 1; e adiciona &size=4&sort=name,desc e &categoryId=1
    expect(api.get).toHaveBeenCalledWith(
      `/products?page=1&size=4&sort=name,desc&categoryId=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    expect(result).toEqual(dummyResponse);
  });

  it("retorna null se ocorrer um erro do tipo Axios", async () => {
    const axiosError = { isAxiosError: true };
    (api.get as jest.Mock).mockRejectedValueOnce(axiosError);

    const result = await getProducts({
      token,
      currentPage,
      searchName,
      category,
    });
    expect(result).toBeNull();
  });

  it("lança o erro se ocorrer um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.get as jest.Mock).mockRejectedValueOnce(nonAxiosError);

    await expect(
      getProducts({ token, currentPage, searchName, category })
    ).rejects.toThrow("Network error");
  });
});

describe("addPost", () => {
  const token = "dummy-token";
  const data = {
    name: "New Product",
    unit_value: 100,
    quantity: 10,
    critical_quantity: 2,
    description: "Description",
    categories: [1, 2],
    photo: null,
  };
  const dummyResponse = { id: 1, ...data };

  it("retorna os dados quando a requisição POST é bem-sucedida", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: dummyResponse });

    const result = await addPost({ token, data });
    expect(api.post).toHaveBeenCalledWith("/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    expect(result).toEqual(dummyResponse);
  });

  it("lança erro customizado se ocorrer erro Axios com status 413", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "Image too large" }, status: 413 },
    };
    (api.post as jest.Mock).mockRejectedValueOnce(axiosError);

    await expect(addPost({ token, data })).rejects.toEqual({
      message: "Image too large",
      status: 413,
      data: axiosError.response.data,
      originalError: axiosError,
    });
  });

  it("lança erro customizado se ocorrer erro Axios com status diferente de 413", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "Other error" }, status: 400 },
    };
    (api.post as jest.Mock).mockRejectedValueOnce(axiosError);

    await expect(addPost({ token, data })).rejects.toEqual({
      message: "Other error",
      status: 400,
      data: axiosError.response.data,
      originalError: axiosError,
    });
  });

  it("lança o erro se ocorrer um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.post as jest.Mock).mockRejectedValueOnce(nonAxiosError);

    await expect(addPost({ token, data })).rejects.toThrow("Network error");
  });
});

describe("getProduct", () => {
  const token = "dummy-token";
  const id = 1;
  const dummyProduct = { id: 1, name: "Product 1" };

  it("retorna os dados do produto quando a requisição é bem-sucedida", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: dummyProduct });

    const result = await getProduct({ token, id });
    expect(api.get).toHaveBeenCalledWith(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(dummyProduct);
  });

  it("retorna null se ocorrer erro do tipo Axios", async () => {
    const axiosError = { isAxiosError: true };
    (api.get as jest.Mock).mockRejectedValueOnce(axiosError);

    const result = await getProduct({ token, id });
    expect(result).toBeNull();
  });

  it("lança erro se ocorrer um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.get as jest.Mock).mockRejectedValueOnce(nonAxiosError);

    await expect(getProduct({ token, id })).rejects.toThrow("Network error");
  });
});

describe("updateProduct", () => {
  const token = "dummy-token";
  const id = 1;
  // Note: data.photo é null; assim, a função deverá substituir por new File([], "").
  const data = {
    name: "Updated Product",
    unit_value: 150,
    quantity: 5,
    critical_quantity: 1,
    description: "Updated Description",
    categories: [1],
    photo: null,
  };
  const dummyResponse = { id: 1, ...data };

  it("retorna os dados quando a requisição PUT é bem-sucedida", async () => {
    (api.put as jest.Mock).mockResolvedValueOnce({ data: dummyResponse });

    const result = await updateProduct({ token, id, data });
    // Como data.photo é null, espera-se que o corpo enviado tenha photo como um File (não vazio)
    expect(api.put).toHaveBeenCalledWith(
      `/products/${id}`,
      { ...data, photo: expect.any(File) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    expect(result).toEqual(dummyResponse);
  });

  it("lança erro customizado se ocorrer erro Axios com status 413", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "Image too large" }, status: 413 },
    };
    (api.put as jest.Mock).mockRejectedValueOnce(axiosError);

    await expect(updateProduct({ token, id, data })).rejects.toEqual({
      message: "Image too large",
      status: 413,
      data: axiosError.response.data,
      originalError: axiosError,
    });
  });

  it("lança erro customizado se ocorrer erro Axios com status diferente de 413", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "Update error" }, status: 400 },
    };
    (api.put as jest.Mock).mockRejectedValueOnce(axiosError);

    await expect(updateProduct({ token, id, data })).rejects.toEqual({
      message: "Update error",
      status: 400,
      data: axiosError.response.data,
      originalError: axiosError,
    });
  });

  it("lança erro se ocorrer um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.put as jest.Mock).mockRejectedValueOnce(nonAxiosError);

    await expect(updateProduct({ token, id, data })).rejects.toThrow(
      "Network error"
    );
  });
});

describe("deleteProduct", () => {
  const token = "dummy-token";
  const id = 1;
  const dummyResponse = { message: "Product deleted" };

  it("retorna os dados quando a requisição DELETE é bem-sucedida", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ data: dummyResponse });

    const result = await deleteProduct({ token, id });
    expect(api.delete).toHaveBeenCalledWith(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(dummyResponse);
  });

  it("lança erro customizado se ocorrer erro do tipo Axios", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "Delete error" }, status: 400 },
    };
    (api.delete as jest.Mock).mockRejectedValueOnce(axiosError);

    await expect(deleteProduct({ token, id })).rejects.toEqual({
      message: "Delete error",
      status: 400,
      data: axiosError.response.data,
      originalError: axiosError,
    });
  });

  it("lança erro se ocorrer um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.delete as jest.Mock).mockRejectedValueOnce(nonAxiosError);

    await expect(deleteProduct({ token, id })).rejects.toThrow("Network error");
  });
});
