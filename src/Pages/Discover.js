import "./Discover.css";
import React, { useContext } from "react";
import { useEffect, useRef } from "react";
import { fetchMovies } from "../utils/fetchMovies";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import List from "../components/List";
import { GlobalContext } from "../components/Context";
const Discover = () => {
  const {
    loading,
    setLoading,
    movies,
    setMovies,
    pageNumber,
    setTotalPages,
    searchOnOff,
    setDisplayPagination,
    setDisplaySearchBar,
    setPage,
  } = useContext(GlobalContext);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetchMovies(page);
      await setMovies(response);
      await setTotalPages(response.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, []);
  useEffect(() => {
    if (!searchOnOff) {
      fetchData(pageNumber);
    }
    setDisplayPagination(true);
    setDisplaySearchBar(true);
  }, [pageNumber]);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <div>
      <List data={movies.results} />
    </div>
  );
};

export default Discover;
