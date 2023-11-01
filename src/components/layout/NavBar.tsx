import { FC } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  origin: "footer" | "header";
};

const NavBar: FC<Props> = ({ origin }) => {
  const location = useLocation();

  return (
    <>
      <li>
        <a
          className={`${
            origin.toLowerCase() === "footer"
              ? "text-sky-600 hover:text-sky-800 active:text-sky-800"
              : "text-leaf hover:text-leaf-900 active:text-leaf-900"
          }`}
          href={location.pathname !== "/" ? "#how-it-works" : "/#how-it-works"}
        >
          How it works
        </a>
      </li>
      <li>
        <a
          className={`${
            origin.toLowerCase() === "footer"
              ? "text-sky-600 hover:text-sky-800 active:text-sky-800"
              : "text-leaf hover:text-leaf-900 active:text-leaf-900"
          }`}
          href={location.pathname !== "/" ? "#testimonials" : "/#testimonials"}
        >
          Testimonials
        </a>
      </li>
      <li>
        <a
          className={`${
            origin.toLowerCase() === "footer"
              ? "text-sky-600 hover:text-sky-800 active:text-sky-800"
              : "text-leaf hover:text-leaf-900 active:text-leaf-900"
          }`}
          href={location.pathname !== "/" ? "#pricing" : "/#pricing"}
        >
          Pricing
        </a>
      </li>
    </>
  );
};

export default NavBar;
