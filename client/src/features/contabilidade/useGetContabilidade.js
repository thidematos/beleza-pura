import { getContabilidade } from "@/services/contabilidade";
import { useQuery } from "@tanstack/react-query";

export function useGetContabilidade() {
  const { isPending: isGetting, data: contabilidades } = useQuery({
    queryKey: ["contabilidade"],
    queryFn: getContabilidade,
  });

  return { isGetting, contabilidades };
}
