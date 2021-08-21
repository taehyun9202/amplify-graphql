import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import remarkGfm from "remark-gfm";
import Image from "next/image";

const BlogPost = ({ post }) => {
  const user = useSelector((state) => state.profile.profile);
  const link = useSelector((state) => state.profile.link);

  return (
    <div>
      <p className="text-lg text-gray-200">{link}</p>
      <p className="text-4xl py-4">{post?.title}</p>
      <div className="flex justify-between pt-4 pb-2 mb-6 border-b">
        <div className="flex gap-4 justify-center items-center">
          <div className="relative w-7 h-7 rounded-full border-2">
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
        <div className="flex gap-4">
          <p className="border px-2 py-1 cursor-pointer">Copy URL</p>
          <p className="border px-2 py-1 cursor-pointer">Stats</p>
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
      <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
        {post?.content}
      </ReactMarkdown>
      <div className="flex justify-between items-center mt-16">
        <p className="border px-2 py-1 cursor-pointer">Add Comment</p>
        <div className="flex justify-center items-center">
          <p className="border px-2 py-1 cursor-pointer">Edit</p>
          <p className="border px-2 py-1 cursor-pointer">Delete</p>
          <p className="border px-2 py-1 cursor-pointer">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
