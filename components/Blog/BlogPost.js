import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import PostComment from "./PostComment";
import { putNotification } from "../../store/actions/blogAction";
import { Storage } from "aws-amplify";

const BlogPost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const link = useSelector((state) => state.profile.link);
  const [openComment, setOpenComment] = useState(false);
  const [fileURL, setFileURL] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setOpenComment(false);
    getImage();
  }, [post]);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    Storage.get(`${post?.title}-${user.username}.jpg`)
      .then((res) => {
        setFileURL(res);
      })
      .catch((err) => console.log(err));
  };

  console.log(post, fileURL);
  return (
    <div className="pb-40">
      <p className="text-lg text-gray-200">{link}</p>
      <p className="text-4xl py-4">{post?.title}</p>
      <div className="flex justify-between pt-4 pb-2 mb-6 border-b">
        <div className="flex gap-4 justify-center items-center">
          <div className="relative w-7 h-7 rounded-full border overflow-hidden">
            <Image
              src="/create-user-image.jpg"
              alt="user image"
              layout="fill"
            />
          </div>
          <p>{user.username}</p>
          <p>{post?.updatedAt.split("T")[0]}</p>
          <p>{post?.public ? "Public" : "Private"}</p>
        </div>
        <div className="flex gap-4 items-center">
          <p
            onClick={() => {
              navigator.clipboard
                .writeText(`http://localhost:3000${router.asPath}`)
                .then(
                  function () {
                    dispatch(
                      putNotification({
                        type: "Notification",
                        message: "Copying to clipboard was successful!",
                      })
                    );
                  },
                  function (err) {
                    dispatch(
                      putNotification({
                        type: "Notification",
                        message: "Could not copy text",
                      })
                    );
                    console.error("Async: Could not copy text: ", err);
                  }
                );
            }}
            className="text-xs border px-2 py-1 cursor-pointer"
          >
            Copy URL
          </p>
          <p className="text-xs border px-2 py-1 cursor-pointer">Stats</p>
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </div>
      </div>
      <ReactMarkdown
        className="min-h-96"
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      >
        {post?.content}
      </ReactMarkdown>
      {fileURL && <img src={fileURL} alt={"post image"} />}
      <div className="flex justify-between items-center mt-16">
        <div
          onClick={() => setOpenComment(!openComment)}
          className="flex items-center cursor-pointer"
        >
          <div className="flex justify-center gap-2 items-center border px-2 py-1 ">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-xs">
              Add Comment {`(${post?.comments.items.length})`}
            </p>
          </div>
          <div className="border border-l-0 px-1 py-1">
            {openComment ? (
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
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-xs border px-2 py-1 cursor-pointer">Edit</p>
          <p className="text-xs border px-2 py-1 cursor-pointer">Delete</p>
          <p className="text-xs border px-2 py-1 cursor-pointer">Settings</p>
        </div>
      </div>

      {openComment && (
        <PostComment comments={post.comments.items} id={post.id} />
      )}
    </div>
  );
};

export default BlogPost;
