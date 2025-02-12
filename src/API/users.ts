import axios from "axios";
import { api } from "./base";
import { UserRegisterType, UserUpdateType } from "@/types/userType";

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

export const getUser = async (token: string) => {
  try {
    const response = await api.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Erro ao buscar usuário",
      };
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

export const updateUser = async ({
  token,
  email,
  data,
}: {
  token: string;
  email: string;
  data: UserUpdateType;
}) => {
  try {
    const response = await api.put(
      `/users/updateUser/${email}`,
      {
        password: data.password ? data.password : "",
        photo: data.photo ? data.photo : new File([], ""),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
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

export const deactivateUser = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  try {
    const response = await api.put(
      `/users/desactive/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Erro ao desativar usuário",
        status: error.response?.status,
        data: error.response?.data,
        originalError: error, // Inclui o erro original do Axios
      };
    }
    throw error; // Lança outros tipos de erros
  }
};

export const activateUser = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  try {
    const response = await api.put(
      `/users/active/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Erro ao ativar usuário",
      };
    }
    throw error; // Lança outros tipos de erros
  }
};

export const sendEmailToResetPassword = async ({
  email,
}: {
  email: string;
}) => {
  try {
    const response = await api.post(
      `/users/sendEmailResetPassword?email=${email}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Erro ao enviar email",
      };
    }
    throw error; // Lança outros tipos de erros
  }
};

export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  try {
    console.log(token);
    const response = await api.put(`/users/reset-password`, {
      newPassword: newPassword,
      token: token,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Erro ao recuperar a senha",
      };
    }
    throw error; // Lança outros tipos de erros
  }
};
