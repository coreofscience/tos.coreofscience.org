import { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import "./AppLayout.css";

interface Props {
  children?: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="App">
      <header>
        <div className="App__content">
          <Header />
        </div>
      </header>
      <main>
        <div className="App__content">{children}</div>
      </main>
      <footer>
        <div className="App__content">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
