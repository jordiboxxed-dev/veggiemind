import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { SessionProvider } from "./contexts/SessionContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const queryClient = new QueryClient();

const App = () => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
            </Route>
            
            <Route element={<ProtectedRoute />}>
              <Route 
                path="/dashboard" 
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                } 
              />
              <Route 
                path="/recipes" 
                element={
                  <Layout>
                    <Recipes />
                  </Layout>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                } 
              />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </SessionProvider>
);

export default App;