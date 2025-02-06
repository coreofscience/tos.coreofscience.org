import Button from "../ui/Button";
import { FC } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  origin: "footer" | "header";
};

const NavBar: FC<Props> = ({ origin }) => {
  const location = useLocation();
  const isFooter = origin.toLowerCase() === "footer";

  return (
    <>
      <li>
        <Button size="link" variant={isFooter ? "link" : "leafyLink"} asChild>
          <a
            href={
              location.pathname !== "/" ? "#how-it-works" : "/#how-it-works"
            }
          >
            How it works
          </a>
        </Button>
      </li>
      <li>
        <Button size="link" variant={isFooter ? "link" : "leafyLink"} asChild>
          <a
            href={
              location.pathname !== "/" ? "#testimonials" : "/#testimonials"
            }
          >
            Testimonials
          </a>
        </Button>
      </li>
      <li>
        <Button size="link" variant={isFooter ? "link" : "leafyLink"} asChild>
          <a href={location.pathname !== "/" ? "#pricing" : "/#pricing"}>
            Pricing
          </a>
        </Button>
      </li>
    </>
  );
};

export default NavBar;
