import React from "react";

const BlogPost = ({ post }) => {
  console.log(post);

  return (
    <div>
      <p>{post?.title}</p>
      <p>{post?.content}</p>
    </div>
  );
};

export default BlogPost;
