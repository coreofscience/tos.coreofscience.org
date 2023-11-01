import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const AppLayout = React.lazy(() => import("./components/layout/AppLayout"));
const TOS = React.lazy(() => import("./components/upload/TOS"));
const Result = React.lazy(() => import("./components/tree/Result"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const LogIn = React.lazy(() => import("./components/account/LogIn"));
const SignUp = React.lazy(() => import("./components/account/SignUp"));
const Plans = React.lazy(() => import("./components/pricing/Plans"));
const PasswordReset = React.lazy(
  () => import("./components/account/PasswordReset")
);
const FilesProvider = React.lazy(
  () => import("./components/providers/FilesProvider")
);
const UserProvider = React.lazy(
  () => import("./components/providers/UserProvider")
);
const Sap = React.lazy(() => import("./components/pages/docs/Sap"))
const FAQ = React.lazy(() => import("./components/pages/docs/FAQ"))
const Home = React.lazy(() => import("./components/pages/Home"))

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
                  <Route path="/tos" element={<TOS />} />
                  <Route path="/log-in" element={<LogIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/reset-password" element={<PasswordReset />} />
                  <Route path="/pricing" element={<Plans />} />
                  <Route path="/tree/:treeId" element={<Result />} />
                  <Route path="/trees/:treeId" element={<Result />} />
                  <Route
                    path="/users/:userId/trees/:treeId"
                    element={<Result />}
                  />
                  <Route
                    path="/users/:userId/proTrees/:treeId"
                    element={<Result />}
                  />
                  <Route path="/docs/sap" element={<Sap />} />
                  <Route path="/docs/faq" element={<FAQ />} />
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
