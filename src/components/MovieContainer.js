import React from "react";
import "./MovieContainer.css";

const MovieContainer = (props) => {
  return <div className="movie-container">{props.children}</div>;
};

export default MovieContainer;
