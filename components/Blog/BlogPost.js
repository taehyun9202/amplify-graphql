import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import PostComment from "./PostComment";
import {
  clearBlogger,
  getBlogger,
  getPosts,
  putNotification,
} from "../../store/actions/blogAction";
import PostInput from "../Input/PostInput";
import DialogWrapper from "../wrapper/DialogWrapper";
import { deletePost } from "../../graphql/mutations";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listUsers } from "../../graphql/queries";

const BlogPost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const blog = useSelector((state) => state.blog.profile);
  const [openComment, setOpenComment] = useState(false);
  const [fileURL, setFileURL] = useState(null);
  const [openTemplate, setOpenTemplate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpenComment(false);
    getImage();
  }, [post]);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    Storage.get(`${post?.title}-${blog.username}.jpg`)
      .then((res) => {
        setFileURL(res);
      })
      .catch((err) => console.log(err));
  };

  const deletePostHandler = async () => {
    try {
      if (confirm("You are about to delete the current post.")) {
        await API.graphql(
          graphqlOperation(deletePost, { input: { id: post.id } })
        );
        dispatch(
          putNotification({
            type: "Danger",
            message: "Post Deleted...",
          })
        );
        fetchBlogData();
      }
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

  if (!post) return null;
  return (
    <div className="pb-40">
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
          <p>{blog.username}</p>
          <p>{post?.updatedAt.split("T")[0]}</p>
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
        </div>
      </div>
      <ReactMarkdown
        className="min-h-96"
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      >
        {post?.content}
      </ReactMarkdown>
      {post.photo.key && <img src={fileURL} alt={"post image"} />}
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
        {user.username === blog.username && (
          <div className="flex justify-center items-center">
            <p
              onClick={() => setOpenTemplate(true)}
              className="text-xs border px-2 py-1 cursor-pointer"
            >
              Edit Post
            </p>
            <p
              onClick={() => deletePostHandler()}
              className="text-xs border px-2 py-1 cursor-pointer"
            >
              Delete Post
            </p>
          </div>
        )}
      </div>

      {openComment && (
        <PostComment comments={post.comments.items} id={post.id} />
      )}

      <DialogWrapper
        open={openTemplate}
        setOpen={setOpenTemplate}
        title="New Post"
      >
        <PostInput post={post} />
      </DialogWrapper>
    </div>
  );
};

export default BlogPost;
