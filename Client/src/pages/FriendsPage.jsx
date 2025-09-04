import { useState } from "react";
import FriendCard from "../components/FriendCard";

// import { Button } from "../components/ui/button";
import { UserPlus } from "lucide-react";
import { getUserFriends} from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export default function FriendsPage() {
  const { data: friends,  isLoading} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if(isLoading){
    return(
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-400">Loading friends....</p>
      </div>
    );
  }



  return (
    <div className="p-6 text-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-amber-400">Your Friends</h1>
        {/* <Button variant="outline" className="border-amber-500 text-amber-400">
          <UserPlus className="mr-2 h-4 w-4" /> Friend Requests ({requests.length})
        </Button> */}
      </div>

      {/* Friends List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend}  />
          ))
        
        ) : (
          <p className="text-gray-400">No friends added yet.</p>
        )}
      </div>

    
      
    </div>
  );
}
