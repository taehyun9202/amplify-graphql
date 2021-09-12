import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const OtherUser = () => {
  const users = useSelector((state) => state.home.users);
  return (
    <div className="lg:flex flex-col gap-2 hidden bg-theme w-60 px-2 rounded h-96">
      <p className="text-lg font-bold my-2 text-white">Other Bloggers</p>
      {users.map((user) => (
        <Link key={user.id} href={`/blog/${user.username}`}>
          <a className="cursor-pointer bg-gray-100 px-4 py-1 hover:bg-gray-200 capitalize w-full rounded-sm">
            - {user.username} Blog
          </a>
        </Link>
      ))}
    </div>
  );
};

export default OtherUser;
