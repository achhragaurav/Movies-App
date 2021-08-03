import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import Search from "./components/Search";

import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="nav">
      <h2 className="logo">
        <img src={Logo} alt="" />
      </h2>
      <ul className="list">
        <li className="list-item">
          <Link to="/" className="list-item">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link to="/contact" className="list-item">
            Contact
          </Link>
        </li>
        <li className="list-item">
          <Link to="/movies" className="list-item">
            Movies
          </Link>
        </li>
        <li className="list-item">
          <Search />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
