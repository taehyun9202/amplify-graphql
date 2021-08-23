import React, { useState } from "react";

const CategoryInput = ({ id, open, setOpen }) => {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState(["Music", "IU", "KPop"]);
  console.log(categories);
  const handleSubmit = (e) => {
    e.preventDefault();
    !categories.includes(input) &&
      input &&
      setCategories([...categories, input]);
    setInput("");
  };

  const handleSave = (e) => {
    setOpen(false);
  };
  return (
    <div className="w-full">
      <div className="flex-grow py-4">
        {categories.map((category) => (
          <div key={category} className="py-1 px-1  inline-block">
            <div
              className="inline-block bg-dark text-white text-xs font-semibold px-2 py-1 rounded-lg cursor-pointer"
              onClick={() => {
                const newCategories = categories.filter((c) => c !== category);
                setCategories(newCategories);
              }}
            >
              {category}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex px-3 pb-6 gap-2">
        <input
          className="w-full outline-none bg-gray-100 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter new category"
        />
        <p
          type="submit"
          onClick={() => {
            !categories.includes(input) &&
              input &&
              setCategories([...categories, input]);
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
