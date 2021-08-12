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
  const { setDisplayPagination, setDisplaySearchBar } =
    useContext(GlobalContext);
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
    console.log(response);
    setGenre(response.genres);
    return response;
  };
  // Get Data
  const genreDataFetcher = async (genree, movieOrTv) => {
    if (movieOrTv === "tv") {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${
          genree ? genree.id : 10759
        }&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
      );

      const response = await data.json();
      const newResponse = response.results.map((item) => {
        return { media_type: movieOrTv, ...item };
      });
      setListData(newResponse);
      return;
    }
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.REACT_APP_API_KEY
      }&with_genres=${genree ? genree.id : 28}&sort_by=revenue.desc`
    );

    const response = await data.json();
    console.log(response);
    const newResponse = response.results.map((item) => {
      return { media_type: movieOrTv, ...item };
    });
    console.log(newResponse);
    await setListData(newResponse);
  };
  // Change Data and re render comp
  const genreChangeHandler = async (genree, movieOrTv) => {
    const genres = await getGenere(movieOrTv);
    const setgenres = await setGenre(genres.genres);
    const genreId = await genre.find((item) => {
      return item.name === genree || item.id === +genree;
    });
    genreDataFetcher(genreId, movieOrTv);
  };
  // Init Function
  const init = async () => {
    await getGenere("movie");
    genreDataFetcher();
  };
  // Use effect
  useEffect(() => {
    setDisplayPagination(true);
    setDisplaySearchBar(false);
    init();
  }, []);

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
              genreChangeHandler(
                e.target.value,
                genreMoviesOrTvInput.current.value
              );
              console.log(genreInput);
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
