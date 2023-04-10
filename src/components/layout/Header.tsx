import React from "react";
import { Link } from "react-router-dom";

import TreeOfScience from "../vectors/TreeOfScience";
import "./Header.css";

const Header = () => (
  <div className="Header">
    <Link to="/">
      <div className="Header_element">
        <TreeOfScience className="Header__branding" />
        <h2 className="Header__title">Tree of Science</h2>
      </div>
    </Link>
    <div className="Header_element">
      <Link to="/login">
        <h3 className="Header__login">Login</h3>
      </Link>
      <Link to="/sign-up">
        <h3 className="Header__sign-up">Sign up</h3>
      </Link>
    </div>
  </div>
);

export default Header;
