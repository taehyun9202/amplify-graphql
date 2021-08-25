import React, { useState } from "react";
import Image from "next/image";
import CommentInput from "../Input/CommentInput";
import moment from "moment";

const Comment = ({ comment, type, lastComment }) => {
  var date = moment();

  console.log(date.format());
  const [openReply, setOpenReply] = useState(false);

  return (
    <div
      key={comment.id}
      className={`${!lastComment && "border-b"} ${
        type === "reply" && "border-gray-300"
      } py-4`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative h-4 w-4 rounded-full border border-gray-300 overflow-hidden">
            <Image
              src="/create-user-image.jpg"
              alt="user image"
              layout="fill"
            />
          </div>
          <p className="text-red-600">{comment.owner}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 cursor-pointer p-0.5 rounded-full hover:${
            type === "comment" ? "bg-gray-200" : "bg-gray-100"
          }`}
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
      <p className="py-1">{comment.content}</p>
      <p className="text-xs text-gray-500">{comment.updatedAt.split(".")[0]}</p>

      {type === "comment" && (
        <div className="flex justify-between items-center pt-2">
          <p
            onClick={() => setOpenReply(!openReply)}
            className="text-xs border px-2 py-1 rounded cursor-pointer hover:bg-white"
          >
            Reply {type === "comment" && `(${comment.reply.items.length})`}
          </p>
          <div className="flex items-center justify-center border px-2 py-1 rounded cursor-pointer gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 hover:text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-xs">{comment.like ? comment.like : "0"}</p>
          </div>
        </div>
      )}
      <div className={openReply && "mt-4"}>
        {openReply &&
          comment.reply.items.map((reply, idx) => (
            <div key={reply.id} className="bg-gray-200 px-2 md:px-4">
              <Comment
                comment={reply}
                type={"reply"}
                lastComment={idx === comment.reply.items.length - 1}
              />
            </div>
          ))}
      </div>
      {type === "comment" && openReply && (
        <CommentInput type={"reply"} id={comment.id} />
      )}
    </div>
  );
};

export default Comment;
