import useFirebase from "../../hooks/useFirebase";
import useUser from "../../hooks/useUser";
import TreeOfScience from "../vectors/TreeOfScience";
import HamburgerMenu from "./HamburgerMenu";
import NavBar from "./NavBar";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const firebase = useFirebase();
  const user = useUser();
  const location = useLocation();

  return (
    <div className="flex flex-row items-center justify-between text-leaf">
      <div className="flex flex-row items-center gap-1 text-leaf md:gap-4 lg:gap-8">
        <Link className="flex flex-row items-center gap-2" to="/">
          <TreeOfScience className="h-20 w-20" />
          {location.pathname === "/" ? (
            <h1 className="hidden font-tall text-2xl font-bold uppercase sm:inline md:text-4xl">
              Tree of Science
            </h1>
          ) : (
            <span className="hidden font-tall text-2xl font-bold uppercase sm:inline md:text-4xl">
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
      <div className="md:text-md xs:gap-2 flex flex-row items-center gap-1 text-xs md:text-lg">
        {user?.uid ? (
          <>
            <span className="hidden overflow-ellipsis sm:inline">
              {user.email}
            </span>
            <button
              onClick={() => signOut(firebase.auth)}
              className="rounded-sm bg-leaf px-4 py-2 font-tall font-bold uppercase text-slate-50"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/log-in" && (
              <Link
                className="rounded-sm px-4 py-2 font-tall font-bold uppercase"
                to="/log-in"
              >
                Log In
              </Link>
            )}
            <Link
              className="rounded-sm bg-leaf px-4 py-2 font-tall font-bold uppercase text-slate-50"
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
