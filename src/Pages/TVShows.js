import React from "react";
import "./TVShows.css";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../components/Context";
import List from "../components/List";

const TVShows = () => {
  const {
    setDisplayPagination,
    setDisplaySearchBar,
    setPage,
    movies,
    setMovies,
    pageNumber,
    setTotalPages,
    searchOnOff,
  } = useContext(GlobalContext);
  const [TVLoading, setTVLoading] = useState(true);
  const [TVShows, setTVShows] = useState([]);

  const TVFilterFetcher = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${pageNumber}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
    );
    const response = await data.json();
    return response;
  };
  const TVFilterSetter = async () => {
    await setTVLoading(true);
    const data = await TVFilterFetcher();
    const newResponse = data.results.map((item) => {
      return { media_type: "tv", ...item };
    });
    await setTotalPages(data.total_pages);
    await setTVShows(newResponse);
    console.log(newResponse);
    await setTVLoading(false);
    console.log(data);
  };

  useEffect(() => {
    setPage(1);
    TVFilterSetter();
    setDisplayPagination(true);
    setDisplaySearchBar(false);
  }, []);
  useEffect(() => {
    TVFilterSetter();
  }, [pageNumber]);

  if (TVLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <h1>TV Shows</h1>
      <List data={TVShows} />
    </div>
  );
};

export default TVShows;
