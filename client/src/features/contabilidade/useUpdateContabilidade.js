import { useUI } from "@/context/UIProvider";
import { updateContabilidade } from "@/services/contabilidade";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateContabilidade(id) {
  const queryClient = useQueryClient();
  const { toggleModal } = useUI();

  const { isPending: isUpdating, mutate: updateContabilidadeApi } = useMutation(
    {
      mutationFn: (data) => updateContabilidade({ id, data }),
      onSuccess: () => {
        toast.success("Atualiado com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["contabilidade"],
        });
        toggleModal({ status: false, component: null });
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.message);
      },
    },
  );

  return { isUpdating, updateContabilidadeApi };
}
