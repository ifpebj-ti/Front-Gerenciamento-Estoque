// usersAPI.test.ts
import axios from "axios";
import { api } from "./../../../API/base";
import {
  getUsers,
  getUser,
  addUser,
  sendEmailToResetPassword,
  resetPassword,
} from "./../../../API/users"; // Ajuste o caminho conforme sua estrutura
import { UserRegisterType } from "@/types/userType";

// Supondo que os tipos UserRegisterType e UserUpdateType estejam definidos em "@/types/userType"

// ---------------------------------------------------------------------
// Mock do módulo que exporta a instância "api"
// ---------------------------------------------------------------------
jest.mock("./../../../API/base", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(), // se necessário
  },
}));
/* eslint-disable */
// Configura axios.isAxiosError para retornar true se o erro possuir a propriedade isAxiosError === true
jest
  .spyOn(axios, "isAxiosError")
  .mockImplementation((error: any) => error && error.isAxiosError === true);

describe("getUsers", () => {
  const token = "dummy-token";
  const dummyData = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ];

  it("retorna os dados quando a requisição é bem-sucedida", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: dummyData });

    const result = await getUsers(token);
    expect(api.get).toHaveBeenCalledWith("/company/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(dummyData);
  });

  it("retorna null quando ocorre um erro Axios", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce({ isAxiosError: true });
    const result = await getUsers(token);
    expect(result).toBeNull();
  });

  it("lança erro quando ocorre um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.get as jest.Mock).mockRejectedValueOnce(nonAxiosError);
    await expect(getUsers(token)).rejects.toThrow("Network error");
  });
});

describe("getUser", () => {
  const token = "dummy-token";
  const dummyUser = { id: 1, name: "User 1" };

  it("retorna os dados do usuário quando a requisição é bem-sucedida", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: dummyUser });
    const result = await getUser(token);
    expect(api.get).toHaveBeenCalledWith("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(result).toEqual(dummyUser);
  });

  it("lança erro customizado se ocorrer um erro Axios", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "User not found" } },
    };
    (api.get as jest.Mock).mockRejectedValueOnce(axiosError);
    await expect(getUser(token)).rejects.toEqual({
      message: "User not found",
    });
  });

  it("lança erro quando ocorre um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.get as jest.Mock).mockRejectedValueOnce(nonAxiosError);
    await expect(getUser(token)).rejects.toThrow("Network error");
  });
});

describe("addUser", () => {
  const token = "dummy-token";
  const data: UserRegisterType = {
    name: "New User",
    // Inclua os campos obrigatórios conforme definido em UserRegisterType
    password: "123456",
    email: "newuser@example.com",
    photo: null,
    roles: [1],
    status: true,
    first_acess: true,
  };
  const dummyResponse = { id: 1, ...data };

  it("retorna os dados quando a requisição POST é bem-sucedida", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: dummyResponse });
    const result = await addUser({ token, data });
    expect(api.post).toHaveBeenCalledWith("/users", data, {
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
    await expect(addUser({ token, data })).rejects.toEqual({
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
    await expect(addUser({ token, data })).rejects.toEqual({
      message: "Other error",
      status: 400,
      data: axiosError.response.data,
      originalError: axiosError,
    });
  });

  it("lança o erro quando ocorre um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.post as jest.Mock).mockRejectedValueOnce(nonAxiosError);
    await expect(addUser({ token, data })).rejects.toThrow("Network error");
  });
});

describe("sendEmailToResetPassword", () => {
  const email = "test@example.com";
  const dummyResponse = { message: "Email sent" };

  it("retorna os dados quando a requisição é bem-sucedida", async () => {
    // Como essa função utiliza axios.post diretamente, fazemos spy em axios.post
    jest.spyOn(axios, "post").mockResolvedValueOnce({ data: dummyResponse });

    const result = await sendEmailToResetPassword({ email });
    expect(axios.post).toHaveBeenCalledWith(
      `https://137.131.180.24:8080/users/sendEmailResetPassword?email=${email}`
    );
    expect(result).toEqual(dummyResponse);
  });

  it("lança erro customizado se ocorrer erro do tipo Axios", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "Send email error" } },
    };
    jest.spyOn(axios, "post").mockRejectedValueOnce(axiosError);
    await expect(sendEmailToResetPassword({ email })).rejects.toEqual({
      message: "Send email error",
    });
  });

  it("lança erro quando ocorre um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    jest.spyOn(axios, "post").mockRejectedValueOnce(nonAxiosError);
    await expect(sendEmailToResetPassword({ email })).rejects.toThrow(
      "Network error"
    );
  });
});

describe("resetPassword", () => {
  const token = "dummy-token";
  const newPassword = "newPass123";
  const dummyResponse = { message: "Password reset successfully" };

  it("retorna os dados quando a requisição PUT é bem-sucedida", async () => {
    (api.put as jest.Mock).mockResolvedValueOnce({ data: dummyResponse });
    const result = await resetPassword({ token, newPassword });
    expect(api.put).toHaveBeenCalledWith(`/users/reset-password`, {
      newPassword,
      token,
    });
    expect(result).toEqual(dummyResponse);
  });

  it("lança erro customizado se ocorrer erro do tipo Axios", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: "Reset error" } },
    };
    (api.put as jest.Mock).mockRejectedValueOnce(axiosError);
    await expect(resetPassword({ token, newPassword })).rejects.toEqual({
      message: "Reset error",
    });
  });

  it("lança erro quando ocorre um erro não-Axios", async () => {
    const nonAxiosError = new Error("Network error");
    (api.put as jest.Mock).mockRejectedValueOnce(nonAxiosError);
    await expect(resetPassword({ token, newPassword })).rejects.toThrow(
      "Network error"
    );
  });
});
