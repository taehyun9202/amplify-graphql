import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { listPostsWithFilterAndDate } from "../../graphql/queries";
import BlogHeader from "../../components/layouts/BlogHeader";
import BlogSidebar from "../../components/layouts/BlogSidebar";
import Link from "next/link";
import BlogPost from "../../components/Blog/BlogPost";
const Blog = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [numberOfPosts, setNumberOfPosts] = useState(5);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const username = router.query.id;
  const link = useSelector((state) => state.profile.link);
  const [openCategory, setOpenCategory] = useState(true);

  useEffect(() => {
    getAllPost();
    setSelected(myPosts[myPosts.length - 1]);
    myPosts.length >= numberOfPosts - 1
      ? setFiltered(myPosts.slice(myPosts.length - parseInt(numberOfPosts)))
      : setFiltered(myPosts);
  }, [router, numberOfPosts, myPosts.length]);

  const getAllPost = async () => {
    try {
      const allPostData = API.graphql(
        graphqlOperation(listPostsWithFilterAndDate, {
          filter: {
            owner: {
              eq: username,
            },
          },
        })
      )
        .then((res) => setMyPosts(res.data.postByDate.items))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
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
              {link}
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
                <p className="col-span-1 md:col-span-2 text-center">Views</p>
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
                      <p className="group-hover:underline group-hover:text-black">
                        {post.title}
                      </p>
                      {!post.public && (
                        <p className="group-hover:no-underline ring-1 ring-red-600 rounded-full px-2 text-red-600">
                          private
                        </p>
                      )}
                    </div>
                    <p className="col-span-1 md:col-span-2 text-center group-hover:text-black">
                      {post.view}
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
                  <p className="border px-2 py-1 rounded cursor-pointer">
                    Posts Manager
                  </p>
                </div>

                <div>
                  <select
                    onChange={(e) => setNumberOfPosts(e.target.value)}
                    className="flex justify-center items-center outline-none border px-2 h-7 rounded cursor-pointer"
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
      </div>
    </div>
  );
};

export default Blog;
