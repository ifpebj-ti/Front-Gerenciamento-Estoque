import { addPost } from "@/API/products";
import { useMutation } from "@tanstack/react-query";

export const useAddProduct = () => {
  const mutation = useMutation({
    mutationFn: addPost,
  });

  return mutation;
};
