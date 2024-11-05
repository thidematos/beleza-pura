import { useUI } from "@/context/UIProvider";
import { updateAgendamento } from "@/services/agendamentos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateAgendamento(id) {
  const { toggleModal } = useUI();
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateAgendamentoApi } = useMutation({
    mutationFn: (data) => updateAgendamento({ id, data }),
    onSuccess: () => {
      toast.success("Agendamento atualizado!");
      queryClient.invalidateQueries({
        queryKey: ["agendamentos"],
      });
      toggleModal({ status: false, component: null });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isUpdating, updateAgendamentoApi };
}
