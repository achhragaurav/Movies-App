import React from "react";
import "./TVShows.css";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../components/Context";
import List from "../components/List";

const TVShows = () => {
  const { setDisplayPagination, setDisplaySearchBar } =
    useContext(GlobalContext);
  const [TVLoading, setTVLoading] = useState(true);
  const [TVShows, setTVShows] = useState([]);

  const TVFilterFetcher = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
    );
    const response = await data.json();
    return response;
  };
  const TVFilterSetter = async () => {
    const data = await TVFilterFetcher();
    const newResponse = data.results.map((item) => {
      return { media_type: "tv", ...item };
    });
    await setTVShows(newResponse);
    console.log(newResponse);
    await setTVLoading(false);
    console.log(data);
  };

  useEffect(() => {
    TVFilterSetter();
    setDisplayPagination(true);
    setDisplaySearchBar(false);
  }, []);

  return (
    <div>
      <h1>TV Shows</h1>
      <List data={TVShows} />
    </div>
  );
};

export default TVShows;
