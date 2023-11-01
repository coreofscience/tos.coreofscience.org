import { FC } from "react";
import { useLocation } from "react-router-dom";

type Props = {
 origin: "footer" | "header"
}

const NavBar: FC<Props> = ({origin}) => {
 const location = useLocation()

 return (
  <>
   <ul>
    <li>
     <a
      className={`${origin.toLowerCase() === "footer" ? "text-sky-600 hover:text-sky-800 active:text-sky-800" : "text-leaf hover:text-leaf-900 active:text-leaf-900"}`}
      href={location.pathname !== "/" ? "#how-it-works" : "/#how-it-works"}
     >
      How it works
     </a>
    </li>
   </ul>
   <ul>
    <li>
     <a
      className={`${origin.toLowerCase() === "footer" ? "text-sky-600 hover:text-sky-800 active:text-sky-800" : "text-leaf hover:text-leaf-900 active:text-leaf-900"}`}
      href={location.pathname !== "/" ? "#testimonials" : "/#testimonials"}
     >
      Testimonials
     </a>
    </li>
   </ul>
   <ul>
    <li>
     <a
      className={`${origin.toLowerCase() === "footer" ? "text-sky-600 hover:text-sky-800 active:text-sky-800" : "text-leaf hover:text-leaf-900 active:text-leaf-900"}`}
      href={location.pathname !== "/" ? "#pricing" : "/#pricing"}
     >
      Pricing
     </a>
    </li>
   </ul>
  </>
 )
}

export default NavBar
