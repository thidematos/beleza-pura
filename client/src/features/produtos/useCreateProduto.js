import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUI } from "../../context/UIProvider";
import { createProduto } from "../../services/produtos";
import toast from "react-hot-toast";

export function useCreateProduto() {
  const { toggleModal } = useUI();

  const queryClient = useQueryClient();

  const { isPending, mutate: newProduto } = useMutation({
    mutationFn: (dataForm) => createProduto(dataForm),
    onSuccess: () => {
      toast.success("Produto cadastrado!");
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

  return { isPending, newProduto };
}
