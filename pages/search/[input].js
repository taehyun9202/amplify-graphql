import React from "react";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();

  return (
    <div>
      <p>Search</p>
      <p>{router.query.input}</p>
    </div>
  );
};

export default Search;
