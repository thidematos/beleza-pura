import { useUI } from "@/context/UIProvider";
import { updateUsuario } from "@/services/usuarios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser(id) {
  const queryClient = useQueryClient();
  const { toggleModal } = useUI();

  const { isPending: isUpdating, mutate: updateUserFn } = useMutation({
    mutationFn: (data) => updateUsuario({ id, data }),
    onSuccess: () => {
      toast.success("Usuário atualizado!");
      queryClient.invalidateQueries({
        queryKey: ["usuarios"],
      });
      toggleModal({ status: false, component: null });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return { isUpdating, updateUserFn };
}
