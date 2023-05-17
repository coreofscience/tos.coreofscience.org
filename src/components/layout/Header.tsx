import React from "react";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

import TreeOfScience from "../vectors/TreeOfScience";
import "./Header.css";
import useFirebase from "../../hooks/useFirebase";

const Header = () => {
  const firebase = useFirebase();
  const user = useUser();

  return (
    <div className="Header">
      <Link to="/">
        <div className="Header_element">
          <TreeOfScience className="Header__branding" />
          <h2 className="Header__title">Tree of Science</h2>
        </div>
      </Link>
      <div className="Header_element">
        {user?.uid ? (
          <>
            <p>{user.email}</p>
            <div onClick={() => signOut(firebase.auth)}>
              <h3 className="Header__log-out">Log Out</h3>
            </div>
          </>
        ) : (
          <>
            <Link to="/log-in">
              <h3 className="Header__log-in">Log In</h3>
            </Link>
            <Link to="/sign-up">
              <h3 className="Header__sign-up">Sign up</h3>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
