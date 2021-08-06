import React, { useContext, useRef } from "react";
import { GlobalContext } from "./Context";

const Search = () => {
  const { setLoading, setMovies, movies, pageNumber, setTotalPages } =
    useContext(GlobalContext);
  const input = useRef(null);
  const previousData = movies;
  const searchMoviesAPI = async () => {
    if (!input.current.value) {
      setMovies(previousData);
      return;
    } else {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${input.current.value}&page=${
          pageNumber ? pageNumber : 1
        }&include_adult=false`
      );
      console.log(input);
      const response = await data.json();
      console.log(response);
      setTotalPages(response.total_pages);
      return setMovies(response);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        ref={input}
        // onChange={searchMoviesAPI}
      />
      <button
        onClick={() => {
          setLoading(true);
          searchMoviesAPI();
          setLoading(false);
          // fetchMovies(input.current.value).then((data) => {
          //   setMovies(data);
          //   setLoading(false);
          // });
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
