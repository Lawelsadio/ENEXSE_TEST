import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand navbar-light bg-dark"
      style={{ width: "100%" }}
    >
      <div className="container">
        <NavLink className="navbar-brand text-white" to="/">
          ACCUEIL
        </NavLink>
        <ul className="navbar-nav mt-2  ml-auto mt-lg-0">
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              to="/code"
              aria-current="page"
            >
              Code
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/agent">
              A determiner
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/code/examen">
              Examen Blanc
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
