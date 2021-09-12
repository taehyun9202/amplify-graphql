import Head from "next/head";
import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { listPosts, listUsers } from "../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { clearBlogger } from "../store/actions/blogAction";
import { getUsers, getAllPosts, putLink } from "../store/actions/homeAction";
import HotTopic from "../components/Home/HotTopic";
import NewUpdate from "../components/Home/NewUpdate";
import OtherUser from "../components/Home/OtherUser";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const blog = useSelector((state) => state.blog.profile);

  const link = useSelector((state) => state.home.link);

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
    if (link) {
      dispatch(putLink(""));
    }
  }, []);

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

      <div className="pb-20">
        <HotTopic />
        <div className="flex gap-4 max-w-7xl mx-auto">
          <NewUpdate />
          <OtherUser />
        </div>
      </div>
    </div>
  );
}
