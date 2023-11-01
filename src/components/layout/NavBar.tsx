import { FC } from "react";
import { useLocation } from "react-router-dom";

const NavBar: FC = () => {
 const location = useLocation()

 return (
  <>
   <ul>
    <li>
     <a
      className="text-leaf hover:text-leaf-900"
      href={location.pathname !== "/" ? "#how-it-works" : "/#how-it-works"}
     >
      How it works
     </a>
    </li>
   </ul>
   <ul>
    <li>
     <a
      className="text-leaf hover:text-leaf-900"
      href={location.pathname !== "/" ? "#testimonials" : "/#testimonials"}
     >
      Testimonials
     </a>
    </li>
   </ul>
   <ul>
    <li>
     <a
      className="text-leaf hover:text-leaf-900"
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
