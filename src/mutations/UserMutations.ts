import {
  activateUser,
  addUser,
  deactivateUser,
  sendEmailToResetPassword,
  updateUser,
} from "@/API/users";
import { useMutation } from "@tanstack/react-query";

export const useAddUser = () => {
  const mutation = useMutation({
    mutationFn: addUser,
  });
  return mutation;
};

export const useUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: updateUser,
  });
  return mutation;
};

export const useDeactivateUser = () => {
  const mutation = useMutation({
    mutationFn: deactivateUser,
  });
  return mutation;
};

export const useActivateUser = () => {
  const mutation = useMutation({
    mutationFn: activateUser,
  });
  return mutation;
};
export const useSendEmailToResetPassword = () => {
  const mutation = useMutation({
    mutationFn: sendEmailToResetPassword,
  });
  return mutation;
};
