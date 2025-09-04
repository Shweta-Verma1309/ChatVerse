import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";
import { StreamChat } from "stream-chat";
import { Outlet, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const chatClient = StreamChat.getInstance(import.meta.env.VITE_STREAM_API_KEY);

const Layout = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const queryClient = useQueryClient();
  const showSidebar = !location.pathname.startsWith("/chat");

  useEffect(() => {
    if (!authUser?.token && !chatClient.userID) return;

     chatClient.connectUser(
      {
        id: authUser._id,
        name: authUser.fullName,
        image: authUser.profilePic,
      },
      authUser.token
    );

    
  }, [authUser]);

  useEffect(() => {
    if (!authUser) return;

    const handleNewMessage = (event) => {
      if (event.user.id !== authUser?._id) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={event.user.image}
                    alt={event.user.name || "User Avatar"}
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.user.name || "Someone"}</p>
                  <p className="mt-1 text-sm text-gray-500">{event.message.text}</p>
                </div>
              </div>
            </div>
          </div>
        ));
      }
    };

    const listener = chatClient.on("message.new", handleNewMessage);

    return () => {
      listener.unsubscribe();
    };
  }, [authUser]);

  useEffect(() => {
    if (!authUser) return;

    console.log("Friend request listener is active");
    const handleFriendRequest = (event) => {
      console.log("Received friend-request.new event",event);
      toast.success(`${event.sender.name} sent you a friend request!`);
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    };

    const listener = chatClient.on("friend-request.new", handleFriendRequest);

    return () => {
      listener.unsubscribe();
    };
  }, [authUser, queryClient]);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;