import React from "react";
import "./Movies.css";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../components/Context";

const Movies = () => {
  const { setDisplayPagination, setDisplaySearchBar } =
    useContext(GlobalContext);
  useEffect(() => {
    setDisplayPagination(true);
    setDisplaySearchBar(false);
  });
  return (
    <div>
      <h1>Movies</h1>
      <input type="date" />
    </div>
  );
};

export default Movies;
