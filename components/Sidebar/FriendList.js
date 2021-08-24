import React, { useState } from "react";
import Image from "next/image";
const FriendList = ({ type }) => {
  const [dummy, setDummy] = useState(["tyler", "lena", "royce", "luke"]);
  return (
    <div className="flex flex-col h-60">
      <div className="relative p-2">
        <input
          className="border-2 w-full outline-none pl-2 pr-6 h-8"
          placeholder={`Search ${type}`}
          type="text"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute h-4 w-4 right-4 top-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="border-t border-b py-4 mx-2 flex-1">
        <div className="grid grid-cols-3 gap-2">
          {type === "Followings" &&
            dummy.map((friend, idx) => (
              <div key={idx + friend} className="col-span-1">
                <div className="relative w-10 h-10 mx-auto border">
                  <Image
                    src="/create-user-image.jpg"
                    alt={idx + friend}
                    layout="fill"
                  />
                </div>
                <p className="text-xs font-normal text-center">{friend}</p>
              </div>
            ))}

          <div className="col-span-3">
            {type === "Followers" && (
              <p className="text-center">There is no followers</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-2 py-1 cursor-pointer group">
        <p className="font-normal group-hover:font-semibold">
          See all the connection
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default FriendList;
