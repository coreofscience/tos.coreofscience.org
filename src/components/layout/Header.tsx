import React from "react";
import "./Header.css";

import TreeOfScience from "../vectors/TreeOfScience";

const Header = () => (
  <header className="Header">
    <TreeOfScience className="Header__branding" />
    <h1 className="Header__title">Tree of Science</h1>
  </header>
);

export default Header;
