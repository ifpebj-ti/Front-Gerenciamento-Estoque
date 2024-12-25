import { addUser } from "@/API/users";
import { useMutation } from "@tanstack/react-query";

export const useAddUser = () => {
  const mutation = useMutation({
    mutationFn: addUser,
  });
  return mutation;
};
