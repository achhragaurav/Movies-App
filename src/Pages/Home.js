import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { fetchMovies } from "../utils/fetchMovies";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { GlobalContext } from "../components/Context";
const Home = () => {
  const { loading, setLoading, movies, setMovies } = useContext(GlobalContext);
  const fetchData = async (movies) => {
    setLoading(true);
    try {
      const response = await fetchMovies(movies);
      await setMovies(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData("Inception");
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <div>
      <main>
        {movies.titles.map((item) => {
          return (
            <Link to={`/singleMovie/${item.id}`} className="link">
              <div className="movie" id={item.id}>
                <img src={item.image} alt="" />
                <h1>{item.title}</h1>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
