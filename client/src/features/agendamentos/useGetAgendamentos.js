import { getAgendamentos } from "@/services/agendamentos";
import { useQuery } from "@tanstack/react-query";

export function useGetAgendamentos() {
  const { isPending: isGetting, data: agendamentos } = useQuery({
    queryKey: ["agendamentos"],
    queryFn: getAgendamentos,
  });

  return { isGetting, agendamentos };
}
