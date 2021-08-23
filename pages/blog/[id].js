import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import {
  listCategories,
  listPostsWithFilterAndDate,
} from "../../graphql/queries";
import BlogHeader from "../../components/layouts/BlogHeader";
import BlogSidebar from "../../components/layouts/BlogSidebar";
import Link from "next/link";
import BlogPost from "../../components/Blog/BlogPost";
import {
  clearCategories,
  getCategories,
  getPosts,
} from "../../store/actions/blogAction";

const Blog = () => {
  const posts = useSelector((state) => state.blog.posts);
  const dispatch = useDispatch();
  const [myPosts, setMyPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [numberOfPosts, setNumberOfPosts] = useState(5);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const username = router.query.id;
  const loggedInUser = useSelector((state) => state.profile.profile.username);
  const link = useSelector((state) => state.profile.link);
  const [openCategory, setOpenCategory] = useState(true);

  useEffect(() => {
    if (myPosts.length < 1 || username !== loggedInUser) {
      console.log(
        "fetching blog data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
      fetchBlogData();
    }
  }, [router]);

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
      // post data
      await API.graphql(
        graphqlOperation(listPostsWithFilterAndDate, {
          filter: {
            owner: {
              eq: router.query.id,
            },
          },
        })
      )
        .then((res) => {
          const data = res.data.postByDate.items;
          setMyPosts(data);
          setFiltered(data.slice(data.length - 5));
          setSelected(data[data.length - 1]);
          dispatch(getPosts(data));
        })
        .catch((err) => console.log(err));
      // category data
      console.log("getting category data");
      await API.graphql(
        graphqlOperation(listCategories, {
          filter: {
            owner: {
              eq: router.query.id,
            },
          },
        })
      )
        .then((res) => {
          const list = res.data.listCategories.items[0].list;
          const Id = res.data.listCategories.items[0].id;
          dispatch(getCategories(list, Id));
        })
        .catch((err) => {
          dispatch(clearCategories());
          // console.log(err);
        });
    } catch (err) {
      dispatch(clearCategories());
      // console.log(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex text-sm">
      <BlogSidebar />
      <div className="flex-1 pl-2 md:pl-8 pr-2">
        <BlogHeader />
        <div className="flex justify-between items-center pt-44">
          <p>
            4 Post(s) from{" "}
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
              <div className="grid grid-cols-4 md:grid-cols-12 border-b-2 border-gray-400 pb-1 pt-6">
                <p className="col-span-2 md:col-span-9">Post Title</p>
                <p className="col-span-1 md:col-span-2 text-center">Likes</p>
                <p className="col-span-1 text-right">Modified</p>
              </div>
              <div className="flex flex-col-reverse">
                {filtered.map((post) => (
                  // <Link
                  //   href={`/blog/${username}?post=${post.id}`}
                  //   key={post.id}
                  //   passHref
                  // >
                  <div
                    onClick={() => setSelected(post)}
                    key={post.id}
                    className="group grid grid-cols-4 md:grid-cols-12 border-b py-1 cursor-pointer text-gray-400"
                  >
                    <div className="flex gap-2 col-span-2 md:col-span-9">
                      {!post.public && (
                        <span className="group-hover:no-underline rounded-full text-red-600">
                          [private]
                        </span>
                      )}
                      <p className="group-hover:underline group-hover:text-black">
                        {post.title}
                      </p>
                    </div>
                    <p className="col-span-1 md:col-span-2 text-center group-hover:text-black">
                      {post.like}
                    </p>
                    <p className="col-span-1 text-right group-hover:text-black">
                      {post.updatedAt.split("T")[0]}
                    </p>
                  </div>
                  // </Link>
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
        <BlogPost post={selected} />

        <p>Other posts from this category</p>
      </div>
    </div>
  );
};

export default Blog;
