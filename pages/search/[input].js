import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { putSearch } from "../../store/actions/homeAction";
import PostList from "../../components/SearchPage/PostList";
import UserList from "../../components/SearchPage/UserList";

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const posts = useSelector((state) => state.home.posts);
  const users = useSelector((state) => state.home.users);
  const search = useSelector((state) => state.home.search);
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const searchedUserList = users.filter((user) =>
      user.username.toLowerCase().includes(search.input.toLowerCase())
    );
    setUserList(searchedUserList);
    const searchedPostList = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.input.toLowerCase()) ||
        post.content.toLowerCase().includes(search.input.toLowerCase())
    );
    setPostList(searchedPostList);
  }, [search.input]);

  console.log(userList, postList);
  return (
    <div className="max-w-7xl mx-auto px-2 pt-10 pb-20">
      <div className="flex justify-between items-center border-b">
        <p>
          Search for <span className="font-semibold">{search.input}</span>
        </p>
        <div className="flex gap-6 ">
          <p
            onClick={() => dispatch(putSearch("Post", search.input))}
            className={`${
              search.type === "Post" && "border-b-4 border-theme"
            } cursor-pointer`}
          >
            Post ({postList.length})
          </p>
          <p
            onClick={() => dispatch(putSearch("Blogger", search.input))}
            className={`${
              search.type === "Blogger" && "border-b-4 border-theme"
            } cursor-pointer`}
          >
            Blog ({userList.length})
          </p>
        </div>
      </div>
      {search.type === "Post" && <PostList posts={postList} />}
      {search.type === "Blogger" && <UserList users={userList} />}
    </div>
  );
};

export default Search;
