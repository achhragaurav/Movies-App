import React, { useContext, useRef } from "react";
import { fetchMovies } from "../utils/fetchMovies";
import { GlobalContext } from "./Context";

const Search = () => {
  const { setLoading, dataa } = useContext(GlobalContext);
  const input = useRef(null);

  return (
    <div className="search">
      <input type="text" ref={input} />
      <button
        onClick={() => {
          setLoading(true);
          fetchMovies(input.current.value).then((data) => {
            dataa.titles = data.titles;
            setLoading(false);
          });
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
