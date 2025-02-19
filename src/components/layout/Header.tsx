import useFirebase from "../../hooks/useFirebase";
import useNext from "../../hooks/useNext";
import useUser from "../../hooks/useUser";
import Button from "../ui/Button";
import TreeOfScience from "../vectors/TreeOfScience";
import HamburgerMenu from "./HamburgerMenu";
import NavBar from "./NavBar";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const firebase = useFirebase();
  const user = useUser();
  const location = useLocation();
  const { nextSearch } = useNext();

  return (
    <div className="flex flex-row items-center justify-between text-leaf">
      <div className="flex flex-row items-center gap-1 text-leaf md:gap-4 lg:gap-8">
        <Button variant="asChild" size="link" asChild>
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
        </Button>
        {location.pathname === "/" && (
          <ul className="hidden gap-1 md:gap-4 lg:gap-8 xl:flex">
            <NavBar origin="header" />
          </ul>
        )}
      </div>
      <div className="flex flex-row items-center gap-2 text-xs md:gap-4 md:text-lg">
        {user?.uid ? (
          <>
            <span className="hidden text-ellipsis sm:inline">
              {user.email}
            </span>
            <Button
              onClick={() => signOut(firebase.auth)}
              className="uppercase"
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            {location.pathname !== "/log-in" && (
              <Button className="uppercase" asChild>
                <Link to={{ pathname: "/log-in", search: nextSearch }}>
                  Log In
                </Link>
              </Button>
            )}
            <Button className="uppercase" asChild>
              <Link to={{ pathname: "/sign-up", search: nextSearch }}>
                Sign up
              </Link>
            </Button>
          </>
        )}
        {location.pathname === "/" && <HamburgerMenu />}
      </div>
    </div>
  );
};

export default Header;
