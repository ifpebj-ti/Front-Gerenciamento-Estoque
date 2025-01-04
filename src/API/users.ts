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
      return null;
    }
    throw error;
  }
};
