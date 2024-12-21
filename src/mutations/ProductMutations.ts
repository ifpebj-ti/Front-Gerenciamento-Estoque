import { addPost, deleteProduct, updateProduct } from "@/API/products";
import { useMutation } from "@tanstack/react-query";

export const useAddProduct = () => {
  const mutation = useMutation({
    mutationFn: addPost,
  });

  return mutation;
};

export const useUpdateProduct = () => {
  const mutation = useMutation({
    mutationFn: updateProduct,
  });
  return mutation;
};

export const useDeleteProduct = () => {
  const mutation = useMutation({
    mutationFn: deleteProduct,
  });
  return mutation;
};
