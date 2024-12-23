import { BrowserRouter, Route, Routes } from "react-router-dom";
import Procedimentos from "./pages/Procedimentos";
import PageContainer from "./pages/PageContainer";
import Produtos from "./pages/Produtos";
import { UIProvider } from "./context/UIProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Equipamentos from "./pages/Equipamentos";
import Colaboradores from "./pages/Usuarios";
import Login from "./pages/Login";
import ProtectRoute from "./ui/ProtectRoute";
import Agendamentos from "./pages/Agendamentos";
import Contabilidade from "./pages/Contabilidade";

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
              <Route path="/" element={<Login />} />
              <Route
                path="/overview"
                element={
                  <ProtectRoute>
                    <PageContainer />
                  </ProtectRoute>
                }
              >
                <Route path="usuarios" element={<Colaboradores />} />
                <Route path="procedimentos" element={<Procedimentos />} />
                <Route path="agendamentos" element={<Agendamentos />} />
                <Route path="contabilidade" element={<Contabilidade />} />
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
