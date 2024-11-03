import { useUI } from "@/context/UIProvider";
import { createUsuario } from "@/services/usuarios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { toggleModal } = useUI();

  const { isPending: isCreating, mutate: createUserFn } = useMutation({
    mutationFn: (data) => createUsuario(data),
    onSuccess: () => {
      toast.success("Usuário criado!");
      queryClient.invalidateQueries({
        queryKey: ["usuarios"],
      });
      toggleModal({ status: false, component: null });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isCreating, createUserFn };
}
