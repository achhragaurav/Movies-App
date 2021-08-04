import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { fetchMovies } from "../utils/fetchMovies";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { GlobalContext } from "../components/Context";
const Home = () => {
  const { loading, setLoading, movies, setMovies, setSingleMovieDataPass } =
    useContext(GlobalContext);
  const movieSetter = (item) => {
    setSingleMovieDataPass(item);
    console.log("hello");
  };
  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetchMovies(page);
      await setMovies(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(1);
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
        {movies.results.map((item) => {
          return (
            <Link
              to={`/singleMovie/${item.id}`}
              onClick={() => {
                movieSetter(item);
              }}
              className="link"
              movieinfoset={item}
            >
              <div className="movie" id={item.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt=""
                />
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
