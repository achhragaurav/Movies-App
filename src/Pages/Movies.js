import React, { useState } from "react";
import "./Movies.css";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../components/Context";
import List from "../components/List";
import Loading from "../components/Loading";

const Movies = () => {
  const { setDisplayPagination, setDisplaySearchBar } =
    useContext(GlobalContext);
  const [movieSecLoading, setMovieSecLoading] = useState(true);
  const [movieSection, setMovieSection] = useState();
  const movieFilterFetcher = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    );
    const response = await data.json();
    return response;
  };
  const movieFilterSetter = async () => {
    const data = await movieFilterFetcher();
    await setMovieSection(data.results);
    console.log(movieSection);
    await setMovieSecLoading(false);
    console.log(data);
  };

  useEffect(() => {
    movieFilterSetter();
    setDisplayPagination(true);
    setDisplaySearchBar(false);
  }, []);
  if (movieSecLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>Movies</h1>
      <input type="date" />
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <List data={movieSection} />
    </div>
  );
};

export default Movies;
