import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/actions/profileAction";
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";

const BlogHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);

  useEffect(() => {
    if (!user.username) {
      checkUser();
    }
  }, [user]);

  // const checkUser = async () => {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     dispatch(getProfile(user));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    <div className="w-full py-2">
      <nav className="px-2 flex gap-2 text-sm font-normal justify-end w-full">
        <p className="cursor-pointer hover:underline hover:text-red-600">
          Connection
        </p>
        <div className="border h-3 mt-1 border-gray-400" />
        <Link href="/">
          <a className="cursor-pointer hover:underline hover:text-red-600">
            Blog Home
          </a>
        </Link>
        <div className="border h-3 mt-1 border-gray-400" />
        <p className="cursor-pointer hover:underline hover:text-red-600">
          My Menu
        </p>
      </nav>
    </div>
  );
};

export default BlogHeader;
