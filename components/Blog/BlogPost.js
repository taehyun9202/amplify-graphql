import React from "react";

const BlogPost = ({ post }) => {
  return (
    <div>
      <p>{post?.title}</p>
      <p>{post?.content}</p>
    </div>
  );
};

export default BlogPost;
