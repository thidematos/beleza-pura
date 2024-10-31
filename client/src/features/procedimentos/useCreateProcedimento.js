import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUI } from "../../context/UIProvider";
import { createProcedimento } from "../../services/procedimentos";

export function useCreateProcedimento() {
  const { toggleModal } = useUI();

  const queryClient = useQueryClient();

  const { isPending, mutate: newProcedimento } = useMutation({
    mutationFn: (dataForm) => createProcedimento(dataForm),
    onSuccess: () => {
      toast.success("Procedimento cadastrado!");
      toggleModal({ status: false, component: null });
      queryClient.invalidateQueries({
        queryKey: ["procedimentos"],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isPending, newProcedimento };
}
