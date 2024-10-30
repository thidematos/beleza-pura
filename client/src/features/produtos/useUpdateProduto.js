import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUI } from "../../context/UIProvider";
import { createProduto, updateProduto } from "../../services/produtos";
import toast from "react-hot-toast";

export function useUpdateProduto(id) {
  const { toggleModal } = useUI();

  const queryClient = useQueryClient();

  const { isPending, mutate: updateProdutoFn } = useMutation({
    mutationFn: (dataForm) => updateProduto({ id, data: dataForm }),
    onSuccess: () => {
      toast.success("Produto atualizado!");
      toggleModal({ status: false, component: null });
      queryClient.invalidateQueries({
        queryKey: ["produtos"],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isPending, updateProdutoFn };
}
