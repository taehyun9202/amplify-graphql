import React from "react";
import Comment from "./Comment";

const PostComment = ({ comments }) => {
  return (
    <div className="bg-gray-100 px-2 md:px-4 my-4">
      {comments.map((comment, idx) => (
        <Comment
          key={comment.id}
          comment={comment}
          lastComment={idx === comments.length - 1}
          type={"comment"}
        />
      ))}
    </div>
  );
};

export default PostComment;
