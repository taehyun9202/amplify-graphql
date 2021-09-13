import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopPost from "./TopPost";

const HotTopic = () => {
  const posts = useSelector((state) => state.home.posts);
  const [hotTopicPosts, setHotTopicPosts] = useState([]);
  const [hotTopic, setHotTopic] = useState("Travel");
  const router = useRouter();
  useEffect(() => {
    const topicList = posts
      .filter((p) => p.category.includes(hotTopic))
      .sort(function (a, b) {
        return b.like - a.like;
      })
      .slice(0, 5);
    setHotTopicPosts(topicList);
  }, [posts, hotTopic]);
  return (
    <section className="bg-gray-100 py-4 my-10 h-72  px-2 md:px-4">
      <div className="pb-4 flex justify-between max-w-7xl mx-auto z-30">
        <p>Hot Topic &gt; {hotTopic}</p>
        <nav className="flex gap-1.5 z-30">
          <div
            onClick={() => {
              setHotTopic("Travel");
            }}
            className={`p-0.5 px-2 cursor-pointer bg-white border hover:bg-gray-200 ${
              hotTopic === "Travel" && "text-red-600"
            }`}
          >
            <p>1</p>
          </div>
          <div
            onClick={() => {
              setHotTopic("Foods");
            }}
            className={`p-0.5 px-2 cursor-pointer bg-white border hover:bg-gray-200 ${
              hotTopic === "Foods" && "text-red-600"
            }`}
          >
            <p>2</p>
          </div>
          <div
            onClick={() => {
              setHotTopic("Sports");
            }}
            className={`p-0.5 px-2 cursor-pointer bg-white border hover:bg-gray-200 ${
              hotTopic === "Sports" && "text-red-600"
            }`}
          >
            <p>3</p>
          </div>
          <div
            onClick={() => {
              setHotTopic("Music");
            }}
            className={`p-0.5 px-2 cursor-pointer bg-white border hover:bg-gray-200 ${
              hotTopic === "Music" && "text-red-600"
            }`}
          >
            <p>4</p>
          </div>
          <div
            onClick={() => {
              setHotTopic("Tennis");
            }}
            className={`p-0.5 px-2 cursor-pointer bg-white border hover:bg-gray-200 ${
              hotTopic === "Tennis" && "text-red-600"
            }`}
          >
            <p>5</p>
          </div>
        </nav>
      </div>
      {hotTopicPosts.length > 0 && (
        <>
          <section className="hidden xl:flex gap-10 max-w-7xl mx-auto">
            {hotTopicPosts.slice(0, 5).map((post) => (
              <TopPost key={post.id} post={post} />
            ))}
          </section>
          <section className="hidden lg:flex xl:hidden gap-7 max-w-7xl mx-auto">
            {hotTopicPosts.slice(0, 4).map((post) => (
              <TopPost key={post.id} post={post} />
            ))}
          </section>
          <section className="hidden md:flex lg:hidden gap-4 max-w-7xl mx-auto">
            {hotTopicPosts.slice(0, 3).map((post) => (
              <TopPost key={post.id} post={post} />
            ))}
          </section>
          <section className="hidden sm:flex md:hidden gap-2 max-w-7xl mx-auto">
            {hotTopicPosts.slice(0, 3).map((post) => (
              <TopPost key={post.id} post={post} />
            ))}
          </section>
          <section className="flex sm:hidden gap-2 max-w-7xl mx-auto">
            {hotTopicPosts.slice(0, 2).map((post) => (
              <TopPost key={post.id} post={post} />
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default HotTopic;
