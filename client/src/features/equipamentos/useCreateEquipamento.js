import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEquipamento } from "../../services/equipamentos";
import toast from "react-hot-toast";
import { useUI } from "../../context/UIProvider";

function useCreateEquipamento() {
  const queryClient = useQueryClient();
  const { toggleModal } = useUI();

  const { isPending: isCreating, mutate: createEquipamentoFn } = useMutation({
    mutationFn: (data) => createEquipamento(data),
    onSuccess: () => {
      toast.success("Equipamento cadastrado!");
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

  return { isCreating, createEquipamentoFn };
}

export default useCreateEquipamento;
