import React from "react";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../components/Context";
import "./Genre.css";

const Genre = () => {
  const { setDisplayPagination, setDisplaySearchBar } =
    useContext(GlobalContext);
  useEffect(() => {
    setDisplayPagination(true);
    setDisplaySearchBar(false);
  });

  return (
    <div>
      <h1>Genre</h1>
    </div>
  );
};

export default Genre;
