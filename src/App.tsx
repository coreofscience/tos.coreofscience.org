import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const AppLayout = React.lazy(() => import("./components/layout/AppLayout"));
const Home = React.lazy(() => import("./components/upload/Home"));
const Result = React.lazy(() => import("./components/tree/Result"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const LogIn = React.lazy(() => import("./components/account/LogIn"));
const SignUp = React.lazy(() => import("./components/account/SignUp"));
const PasswordReset = React.lazy(
  () => import("./components/account/PasswordReset")
);
const FilesProvider = React.lazy(
  () => import("./components/providers/FilesProvider")
);
const UserProvider = React.lazy(
  () => import("./components/providers/UserProvider")
);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={"Loading..."}>
        <FilesProvider>
          <BrowserRouter>
            <UserProvider>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/log-in" element={<LogIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/reset-password" element={<PasswordReset />} />
                  <Route path="/tree/:treeId" element={<Result />} />
                  <Route path="/trees/:treeId" element={<Result />} />
                  <Route
                    path="/users/:userId/trees/:treeId"
                    element={<Result />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </UserProvider>
          </BrowserRouter>
        </FilesProvider>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
