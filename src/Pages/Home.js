import React from "react";
import { GlobalContext } from "../components/Context";
import { useState, useEffect } from "react";
import { fetchMovies } from "../utils/fetchMovies";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Search from "../components/Search";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState({});

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
        <GlobalContext.Provider
          value={{ setLoading, movies, setMovies, loading }}
        >
          <Search />
          {movies.titles.map((item) => {
            return (
              <div className="movie" id={item.id}>
                <h1>{item.title}</h1>
                <Link to={`/singleMovie/${item.id}`}>
                  <img src={item.image} alt="" />
                </Link>
              </div>
            );
          })}
        </GlobalContext.Provider>
      </main>
    </div>
  );
};

export default Home;
