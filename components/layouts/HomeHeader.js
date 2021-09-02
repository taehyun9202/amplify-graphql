import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, putSearch } from "../../store/actions/profileAction";
import { useRouter } from "next/router";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";

const HomeHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.profile.profile);
  const [type, setType] = useState("Post");
  const [input, setInput] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(putSearch(type, input));
    router.push(`/search/${input}`);
  };

  useEffect(() => {
    if (!user.username) checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: user.attributes.sub })
      );
      dispatch(
        getProfile(
          userData.data.getUser,
          user.signInUserSession.accessToken.jwtToken
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="flex items-center bg-theme h-16 px-2 justify-between text-white font-extrabold">
      <nav className="flex gap-10 items-center h-7">
        <Link href="/" passHref>
          <div className="flex justify-center items-center gap-1 text-xl cursor-pointer">
            <div className="bg-white text-theme w-6 h-6 flex items-center justify-center">
              T
            </div>
            <p>Blog</p>
          </div>
        </Link>
        <Link href={`/blog/${user?.username}`}>
          <a>My Blog</a>
        </Link>
      </nav>
      <form
        onSubmit={(e) => searchHandler(e)}
        className="text-black relative hidden md:flex"
      >
        <select
          className="h-7 px-2 border-r border-theme"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Post">Post</option>
          <option value="Blogger">Blogger</option>
        </select>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="h-7 outline-none w-full pl-2 pr-6"
        />
        <svg
          onClick={(e) => searchHandler(e)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute right-1 top-1.5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>

      <div>
        <Link href="/profile">
          <a>{user.username ? `Hello ${user.username}` : "Login / Register"}</a>
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
