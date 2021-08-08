import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "./Context";
import "./Search.css";

const Search = () => {
  const {
    setLoading,
    setMovies,
    movies,
    pageNumber,
    setTotalPages,
    searchOnOff,
    setSearchOnOff,
  } = useContext(GlobalContext);
  const input = useRef(null);
  const previousData = movies;

  const setSearchFunction = () => {
    if (
      !input.current.value ||
      input.current.value === "" ||
      input.current.value === null
    ) {
      setSearchOnOff(false);
    } else {
      setSearchOnOff(true);
    }
  };

  const fetchSearchMoviesAPI = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${input.current.value}&page=${
        pageNumber ? pageNumber : 1
      }&include_adult=false`
    );
    const response = await data.json();
    console.log(response);
    return response;
  };

  const inputBox = document.querySelector(".searchInput");
  const searchMoviesAPI = async () => {
    if (!input.current.value) {
      setMovies(previousData);
      inputBox.style.border = "2px solid red";
      return;
    } else {
      setLoading(true);
      inputBox.style.border = "2px solid #222";
      const response = await fetchSearchMoviesAPI();
      await setTotalPages(response.total_pages);
      await setMovies(response);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (searchOnOff) {
      searchMoviesAPI(pageNumber);
    }
  }, [pageNumber]);
  return (
    <div className="search">
      <input
        type="text"
        ref={input}
        onChange={async () => {
          await setSearchFunction();
          await searchMoviesAPI();
        }}
        className="searchInput"
      />
      <button
        className="search-btn"
        onClick={() => {
          searchMoviesAPI();
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
