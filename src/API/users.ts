import axios from "axios";
import { api } from "./base";

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
