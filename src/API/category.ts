import axios from "axios";
import { api } from "./base";
import { categoryType } from "@/types/categoryType";

export const getCategories = async (
  token: string
): Promise<categoryType[] | null> => {
  try {
    const response = await api.get("/categories", {
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

export const addCategory = async ({
  token,
  name,
}: {
  token: string;
  name: string;
}) => {
  try {
    const response = await api.post(
      "/categories",
      { name },
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
