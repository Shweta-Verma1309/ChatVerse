import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  // fetch friends on mount
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch("/api/friends", { credentials: "include" });
        const data = await res.json();
        setFriends(data);
      } catch (err) {
        console.error("Error fetching friends:", err);
      }
    };
    fetchFriends();
  }, []);

  // remove friend handler
  const handleRemoveFriend = async (id) => {
    try {
      await fetch(`/api/friends/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setFriends(prev => prev.filter(friend => friend._id !== id));
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  if (!friends.length) {
    return <p className="text-center">No friends yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {friends.map(friend => (
        <FriendCard 
          key={friend._id} 
          friend={friend} 
          handleRemoveFriend={handleRemoveFriend} 
        />
      ))}
    </div>
  );
};

export default FriendsList;
