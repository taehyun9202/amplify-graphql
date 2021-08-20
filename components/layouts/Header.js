import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/actions/profileAction";
import { Auth } from "aws-amplify";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);

  useEffect(() => {
    if (!user.username) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch(getProfile(user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="flex items-center bg-pink-400 h-16 px-2 justify-between text-white">
      <nav className="flex gap-10">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
        <Link href="/products">
          <a>Products</a>
        </Link>
        <Link href="/profile">
          <a>Login / Register</a>
        </Link>
      </nav>
      <div>
        <p>{user.email ? `Hello, ${user.username}` : "Sign in"}</p>
      </div>
    </header>
  );
};

export default Header;
