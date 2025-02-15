import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppLayout = React.lazy(() => import("./components/layout/AppLayout"));
const Tos = React.lazy(() => import("./components/pages/tos"));
const New = React.lazy(() => import("./components/pages/tos/New"));
const Result = React.lazy(() => import("./components/tree/Result"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const History = React.lazy(() => import("./components/pages/history"));
const LogIn = React.lazy(() => import("./components/pages/account/LogIn"));
const SignUp = React.lazy(() => import("./components/pages/account/SignUp"));
const VerifyEmail = React.lazy(
  () => import("./components/pages/account/VerifyEmail"),
);
const PasswordReset = React.lazy(
  () => import("./components/pages/account/PasswordReset"),
);
const Plans = React.lazy(() => import("./components/pages/pricing"));
const FilesProvider = React.lazy(
  () => import("./components/providers/FilesProvider"),
);
const UserProvider = React.lazy(
  () => import("./components/providers/UserProvider"),
);
const Sap = React.lazy(() => import("./components/pages/docs/Sap"));
const Faq = React.lazy(() => import("./components/pages/docs/Faq"));
const About = React.lazy(() => import("./components/pages/docs/About"));
const PressRelease = React.lazy(
  () => import("./components/pages/docs/PressRelease"),
);
const Home = React.lazy(() => import("./components/pages/home"));
const ProBuyflow = React.lazy(
  () => import("./components/pages/buyflow/ProBuyflow"),
);
const Thanks = React.lazy(() => import("./components/pages/buyflow/Thanks"));

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
                  <Route path="/tos/new" element={<New />} />
                  <Route path="/tos" element={<Tos />} />
                  <Route path="/tree/:treeId" element={<Result />} />
                  <Route path="/trees/:treeId" element={<Result />} />
                  <Route path="/history" element={<History />} />
                  <Route
                    path="/users/:userId/trees/:treeId"
                    element={<Result />}
                  />
                  <Route path="/log-in" element={<LogIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/account/verify" element={<VerifyEmail />} />
                  <Route path="/reset-password" element={<PasswordReset />} />
                  <Route path="/pricing" element={<Plans />} />
                  <Route path="/docs/sap" element={<Sap />} />
                  <Route path="/docs/faq" element={<Faq />} />
                  <Route path="/docs/about" element={<About />} />
                  <Route path="/docs/press" element={<PressRelease />} />
                  <Route path="/buy/pro" element={<ProBuyflow />} />
                  <Route path="/buy/pro/thanks" element={<Thanks />} />
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
