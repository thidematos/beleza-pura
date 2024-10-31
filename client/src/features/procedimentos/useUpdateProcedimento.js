import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUI } from "../../context/UIProvider";
import toast from "react-hot-toast";
import { updateProcedimento } from "../../services/procedimentos";

export function useUpdateProcedimento(id) {
  const { toggleModal } = useUI();

  const queryClient = useQueryClient();

  const { isPending, mutate: updateProcedimentoFn } = useMutation({
    mutationFn: (dataForm) =>
      updateProcedimento({ procedimentoID: id, data: dataForm }),
    onSuccess: () => {
      toast.success("Procedimento atualizado!");
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

  return { isPending, updateProcedimentoFn };
}
