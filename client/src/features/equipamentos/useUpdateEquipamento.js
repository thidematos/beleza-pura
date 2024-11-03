import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEquipamento } from "../../services/equipamentos";
import toast from "react-hot-toast";
import { useUI } from "../../context/UIProvider";

export function useUpdateEquipamento(id) {
  const queryClient = useQueryClient();
  const { toggleModal } = useUI();

  const { isPending: isUpdating, mutate: updateEquipamentoFn } = useMutation({
    mutationFn: (data) => updateEquipamento({ id, data }),
    onSuccess: () => {
      toast.success("Equipamento atualizado!");
      queryClient.invalidateQueries({
        queryKey: ["equipamentos"],
      });
      toggleModal({ status: false, component: null });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isUpdating, updateEquipamentoFn };
}
