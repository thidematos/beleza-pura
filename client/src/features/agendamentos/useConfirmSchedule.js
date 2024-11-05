import { useUI } from "@/context/UIProvider";
import { confirmSchedule } from "@/services/agendamentos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useConfirmSchedule(id) {
  const queryClient = useQueryClient();
  const { toggleModal } = useUI();

  const { isPending: isConfirming, mutate: confirmScheduleApi } = useMutation({
    mutationFn: (data) => confirmSchedule({ status: data, id }),
    onSuccess: (value) => {
      toast.success(`Agendamento ${value.status}`);
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

  return { isConfirming, confirmScheduleApi };
}
