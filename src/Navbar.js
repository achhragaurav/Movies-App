import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import Search from "./components/Search";
import "./Navbar.css";
import { GlobalContext } from "./components/Context";

const Navbar = () => {
  const { displaySearchBar } = useContext(GlobalContext);

  return (
    <nav className="nav">
      <h2 className="logo">
        <img src={Logo} alt="" />
      </h2>
      <ul className="list">
        <li className="list-item">
          <Link to="/" className="list-item">
            Discover
          </Link>
        </li>
        <li className="list-item">
          <Link to="/genre" className="list-item">
            Genre
          </Link>
        </li>
        <li className="list-item">
          <Link to="/movies" className="list-item">
            Movies
          </Link>
        </li>
        <li className="list-item">
          <Link to="/tvshows" className="list-item">
            TV Shows
          </Link>
        </li>
        <li className="list-item">{displaySearchBar && <Search />}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
