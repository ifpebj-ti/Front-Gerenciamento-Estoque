import { getUser, getUsers } from "@/API/users";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (token: string) => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(token),
    enabled: !!token,
  });

  return query;
};

export const useGetUser = (token: string) => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(token),
    enabled: !!token,
  });
  return query;
};
