import React, { useContext, useRef } from "react";
import { fetchMovies } from "../utils/fetchMovies";
import { GlobalContext } from "./Context";

const Search = () => {
  const { setLoading, setMovies } = useContext(GlobalContext);
  const input = useRef(null);

  return (
    <div className="search">
      <input type="text" ref={input} />
      <button
        onClick={() => {
          setLoading(true);
          fetchMovies(input.current.value).then((data) => {
            setMovies(data);
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
