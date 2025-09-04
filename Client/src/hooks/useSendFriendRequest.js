import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../lib/api";
import toast from "react-hot-toast";

const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      toast.success("Friend request sent!");
      // This automatically updates the UI to show the "Request Sent" button
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
    onError: (error) => {
      // This will display the specific message from the server
      toast.error(error.response?.data?.message || "Failed to send request");
    },
  });

  return { sendRequestMutation, isPending };
};

export default useSendFriendRequest;