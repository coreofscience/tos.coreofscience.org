import cn from "../../utils/cn";
import Footer from "./Footer";
import Header from "./Header";
import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

type AppLayoutProps = {
  children?: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="grid-rows-[auto_1fr_auto] mt-4 grid min-h-dvh gap-4 md:mt-16 md:gap-16">
      <header>
        <div className="container">
          <Header />
        </div>
      </header>
      <main className="grid place-items-center">
        <div className={cn({ container: location.pathname !== "/" })}>
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
