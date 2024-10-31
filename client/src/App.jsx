import { BrowserRouter, Route, Routes } from "react-router-dom";
import Procedimentos from "./pages/Procedimentos";
import PageContainer from "./pages/PageContainer";
import Produtos from "./pages/Produtos";
import { UIProvider } from "./context/UIProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Equipamentos from "./pages/Equipamentos";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <div className="max-w-screen flex min-h-screen bg-slate-50 font-montserrat text-gray-800">
      <UIProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="bottom-center"
            gutter={20}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 3000 },
              style: {
                fontSize: "16px",
                padding: "16px",
                minWidth: "200px",
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PageContainer />}>
                <Route path="colaboradores" element={<Procedimentos />} />
                <Route path="procedimentos" element={<Procedimentos />} />
                <Route path="agendamentos" element={<Procedimentos />} />
                <Route path="contabilidade" element={<Procedimentos />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path="equipamentos" element={<Equipamentos />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </UIProvider>
    </div>
  );
}

export default App;
