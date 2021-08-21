import React, { useState } from "react";
import Image from "next/image";

import FriendList from "./FriendList";
const SidebarFriends = () => {
  const [following, setFollowing] = useState("Followings");
  return (
    <div className="border shadow-md rounded">
      <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 text-xs font-normal">
        <div className="relative w-10 h-10 border-2">
          <Image src="/create-user-image.jpg" alt="User Image" layout="fill" />
        </div>
        <div>
          <p className="font-semibold">user Name</p>
          <p>Connection</p>
        </div>
      </div>

      <div className="flex">
        <div
          onClick={() => setFollowing("Followings")}
          className={`w-1/2 text-center py-1 border-2 border-l-0 border-r cursor-pointer font-normal
           ${following === "Followings" && "bg-gray-100 font-semibold"}`}
        >
          Followings
        </div>
        <div
          onClick={() => setFollowing("Followers")}
          className={`w-1/2 text-center py-1 border-2 border-r-0 border-l cursor-pointer font-normal
           ${following === "Followers" && "bg-gray-100 font-semibold"}`}
        >
          Followers
        </div>
      </div>

      <FriendList type={following} />
    </div>
  );
};

export default SidebarFriends;
