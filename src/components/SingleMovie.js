import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
const SingleMovieApiLink = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/`;

const SingleMovie = () => {
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState([]);
  const { id } = useParams();

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
      const { title, poster, year, cast } = await data;
      const movieElements = await { title, poster, year, cast };
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
    await setLoading(false);
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
    <main>
      <h1>{movieInfo.title}</h1>
      <img src={movieInfo.poster} alt="" />
      <h4>{movieInfo.year}</h4>
      {movieInfo.cast.map((person, index) => {
        return <h4 key={index}>{person.actor}</h4>;
      })}
    </main>
  );
};

export default SingleMovie;
