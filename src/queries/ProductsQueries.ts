import { getProducts } from "@/API/products";
import { getProductsType } from "@/types/getProductsType";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = ({
  token,
  currentPage,
  searchName,
  category,
}: getProductsType) => {
  return useQuery({
    queryKey: ["products", currentPage, searchName],
    queryFn: () => getProducts({ token, currentPage, searchName, category }),
    enabled: !!token, // Só executa a query se o token estiver disponível
  });
};
