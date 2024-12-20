import axios from "axios";
import { api } from "./base";
import { getProductsType } from "@/types/getProductsType";
import { ProductDataResponse } from "@/types/productType";
import { categoryType } from "@/types/categoryType";

export const getProducts = async ({
  token,
  currentPage,
  searchName,
  category,
}: getProductsType): Promise<ProductDataResponse | null> => {
  console.log(searchName);
  try {
    const response = await api.get(
      `/products?page=${
        currentPage ? currentPage - 1 : 0
      }&size=20&sort=name,desc${category ? `&categoryId=${category}` : ""}`,
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
      return null;
    }
    throw error;
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
