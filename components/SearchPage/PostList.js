import React from "react";
import UpdatePost from "../Home/UpdatePost";

const PostList = ({ posts }) => {
  return (
    <section>
      {posts.slice(0, 20).map((post) => (
        <UpdatePost key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostList;
