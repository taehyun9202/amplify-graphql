import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpdatePost from "./UpdatePost";

const NewUpdate = () => {
  const posts = useSelector((state) => state.home.posts);
  const [selected, setSelected] = useState("");
  const [postList, setPostList] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (selected) {
      const newList = posts
        .filter((p) => p.category.includes(selected))
        .slice(0, 10);
      setPostList(newList);
    } else {
      const newList = posts.slice(0, 10);
      setPostList(newList);
    }
  }, [selected, posts]);

  return (
    <section className="flex-1">
      <nav className="flex justify-between items-center border-t border-b py-1.5 px-2">
        <div className="flex gap-4 ">
          <p
            onClick={() => setSelected("")}
            className={`hover:underline cursor-pointer ${
              !selected && "text-red-600"
            }`}
          >
            All
          </p>
          <p
            onClick={() => setSelected("Music")}
            className={`hover:underline cursor-pointer ${
              selected === "Music" && "text-red-600"
            }`}
          >
            Music
          </p>
          <p
            onClick={() => setSelected("Sports")}
            className={`hover:underline cursor-pointer ${
              selected === "Sports" && "text-red-600"
            }`}
          >
            Sports
          </p>
          <p
            onClick={() => setSelected("Foods")}
            className={`hover:underline cursor-pointer ${
              selected === "Foods" && "text-red-600"
            }`}
          >
            Foods
          </p>
          <p
            onClick={() => setSelected("Pets")}
            className={`hover:underline cursor-pointer ${
              selected === "Pets" && "text-red-600"
            }`}
          >
            Pets
          </p>
          <p
            onClick={() => setSelected("Travel")}
            className={`hover:underline cursor-pointer ${
              selected === "Travel" && "text-red-600"
            }`}
          >
            Travel
          </p>
        </div>

        <input
          type="text"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
          placeholder="Search"
          className="px-2 border outline-none text-sm h-8"
        />
      </nav>
      <section>
        {postList.map((post) => (
          <UpdatePost key={post.id} post={post} />
        ))}
      </section>
    </section>
  );
};

export default NewUpdate;
