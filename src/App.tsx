import React, { FC } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/upload/Home";
import NotFound from "./components/NotFound";
import Tree from "./components/tree/Tree";

const AppLayout = styled.div`
  margin: 0 10px;
  max-width: 960px;

  @media (min-width: 720px) {
    & {
      margin-left: 10%;
    }
  }
`;

const App: FC<{}> = () => {
  return (
    <Router>
      <AppLayout>
        <header>
          <h1>SAP</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/tree/:treeId">
              <Tree />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <footer>References</footer>
      </AppLayout>
    </Router>
  );
};

export default App;
