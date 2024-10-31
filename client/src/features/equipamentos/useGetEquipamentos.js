import { useQuery } from "@tanstack/react-query";
import { getAllEquipamentos } from "../../services/equipamentos";

export function useGetEquipamentos() {
  const {
    isPending: isGetting,
    data: equipamentos,
    errorOnEquipamentos,
  } = useQuery({
    queryFn: getAllEquipamentos,
    queryKey: ["equipamentos"],
  });

  return { isGetting, equipamentos, errorOnEquipamentos };
}
