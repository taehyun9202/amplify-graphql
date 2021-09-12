import React, { useEffect, useState } from "react";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { createPost, updatePost } from "../../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getPosts, putNotification } from "../../store/actions/blogAction";
import awsmobile from "../../aws-exports";
import Image from "next/image";
const PostInput = ({ open, setOpen, post = null }) => {
  const user = useSelector((state) => state.profile.profile);
  const blog = useSelector((state) => state.blog.profile);
  const initialForm = {
    title: "",
    content: "",
    category: [],
    public: true,
    photo: { bucket: "", region: "", key: "" },
    owner: blog.username,
    like: 0,
    view: 0,
  };
  const [postForm, setPostForm] = useState(
    post
      ? {
          id: post.id,
          title: post.title,
          content: post.content,
          category: post.category,
          public: post.public,
          photo: post.photo,
          owner: post.owner,
          like: post.like,
          view: post.view,
        }
      : initialForm
  );
  const [category, setCategory] = useState("");
  const [tempCategory, setTempCategory] = useState(blog.category);
  const [selectedCategory, setSelectedCategory] = useState(
    post ? post.category : []
  );

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [imageType, setImageType] = useState("");
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageType(file.name.split(".")[1]);
      setImage(file);

      // store image as preview
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setPreview(e.target.result);
      };
    }
  };

  useEffect(() => {
    if (imageType !== "jpg") {
      setError("Only JPG file is allowed");
    } else {
      setError("");
    }
  }, [imageType]);

  useEffect(() => {
    if (image) {
      setPostForm({
        ...postForm,
        photo: {
          bucket: awsmobile.aws_user_files_s3_bucket,
          region: awsmobile.aws_user_files_s3_bucket_region,
          key: "public/" + postForm.title + "-" + postForm.owner,
        },
      });
    }
  }, [image, preview]);

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

  console.log(post);

  const handleSave = async () => {
    if (!postForm.title || !postForm.content) {
      if (!postForm.title) {
        setTitleError("Title Required");
      } else if (!postForm.content) {
        setContentError("Content Required");
      }

      return;
    }
    try {
      if (image.name) {
        await Storage.put(
          postForm.title + "-" + postForm.owner + "." + imageType,
          image,
          { contentType: "image/jpeg" }
        )
          .then(() => {
            console.log("saved image", postForm);
            setImage("");
          })
          .catch((err) => console.log(err));
      }

      if (!post) {
        await API.graphql(graphqlOperation(createPost, { input: postForm }))
          .then((res) => {
            console.log("created", res.data);
            setOpen(false);
            dispatch(
              putNotification({
                type: "Notification",
                message: "New Post Created",
              })
            );
            dispatch(getPosts(router.query.id));
          })
          .catch((err) => {
            console.log(err);
            dispatch(
              putNotification({
                type: "Danger",
                message: "Something Went Wrong",
              })
            );
          });
      } else {
        console.log(postForm);
        await API.graphql(
          graphqlOperation(updatePost, {
            input: postForm,
            condition: { owner: { eq: user.username } },
          })
        )
          .then((res) => {
            console.log("updated", res.data);
            setOpen(false);
            dispatch(
              putNotification({
                type: "Notification",
                message: "Post Updated",
              })
            );
            dispatch(getPosts(router.query.id));
          })
          .catch((err) => {
            console.log(err);
            dispatch(
              putNotification({
                type: "Danger",
                message: "Something Went Wrong",
              })
            );
          });
      }
    } catch (err) {
      console.log(err);
      dispatch(
        putNotification({
          type: "Danger",
          message: "Something Went Wrong",
        })
      );
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
            className={`w-full outline-none rounded px-2 ${
              post ? "bg-gray-400 cursor-not-allowed" : "bg-gray-100"
            }`}
            name="title"
            value={postForm.title}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Enter Title"
            disabled={post ? true : false}
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
        {preview && (
          <div className="relative w-96 h-60 m-auto">
            <Image
              src={preview}
              alt="post image"
              layout="fill"
              className="object-contain"
            />
          </div>
        )}
        <input type="file" onChange={(e) => imageHandler(e)} />
        {error.length > 0 && <p className="text-red-600">{error}</p>}
        {titleError.length > 0 && <p className="text-red-600">{titleError}</p>}
        {contentError.length > 0 && (
          <p className="text-red-600">{contentError}</p>
        )}
      </div>
      <div className="text-lg font-semibold leading-6 text-white bg-dark p-4 text-center cursor-pointer">
        <p onClick={() => handleSave()}>Save</p>
      </div>
    </div>
  );
};

export default PostInput;
