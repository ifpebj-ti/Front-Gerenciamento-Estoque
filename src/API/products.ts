import axios from "axios";
import { api } from "./base";
import { getProductsType } from "@/types/getProductsType";
import { ProductDataResponse } from "@/types/productType";

export const getProducts = async ({
  token,
  currentPage,
  searchName,
  category,
}: getProductsType): Promise<ProductDataResponse | null> => {
  try {
    const response = await api.get(
      `/products?page=${
        currentPage ? currentPage - 1 : 0
      }&size=4&sort=name,desc${
        category ? `&categoryId=${category}` : ""
      }&productName=${searchName ? searchName : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    throw error;
  }
};

export type AddProductType = {
  name: string;
  unit_value: number;
  quantity: number;
  critical_quantity: number;
  description: string;
  categories: number[];
  photo: File | null;
};

export const addPost = async ({
  token,
  data,
}: {
  token: string;
  data: AddProductType;
}) => {
  try {
    const response = await api.post("/products", data, {
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
            "Erro ao adicionar ou editar produto",
          status: error.response?.status,
          data: error.response?.data,
          originalError: error, // Inclui o erro original do Axios
        };
      }
    }
    throw error; // Lança outros tipos de erros
  }
};

export const getProduct = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  try {
    const response = await api.get(`/products/${id}`, {
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

export const updateProduct = async ({
  token,
  id,
  data,
}: {
  token: string;
  id: number | undefined;
  data: AddProductType;
}) => {
  try {
    const response = await api.put(
      `/products/${id}`,
      { ...data, photo: data.photo ? data.photo : new File([], "") },
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
            "Erro ao adicionar ou editar produto",
          status: error.response?.status,
          data: error.response?.data,
          originalError: error, // Inclui o erro original do Axios
        };
      }
    }
    throw error; // Lança outros tipos de erros
  }
};

export const deleteProduct = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  try {
    const response = await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || "Erro ao deletar produto!",
        status: error.response?.status,
        data: error.response?.data,
        originalError: error, // Inclui o erro original do Axios
      };
    }
    throw error; // Lança outros tipos de erros
  }
};
