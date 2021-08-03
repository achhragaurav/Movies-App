import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2>Navbar</h2>
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
