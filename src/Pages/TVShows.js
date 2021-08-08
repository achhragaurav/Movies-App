import React from "react";
import "./TVShows.css";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../components/Context";

const TVShows = () => {
  const { setDisplayPagination, setDisplaySearchBar } =
    useContext(GlobalContext);
  useEffect(() => {
    setDisplayPagination(true);
    setDisplaySearchBar(false);
  });
  return <div>TV Shows</div>;
};

export default TVShows;
