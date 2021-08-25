import React, { useEffect, useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createCategory, updateCategory } from "../../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getBlogger, putNotification } from "../../store/actions/blogAction";
import { getUser } from "../../graphql/queries";
import { getProfile } from "../../store/actions/profileAction";

const CategoryInput = ({ id, open, setOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.profile);
  const user = useSelector((state) => state.profile.profile);
  const [input, setInput] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((input && categoryData.includes(input)) || !input) {
      console.log("duplicate or no input");
    } else {
      setCategoryData([...categoryData, input]);
      setInput("");
    }
  };

  const handleSave = (e) => {
    if (!blog.category) {
      console.log("creating category");
      createCategoryData();
    } else {
      console.log("updating category");
      updateCategoryData();
      dispatch(
        putNotification({
          type: "Notification",
          message: "Category Updated",
        })
      );
    }
    checkUser();

    dispatch(getBlogger(user));
    setOpen(false);
  };

  useEffect(() => {
    if (blog.category) {
      setCategoryData(blog.category);
    } else {
      return null;
    }
  }, [blog.category]);
  console.log(categoryData);

  const createCategoryData = async () => {
    try {
      await API.graphql(
        graphqlOperation(createCategory, {
          input: { id: user.id, owner: user.username, list: categoryData },
        })
      )
        .then((res) => {
          console.log("created");
        })
        .catch((err) => {
          updateCategoryData();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updateCategoryData = async () => {
    try {
      await API.graphql(
        graphqlOperation(updateCategory, {
          condition: { owner: { eq: user.username } },
          input: { id: user.id, list: categoryData },
        })
      )
        .then((res) => {
          console.log("updated");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: user.attributes.sub })
      );
      dispatch(
        getProfile(
          userData.data.getUser,
          user.signInUserSession.accessToken.jwtToken
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex-grow py-4 px-2">
        {categoryData &&
          categoryData.map((category) => (
            <div key={category} className="py-1 px-1 inline-block">
              <div
                className="inline-block bg-dark text-white text-xs font-semibold px-2 py-1 rounded-lg cursor-pointer"
                onClick={() => {
                  const newCategories = categoryData.filter(
                    (c) => c !== category
                  );
                  setCategoryData(newCategories);
                }}
              >
                {category}
              </div>
            </div>
          ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex px-3 pb-6 gap-2">
        <input
          className="w-full outline-none bg-gray-100 rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter new category"
        />
        <p
          type="submit"
          onClick={() => {
            if ((input && categoryData.includes(input)) || !input) {
              return null;
            } else {
              setCategoryData([...categoryData, input]);
              setInput("");
            }
          }}
          className="bg-dark text-white text-sm font-semibold px-4 py-1 max-w-max rounded cursor-pointer"
        >
          Add
        </p>
      </form>
      <div className="text-lg font-semibold leading-6 text-white bg-dark p-4 text-center cursor-pointer">
        <p onClick={(e) => handleSave(e)}>Save</p>
      </div>
    </div>
  );
};

export default CategoryInput;
