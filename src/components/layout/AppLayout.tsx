import React, { FC, ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import "./AppLayout.css";

interface Props {
  children?: ReactNode;
}

const AppLayout: FC<Props> = ({ children }: Props) => {
  return (
    <div className="App">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
