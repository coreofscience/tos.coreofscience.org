import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";

import TreeOfScience from "../vectors/TreeOfScience";
import useFirebase from "../../hooks/useFirebase";
import HamburgerMenu from "./HamburgerMenu";
import NavBar from "./NavBar";

const Header = () => {
  const firebase = useFirebase();
  const user = useUser();
  const location = useLocation();

  return (
    <div className="text-leaf flex flex-row items-center justify-between">
      <div className="text-leaf flex flex-row items-center gap-1 md:gap-4 lg:gap-8">
        <Link className="flex flex-row items-center gap-2" to="/">
          <TreeOfScience className="w-20 h-20" />
          {location.pathname === "/" ? (
            <h1 className="font-tall uppercase text-2xl font-bold hidden sm:inline md:text-4xl">
              Tree of Science
            </h1>
          ) : (
            <span className="font-tall uppercase text-2xl font-bold hidden sm:inline md:text-4xl">
              Tree of Science
            </span>
          )}
        </Link>
        {location.pathname === "/" && (
          <ul className="hidden gap-1 md:gap-4 lg:gap-8 xl:flex">
            <NavBar origin="header" />
          </ul>
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        {user?.uid ? (
          <>
            <span className="overflow-ellipsis hidden sm:inline">
              {user.email}
            </span>
            <button
              onClick={() => signOut(firebase.auth)}
              className="px-4 py-2 font-tall uppercase font-bold text-slate-50 bg-leaf"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/log-in" && (
              <Link
                className="px-4 py-2 font-tall uppercase font-bold"
                to="/log-in"
              >
                Log In
              </Link>
            )}
            <Link
              className="px-4 py-2 font-tall uppercase font-bold text-slate-50 bg-leaf"
              to="/sign-up"
            >
              Sign up
            </Link>
          </>
        )}
        {location.pathname === "/" && <HamburgerMenu />}
      </div>
    </div>
  );
};

export default Header;
