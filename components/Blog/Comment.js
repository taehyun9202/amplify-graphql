import React, { useState } from "react";
import Image from "next/image";
import CommentInput from "../Input/CommentInput";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation, Storage } from "aws-amplify";
import {
  clearBlogger,
  getBlogger,
  getPosts,
} from "../../store/actions/blogAction";
import { listUsers } from "../../graphql/queries";
import { deleteComment, deleteReply } from "../../graphql/mutations";

const Comment = ({ comment, type, lastComment }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const router = useRouter();

  const [openReply, setOpenReply] = useState(false);
  console.log(type);
  const deleteCommentHandler = async () => {
    try {
      switch (type) {
        case "comment":
          if (confirm("You are about to delete the current comment.")) {
            await API.graphql(
              graphqlOperation(deleteComment, { input: { id: comment.id } })
            );
          }
        case "reply":
          if (confirm("You are about to delete the current reply.")) {
            await API.graphql(
              graphqlOperation(deleteReply, { input: { id: comment.id } })
            );
          }
      }
      fetchBlogData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlogData = async () => {
    try {
      dispatch(getPosts(router.query.id));
      // user data
      await API.graphql(
        graphqlOperation(listUsers, {
          filter: {
            username: {
              eq: router.query.id,
            },
          },
        })
      )
        .then((res) => {
          const user = res.data.listUsers.items[0];
          dispatch(getBlogger(user));
        })
        .catch((err) => {
          dispatch(clearBlogger());
          console.log(err);
        });
    } catch (err) {
      dispatch(clearBlogger());
      console.log(err);
    }
  };

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
        {(user.username === router.query.id ||
          user.username === comment.owner) && (
          <p
            onClick={() => deleteCommentHandler()}
            className="text-xs border px-2 py-1 rounded cursor-pointer hover:bg-white"
          >
            Delete
          </p>
        )}
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
