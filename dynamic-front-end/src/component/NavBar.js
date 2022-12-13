import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-dark">
      <div className="container">
        <NavLink className="navbar-brand text-white" to="/">
          ACCUEIL
        </NavLink>
        <ul className="navbar-nav mt-2  ml-auto mt-lg-0">
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              to="/agents"
              aria-current="page"
            >
              LIST
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/agent">
              CREATE AGENT
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
