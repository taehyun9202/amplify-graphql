import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { putLink } from "../../store/actions/profileAction";
import SidebarFriends from "../Sidebar/SidebarFriends";
const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const link = useSelector((state) => state.profile.link);
  const [proOrBlog, setProOrBlog] = useState("blog");
  const [openCategory, setOpenCategory] = useState(true);
  return (
    <div className="hidden sm:block text-sm font-semibold pb-80">
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
        <div className="relative bg-white w-48 h-48 mx-2 flex flex-col justify-center items-center cursor-pointer">
          <div className="relative w-16 mx-2 h-16">
            <Image src="/create-user-image.jpg" alt="Add Image" layout="fill" />
          </div>
          <p className="absolute text-xs top-32 mt-2">Add Profile Image</p>
        </div>
        <div className="px-2 pb-10 pt-4">
          <p className="font-bold">/user/</p>
          <p className="pb-4">(/user.email/)</p>
          <p>Welcome to /username/ blog</p>
          <p>profile</p>
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
          <div className="flex flex-col py-2 pl-2 gap-2">
            <div
              onClick={() => dispatch(putLink(""))}
              className="flex gap-2 items-center cursor-pointer"
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
                See All (8)
              </p>
            </div>
            <div
              onClick={() => dispatch(putLink("Sports"))}
              className="flex gap-2 items-center cursor-pointer"
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
                  link === "Sports" ? "font-semibold underline" : "font-normal"
                }
              >
                Sports (2)
              </p>
            </div>

            <div
              onClick={() => dispatch(putLink("Tennis"))}
              className="flex gap-2 items-center cursor-pointer"
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
                  link === "Tennis" ? "font-semibold underline" : "font-normal"
                }
              >
                Tennis (4)
              </p>
            </div>

            <div
              onClick={() => dispatch(putLink("Movie"))}
              className="flex gap-2 items-center cursor-pointer"
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
                  link === "Movie" ? "font-semibold underline" : "font-normal"
                }
              >
                Movie (1)
              </p>
            </div>

            <div
              onClick={() => dispatch(putLink("Music"))}
              className="flex gap-2 items-center cursor-pointer"
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
                  link === "Music" ? "font-semibold underline" : "font-normal"
                }
              >
                Music (1)
              </p>
            </div>

            <div
              onClick={() => dispatch(putLink("Create Category"))}
              className="flex gap-2 items-center cursor-pointer"
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
                Create Category
              </p>
            </div>
          </div>
        )}
      </nav>

      <SidebarFriends />
    </div>
  );
};

export default Sidebar;
