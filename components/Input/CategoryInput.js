import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createCategory, updateCategory } from "../../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../graphql/queries";
import { useRouter } from "next/dist/client/router";
import { getCategories } from "../../store/actions/blogAction";

const CategoryInput = ({ id, open, setOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.blog.category);
  const categoryId = useSelector((state) => state.blog.categoryId);
  const username = useSelector((state) => state.profile.profile.username);
  const [input, setInput] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    !categoryData.includes(input) &&
      input &&
      setCategoryData([...categoryData, input]);
    setInput("");
  };

  const handleSave = (e) => {
    if (category.length < 1) {
      createCategoryData();
    } else {
      updateCategoryData();
    }
    setOpen(false);
  };

  useEffect(() => {
    setCategoryData(category);
  }, [category]);

  const createCategoryData = async () => {
    console.log(categoryData);
    try {
      await API.graphql(
        graphqlOperation(createCategory, {
          input: { owner: username, list: categoryData },
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateCategoryData = async () => {
    try {
      await API.graphql(
        graphqlOperation(updateCategory, {
          condition: { owner: { eq: username } },
          input: { id: categoryId, list: categoryData },
        })
      )
        .then((res) => {
          const data = res.data.updateCategory;
          console.log(res.data.updateCategory);
          dispatch(getCategories(data.list, data.id));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="w-full">
      <div className="flex-grow py-4 px-2">
        {categoryData.map((category) => (
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
            !categoryData.includes(input) &&
              input &&
              setCategoryData([...categoryData, input]);
            setInput("");
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
