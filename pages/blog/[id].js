import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { listPostsWithFilter } from "../../graphql/queries";
import BlogHeader from "../../components/layouts/BlogHeader";
import BlogSidebar from "../../components/layouts/BlogSidebar";
import Link from "next/link";
const Blog = () => {
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();
  const username = router.query.id;
  const link = useSelector((state) => state.profile.link);
  const [openCategory, setOpenCategory] = useState(true);

  console.log(router.query);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    try {
      const allPostData = API.graphql(
        graphqlOperation(listPostsWithFilter, {
          filter: {
            owner: {
              eq: username,
            },
          },
        })
      )
        .then((res) => setMyPosts(res.data.listPosts.items))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  console.log(myPosts);
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
        {openCategory && (
          <div>
            <div className="grid grid-cols-4 md:grid-cols-12 border-b-2 pb-1 pt-6">
              <p className="col-span-2 md:col-span-9">Post Title</p>
              <p className="col-span-1 md:col-span-2 text-center">View</p>
              <p className="col-span-1 text-right">Modified</p>
            </div>
            {myPosts.map((post) => (
              <Link href={`/blog/article/${post.id}`} key={post.id} passHref>
                <div className="group grid grid-cols-4 md:grid-cols-12 border-b-2 py-1 cursor-pointer text-gray-400">
                  <p className="col-span-2 md:col-span-9 group-hover:underline group-hover:text-black">
                    {post.title}
                  </p>
                  <p className="col-span-1 md:col-span-2 text-center group-hover:text-black">
                    1000
                  </p>
                  <p className="col-span-1 text-right group-hover:text-black">
                    {post.updatedAt.split("T")[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
