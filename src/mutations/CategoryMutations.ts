import { addCategory } from "@/API/category";
import { useMutation } from "@tanstack/react-query";

export const useAddCategory = () => {
  return useMutation({
    mutationFn: addCategory,
  });
};
