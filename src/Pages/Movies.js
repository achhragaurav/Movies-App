import React, { useState } from "react";
import "./Movies.css";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../components/Context";
import List from "../components/List";
import Loading from "../components/Loading";

const Movies = () => {
  const {
    setDisplayPagination,
    setDisplaySearchBar,
    movies,
    setMovies,
    setPage,
    pageNumber,
    setTotalPages,
    searchOnOff,
  } = useContext(GlobalContext);
  const [movieSecLoading, setMovieSecLoading] = useState(true);
  const [movieSection, setMovieSection] = useState();
  const movieFilterFetcher = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`
    );
    console.log(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`
    );
    const response = await data.json();
    return response;
  };
  const movieFilterSetter = async () => {
    await setMovieSecLoading(true);
    const data = await movieFilterFetcher();
    const newResponse = data.results.map((item) => {
      return { media_type: "movie", ...item };
    });
    await setTotalPages(data.total_pages);
    await setMovieSection(newResponse);
    console.log(movieSection);
    await setMovieSecLoading(false);
    console.log(data);
  };

  useEffect(() => {
    setPage(1);
    movieFilterSetter();
    setDisplayPagination(true);
    setDisplaySearchBar(false);
  }, []);

  useEffect(() => {
    movieFilterSetter();
  }, [pageNumber]);

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
