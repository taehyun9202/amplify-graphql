import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { updateUser } from "../../graphql/mutations";
import { getUser, listUsers } from "../../graphql/queries";
import { getProfile } from "../../store/actions/profileAction";
import {
  clearBlogger,
  getBlogger,
  putNotification,
} from "../../store/actions/blogAction";

const DescriptionInput = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const blog = useSelector((state) => state.blog.profile);
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    try {
      await API.graphql(
        graphqlOperation(updateUser, {
          condition: { username: { eq: user.username } },
          input: { id: user.id, description: input },
        })
      )
        .then((res) => {
          const data = res.data.updateUser;
        })
        .catch((err) => console.log(err));
      checkUser();

      await API.graphql(
        graphqlOperation(listUsers, {
          filter: {
            username: {
              eq: router.query.id,
            },
          },
        })
      )
        .then((res) => {
          const user = res.data.listUsers.items[0];
          dispatch(getBlogger(user));
        })
        .catch((err) => {
          dispatch(clearBlogger());
          console.log(err);
        });
      dispatch(
        putNotification({
          type: "Notification",
          message: "Blog Intro Updated",
        })
      );
      setEdit(false);
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log(err);
      dispatch(
        putNotification({
          type: "Danger",
          message: "Something Went Wrong",
        })
      );
    }
  };

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
    <div className="h-12">
      {edit ? (
        <div className="flex justify-between items-center">
          <div className="w-full mr-2">
            <textarea
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write new intro"
              className="resize-none w-full px-1 h-14"
              maxLength="100"
            />
            <p className="-mt-1 text-xs text-right">{input.length} / 100</p>
          </div>
          <div className="relative flex flex-col gap-4 h-14 w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setEdit(false)}
              className="h-5 w-5 p-0.5 absolute -top-2 cursor-pointer rounded-full hover:bg-white hover:text-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleSubmit()}
              className="h-5 w-5 p-0.5 absolute bottom-2 cursor-pointer rounded-full hover:bg-white hover:text-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="relative flex justify-between items-center">
          <p className="mr-2 w-40 h-16 break-words">
            {blog.description
              ? blog.description
              : `Welcome to ${router.query.id}'s blog`}
          </p>
          {user.username === router.query.id && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setEdit(true)}
              className="h-5 w-5 p-0.5 absolute top-0 right-0  cursor-pointer rounded-full hover:bg-white hover:text-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default DescriptionInput;
