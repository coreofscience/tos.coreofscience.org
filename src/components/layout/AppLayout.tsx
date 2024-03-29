import Footer from "./Footer";
import Header from "./Header";
import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const AppLayout: FC<Props> = ({ children }: Props) => {
  const location = useLocation();
  return (
    <div className="grid-rows-[auto 1fr auto] mt-4 grid h-full gap-4 md:mt-16 md:gap-16">
      <header>
        <div className="container">
          <Header />
        </div>
      </header>
      <main>
        <div className={location.pathname !== "/" ? "container" : ""}>
          {children}
        </div>
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
