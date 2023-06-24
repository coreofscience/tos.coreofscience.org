import React from "react";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";

import TreeOfScience from "../vectors/TreeOfScience";
import "./Header.css";
import useFirebase from "../../hooks/useFirebase";

const Header = () => {
  const firebase = useFirebase();
  const user = useUser();
  const location = useLocation();

  return (
    <div className="Header">
      <Link className="Header_element" to="/">
        <TreeOfScience className="Header__branding" />
        <h2 className="Header__title">Tree of Science</h2>
      </Link>
      <div className="Header_element">
        {user?.uid ? (
          <>
            <span>{user.email}</span>
            <button
              onClick={() => signOut(firebase.auth)}
              className="Header__log-out"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/log-in" && (
              <Link className="Header__log-in" to="/log-in">
                Log In
              </Link>
            )}
            <Link className="Header__sign-up" to="/sign-up">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
