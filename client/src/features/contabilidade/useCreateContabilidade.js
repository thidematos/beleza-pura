import { useUI } from "@/context/UIProvider";
import { createContabilidade } from "@/services/contabilidade";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateContabilidade() {
  const { toggleModal } = useUI();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createContabilidadeApi } = useMutation(
    {
      mutationFn: (data) => createContabilidade(data),
      onSuccess: () => {
        toast.success("Registro criado!");
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

  return { isCreating, createContabilidadeApi };
}
