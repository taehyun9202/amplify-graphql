import { Storage } from "@aws-amplify/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UserInfo = ({ user }) => {
  const router = useRouter();
  const [fileURL, setFileURL] = useState(null);

  const getProfileImage = async () => {
    try {
      await Storage.get(`${user.username}-profile.jpg`)
        .then((res) => {
          setFileURL(res);
        })
        .catch((err) => setFileURL(null));
    } catch (err) {
      setFileURL(null);
    }
  };
  useEffect(() => {
    getProfileImage();
  }, [user]);

  const linkToBlog = () => {
    router.push(`/blog/${user.username}`);
  };

  return (
    <article
      key={user.id}
      className="flex items-center justify-between px-2 py-auto border-b py-5 w-full"
    >
      <div className="flex items-center gap-4">
        {fileURL ? (
          <img
            src={fileURL}
            onClick={() => linkToBlog()}
            alt="user profile image"
            className="object-fill w-10 h-10 z-20 rounded-full cursor-pointer"
          />
        ) : (
          <img
            src="/create-user-image.jpg"
            onClick={() => linkToBlog()}
            alt="Add Image"
            className="object-fill w-10 h-10 z-20 rounded-full cursor-pointer"
          />
        )}
        <div>
          <p
            onClick={() => linkToBlog()}
            className="font-semibold cursor-pointer max-w-max hover:underline"
          >
            {user.username}
          </p>
          <p
            onClick={() => linkToBlog()}
            className="text-sm cursor-pointer max-w-max hover:underline"
          >
            {user.description}
          </p>
        </div>
      </div>
      <div
        onClick={() => linkToBlog()}
        className="px-3 py-1 border border-theme rounded cursor-pointer font-semibold hover:bg-theme hover:text-white"
      >
        <p>Go!</p>
      </div>
    </article>
  );
};

export default UserInfo;
