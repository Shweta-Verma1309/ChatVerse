
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriend } from "../lib/api";
import toast from "react-hot-toast";

const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  const { mutate: removeFriendMutation, isPending } = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      toast.success("Friend removed successfully");
      // This will automatically refresh the friends list on the UI
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove friend");
    },
  });

  return { removeFriendMutation, isPending };
};

export default useRemoveFriend;