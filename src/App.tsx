import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Home from "./components/upload/Home";
import NotFound from "./components/NotFound";
import Result from "./components/tree/Result";

import FirebaseProvider from "./components/providers/FirebaseProvider";
import FilesProvider from "./components/providers/FilesProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: FC<{}> = () => {
  return (
    <FirebaseProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </FirebaseProvider>
  );
};

export default App;
