import React, { useState } from "react";

const CommentInput = ({ type, id }) => {
  const [publicPost, setPublicPost] = useState(true);

  console.log(id);
  return (
    <div
      className={`border-2 
      ${type === "reply" ? "bg-gray-200 px-2 pb-4" : "bg-white"}
      `}
    >
      <textarea
        type="text"
        className="w-full resize-none h-24 px-2 py-1 outline-none"
        maxLength="3000"
      />
      <div className="flex justify-between border-t -mt-1.5 bg-white">
        <div className="flex">
          <div className="flex gap-2 w-20 justify-center items-center px-2 py-2 text-xs hover:bg-gray-100 cursor-pointer">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Image</p>
          </div>
          <div
            onClick={() => setPublicPost(!publicPost)}
            className="relative flex gap-2 w-20 justify-center items-center px-2 py-2 text-xs hover:bg-gray-100 cursor-pointer"
          >
            {publicPost ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute h-4 w-4 left-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute h-4 w-4 left-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            )}
            <p className="pl-6">{publicPost ? "Public" : "Private"}</p>
          </div>
        </div>
        <p className="w-28 py-2 text-xs text-center cursor-pointer font-bold bg-dark text-white hover:bg-gray-200 hover:text-black">
          {type}
        </p>
      </div>
    </div>
  );
};

export default CommentInput;
