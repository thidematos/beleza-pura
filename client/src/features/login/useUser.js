import { getCurrentUser } from "@/services/login";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    isPending: isValidating,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isValidating, user, error };
}
