import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Home from "./components/upload/Home";
import NotFound from "./components/NotFound";
import Result from "./components/tree/Result";

import FirebaseProvider from "./components/providers/FirebaseProvider";
import FilesProvider from "./components/providers/FilesProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <FirebaseProvider>
      <QueryClientProvider client={queryClient}>
        <FilesProvider>
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tree/:treeId" element={<Result />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </FilesProvider>
      </QueryClientProvider>
    </FirebaseProvider>
  );
};

export default App;
