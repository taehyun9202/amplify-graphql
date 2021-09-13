import { Storage } from "@aws-amplify/storage";
import React from "react";
import UserInfo from "./UserInfo";

const UserList = ({ users }) => {
  return (
    <section className="w-full">
      {users.slice(0, 20).map((user) => (
        <UserInfo user={user} />
      ))}
    </section>
  );
};

export default UserList;
