import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Login from "./components/account/Login";
import SignUp from "./components/account/SignUp";
import FinishSignUp from "./components/account/FinishSignUp";

import FilesProvider from "./components/providers/FilesProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const Home = React.lazy(() => import("./components/upload/Home"));
const Result = React.lazy(() => import("./components/tree/Result"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilesProvider>
        <BrowserRouter>
          <AppLayout>
            <Suspense fallback={"Loading..."}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/finish-sign-up" element={<FinishSignUp />} />
                <Route path="/tree/:treeId" element={<Result />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AppLayout>
        </BrowserRouter>
      </FilesProvider>
    </QueryClientProvider>
  );
};

export default App;
