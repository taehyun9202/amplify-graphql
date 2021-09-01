import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers, getUser } from "../../graphql/queries";
import BlogHeader from "../../components/layouts/BlogHeader";
import BlogSidebar from "../../components/layouts/BlogSidebar";
import Link from "next/link";
import { getProfile } from "../../store/actions/profileAction";
import { Auth } from "aws-amplify";
import BlogPost from "../../components/Blog/BlogPost";
import {
  clearBlogger,
  getBlogger,
  getPosts,
} from "../../store/actions/blogAction";
import SidebarWrapper from "../../components/wrapper/SidebarWrapper";
import Sidebar from "../../components/layouts/BlogSidebar";
import DialogWrapper from "../../components/wrapper/DialogWrapper";
import PostInput from "../../components/Input/PostInput";
import NotificationWrapper from "../../components/wrapper/NotificationWrapper";

const Blog = () => {
  const user = useSelector((state) => state.profile.profile);
  const posts = useSelector((state) => state.blog.posts);
  const blog = useSelector((state) => state.blog.profile);
  const notification = useSelector((state) => state.blog.notification);
  const dispatch = useDispatch();
  const [myPosts, setMyPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [numberOfPosts, setNumberOfPosts] = useState(5);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const loggedInUser = useSelector((state) => state.profile.profile.username);
  const link = useSelector((state) => state.profile.link);
  const [openCategory, setOpenCategory] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    if (notification && notification.message.length > 0) {
      setOpenNotification(true);
    } else {
      setOpenNotification(false);
    }
  }, [notification]);

  useEffect(() => {
    if (!user.username) {
      checkUser();
    }
    if (blog.username !== router.query.id) {
      console.log(
        "fetching blog data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
      fetchBlogData();
    } else {
      clearBlogger();
    }
    setMyPosts(posts);
    if (posts.length > numberOfPosts) {
      setFiltered(posts.slice(posts.length - 5));
    } else {
      setFiltered(posts);
    }
    setSelected(posts[posts.length - 1]);
  }, [router, posts]);

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
      router.push("/");
    }
  };

  useEffect(() => {
    if (link) {
      const filterByLink = myPosts.filter((post) =>
        post.category.includes(link)
      );
      setFiltered(filterByLink);
      if (filterByLink.length >= numberOfPosts) {
        setFiltered(
          filterByLink.slice(filterByLink.length - parseInt(numberOfPosts))
        );
      }
    } else {
      if (myPosts.length >= numberOfPosts) {
        setFiltered(myPosts.slice(myPosts.length - parseInt(numberOfPosts)));
      } else {
        setFiltered(myPosts);
      }
    }
  }, [link]);

  useEffect(() => {
    if (!link) {
      if (myPosts.length >= numberOfPosts) {
        setFiltered(myPosts.slice(myPosts.length - parseInt(numberOfPosts)));
      } else {
        setFiltered(myPosts);
        console.log(filtered);
      }
    } else {
      const filterByLink = myPosts.filter((post) =>
        post.category.includes(link)
      );

      if (filterByLink.length >= numberOfPosts) {
        setFiltered(
          filterByLink.slice(filterByLink.length - parseInt(numberOfPosts))
        );
      } else {
        setFiltered(filterByLink);
      }
    }
  }, [numberOfPosts]);

  const fetchBlogData = async () => {
    try {
      dispatch(getPosts(router.query.id));
      // user data
      console.log("getting user data");
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
    } catch (err) {
      dispatch(clearBlogger());
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex text-sm">
      <div className="absolute group top-4 left-4 sm:hidden cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setOpenSidebar(true)}
          className="h-8 w-8 border-2 border-dark text-dark rounded-full p-1 group-hover:bg-dark group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <div className="hidden sm:block">
        <BlogSidebar />
      </div>
      <div className="flex-1 pl-2 md:pl-8 pr-2">
        <BlogHeader />
        <div className="flex justify-between items-center pt-44">
          <p>
            {filtered.length} Post(s) from{" "}
            <span
              onClick={() => setOpenCategory(!openCategory)}
              className="font-semibold cursor-pointer hover:underline"
            >
              {link ? link : "All Posts"}
            </span>
          </p>
          {openCategory ? (
            <div
              onClick={() => setOpenCategory(!openCategory)}
              className="flex group gap-2 items-center cursor-pointer"
            >
              <p className="group-hover:underline">Close List</p>
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
            </div>
          ) : (
            <div
              onClick={() => setOpenCategory(!openCategory)}
              className="flex group gap-2 items-center cursor-pointer"
            >
              <p className="group-hover:underline">Open List</p>
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
            </div>
          )}
        </div>
        <div className="pb-32">
          {openCategory && (
            <>
              <div className="flex border-b-2 border-gray-400 pb-1 pt-6">
                <p className="flex-1">Post Title</p>
                <p className="w-14 text-center">Likes</p>
                <p className="w-20 text-right">Modified</p>
              </div>
              <div className="flex flex-col-reverse">
                {filtered.map((post) => (
                  <div
                    onClick={() => setSelected(post)}
                    key={post.id}
                    className="group flex border-b py-1 cursor-pointer text-gray-400 text-xs"
                  >
                    <div className="flex gap-2 flex-1">
                      {!post.public && (
                        <span className="group-hover:no-underline rounded-full text-red-600">
                          [private]
                        </span>
                      )}
                      <p className="group-hover:underline group-hover:text-black">
                        {post.title}
                      </p>
                    </div>
                    <p className="w-14 text-center group-hover:text-black">
                      {post.like}
                    </p>
                    <p className="w-20 text-right group-hover:text-black">
                      {post.updatedAt.split("T")[0]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-xs border px-2 py-1 rounded cursor-pointer">
                    Posts Manager
                  </p>
                </div>

                <div>
                  <select
                    onChange={(e) => setNumberOfPosts(e.target.value)}
                    className="text-xs flex justify-center items-center outline-none border px-2 py-1 rounded cursor-pointer"
                  >
                    <option value={5}>5 Posts</option>
                    <option value={10}>10 Posts</option>
                    <option value={15}>15 Posts</option>
                    <option value={20}>20 Posts</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col">
          {user.username === router.query.id && (
            <p
              onClick={() => setOpenTemplate(true)}
              className="bg-dark py-1 w-28 text-center text-white cursor-pointer rounded border-2 border-dark hover:bg-gray-100 hover:text-dark"
            >
              Add New Post
            </p>
          )}
          <BlogPost post={selected} />

          {/* <p>Other posts from this category</p> */}
        </div>
      </div>

      <DialogWrapper
        open={openTemplate}
        setOpen={setOpenTemplate}
        title="New Post"
      >
        <PostInput />
      </DialogWrapper>

      <SidebarWrapper open={openSidebar} setOpen={setOpenSidebar}>
        <Sidebar />
      </SidebarWrapper>

      <NotificationWrapper
        open={openNotification}
        setOpen={setOpenNotification}
        title={notification.type}
        message={notification.message}
      />
    </div>
  );
};

export default Blog;
