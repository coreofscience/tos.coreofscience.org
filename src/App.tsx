import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import LogIn from "./components/account/LogIn";
import SignUp from "./components/account/SignUp";

import FilesProvider from "./components/providers/FilesProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import UserProvider from "./components/providers/UserProvider";

const Home = React.lazy(() => import("./components/upload/Home"));
const Result = React.lazy(() => import("./components/tree/Result"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilesProvider>
        <BrowserRouter>
          <UserProvider>
            <AppLayout>
              <Suspense fallback={"Loading..."}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/log-in" element={<LogIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/tree/:treeId" element={<Result />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AppLayout>
          </UserProvider>
        </BrowserRouter>
      </FilesProvider>
    </QueryClientProvider>
  );
};

export default App;
