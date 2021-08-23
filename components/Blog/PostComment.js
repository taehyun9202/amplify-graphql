import React from "react";
import CommentInput from "../Input/CommentInput";
import Comment from "./Comment";

const PostComment = ({ comments, id }) => {
  return (
    <div className="bg-gray-100 px-2 md:px-4 my-4 pb-6">
      {comments.map((comment, idx) => (
        <Comment
          key={comment.id}
          comment={comment}
          lastComment={idx === comments.length - 1}
          type={"comment"}
        />
      ))}
      <CommentInput type={"comment"} id={id} />
    </div>
  );
};

export default PostComment;
