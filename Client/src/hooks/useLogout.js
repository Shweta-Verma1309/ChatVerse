import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { chatClient } from "../components/Layout";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      chatClient.disconnectUser();
      queryClient.invalidateQueries({ queryKey: ["authUser"] });}
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;
