import { Storage } from "@aws-amplify/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { putLink } from "../../store/actions/homeAction";

const UpdatePost = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [fileURL, setFileURL] = useState(null);
  const [profileURL, setProfileURL] = useState(null);

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

  const linkToBlog = (link = false) => {
    if (link) {
      dispatch(putLink(post.id));
    }
    router.push(`/blog/${post.owner}`);
  };
  return (
    <article className="px-2 pt-8 border-b">
      <div className="flex justify-between items-center gap-10">
        <div>
          <div
            onClick={() => linkToBlog()}
            className="flex justify-start ites-center gap-4 cursor-pointer max-w-max"
          >
            <img src={profileURL} className="w-10 h-10 rounded-full" />
            <div className="flex flex-col justify-center">
              <p className="text-sm">{post.owner}</p>
              <p className="text-xs">{post.createdAt.split("T")[0]}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-4 pb-8">
            <p
              onClick={() => linkToBlog(true)}
              className="text-lg font-semibold hover:underline cursor-pointer max-w-max"
            >
              {post.title}
            </p>
            <p
              onClick={() => linkToBlog(true)}
              className="text-sm line-clamp-3 hover:underline cursor-pointer max-w-max"
            >
              {post.content}
            </p>
          </div>
        </div>
        <img
          onClick={() => linkToBlog(true)}
          src={fileURL}
          className="w-40 h-40 cursor-pointer"
        />
      </div>
    </article>
  );
};

export default UpdatePost;
