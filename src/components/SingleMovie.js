import "./SingleMovie.css";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import MovieContainer from "./MovieContainer";
import { GlobalContext } from "./Context";
import Suggestion from "./Suggestion";
const SingleMovie = () => {
  const [loading, setLoading] = useState(true);
  const { id, type } = useParams();
  useEffect(() => {
    setDisplayPagination(false);
    setDisplaySearchBar(false);
    singleMovieDataAssign();
  }, [id]);
  const {
    singleMovieDataPass,
    setSingleMovieDataPass,
    setDisplayPagination,
    setDisplaySearchBar,
  } = useContext(GlobalContext);
  const singleDataFetcher = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${type ? type : "movie"}/${id}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US`
    );
    console.log(data.status);
    if (data.status > 250 || data.status < 200 ? true : false) {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      const response = await data.json();
      setSingleMovieDataPass(response);
      return;
    }
    const response = await data.json();
    setSingleMovieDataPass(response);
    return;
  };

  const singleMovieDataAssign = async () => {
    setLoading(true);
    await singleDataFetcher(id);
    await setLoading(false);
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <main className="movie-container-main">
      <MovieContainer className="movie-container">
        <div className="movie-container-div">
          <div className="top-section">
            <div className="image-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${singleMovieDataPass.poster_path}`}
                alt=""
              />
            </div>
            <div className="details-container">
              <h1 className="movie-name">
                {singleMovieDataPass.original_title}
              </h1>
              <div className="movie-year">
                <h4>Year Of Release : {singleMovieDataPass.release_date}</h4>
                <h4>Popularity :{singleMovieDataPass.popularity} </h4>
              </div>
              <div className="plot">
                <p>{singleMovieDataPass.overview}</p>
              </div>
              <div className="rating">
                <div className="rating-count">
                  <h4>ImDb Rating: {singleMovieDataPass.vote_average}</h4>
                </div>
                <div className="rating-votes">
                  <h4>Total Votes: {singleMovieDataPass.vote_count}</h4>
                </div>
              </div>
              <div className="screenshot">
                <img
                  src={`https://image.tmdb.org/t/p/w500${singleMovieDataPass.backdrop_path}`}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="similar-movies">
            <h2>Suggestions</h2>
            <Suggestion id={id} type={type} />
          </div>
        </div>
      </MovieContainer>
    </main>
  );
};

export default SingleMovie;
