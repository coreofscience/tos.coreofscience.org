import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Home from "./components/upload/Home";
import NotFound from "./components/NotFound";
import Tree from "./components/tree/Tree";

import FirebaseProvider from "./components/providers/FirebaseProvider";

const App: FC<{}> = () => {
  return (
    <FirebaseProvider>
      <Router>
        <AppLayout>
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
        </AppLayout>
      </Router>
    </FirebaseProvider>
  );
};

export default App;
