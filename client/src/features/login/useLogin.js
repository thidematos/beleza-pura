import { login } from "@/services/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLogging, mutate: loginFn } = useMutation({
    mutationFn: (credentials) => login(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Bem vindo!");
      navigate("/overview");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });

  return { isLogging, loginFn };
}

export default useLogin;
