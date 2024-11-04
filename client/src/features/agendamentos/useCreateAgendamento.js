import { useUI } from "@/context/UIProvider";
import { createAgendamento } from "@/services/agendamentos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateAgendamento() {
  const { toggleModal } = useUI();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createAgendamentoFn } = useMutation({
    mutationFn: (data) => createAgendamento(data),
    onSuccess: () => {
      toast.success("Procedimento agendado!");
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

  return { isCreating, createAgendamentoFn };
}
