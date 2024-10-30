import { useQuery } from "@tanstack/react-query";
import { getAllProdutos } from "../../services/produtos";

export function useGetProdutos() {
  const {
    isPending,
    data: produtos,
    error,
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: getAllProdutos,
  });

  return [isPending, produtos];
}
