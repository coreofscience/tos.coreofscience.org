import React from "react";
import "./Header.css";

import TreeOfScience from "../vectors/TreeOfScience";

const Header = () => (
  <div className="Header">
    <TreeOfScience className="Header__branding" />
    <h1 className="Header__title">Tree of Science</h1>
  </div>
);

export default Header;
