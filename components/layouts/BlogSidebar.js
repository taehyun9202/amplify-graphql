import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, putLink } from "../../store/actions/profileAction";
import SidebarFriends from "../Sidebar/SidebarFriends";
import { useRouter } from "next/dist/client/router";
import DialogWrapper from "../wrapper/DialogWrapper";

import CategoryInput from "../Input/CategoryInput";
import DescriptionInput from "../Input/DescriptionInput";
import PostInput from "../Input/PostInput";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { updateUser } from "../../graphql/mutations";
import awsmobile from "../../aws-exports";
import { putNotification } from "../../store/actions/blogAction";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const posts = useSelector((state) => state.blog.posts);
  const blog = useSelector((state) => state.blog.profile);
  const link = useSelector((state) => state.profile.link);
  const [proOrBlog, setProOrBlog] = useState("blog");
  const [openCategory, setOpenCategory] = useState(true);
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);

  const [image, setImage] = useState("");
  const [fileURL, setFileURL] = useState(null);
  const [imageType, setImageType] = useState("");

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if (blog.username && blog.image?.key) getProfileImage();
  }, [blog]);

  const getProfileImage = async () => {
    try {
      await Storage.get(`${blog.username}-profile.jpg`)
        .then((res) => {
          setFileURL(res);
        })
        .catch((err) => setFileURL(null));
    } catch (err) {
      setFileURL(null);
    }
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageType(file.name.split(".")[1]);
      setImage(file);
    }
    Storage.put(user.username + "-profile." + imageType, image, {
      contentType: "image/jpeg",
    })
      .then(() => {
        console.log("saved image", image);
        setImage("");
      })
      .catch((err) => console.log(err));

    const newUser = {
      id: user.id,
      blogname: user.blogname,
      category: user.category,
      description: user.description,
      email: user.email,
      follower: user.follower,
      following: user.following,
      username: user.username,
      image: {
        bucket: awsmobile.aws_user_files_s3_bucket,
        region: awsmobile.aws_user_files_s3_bucket_region,
        key: "public/" + user.username,
      },
    };
    API.graphql(
      graphqlOperation(updateUser, {
        input: newUser,
        condition: { email: { eq: user.email } },
      })
    )
      .then((res) => {
        console.log("updated", res.data);
        dispatch(
          putNotification({
            type: "Notification",
            message: "Profile Image Updated",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          putNotification({
            type: "Danger",
            message: "Something Went Wrong",
          })
        );
      });
  };

  return (
    <div className="text-sm font-semibold pb-10 md:pb-80 bg-white">
      <div className="w-52 bg-dark pt-12 text-gray-400 ">
        <div className="px-2 flex gap-2 pb-36">
          <a className="cursor-pointer hover:underline hover:text-red-600">
            Prologue
          </a>
          <div className="border h-3 mt-1 border-gray-400"></div>
          <a className="cursor-pointer hover:underline hover:text-red-600">
            Blog
          </a>
        </div>

        {user.username === router.query.id ? (
          <div
            onClick={() => handleClick()}
            className="relative bg-white w-48 h-48 mx-2 flex flex-col justify-center items-center cursor-pointer overflow-hidden"
          >
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={(e) => imageHandler(e)}
              className="hidden"
            />

            {fileURL ? (
              <img
                src={fileURL}
                alt="Add Image"
                className="object-contain w-48 h-48 z-20"
              />
            ) : (
              <img
                src="/create-user-image.jpg"
                alt="Add Image"
                className="object-contain w-48 h-48 z-20"
              />
            )}
          </div>
        ) : (
          <div className="relative bg-white w-48 h-48 mx-2 flex flex-col justify-center items-center overflow-hidden">
            {fileURL ? (
              <img
                src={fileURL}
                alt="Add Image"
                className="object-contain w-48 h-48 z-20"
              />
            ) : (
              <img
                src="/create-user-image.jpg"
                alt="Add Image"
                className="object-contain w-48 h-48 z-20"
              />
            )}
          </div>
        )}
        <div className="relative px-2 pb-14 pt-4">
          <p className="font-bold">{router.query.id}</p>
          <p className="pb-4 text-xs font-normal">({blog.email})</p>
          <DescriptionInput />
          {user.username === router.query.id && (
            <p
              onClick={() => setOpenTemplate(true)}
              className="absolute bottom-2 right-3 text-red-600 hover:underline cursor-pointer"
            >
              New Post
            </p>
          )}
        </div>
      </div>

      <nav className="px-2 py-8">
        <div
          onClick={() => setOpenCategory(!openCategory)}
          className="flex justify-between items-center cursor-pointer"
        >
          <p className="text-red-600">Category</p>
          {openCategory ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
        {openCategory && (
          <div className="flex flex-col py-2 gap-2">
            <div
              onClick={() => dispatch(putLink(""))}
              className="flex gap-2 items-center cursor-pointer pl-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <p
                className={
                  link === "" ? "font-semibold underline" : "font-normal"
                }
              >
                See All ({posts.length})
              </p>
            </div>

            {blog.category &&
              blog.category.map((item, idx) => (
                <div
                  key={user.username + idx + item}
                  onClick={() => dispatch(putLink(item))}
                  className="flex gap-2 items-center cursor-pointer pl-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  <p
                    className={
                      item === link ? "font-semibold underline" : "font-normal"
                    }
                  >
                    {item} (
                    {
                      posts.filter((post) => post.category.includes(item))
                        .length
                    }
                    )
                  </p>
                </div>
              ))}

            {router.query.id === user.username && (
              <div
                onClick={() => setOpenDialog(true)}
                className="flex gap-2 items-center cursor-pointer pl-2 py-0.5 rounded-lg hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p
                  className={
                    link === "Create Category"
                      ? "font-semibold underline"
                      : "font-normal"
                  }
                >
                  Create/Update Category
                </p>
              </div>
            )}
          </div>
        )}
      </nav>

      <SidebarFriends />

      <DialogWrapper
        open={openTemplate}
        setOpen={setOpenTemplate}
        title="New Post"
      >
        <PostInput />
      </DialogWrapper>

      <DialogWrapper
        open={openDialog}
        setOpen={setOpenDialog}
        title="New Category"
      >
        <CategoryInput id={user.username} />
      </DialogWrapper>
    </div>
  );
};

export default Sidebar;
