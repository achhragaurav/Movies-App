import React from "react";
import { useEffect, useState } from "react";
import List from "./List";

const Suggestion = (props) => {
  const [loadingSimilarMovies, setLoadingSimilarMovies] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  const getSimilarMoviesAPI = async (id, type) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${
        type ? type : "movie"
      }/${id}/similar?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=1`
    );
    if (data.status > 250 || data.status < 200 ? true : false) {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const response = await data.json();
      return response;
    }
    const response = await data.json();
    return response;
  };

  const getSimilarMoviesFunction = async (id, type) => {
    const similarMovies = await getSimilarMoviesAPI(id, type);
    console.log(similarMovies);
    setSimilarMovies(similarMovies.results);
    setLoadingSimilarMovies(false);
  };

  useEffect(() => {
    getSimilarMoviesFunction(props.id, props.type);
  }, []);

  if (loadingSimilarMovies) {
    return <h1>Loading</h1>;
  }

  return <List data={similarMovies} />;
};

export default Suggestion;
