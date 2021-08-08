import React from "react";
import { useEffect, useContext, useState } from "react";
import List from "./List";

const Suggestion = (props) => {
  const [loadingSimilarMovies, setLoadingSimilarMovies] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  const getSimilarMoviesAPI = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    );
    const response = await data.json();
    return response;
  };
  const getSimilarMoviesFunction = async (id) => {
    const similarMovies = await getSimilarMoviesAPI(id);
    console.log(similarMovies);
    setSimilarMovies(similarMovies.results);
    setLoadingSimilarMovies(false);
  };
  useEffect(() => {
    getSimilarMoviesFunction(props.id);
  }, []);

  if (loadingSimilarMovies) {
    return <h1>Loading</h1>;
  }

  return <List data={similarMovies} />;
};

export default Suggestion;
