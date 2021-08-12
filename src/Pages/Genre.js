// Imports
import React from "react";
import { useEffect, useContext, useState, useRef } from "react";
import { GlobalContext } from "../components/Context";
import List from "../components/List";
import "./Genre.css";
// Genre Component
const Genre = () => {
  // Refs
  const genreInput = useRef(null);
  const genreMoviesOrTvInput = useRef(null);

  // Context
  const {
    setDisplayPagination,
    setDisplaySearchBar,
    loading,
    setLoading,
    movies,
    setMovies,
    pageNumber,
    setTotalPages,
    setPage,
  } = useContext(GlobalContext);
  // States
  const [genre, setGenre] = useState(false);
  const [listData, setListData] = useState(false);
  const [selectedGenreID, setSelectedGenreID] = useState(35);
  // Functions
  // Get Genre Id
  const getGenere = async (movieOrTv) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${movieOrTv}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const response = await data.json();
    setGenre(response.genres);
    return response;
  };
  // Get Data
  const genreDataFetcher = async (genree, movieOrTv = "movie") => {
    if (movieOrTv === "tv") {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&page=${pageNumber}&timezone=America%2FNew_York&with_genres=${
          genree ? genree.id : 10759
        }&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
      );

      const response = await data.json();
      const newResponse = response.results.map((item) => {
        return { media_type: movieOrTv, ...item };
      });
      await setTotalPages(response.total_pages);
      await setListData(newResponse);
      return;
    }
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${
        genree ? genree.id : 28
      }&with_watch_monetization_types=flatrate`
    );

    const response = await data.json();
    const newResponse = response.results.map((item) => {
      return { media_type: movieOrTv, ...item };
    });
    await setTotalPages(response.total_pages);
    await setListData(newResponse);
  };
  // Change Data and re render comp
  const genreChangeHandler = async (genree, movieOrTv = "movie") => {
    const genres = await getGenere(movieOrTv);
    const setgenres = await setGenre(genres.genres);
    const genreId = await genre.find((item) => {
      return item.name === genree || item.id === +genree;
    });
    genreDataFetcher(genreId, movieOrTv);
  };
  // Init Function
  const init = async (genree, movieOrTv = "movie") => {
    const genres = await getGenere(movieOrTv);
    const setgenres = await setGenre(genres.genres);
    const genreId = await genres.genres.find((item) => {
      return item.name === genree || item.id === +genree;
    });
    genreDataFetcher(genreId, movieOrTv);
  };
  // Use effect
  useEffect(() => {
    setDisplayPagination(true);
    setDisplaySearchBar(false);
    setPage(1);
    init();
  }, []);
  useEffect(() => {
    init(
      genreInput.current ? genreInput.current.value : "Action",
      genreMoviesOrTvInput.current
        ? genreMoviesOrTvInput.current.value
        : "movie"
    );
  }, [pageNumber]);
  // Component Render
  return (
    <div>
      {listData && (
        <div>
          <select
            ref={genreInput}
            name="movies"
            id="movies"
            onChange={async (e) => {
              await setSelectedGenreID(e.target.value);
              setPage(1);
              genreChangeHandler(
                e.target.value,
                genreMoviesOrTvInput.current.value
              );
            }}
          >
            {genre.map(({ id, name }) => {
              return (
                <option key={id} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          <select
            name="moviesOrTv"
            id="moviesOrTv"
            ref={genreMoviesOrTvInput}
            onChange={async (e) => {
              await setPage(1);
              await genreChangeHandler(selectedGenreID, e.target.value);
            }}
          >
            <option value="movie">Movies</option>
            <option value="tv">TV</option>
          </select>
          <List data={listData} />
        </div>
      )}

      <h1>Genre</h1>
    </div>
  );
};

export default Genre;
