
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProcessesPage from "./pages/ProcessesPage";
import DocumentsPage from "./pages/DocumentsPage";
import OmbudsmanPage from "./pages/OmbudsmanPage";
import PublicationsPage from "./pages/PublicationsPage";
import ReportsPage from "./pages/ReportsPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/processos" element={<ProcessesPage />} />
          <Route path="/documentos" element={<DocumentsPage />} />
          <Route path="/ouvidoria" element={<OmbudsmanPage />} />
          <Route path="/publicacoes" element={<PublicationsPage />} />
          <Route path="/relatorios" element={<ReportsPage />} />
          <Route path="/administracao" element={<AdminPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
