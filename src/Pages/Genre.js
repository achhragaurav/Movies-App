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
  // Context
  const { setDisplayPagination, setDisplaySearchBar } =
    useContext(GlobalContext);
  // States
  const [genre, setGenre] = useState(false);
  const [listData, setListData] = useState(false);
  // Functions
  // Get Genre Id
  const getGenere = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const response = await data.json();
    console.log(response);
    setGenre(response.genres);
    return response;
  };
  // Get Data
  const genreDataFetcher = async (genree) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.REACT_APP_API_KEY
      }&with_genres=${genree ? genree.id : 28}&sort_by=revenue.desc`
    );
    const response = await data.json();
    await setListData(response);
  };
  // Change Data and re render comp
  const genreChangeHandler = async (genree) => {
    const genreId = await genre.find((item) => {
      return item.name === genree;
    });
    genreDataFetcher(genreId);
  };
  // Init Function
  const init = async () => {
    await getGenere();
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
            onChange={(e) => {
              genreChangeHandler(e.target.value);
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
          <List data={listData.results} />
        </div>
      )}

      <h1>Genre</h1>
    </div>
  );
};

export default Genre;
