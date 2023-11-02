import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children?: ReactNode;
}

const AppLayout: FC<Props> = ({ children }: Props) => {
 const location = useLocation()
  return (
    <div className="grid grid-rows-[auto 1fr auto] h-full gap-4 mt-4 md:gap-16 md:mt-16">
      <header>
        <div className="container">
          <Header />
        </div>
      </header>
      <main>
        <div className={location.pathname !== "/" ? "container" : ""}>{children}</div>
      </main>
      <footer className="bg-stone-100">
        <div className="container">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
