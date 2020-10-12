import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Home from "./components/upload/Home";
import NotFound from "./components/NotFound";
import Result from "./components/tree/Result";

import FirebaseProvider from "./components/providers/FirebaseProvider";
import FilesProvider from "./components/providers/FilesProvider";

const App: FC<{}> = () => {
  return (
    <FirebaseProvider>
      <FilesProvider>
        <Router>
          <AppLayout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/tree/:treeId">
                <Result />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </AppLayout>
        </Router>
      </FilesProvider>
    </FirebaseProvider>
  );
};

export default App;
