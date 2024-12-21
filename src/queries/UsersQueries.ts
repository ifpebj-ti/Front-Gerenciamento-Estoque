import { getUsers } from "@/API/users";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (token: string) => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(token),
    enabled: !!token,
  });

  return query;
};
