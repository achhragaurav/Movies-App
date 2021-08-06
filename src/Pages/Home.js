import React, { useContext } from "react";
import { useEffect, useRef } from "react";
import { fetchMovies } from "../utils/fetchMovies";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { GlobalContext } from "../components/Context";
const Home = () => {
  const {
    loading,
    setLoading,
    movies,
    setMovies,
    setSingleMovieDataPass,
    pageNumber,
    setTotalPages,
    searchOnOff,
  } = useContext(GlobalContext);
  const movieSetter = (item) => {
    setSingleMovieDataPass(item);
    console.log("hello");
  };
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
    if (!searchOnOff) {
      fetchData(pageNumber);
    }
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
      <main>
        {movies.results.map((item, index) => {
          console.log(item);
          console.log(item.poster_path);
          return (
            <Link
              key={index}
              to={`/singleMovie/${item.id}`}
              onClick={() => {
                movieSetter(item);
              }}
              className="link"
              movieinfoset={item}
            >
              <div className="movie" key={item.id} id={item.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${
                    item.poster_path ? item.poster_path : item.profile_path
                  }`}
                  alt="No_Image_Available"
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
