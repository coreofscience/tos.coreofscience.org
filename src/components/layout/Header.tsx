import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";

import TreeOfScience from "../vectors/TreeOfScience";
import useFirebase from "../../hooks/useFirebase";

const Header = () => {
  const firebase = useFirebase();
  const user = useUser();
  const location = useLocation();

  return (
    <div className="text-leaf flex flex-row items-center justify-between">
      <Link className="flex flex-row items-center gap-2" to="/">
        <TreeOfScience className="w-20 h-20" />
        <h2 className="font-tall uppercase text-4xl font-bold hidden sm:inline">
          Tree of Science
        </h2>
      </Link>
      <div className="flex flex-row items-center gap-2">
        {user?.uid ? (
          <>
            <span className="overflow-ellipsis hidden sm:inline">
              {user.email}
            </span>
            <button
              onClick={() => signOut(firebase.auth)}
              className="px-4 py-2 text-tall uppercase font-bold text-slate-50 bg-leaf"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/log-in" && (
              <Link
                className="px-4 py-2 text-tall uppercase font-bold"
                to="/log-in"
              >
                Log In
              </Link>
            )}
            <Link
              className="px-4 py-2 text-tall uppercase font-bold text-slate-50 bg-leaf"
              to="/sign-up"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
