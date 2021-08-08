import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./Context";
import "./List.css";

const List = (props) => {
  console.log(props);
  return (
    <main>
      {props.data.map((item, index) => {
        return (
          <Link
            key={index}
            to={`/singleMovie/${item.id}`}
            onClick={() => {}}
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
  );
};

export default List;
