import "./SingleMovie.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import MovieContainer from "./MovieContainer";
import { GlobalContext } from "./Context";
const SingleMovieApiLink = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/`;

const SingleMovie = () => {
  const { singleMovieDataPass } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState([]);
  const { id } = useParams();
  console.log(singleMovieDataPass);
  const getSingleMovie = async () => {
    try {
      const response = await fetch(`${SingleMovieApiLink}${id}`, {
        headers: {
          "x-rapidapi-key":
            "9bf439e012mshc51568f00f1e937p1c846ejsn2906142dc06f",
          "x-rapidapi-host":
            "imdb-internet-movie-database-unofficial.p.rapidapi.com",
        },
      });
      const data = await response.json();
      console.log(data);
      const {
        title,
        poster,
        year,
        cast,
        length,
        plot,
        rating,
        rating_votes,
        trailer,
      } = await data;
      const movieElements = await {
        title,
        poster,
        year,
        cast,
        length,
        plot,
        rating,
        rating_votes,
        trailer,
      };
      return movieElements;
    } catch (error) {
      console.log(error);
    }
  };

  const singleMovieDataAssign = async () => {
    setLoading(true);
    const data = await getSingleMovie();
    console.log(data);
    await setMovieInfo(data);
    if (singleMovieDataPass) {
      await setLoading(false);
    }
  };

  useEffect(() => {
    singleMovieDataAssign();
  }, [id]);

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
          <div className="image-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${singleMovieDataPass.backdrop_path}`}
              alt=""
            />
          </div>
          <div className="details-container">
            <h1 className="movie-name">{movieInfo.title}</h1>
            <div className="movie-year">
              <h4>Year Of Release : {movieInfo.year}</h4>
              <h4>Length :{movieInfo.length} </h4>
            </div>
            <div className="plot">
              <p>{movieInfo.plot}</p>
            </div>
            <div className="rating">
              <div className="rating-count">
                <h4>ImDb Rating: {movieInfo.rating}</h4>
              </div>
              <div className="rating-votes">
                <h4>Total Votes: {movieInfo.rating_votes}</h4>
              </div>
            </div>
            <div className="cast">
              <h1>
                Cast: <br />
              </h1>
              <div className="actor">
                {movieInfo.cast.map((person, index) => {
                  return <h4 key={index}>Actor: {person.actor}</h4>;
                })}
              </div>
            </div>
          </div>
        </div>
      </MovieContainer>
    </main>
  );
};

export default SingleMovie;
