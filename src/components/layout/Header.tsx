import React from "react";
import { Link } from "react-router-dom";

import TreeOfScience from "../vectors/TreeOfScience";
import "./Header.css";

const Header = () => (
  <Link to="/">
    <div className="Header">
      <TreeOfScience className="Header__branding" />
      <h1 className="Header__title">Tree of Science</h1>
    </div>
  </Link>
);

export default Header;
