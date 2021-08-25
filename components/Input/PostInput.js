import React, { useEffect, useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createPost } from "../../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getPosts } from "../../store/actions/blogAction";

const PostInput = ({ open, setOpen }) => {
  const user = useSelector((state) => state.profile.profile);
  const blog = useSelector((state) => state.blog.profile);
  const initialForm = {
    title: "",
    content: "",
    category: [],
    public: true,
    owner: user.username,
    like: 0,
    view: 0,
  };
  const [postForm, setPostForm] = useState(initialForm);
  const [category, setCategory] = useState("");
  const [tempCategory, setTempCategory] = useState(blog.category);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const updateCategory = () => {
    if (tempCategory.includes(category) || !category) {
      return;
    }
    setTempCategory([...tempCategory, category]);
    setSelectedCategory([...selectedCategory, category]);
    setCategory("");
  };

  useEffect(() => {
    setPostForm({ ...postForm, category: selectedCategory });
  }, [selectedCategory]);

  const handleSave = async () => {
    console.log(postForm);
    try {
      await API.graphql(graphqlOperation(createPost, { input: postForm }))
        .then((res) => {
          console.log("created", res.data);
          dispatch(getPosts(router.query.id));
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full">
      <div
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col px-3 py-4 gap-2"
      >
        <div className="flex gap-4">
          <input
            className="w-full outline-none bg-gray-100 rounded px-2"
            name="title"
            value={postForm.title}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Enter Title"
          />
          <div
            onClick={() =>
              setPostForm({ ...postForm, public: !postForm.public })
            }
            className={`flex items-center justify-center text-xs py-1 w-14 text-white cursor-pointer rounded border-2 hover:bg-gray-100 ${
              postForm.public
                ? "bg-dark border-dark hover:text-dark"
                : "bg-red-600 border-red-600 hover:text-red-600"
            }`}
          >
            {postForm.public ? (
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
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="bg-gray-200 h-0.5 flex-1" />
          <p className="text-xs text-center w-40">Select or Add Category</p>
          <div className="bg-gray-200 h-0.5 flex-1" />
        </div>
        <div className="flex-grow">
          {/* {blog.category?.map((category) => (
            <div key={category} className="py-1 px-1 inline-block">
              <div
                className={`inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-lg cursor-pointer ${
                  postForm.category.includes(category)
                    ? "bg-dark"
                    : "bg-red-600"
                }`}
                onClick={() => {
                  if (postForm.category.includes(category)) {
                    let newCategory = postForm.category.filter(
                      (item) => item !== category
                    );
                    console.log(newCategory);
                    setPostForm({ ...postForm, category: newCategory });
                  } else {
                    let newCategory = [...postForm.category, category];
                    console.log(newCategory);
                    setPostForm({ ...postForm, category: newCategory });
                  }
                }}
              >
                {category}
              </div>
            </div>
          ))} */}
          {tempCategory.map((category) => (
            <div key={category} className="py-1 px-1 inline-block">
              <div
                className={`inline-block text-white text-xs font-semibold px-2 py-1 rounded-lg cursor-pointer ${
                  selectedCategory.includes(category) ? "bg-dark" : "bg-red-600"
                }`}
                onClick={() => {
                  if (!selectedCategory.includes(category)) {
                    setSelectedCategory([...selectedCategory, category]);
                  } else {
                    setSelectedCategory(
                      selectedCategory.filter((item) => item !== category)
                    );
                  }
                  // if (postForm.category.includes(category)) {
                  //   let newCategory = postForm.category.filter(
                  //     (item) => item !== category
                  //   );
                  //   console.log(newCategory);
                  //   setPostForm({ ...postForm, category: newCategory });
                  // } else {
                  //   let newCategory = [...postForm.category, category];
                  //   console.log(newCategory);
                  //   setPostForm({ ...postForm, category: newCategory });
                  // }
                }}
              >
                {category}
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex gap-4"
          // onSubmit={(e) => updateCategory(e)}
        >
          <input
            className="w-full outline-none bg-gray-100 rounded px-2"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="Enter Category"
          />
          <p
            onClick={() => {
              updateCategory();
            }}
            className="bg-dark text-xs py-1 w-14 text-center text-white cursor-pointer rounded border-2 border-dark hover:bg-gray-100 hover:text-dark"
          >
            Add
          </p>
        </div>
        <textarea
          className="w-full outline-none bg-gray-100 rounded px-2 resize-none h-40"
          name="content"
          value={postForm.content}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Enter Content"
        />
      </div>
      <div className="text-lg font-semibold leading-6 text-white bg-dark p-4 text-center cursor-pointer">
        <p onClick={() => handleSave()}>Save</p>
      </div>
    </div>
  );
};

export default PostInput;
