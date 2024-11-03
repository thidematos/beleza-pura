import { getAllUsuarios } from "@/services/usuarios";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  const {
    isPending: isGetting,
    data: usuarios,
    error,
  } = useQuery({
    queryKey: ["usuarios"],
    queryFn: getAllUsuarios,
  });

  return { isGetting, usuarios, error };
}
