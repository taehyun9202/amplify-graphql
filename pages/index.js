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
import { getUsers, getAllPosts } from "../store/actions/homeAction";
import TopPost from "../components/Home/TopPost";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const blog = useSelector((state) => state.blog.profile);
  const posts = useSelector((state) => state.home.posts);
  const users = useSelector((state) => state.home.users);
  const [topFive, setTopFive] = useState([]);
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
      dispatch(getAllPosts(postData.data.listPosts.items));
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUser = async () => {
    try {
      await API.graphql(
        graphqlOperation(listUsers, {
          filter: { id: { ne: user.id } },
        })
      )
        .then((res) => {
          dispatch(getUsers(res.data.listUsers.items));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const postList = posts
      .sort(function (a, b) {
        return b.like - a.like;
      })
      .slice(0, 5);
    setTopFive(postList);
  }, [posts]);
  console.log(topFive);

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
        <div className="max-w-7xl mx-auto flex flex-col min-h-screen -mt-16 pt-16">
          <div className="flex gap-10">
            {topFive.map((post) => (
              <TopPost key={post.id} post={post} />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold my-2">Other Bloggers</p>
            {users.map((user) => (
              <Link key={user.id} href={`/blog/${user.username}`}>
                <a className="cursor-pointer bg-gray-100 px-4 py-1 hover:bg-gray-200 capitalize w-52">
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
