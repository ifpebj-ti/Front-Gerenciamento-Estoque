import axios from "axios";
import { api } from "./base";
import { UserRegisterType } from "@/types/userType";

export const getUsers = async (token: string) => {
  try {
    const response = await api.get("/company/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    throw error;
  }
};

export const addUser = async ({
  token,
  data,
}: {
  token: string;
  data: UserRegisterType;
}) => {
  try {
    const response = await api.post("/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 413) {
        throw {
          message:
            error.response?.data?.message || "Imagem excede o limite de 1MB",
          status: error.response?.status,
          data: error.response?.data,
          originalError: error, // Inclui o erro original do Axios
        };
      } else {
        throw {
          message:
            error.response?.data?.message ||
            "Erro ao adicionar ou editar usuário",
          status: error.response?.status,
          data: error.response?.data,
          originalError: error, // Inclui o erro original do Axios
        };
      }
    }
    throw error; // Lança outros tipos de erros
  }
};
