import { getCategories } from "@/API/category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = (token: string) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(token),
    enabled: !!token, // Só executa a query se o token estiver disponível
  });
};
