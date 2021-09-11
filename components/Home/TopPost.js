import { Storage } from "@aws-amplify/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { putLink } from "../../store/actions/homeAction";

const TopPost = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [fileURL, setFileURL] = useState(null);
  const [profileURL, setProfileURL] = useState(null);
  const [onHover, setOnHover] = useState(false);
  const getImage = async () => {
    Storage.get(`${post?.title}-${post.owner}.jpg`)
      .then((res) => {
        setFileURL(res);
      })
      .catch((err) => console.log(err));
  };

  const getProfileImage = async () => {
    try {
      await Storage.get(`${post.owner}-profile.jpg`)
        .then((res) => {
          setProfileURL(res);
        })
        .catch((err) => setProfileURL(null));
    } catch (err) {
      setFileURL(null);
    }
  };

  useEffect(() => {
    getImage();
    getProfileImage();
  }, [post]);

  const linkToBlog = () => {
    dispatch(putLink(post.id));
    router.push(`/blog/${post.owner}`);
  };

  return (
    <div className="cursor-pointer" onClick={() => linkToBlog()}>
      {post.photo.key && (
        <img
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
          src={fileURL}
          alt={"post image"}
          className="w-52 lg:w-56 h-52 object-fill"
        />
      )}
      <div
        className={`relative transform transition duration-500 w-52 lg:w-56 -top-52 ${
          onHover ? "h-52" : "h-0"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div className="absolute w-full h-full bg-gray-800 opacity-70 z-10 " />
        <div
          className={`absolute w-full h-full text-white z-20 flex flex-col items-center justify-center gap-2 bg-transparent ${
            onHover ? "opacity-100" : "opacity-0"
          }`}
        >
          {profileURL ? (
            <img
              src={profileURL}
              alt="Add Image"
              className="object-fill w-12 h-12 z-20 rounded-full"
            />
          ) : (
            <img
              src="/create-user-image.jpg"
              alt="Add Image"
              className="object-fill w-12 h-12 z-20 rounded-full"
            />
          )}
          <p>{post.owner}</p>
          <p>{post.title}</p>
          <p className="">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default TopPost;
