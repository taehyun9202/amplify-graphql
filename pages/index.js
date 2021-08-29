import Head from "next/head";
import Image from "next/image";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { listPosts, getPost, listUsers } from "../graphql/queries";
import HomeHeader from "../components/layouts/HomeHeader";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { clearBlogger } from "../store/actions/blogAction";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const blog = useSelector((state) => state.blog.profile);
  const [allUser, setAllUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getData();
      getAllUser();
    }
  }, [user]);

  useEffect(() => {
    if (blog.username) dispatch(clearBlogger());
  }, [blog]);

  const getData = async () => {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      setPosts(postData.data.listPosts.items);
    } catch (err) {
      console.log(err);
    }
  };

  // const getSinglePost = async () => {
  //   try {
  //     const postData = await API.graphql({
  //       query: getPost,
  //       variables: { id: "05405894-f366-4a58-a5c4-eb06ea673918" },
  //     });
  //     setPost(postData.data.getPost);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getAllUser = async () => {
    try {
      await API.graphql(
        graphqlOperation(listUsers, {
          filter: { id: { ne: user.id } },
        })
      )
        .then((res) => {
          setAllUser(res.data.listUsers.items);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(allUser);
  if (!user.username)
    return (
      <div>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen -mt-16">
          <p>Need to Sign up</p>
        </div>
      </div>
    );
  return (
    <div>
      <Head>
        <title>Tyler Taehyun Nam Blog App</title>
        <meta property="og:title" content="Tyler Taehyun Nam Blog App" />
        <meta name="description" content="Blog app using amplify graphql" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen -mt-16">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold my-2">Other Bloggers</p>
            {allUser.map((user) => (
              <Link key={user.id} href={`/blog/${user.username}`}>
                <a className="cursor-pointer bg-gray-100 px-4 py-1 hover:bg-gray-200 capitalize">
                  - {user.username} Blog
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
