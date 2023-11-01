import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";

import TreeOfScience from "../vectors/TreeOfScience";
import useFirebase from "../../hooks/useFirebase";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const firebase = useFirebase();
  const user = useUser();
  const location = useLocation();

  return (
   <div className="text-leaf flex flex-row items-center justify-between">
    <div className="text-leaf flex flex-row items-center gap-1 md:gap-4 lg:gap-8">
     <Link className="flex flex-row items-center gap-2" to="/">
      <TreeOfScience className="w-20 h-20" />
      <h2 className="font-tall uppercase text-2xl font-bold hidden sm:inline md:text-4xl">
       Tree of Science
      </h2>
     </Link>
     {location.pathname === "/" && (
      <>
       <div className="hidden gap-1 md:gap-4 lg:gap-8 lg:flex">
        <ul>
         <li><a className="text-leaf hover:text-leaf-900" href="#how-it-works">How it works</a></li>
        </ul>
        <ul>
         <li><a className="text-leaf hover:text-leaf-900" href="#testimonials">Testimonials</a></li>
        </ul>
        <ul>
         <li><a className="text-leaf hover:text-leaf-900" href="#pricing">Pricing</a></li>
        </ul>
       </div>
      </>
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
     {location.pathname === "/" && (
      <HamburgerMenu />
     )}
    </div>
   </div>
  );
};

export default Header;
