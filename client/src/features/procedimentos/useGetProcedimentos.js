import { useQuery } from "@tanstack/react-query";
import { getAllProcedimentos } from "../../services/procedimentos";

export function useGetProcedimentos() {
  const {
    isPending,
    data: procedimentos,
    error,
  } = useQuery({
    queryKey: ["procedimentos"],
    queryFn: getAllProcedimentos,
  });

  return { isPending, procedimentos };
}
